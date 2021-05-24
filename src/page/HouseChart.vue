<template>
    <div class="container">
        <h1 class="mt-4 mb-3">거래가 검색</h1>
        <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="/">홈</a></li>
        <li class="breadcrumb-item active">차트로 보는 거래동향</li>
        </ol>
        <div class="row">
            <!-- <div align="center" class="col-lg-9 col-md-6"><google-map/></div> -->
            <div class="col-lg-4 col-md-6 team">
                <div class="member">
                    <div class="member-info custom-portfolio-info"  style="height:100%">
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
                        
                        <button class="custom" @click="changeChartData">비교하기 ✔</button>
                    </div>
                </div>
            </div>
            <div class="col-lg-8 col-md-6 team" align="center">
                <div class="member">
                    <div class="member-img" style="padding:30px; padding-bottom:60px">
                        <line-chart :chart-data="linedatacollection"></line-chart>
                    </div>
                </div>
            </div>
            <div class="col-lg-0 col-md-0 team" align="center">
                <div class="member">
                    <div class="member-img" style="padding:30px; padding-bottom:60px;">
                        <h2>서울특별시 내에서 거래량이 가장 많은 동네</h2>  
                        <bar-chart :chart-data="bardatacollection"></bar-chart>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>
<script>
import LineChart from '@/components/HouseChart/HouseLineChart';
import BarChart from '@/components/HouseChart/HouseBarChart';
import http from "@/util/http-common";
export default {
    data() {
        return {
            linedatacollection : null,
            bardatacollection : null,
            avgData : [],
            info : [],
            list : [],
            si : '서울특별시',
            gugun : [],
            dong : [],
            selectGugun : '',
            selectDong : '',
        }
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
        http
            .get(`/getHouseChart/${this.selectDong}`)
            .then(({data}) => {
                this.fillLineData();
                for(var i=0; i<12; i++){
                    this.avgData.push(Number(data[i].dealAmount));
                }
                this.linedatacollection.datasets[0].data = this.avgData;
            })
        http
            .get('/getHouseChartTop10')
            .then(({data}) => {
                this.fillBarData();
                console.log(data);
                this.bardatacollection.datasets[0].label = 'TOP 1 ' + (data[0].dong);
                for(var i=0; i<data.length; i++){
                    this.bardatacollection.datasets[0].data.push(data[i].dealCount);
                    this.bardatacollection.labels.push(data[i].dong);
                    // this.bardatacollection.datasets[0].label.push(data[i].dong);
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
    },
    methods: {
        changeChartData : function(){
            console.log(this.selectDong);
            http
                .get('/getHouseChart',{
                    params: {
                        dong: this.selectDong
                    }
                })
                .then(({data}) => {
                    console.log(data);
                    if(data.length == 0) alert("거래 내역이 존재하지 않습니다.");
                    else {
                        this.fillLineData();
                        this.linedatacollection.datasets[0].data = this.avgData;
                        //로직
                        var idx = 0;
                        for(var i=1; i<=12; i++){
                            if((i) == data[idx].dealMonth) {
                                this.linedatacollection.datasets[1].data.push(Number(data[idx].dealAmount));
                                idx++;
                            }
                            else this.linedatacollection.datasets[1].data.push(0);
                        }
                        console.log(this.linedatacollection.datasets[1].data);
                    }
                })
        },
        fillLineData () {
          this.linedatacollection = {
            labels: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
            datasets: [
              {
                fill: false,
                label: '서울특별시 아파트 월별 평균 거래가',
                pointBackgroundColor: 'white',
                pointBorderColor: 'rgb(75, 192, 192)',
                borderColor: 'rgba(75, 192, 192, 0.5)',
                borderWidth: 2,
                data: [],
              },
              {
                type : 'bar',
                label: `${this.selectDong} 월별 평균 거래가`,
                pointBackgroundColor: 'white',
                borderWidth: 1,
                borderColor: 'rgb(90, 90, 243, 0.8)',
                backgroundColor: 'rgba(90, 90, 243, 0.4)',
                data: [10],
                barThickness: 25,
              }
             ]
            }
        },
        fillBarData () {
          this.bardatacollection = {
            labels: [],
            datasets: [{
                label: [],
                data: [],
                backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(201, 203, 207, 0.2)'
                ],
                borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',
                'rgb(201, 203, 207)'
                ],
                borderWidth: 1
            }]
            }
        }
        
        
    },
    components : {
        LineChart, BarChart
    },
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

.row h2 {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
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
</style>