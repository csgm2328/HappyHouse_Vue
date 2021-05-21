<template lang="">
  <section id="hero" class="d-flex align-items-center">
    <div class="container">
      <div class="row">
        <div
          class="col-lg-6 pt-2 pt-lg-0 order-2 order-lg-1 d-flex flex-column justify-content-center"
        >
          <form>
            <div id="team" class="team section-bg">
              <div class="member">
                <div class="member-info">
                  <form role="form" class="user-register-form">
                    <div align="left" class="form-group mt-3">
                      <a>✔ ID</a>
                      <input
                        class="form-control"
                        name="id"
                        id="id"
                        placeholder="Your Id"
                        required
                        v-model="id"
                      />
                    </div>
                    <div align="left" class="form-group mt-3">
                      <a>✔ Password</a>
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
                    <div align="left" class="form-group mt-3">
                      <a>✔ Phone</a>
                      <input
                        type="text"
                        class="form-control"
                        name="phone"
                        id="phone"
                        placeholder="Your Phone"
                        required
                        v-model="phone"
                      />
                    </div>
                    <div align="left" class="form-group mt-3">
                      <a>✔ E-mail</a>
                      <input
                        type="text"
                        class="form-control"
                        name="mail"
                        id="mail"
                        placeholder="Your E-mail"
                        required
                        v-model="mail"
                      />
                    </div>
                    <div align="left" class="form-group mt-3">
                      <a>✔ Comment</a>
                      <textarea
                        rows="5"
                        cols="100"
                        class="form-control"
                        name="comment"
                        id="comment"
                        maxlength="99"
                        style="resize: none"
                        placeholder="하고 싶은 말을 적어주세요."
                        v-model="comment"
                      ></textarea>
                      <!-- <input type="text" class="form-control" name="comment" id="comment" placeholder="Your Comment" required> -->
                    </div>
                    <br />
                    <br />
                    <div class="my-3"></div>
                    <div class="mt-3">
                      <!-- type에 따라 보이는 버튼 -->
                      <button
                        class="btn-get-started scrollto"
                        v-if="type == 'create'"
                        @click="checkValue"
                      >
                        회원가입
                      </button>
                      <button type="reset" class="btn-get-quote" style="background-color: white">
                        다시쓰기
                      </button>
                      <button
                        class="btn-get-started scrollto"
                        v-if="type == 'update'"
                        @click="checkValue"
                      >
                        수정
                      </button>
                    </div>
                    <br />
                    <br />
                  </form>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div class="col-lg-6 order-1 order-lg-2 hero-img">
          <img src="@/resources/img/hero-img.png" class="img-fluid" alt="" />
        </div>
      </div>
    </div>
  </section>
  <!-- End Hero -->
</template>
<script>
import http from "@/util/http-common";

export default {
  name: "form",
  props: {
    type: { type: String },
  },
  data() {
    return {
      id: "",
      pass: "",
      mail: "",
      phone: "",
      comment: "",
    };
  },
  created() {
    if (this.type === "update") {
      http.get(`/${this.$route.params.id}`).then(({ data }) => {
        this.id = data.id;
        this.pass = data.pass;
        this.mail = data.mail;
        this.phone = data.phone;
        this.comment = data.comment;
      });
    }
  },
  methods: {
    // 입력값 체크하기 - 체크가 성공하면 registuser 호출
    checkValue() {
      // 사용자 입력값 체크하기
      // id, 비밀번호, 연락처, 이메일, 설명이 없을 경우 각 항목에 맞는 메세지를 출력
      let err = true;
      let msg = "";
      !this.id && ((msg = "ID를 입력해주세요"), (err = false));
      err && !this.pass && ((msg = "비밀번호를 입력해주세요"), (err = false));
      err && !this.phone && ((msg = "연락처를 입력해주세요"), (err = false));
      err && !this.mail && ((msg = "이메일을 입력해주세요"), (err = false));
      // err && !this.comment && ((msg = "할말 입력해주세요"), (err = false));

      if (!err) alert(msg);
      // 만약, 할말이 다 입력되어 있다면 registuser 호출
      else this.type == "create" ? this.registuser() : this.updateuser();
    },
    registuser() {
      http
        .post("/user/join", {
          id: this.id,
          pass: this.pass,
          phone: this.phone,
          mail: this.mail,
          comment: this.comment,
        })
        .then(({ data }) => {
          let msg = "등록 처리시 문제가 발생했습니다.";
          if (data === "SUCCESS") {
            msg = "등록이 완료되었습니다.";
          }
          alert(msg);
          // window.location.href = "/";
          this.$router.push({ path: "/" });
        });
    },
    updateuser() {
      http
        .put(`/${this.id}`, {
          id: this.id,
          pass: this.pass,
          phone: this.phone,
          mail: this.mail,
          comment: this.comment,
        })
        .then(({ data }) => {
          let msg = "수정 처리시 문제가 발생했습니다.";
          if (data === "SUCCESS") {
            msg = "수정이 완료되었습니다.";
          }
          alert(msg);
          window.location.href = "/";
        });
    },
  },
};
</script>

<style></style>
