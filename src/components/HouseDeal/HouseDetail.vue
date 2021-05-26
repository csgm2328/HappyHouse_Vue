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
                    <button class="custom" @click="pick">찜 하기 💕</button>
                </div>
            </div>
        </div>
    </div>
    <div>
        <div class="row">
            <div class="col-lg-0 col-md-0 team">
                <div class="custom-portfolio-info">
                <h3>이 아파트에서 거래된 내역</h3>
                    <line-chart v-show="size!=1" :chart-data="datacollection"></line-chart>
                    <bar-chart v-show="size==1" :chart-data="datacollection"></bar-chart>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
<script>
import GoogleMap from '@/components/HouseDeal/GoogleMap.vue';
import LineChart from '@/components/HouseDeal/LineChart'
import BarChart from '@/components/HouseDeal/BarChart'
import http from "@/util/http-common";
const apt = require('@/assets/apt.png');
export default {
    data() {
        return {
            datacollection: null,
            info : {},
            sendMarkers : [],
            sendCenter : {
                lat: 37.5012743,
                lng: 127.039585,
            },
            paramNo : '',
            paramDong : '',
            paramAptName : '',
            size : 0
        }
    },
    created() {
        var no = this.$route.params.no;
        this.paramNo = no.split('+')[0];
        this.paramDong = no.split('+')[1];
        this.paramAptName = no.split('+')[2];
        http
            .get(`/houseInfo/detail/${this.paramNo}`)
            .then(({data}) => {
                this.info = data;
                this.sendMarkers.push({
                    position :{
                        lat : data.lat,
                        lng : data.lng
                    },
                    infoText : `<strong>${data.aptName} ${data.floor}층</strong>`,
                    markerOption : {
                        url: apt,
                        size: {width: 30, height: 40, f: 'px', b: 'px',},
                        scaledSize: {width: 30, height: 45, f: 'px', b: 'px',},
                    }
                });
                this.sendCenter ={
                    lat : data.lat,
                    lng : data.lng
                };
                console.log('create',data);
            })
        http
            .post(`/houseInfo/apt`,{
                aptName : this.paramAptName,
                dong : this.paramDong
            })
            .then(({data}) => {
                console.log("mounted" , data);
                var maxLength = 10;
                maxLength = (maxLength < data.length) ? maxLength : data.length;
                console.log(maxLength);
                this.size = maxLength;
                this.fillData();
                for(var i=0; i<maxLength; i++){
                    if(Number(data[i].dealMonth) < 10) data[i].dealMonth = '0'+data[i].dealMonth;
                    if(Number(data[i].dealDay) < 10) data[i].dealDay = '0'+data[i].dealDay;
                    this.datacollection.labels.push(data[i].dealYear + '.' + data[i].dealMonth + '.' + data[i].dealDay);
                    // this.datacollection.datasets[0].data.push(Number(data[i].dealAmount));
                    var chNum = data[i].dealAmount.split(',');
                    var numbering = chNum[0] + chNum[1];
                    this.datacollection.datasets[0].data.push(Number(numbering));
                }
                console.log(this.datacollection.labels);
                console.log(this.datacollection.datasets[0].data);
            })
    },
    beforeCreate() {
        
    },
    components : {
        GoogleMap, LineChart, BarChart
    },
    mounted() {

    },
    methods: {
      fillData () {
        this.datacollection = {
          labels: [],
          datasets: [
            {
              fill: false,
              label: '최근 거래 내역 (10건까지 제공됩니다)',
              backgroundColor: 'rgba(90, 90, 243, 0.7)',
              pointBackgroundColor: 'white',
              pointBorderColor: 'rgba(90, 90, 243, 0.7)',
              borderWidth: 2,
              borderColor: 'rgba(90, 90, 243, 0.7)',
              data: [],
              barThickness: 25,
              
            }
          ]
        }
      },
      pick(){
          if(this.$session.get("userInfo") == null) alert("로그인 시 지원되는 기능입니다.");
          else {
              http
                .get('/addPick',{
                    params : {
                        id : this.$session.get("userInfo").id,
                        no : this.$route.params.no.split("+")[0]
                    }
                })
                .then(({data})=>{
                    console.log(data);
                    if(data == "SUCCESS"){
                        alert("등록에 성공했습니다");
                    }
                })
                .catch(()=>{
                    alert("이미 등록되어있는 매물입니다.");
                })
          }
      }
    },
}
</script>
<style>
.team .member{
    height: 95%;
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
.member-info button {
  background: #5a5af3;
  border: 0;
  width: 70%;
  padding: 10px 24px;
  margin: 10px;
  color: #fff;
  transition: 0.4s;
  border-radius: 50px;
}
.team .member .member-info {
    height: 100%;
}
</style>