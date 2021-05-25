<template>
    <div class="container">
        <h1 class="mt-4 mb-3">거래가 검색</h1>
        <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="/">홈</a></li>
            <li class="breadcrumb-item active">주택관련 정보 제공</li>
        </ol>
        <div class="row">
            <div class="col-lg-0 col-md-0 team" align="center">
                <div class="member">
                    <div class="member-img">
                        <!-- <google-map v-show="bool" :center="sendCenter" :markers="sendMarkers" :zoom="zoom"/> -->
                        <google-map :center="sendCenter" :markers="sendMarkers" :zoom="zoom"/>
                    </div>
                </div>
            </div>
            <div class="col-lg-0 col-md-0 team" align="center">
                <div class="member">
                    <div v-show="size==0" class="member-img" style="padding:30px; padding-bottom:60px;">
                        <h2>관심등록을 해놓은 아파트가 없습니다</h2>
                        <div class="pricing">
                            <button class="btn-buy" onclick="location.href='/houseInfo'">아파트 보러가기</button>

                        </div>
                    </div>
                    <div v-show="size!=0" class="member-img" style="padding:30px; padding-bottom:60px;">
                        <h2>{{size}}건의 아파트 정보가 저장되었습니다</h2>
                        <!-- <div class="pricing">
                            <template v-for="(item, index) in info">
                                <div :key="index">
                                    <a>{{item.dong}} {{item.aptName}} {{item.floor}}층</a>
                                    <button class="btn-buy">주변 상권 보기</button>
                                </div>
                            </template>
                        </div> -->
                        <div class="row">
                            <template v-for="(item, idx) in list">
                                <div class="col-lg-4 col-md-6 team" :key="idx">
                                    <div class="custom-portfolio-info">
                                    <h3><router-link :to="{name:'house-deal-detail', params:{no : item.no + '+' + item.dong + '+' + item.aptName}}">{{item.aptName}} {{item.floor}}층</router-link></h3>
                                    <ul>
                                        <li><strong>거래일시</strong>: {{item.dealYear}}-{{item.dealMonth}}-{{item.dealDay}}</li>
                                        <li><strong>건축년도</strong>: {{item.buildYear}}</li>
                                        <li><strong>거래금액</strong>: {{item.dealAmount}}</li>
                                    </ul>
                                        <div class="pricing">
                                            <button class="btn-buy" @click="show(item)">주변 상권 보기</button>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import GoogleMap from '@/components/HouseDeal/GoogleMap.vue';
import http from "@/util/http-common";
const shop = require('@/assets/shop.png');
const apt = require('@/assets/apt.png');
export default {
    data() {
        return {
            zoom : 11,
            size : 0,
            info : [], // marker
            list : [], // pick List
            sendMarkers : [],
            sendCenter : {
                lat: 37.5012743,
                lng: 127.039585,
        	},
        }
    },
    components : {
        GoogleMap,
    },
    created() {
        console.log(this.$session.get("userInfo"));
        if(this.$session.get("userInfo") == null){
            alert("로그인 시 지원되는 기능입니다.");
            location.href="/login";
        } else {
            http
                .get('/getPickList',{
                    params : {
                        id : this.$session.get('userInfo').id
                    }
                })
                .then(({data})=>{
                    this.size = data.length;
                    this.info = data;
                    this.list = data;
                    var totalLat = 0;
                    var totalLng = 0;
                    for(var i=0; i<this.size; i++){
                        totalLat += Number(data[i].lat);
                        totalLng += Number(data[i].lng);
                        this.sendMarkers.push({
                            position: {
                                lat: Number(data[i].lat),
                                lng: Number(data[i].lng),
                            },
                            infoText:`
                            <strong>${data[i].aptName}</strong><br>
                            <a href="/houseInfo/apt/${data[i].dong}/${data[i].aptName}">자세히</a>
                            `,
                            markerOption : {
                                url: apt,
                                size: {width: 30, height: 40, f: 'px', b: 'px',},
                                scaledSize: {width: 30, height: 45, f: 'px', b: 'px',},
                            }
                        });
                    }
                    this.sendCenter = {
                        lat : Number(totalLat/this.size),
                        lng : Number(totalLng/this.size)
                    }
                })

        }
    },
    methods: {
        show(obj){
            http
                .get('/getStore',{
                    params : {
                        dong : obj.dong
                    }
                })
                .then(({data})=>{
                    this.info = data;
                    this.sendMarkers = [];
                    this.sendCenter = {};

                    // this.info
                    this.sendMarkers.push({
                        position: {
                            lat: Number(obj.lat),
                            lng: Number(obj.lng),
                        },
                        infoText:`
                        <strong>${obj.aptName}</strong><br>
                        <a href="/houseInfo/apt/${obj.dong}/${obj.aptName}">자세히</a>
                        `,
                        markerOption : {
                            url: apt,
                            size: {width: 30, height: 40, f: 'px', b: 'px',},
                            scaledSize: {width: 30, height: 45, f: 'px', b: 'px',},
                        }
                    });
                    this.sendCenter = {
                        lat : Number(obj.lat),
                        lng : Number(obj.lng)
                    }
                    this.zoom = 16;
                    for(var i=0; i<data.length; i++){
                        var markerObj = {
                            position: {
                                lat: Number(data[i].lng),
                                lng: Number(data[i].lat),
                            },
                            infoText:`<div>
                            <h5>${data[i].name}</h5>
                            <a>${data[i].industry}</a><br>
                            <a>${data[i].address}</a>
                            </div>`,
                            markerOption : {
                                url: shop,
                                size: {width: 30, height: 30, f: 'px', b: 'px',},
                                scaledSize: {width: 30, height: 45, f: 'px', b: 'px',},
                            }
                        }
                        this.sendMarkers.push(markerObj);
                    }

                })
        }
    },
}
</script>
<style>
    
</style>