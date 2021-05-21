<template>
    <form action='happyHouse/houseInfoTest/' method="post">
        <select class="custom-select-sm">
            <option selected>서울특별시</option>
        </select>
        <select class="custom-select-sm" v-model="selectGugun">
            <option v-for="(item, idx) in gugun" :key="idx" :value=item>{{item}}</option>
        </select>
        <select class="custom-select-sm" v-model="selectDong">
            <option v-for="(item, idx) in dong" :key="idx" :value=item>{{item}}</option>
        </select>
        <div style="margin-top:10px">
            <input type="button" class="btn-primary btn-sm" value="검색하기"
                @click="$router.push({name: 'Service', params:{dong : selectDong}})">
            <input type="hidden" value="search_house" name="act">
            <input type="hidden" value="dong" name="cond">
        </div>
    </form>
</template>
<script>
import axios from 'axios';
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
    created() {
        axios
            .get('http://localhost:9999/dong')
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
        }
    }
}
</script>
<style>
    
</style>