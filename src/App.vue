<template>
  <div id="app">
    <nav-header />
    <router-view />
    <nav-footer />
  </div>
</template>
<script>
import NavHeader from "./layout/Header.vue"
import NavFooter from "./layout/Footer.vue"

export default {
  name: 'App',
  components: {
    NavHeader,
    NavFooter,
  },
};
</script>
<style>
  @import url("./resources/vendor/bootstrap/css/bootstrap.min.css");
  @import url("./resources/vendor/bootstrap-icons/bootstrap-icons.css");
  @import url("./resources/vendor/boxicons/css/boxicons.min.css");
  @import url("./resources/vendor/glightbox/css/glightbox.min.css");
  @import url("./resources/vendor/remixicon/remixicon.css");
  @import url("./resources/vendor/swiper/swiper-bundle.min.css");

  @import url("./resources/css/style.css");

  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR&display=swap');
</style>
