<template>
<div>
    <div class="row">
        <div class="col-lg-0 col-md-0 team" align="center">
        <div class="member">
            <div class="member-img">
                <google-map :center="sendCenter" :markers="sendMarkers" :zoom="16"/>
            </div>
        </div>
        </div>
    </div>
    <div>
        <div class="row">
            <div class="col-lg-0 col-md-0 team">
                <div class="custom-portfolio-info">
                <h3><a style="color:#5a5af3;">{{this.$route.params.AptName}}</a> 아파트 거래 내역</h3>
                    <div>
        <div class="row">
        <template v-for="(item, idx) in info">
            <div class="col-lg-4 col-md-6 team" :key="idx">
                <div class="custom-portfolio-info">
                <h3><a :href="`/houseInfo/${item.no}`">{{item.AptName}} {{item.floor}}층</a></h3>
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
            </div>
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
            sendMarkers : [],
            sendCenter : {},
        }
    },
    created() {
        var AptName = this.$route.params.AptName;
        var dong = this.$route.params.dong;
        http
            .post(`/houseInfo/apt`,{
                aptName : AptName,
                dong : dong
            })
            .then(({data}) => {
                this.info = data;
                this.sendMarkers.push({
                    position: {
                        lat: Number(data[0].lat),
                        lng: Number(data[0].lng),
                    },
                    infoText: `<strong>${data[0].AptName}</strong><br>`
                });
                this.sendCenter = {
                    lat : Number(data[0].lat),
                    lng : Number(data[0].lng)
                }
                console.log(data);
            })
    },
    watch : {

    },
    components : {
        GoogleMap
    }
}
</script>
<style>
.custom-portfolio-info ul {
  list-style: none;
  padding: 0;
  font-size: 15px;
}

.custom-portfolio-info ul li + li {
  margin-top: 10px;
}
.custom-portfolio-info ul li p{
    font-size: 30px;
    color:#5a5af3;
}
</style>