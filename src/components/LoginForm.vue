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
                    <h3>비밀번호를 잊어버리셨나요 ?</h3>
                    <a href="/user/searchpass">비밀번호 찾기</a>
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
                    <p>02-3429-5100<br /></p>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-lg-6 mt-4 mt-lg-0">
              <form role="form" class="php-email-form">
                <br />
                <div class="form-group mt-3">
                  <input
                    class="form-control"
                    name="id"
                    id="id"
                    placeholder="Your Id"
                    required
                    v-model="id"
                  />
                </div>
                <br />
                <div class="form-group mt-3">
                  <input
                    type="password"
                    class="form-control"
                    name="pass"
                    id="pass"
                    placeholder="Your Password"
                    required
                    v-model="pass"
                  />
                </div>
                <br />

                <div class="my-3">
                  <div class="loading">Loading</div>
                  <div class="error-message"></div>
                  <div class="sent-message">Your message has been sent. Thank you!</div>
                </div>
                <div class="text-center"><button @click="doLogin">로그인</button></div>
                <br />
                <br />
              </form>
            </div>
          </div>
        </div>
      </section>
    </section>
    <div style="margin-bottom: 270px"></div>
  </div>
</template>
<script>
import http from "@/util/http-common";
export default {
  data() {
    return {
      id: "",
      pass: "",
    };
  },
  methods: {
    checkValue() {
      // 사용자 입력값 체크하기
      // id, 비밀번호, 연락처, 이메일, 설명이 없을 경우 각 항목에 맞는 메세지를 출력
      let err = true;
      let msg = "";
      !this.id && ((msg = "id 입력해주세요"), (err = false));
      err && !this.pass && ((msg = "비밀번호 입력해주세요"), (err = false));

      if (!err) alert(msg);
      else this.doLogin();
    },
    doLogin() {
      // this.$store.dispatch("doLogin", { id: this.id, pass: this.pass });
      http
        .post("/login", {
          id: this.id,
          pass: this.pass,
        })
        .then(({ data }) => {
          console.dir(data);
          if (data == "") {
            console.log("로그인 실패");
            alert("아이디, 비밀번호를 확인해주세요");
          } else {
            // alert("데이터 옴");
            console.log("로그인 성공");
            this.$session.set("userInfo", data);
            window.location.href = "/";
            // this.$session.set("id", this.id);
          }
          // console.log(this.$session);
          // this.$context.commit("setLogin");
        })
        .catch((error) => {
          console.dir(error);
          alert("로그인중 오류가 발생했습니다.");
        });
      console.log(this.$session);
    },
  },
};
</script>
<style></style>
