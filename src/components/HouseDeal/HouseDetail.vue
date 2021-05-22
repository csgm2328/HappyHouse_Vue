<template>
<div>
    <div class="row">
        <!-- 아파트 정보 -->
        <div class="col-lg-8 col-md-6 team" align="center">
        <div class="member">
            <div class="member-img">
                <google-map :center="sendCenter" :markers="sendMarkers" :zoom="16"/>
            </div>
        </div>
        </div>
        <!-- <div align="center" class="col-lg-9 col-md-6"><google-map/></div> -->
        <div class="col-lg-4 col-md-6 team">
            <div class="member">
                <div class="member-info custom-portfolio-info">
                    <h4 style="color:#5a5af3;">{{info.dong}} 거래정보</h4>
                    <h4 style="padding:5px">{{info.aptName}} {{info.floor}}층</h4><hr>
                    <ul>
                        <li><strong>거래번호</strong>: {{info.no}}</li>
                        <li><strong>거래일시</strong>: {{info.dealYear}}-{{info.dealMonth}}-{{info.dealDay}}</li>
                        <li><strong>건축년도</strong>: {{info.buildYear}}</li>
                        <li><strong>거래금액</strong>: {{info.dealAmount}}</li>
                        <li><strong>면적</strong>: {{info.area}}</li>
                        <li><strong>지번</strong>: {{info.jibun}}</li>
                        <li><strong>시공연도</strong>: {{info.buildYear}}</li>
                    </ul>
                    <button class="custom">찜 하기 💕</button>
                </div>
            </div>
        </div>
    </div>
    <div>
        <div class="row">
            <div class="col-lg-0 col-md-0 team">
                <div class="custom-portfolio-info">
                <h3>거래 동향</h3>
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
            info : {},
            sendMarkers : [],
            sendCenter : {
                lat: 37.5012743,
                lng: 127.039585,
        	},
        }
    },
    created() {
        var no = this.$route.params.no;
        http
            .get(`/houseInfo/detail/${no}`)
            .then(({data}) => {
                this.info = data;
                this.sendMarkers.push({
                    position :{
                        lat : data.lat,
                        lng : data.lng
                    },
                    infoText : `<strong>${data.aptName} ${data.floor}층</strong>`
                });
                this.sendCenter ={
                    lat : data.lat,
                    lng : data.lng
                };
                console.log(data);
            })
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
button {
  background: #5a5af3;
  border: 0;
  width: 70%;
  padding: 10px 24px;
  margin: 10px;
  color: #fff;
  transition: 0.4s;
  border-radius: 50px;
}
</style>