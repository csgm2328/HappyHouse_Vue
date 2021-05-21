<template lang="">
  <header id="header" class="fixed-top ">
    <div class="container d-flex align-items-center justify-content-between">

      <h1 class="logo"><a href="/">HappyHouse.</a></h1>

      <nav id="navbar" class="navbar">
        <ul>
          <li><a class="nav-link scrollto active" href="/user/create">회원가입</a></li>
          <li><a class="getstarted scrollto" href="/login">로그인</a></li>
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
      isLogin : false,
    }
  },
}
</script>
<style>

</style>