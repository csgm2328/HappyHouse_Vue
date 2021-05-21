<template>
  <div class="regist">
    <h1 class="underline">내 정보</h1>
    <div class="regist_form">
      <label for="id">내 아이디</label>
      <div class="view">{{ user.id }}</div>
      <label for="pass">패스워드</label>
      <div class="view">{{ user.pass }}</div>
      <label for="phone">연락처</label>
      <div class="view">{{ user.phone }}</div>
      <label for="mail">이메일</label>
      <div class="view">{{ user.mail }}원</div>
      <label for="comment">하고 싶은 말</label>
      <div class="view" v-html="enterToBr(user.comment)"></div>
      <div style="padding-top: 15px">
        <router-link :to="`/user/update/${user.id}`" class="btn">수정</router-link>
        <a href="#" class="btn" @click="deleteuser">탈퇴</a>
        <router-link to="/user" class="btn">목록</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import http from "@/util/http-common";

export default {
  name: "viewdetail",
  computed: {
    ...mapGetters(["user"]),
  },
  methods: {
    deleteuser() {
      if (confirm("정말로 탈퇴?")) {
        http.delete(`/${this.user.id}`).then(({ data }) => {
          let msg = "탈퇴 처리시 문제가 발생했습니다.";
          if (data === "success") {
            msg = "탈퇴가 완료되었습니다.";
          }
          alert(msg);
          this.$router.push("/");
        });
      }
    },
    numberWithCommas(x) {
      if (x) return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    enterToBr(str) {
      if (str) return str.replace(/(?:\r\n|\r|\n)/g, "<br />");
    },
  },
};
</script>

<style scoped>
.regist {
  padding: 10px;
}
.regist_form {
  text-align: left;
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
}
input,
textarea,
.view {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  color: #787878;
  font-size: medium;
}
</style>
