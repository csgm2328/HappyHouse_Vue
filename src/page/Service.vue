<template lang="">
    <div>
    <div class="container">

    <h1 class="mt-4 mb-3">거래가 검색
      <small>아파트/주택 실 거래가 검색</small>
    </h1>

    <ol class="breadcrumb">
      <li class="breadcrumb-item">
        <a href="index.jsp">홈</a>
      </li>
      <li class="breadcrumb-item active">거래가 검색</li>
    </ol>
	
	<!-- 아파트 정보 -->
    <div align="center"><google-map/></div>
	<div>
		거래 정보<br>
        <template v-for="(item, idx) in list">
            <div :key="idx">
                <hr>
                <h4>{{item.AptName}} {{item.floor}}층</h4>
                <p>거래일시 : {{item.dealYear}}-{{item.dealMonth}}-{{item.dealDay}}</p>
                <p>건축년도 : {{item.buildYear}}</p>
                <p>거래금액 : {{item.dealAmount}}</p>
            </div>
        </template>
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
        }
    },
    methods: {

    },
    created() {
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
    beforeMount() {
    },
    components : {
        GoogleMap,
    }
}
</script>