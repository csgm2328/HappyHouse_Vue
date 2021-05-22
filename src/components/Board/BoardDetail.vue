<template lang="">
  <div>
    <div class="portfolio-details" style="padding: 30px">
      <div class="row gy-8">
        <div class="col-lg-12">
          <div class="portfolio-details portfolio-info">
            <h3>[{{ boardNum }}] {{ title }}</h3>
            <ul>
              <li><strong>작성자</strong>: {{ writer }}</li>
              <li><strong>등록일자</strong>: {{ regTime.substr(0, 10) }}</li>
              <li><strong>내용</strong>: {{ content }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div align="center">
      <button type="button" class="del" v-on:click="deleteBoard">삭제하기</button>
      <button type="button" class="custom" onclick="location.href='/board'">목록</button>
      <button type="button" class="upd" v-on:click="updateBoard">수정하기</button>
    </div>
  </div>
</template>
<script>
import http from "@/util/http-common";
export default {
  data() {
    return {
      boardNum: "",
      writer: "",
      regTime: "",
      title: "",
      content: "",
    };
  },
  methods: {
    deleteBoard() {
      http
        .delete(`/board/delete/${this.$route.params.no}`)
        .then(() => {
          alert("삭제에 성공했습니다.");
          location.href = "/board";
        })
        .catch(() => {
          alert("삭제에 실패했습니다.");
          location.href = "/board";
        });
    },
    updateBoard() {
      location.href=`/board/update/${this.$route.params.no}`;
    },
  },
  created() {
    http.get(`/board/${this.$route.params.no}`).then(({ data }) => {
      this.boardNum = data.no;
      this.writer = data.writer;
      this.regTime = data.regtime;
      this.title = data.title;
      this.content = data.content;
    });
  },
};
</script>
<style>
/* button{
	color:red;
} */
/* button.del[type="button"] {
  background: #5a5af3;
  border: 0;
  padding: 10px 24px;
  margin: 10px;
  color: #fff;
  transition: 0.4s;
  border-radius: 50px;
} */
</style>
