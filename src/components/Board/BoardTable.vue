<template>
  <section id="why-us" class="why-us">
    <div class="container">
      <div class="row">
        <template v-for="(item, index) in list">
          <div class="col-lg-4" :key="index">
            <div class="box">
              <span>{{item.no}}</span>
              <h4><a :href="`/board/${item.no}`">{{item.title}}</a></h4>
              <!-- <h4><router-link :to="`/board/${item.no}`">{{item.title}}</router-link></h4> -->
              <p>{{item.content}}</p>
            </div>
          </div>
        </template>
      </div>
    </div>
  </section>
</template>
<script>
import http from "@/util/http-common";
export default {
  data() {
    return {
      list: [],
    };
  },
  created() {
    console.log(this.$route.params.title);
    if(this.$route.params.title == null){
      http.get("/board").then(({ data }) => {
        this.list = data;
      });
    }
    else {
      http.get(`/board/searchBoard/${this.$route.params.title}`).then(({ data }) => {
        this.list = data;
      });
    }
  },
};
</script>
<style>
.box {
  width: 100%;
  height: 300px;
}
.box p {
  height: 130px;
  text-overflow: ellipsis;
  overflow: hidden;
}
.box h4 {
  text-overflow: ellipsis;
  overflow: hidden;
}
.box a {
  color: inherit;
}
</style>
