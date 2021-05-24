<template>
<div>
    <div class="row">
        <!-- 아파트 정보 -->
        <div class="col-lg-8 col-md-6 team" align="center">
        <div class="member">
            <div class="member-img">
                <google-map :center="sendCenter" :markers="sendMarkers"/>
            </div>
        </div>
        </div>
        <!-- <div align="center" class="col-lg-9 col-md-6"><google-map/></div> -->
        <div class="col-lg-4 col-md-6 team">
            <div class="member">
                <div class="member-info">
                    <h4>거래 검색</h4>
                    <select class="custom-select-sm">
                        <option selected>서울특별시</option>
                    </select>
                    <select class="custom-select-sm" v-model="selectGugun">
                        <option v-for="(item, idx) in gugun" :key="idx" :value=item>{{item}}</option>
                    </select>
                    <select class="custom-select-sm" v-model="selectDong">
                        <option v-for="(item, idx) in dong" :key="idx" :value=item>{{item}}</option>
                    </select>
                    <div><input type="date" class="custom-select-sm"/> ~ <input type="date" class="custom-select-sm"/></div>
                    <div><input type="text" class="custom-select-sm" placeholder="최소 거래 금액 (1만 단위)"/><input type="text" class="custom-select-sm" placeholder="최대 거래 금액 (1만 단위)"/></div>
                    
                    <div class="customSearch" style="margin-top:0.5em">
                        <div>
                            <form action="" method="post"  style="margin-top:0"> 
                                <input type="text" name="name" placeholder="아파트 명"><input type="button" value="검색">
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div>
        <div class="row">
        <template v-for="(item, idx) in info">
            <div class="col-lg-4 col-md-6 team" :key="idx">
                <div class="custom-portfolio-info">
                <h3><router-link :to="{name:'house-deal-detail', params:{no : item.no + '+' + item.dong + '+' + item.AptName}}">{{item.AptName}} {{item.floor}}층</router-link></h3>
                <ul>
                    <li><strong>거래일시</strong>: {{item.dealYear}}-{{item.dealMonth}}-{{item.dealDay}}</li>
                    <li><strong>건축년도</strong>: {{item.buildYear}}</li>
                    <li><strong>거래금액</strong>: {{item.dealAmount}}</li>
                </ul>
                </div>
            </div>
        </template>
        </div>
    </div>
</div>
</template>
<script>
import GoogleMap from '@/components/HouseDeal/GoogleMap.vue';
import http from "@/util/http-common";
export default {
    data() {
        return {
            info : [],
            list : [],
            si : '서울특별시',
            gugun : [],
            dong : [],
            selectGugun : '',
            selectDong : '',
            sendMarkers : [],
            sendCenter : {
                lat: 37.5012743,
                lng: 127.039585,
        	},
        }
    },
    // computed: {
    //     google: GoogleMap
    // },
    methods: {
        inputData(){
            var url = `/houseInfo/${this.selectDong}`;
            http.get(url).then(({ data }) => {
                if(data.length == 0) alert("해당하는 거래내역이 없습니다.");
                else {
                    this.info = [];
                    this.sendMarkers = [];
                    var aptList = [];
                    for(var i=0; i<data.length; i++){
                        var obj = {
                            no : data[i].no,
                            dong : data[i].dong,
                            AptName : data[i].AptName,
                            floor : data[i].floor,
                            dealYear : data[i].dealYear,
                            dealMonth : data[i].dealMonth,
                            dealDay : data[i].dealDay,
                            buildYear : data[i].buildYear,
                            dealAmount : data[i].dealAmount
                        }
                        var markerObj = {
                            position: {
                                lat: Number(data[i].lat),
                                lng: Number(data[i].lng),
                            },
                            infoText:`
                            <strong>${data[i].AptName}</strong><br>
                            <a href="/houseInfo/apt/${data[i].dong}/${data[i].AptName}">자세히</a>
                            `,
                        }
                        if(aptList.indexOf(data[i].AptName) < 0) {
                            this.sendMarkers.push(markerObj);
                            aptList.push(data[i].AptName);
                        }
                        this.info.push(obj);
                    }
                    this.sendCenter = {
                        lat : Number(data[0].lat),
                        lng : Number(data[0].lng)
                    }
                }
            })
            .catch(() => {
                alert("오류 발생 ! ㄷㄷ");
            });
        },
    },
    created() {
        http
            .get('/dong')
            .then(({data}) => {
                this.list = data;
                for(var i=0; i<data.length; i++){
                    if(this.gugun.indexOf(data[i].gugun) < 0){
                        this.gugun.push(data[i].gugun);
                    }
                }
            })
    },
    watch : {
        selectGugun: function(gugun){
            this.dong = [];
            for(var i=0; i<this.list.length; i++){
                if(this.list[i].gugun == gugun){
                    this.dong.push(this.list[i].dong);
                }
            }
        },
        selectDong: function(){
            this.inputData();
        }
    },
    components : {
        GoogleMap
    }
}
</script>
<style>
.team .member{
    height: 90%;
}
.wrapper{position:relative;}
.bottom{position:absolute; bottom:0; width:90%; padding:10px 6px;}
</style>