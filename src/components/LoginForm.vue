<template>
<div>
<section id="contact" class="contact section-bg">
<section class="d-flex align-items-center">
    <div class="container">
        <div class="row">

          <div class="col-lg-6">

            <div class="row">
              <div class="col-md-12">
                <div class="info-box">
                  <i class="bx bx-map"></i>
                  <h3>비밀번호를 잊어버리셨나요 ? </h3>
                  <a href="/user/join">비밀번호 찾기</a>
                </div>
              </div>
              <div class="col-md-6">
                <div class="info-box mt-4">
                  <i class="bx bx-envelope"></i>
                  <h3>문의 사항</h3>
                  <p>ssafy@ssafy.com</p>
                </div>
              </div>
              <div class="col-md-6">
                <div class="info-box mt-4">
                  <i class="bx bx-phone-call"></i>
                  <h3>전화 번호</h3>
                  <p>02-3429-5100<br>
                  </p>
                </div>
              </div>
            </div>

          </div>

          <div class="col-lg-6 mt-4 mt-lg-0">
            <form action="forms/contact.php" method="post" role="form" class="php-email-form">
              <br>
              <div class="form-group mt-3">
                <input class="form-control" name="id" id="id" placeholder="Your Id" required>
              </div>
              <br>
              <div class="form-group mt-3">
                <input type="password" class="form-control" name="pass" id="pass" placeholder="Your Password" required>
              </div>
              <br>

              <div class="my-3">
                <div class="loading">Loading</div>
                <div class="error-message"></div>
                <div class="sent-message">Your message has been sent. Thank you!</div>
              </div>
              <div class="text-center"><button type="submit">로그인</button></div>
              <br>
              <br>
            </form>
          </div>
        </div>
      </div>
</section>
</section>
<div style="margin-bottom : 270px"></div>
</div>
</template>
<script>
export default {
    data() {
        return {
            id: "",
            pass: "",
        };
    },
    methods: {
        doLogin() {
            this.$store.dispatch("doLogin", { id: this.id, pass: this.pass });
        },
        moveSearchPass() {
            this.$router.push({ name: "user-search-pass" });
        },
    },
};
</script>
<style></style>
