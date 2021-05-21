<template lang="">
    <div>
    <div class="container">

    <h1 class="mt-4 mb-3">거래가 검색</h1>

        <ol class="breadcrumb">
        <li class="breadcrumb-item">
            <a href="index.jsp">홈</a>
        </li>
        <li class="breadcrumb-item active">거래가 검색</li>
        </ol>
    <div class="row">
        <!-- 아파트 정보 -->
        <div class="col-lg-8 col-md-6 team" align="center">
          <div class="member">
            <div class="member-img">
              <google-map/>
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
        <template v-for="(item, idx) in list">
            <div class="col-lg-4 col-md-6 team" :key="idx">
                <div class="custom-portfolio-info">
                <h3><a href="/">{{item.AptName}} {{item.floor}}층</a></h3>
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
</template>
<script>
import GoogleMap from '@/components/GoogleMap.vue';
import http from "@/util/http-common";
export default {
    data() {
        return {
            list : [],
            si : '서울특별시',
            gugun : [],
            dong : [],
            selectGugun : '',
            selectDong : '',
        }
    },
    methods: {
        testdata(){
            var dong = this.$route.params.dong;
            if(dong != null) {
                var url = `/houseInfo/${this.$route.params.dong}`;
                http.get(url).then(({ data }) => {
                    for(var i=0; i<data.length; i++){
                        var obj = {
                            AptName : data[i].AptName,
                            floor : data[i].floor,
                            dealYear : data[i].dealYear,
                            dealMonth : data[i].dealMonth,
                            dealDay : data[i].dealDay,
                            buildYear : data[i].buildYear,
                            dealAmount : data[i].dealAmount
                        }
                        this.list.push(obj);
                    }
                });
            }
        },
    },
    created() {
        http
            .get('/dong')
            .then(({data}) => {
                // this.list = data;
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