<template>
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
                  <h4 style="font-size: 22px">비밀번호 찾기</h4>
                  <form role="form" class="search-pass-form">
                    <div align="left" class="form-group mt-3">
                      <a>✔ ID</a>
                      <input
                        class="form-control"
                        name="id"
                        id="id"
                        placeholder="비밀번호를 찾고자하는 ID를 입력하세요"
                        required
                        v-model="id"
                      />
                    </div>
                    <div align="left" class="form-group mt-3">
                      <a>✔ Phone</a>
                      <input
                        type="text"
                        class="form-control"
                        name="phone"
                        id="phone"
                        placeholder="연락처도 함께 입력하세요"
                        required
                        v-model="phone"
                      />
                    </div>
                    <br />
                    <br />
                    <div class="my-3"></div>
                    <div class="mt-3">
                      <!-- type에 따라 보이는 버튼 -->
                      <button class="btn-get-started scrollto" @click="checkValue">
                        비밀번호 찾기
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
</template>
<script>
import http from "@/util/http-common";
export default {
  data() {
    return {
      id: "",
      phone: "",
    };
  },
  methods: {
    checkValue() {
      // 사용자 입력값 체크하기
      // id, 비밀번호, 연락처, 이메일, 설명이 없을 경우 각 항목에 맞는 메세지를 출력
      let err = true;
      let msg = "";
      !this.id && ((msg = "ID를 입력해주세요"), (err = false));
      err && !this.phone && ((msg = "연락처를 입력해주세요"), (err = false));

      if (!err) alert(msg);
      else this.searchPass();
    },
    searchPass() {
      http
        .post("/user/findPwd/", {
          id: this.id,
          phone: this.phone,
          pass: "",
          mail: "",
          comment: "",
        })
        .then(({ data }) => {
          console.log(data);
          alert("비밀번호는 " + data.pass + " 입니다");
        })
        .catch(() => {
          alert("패스워드 못찾음");
        });
    },
  },
};
</script>
