<template>
  <section id="pricing" class="pricing">
    <!-- ======= Breadcrumbs ======= -->
    <div class="container">
      <div class="row">
        <div class="col-lg-4 col-md-3 footer-newsletter wrapper">
          <div class="bottom">
            <button class="btn-buy" @click="confirmLogin">글 작성하기</button>
          </div>
        </div>
        <div class="col-lg-4 col-md-4 footer-newsletter"></div>
        <div class="col-lg-4 col-md-6 footer-newsletter" align="center">
          <form action="" method="post" v-on:submit.prevent>
            <input type="text" name="name" v-model="title"/><input type="submit" value="검색" @click="search"/>
          </form>
        </div>
      </div>
      <router-view />
    </div>
    <!-- <board-table/> -->
  </section>
</template>
<script>
// import BoardTable from '@/components/BoardTable.vue';
export default {
  components: {
    // BoardTable,
  },
  data() {
    return {
      title : '',
    }
  },
  methods: {
    confirmLogin() {
      if (this.$session.get("userInfo") == null) {
        alert("로그인이 필요한 기능입니다");
        location.href = "/login";
      } else {
        location.href = "/board/create";
      }
    },
    search() {
      // this.$router.push({name: 'board-search', params: {title: this.title}});
      location.href=`/board/search/${this.title}`;
    },
  },
};
</script>
<style>
.wrapper {
  position: relative;
}
.bottom {
  position: absolute;
  bottom: 0;
}
</style>
