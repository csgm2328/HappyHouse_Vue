<template lang="">
  <header id="header" class="fixed-top">
    <div class="container d-flex align-items-center justify-content-between">
      <h1 class="logo"><a href="/">HappyHouse.</a></h1>

      <nav id="navbar" class="navbar">
        <ul v-if="userInfo == null">
          <li><a class="nav-link scrollto active" href="/user/create">회원가입</a></li>
          <li><a class="getstarted scrollto" href="/login">로그인</a></li>
        </ul>
        <ul v-else>
          <li>
            <router-link :to="`/user/view/${userInfo.id}`"
              >{{ userInfo.id }}님 환영합니다!</router-link
            >
          </li>

          <li><a class="getstarted scrollto" @click="logout">로그아웃</a></li>
        </ul>
        <i class="bi bi-list mobile-nav-toggle"></i>
      </nav>
    </div>
  </header>
</template>
<script>
export default {
  data() {
    return {
      isLogin: false,
      userInfo: this.$session.get("userInfo"),
    };
  },
  methods: {
    moveRegister() {
      this.$router.push({ name: "user-create" });
    },
    logout() {
      this.$session.set("userInfo", null);
      // this.$session.set("id", null);
      window.location.href = "/";
    },
  },
};
</script>
<style></style>
