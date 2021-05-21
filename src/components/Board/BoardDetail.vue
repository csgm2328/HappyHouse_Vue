<template lang="">
  <section id="pricing" class="pricing">
    <!-- ======= Breadcrumbs ======= -->
    <div class="container">
      <div class="row">
        <div class="col-lg-4 col-md-3 footer-newsletter wrapper">
          <div class="bottom">
            <button class="btn-buy" onclick="location.href='/board/create'">글 작성하기</button>
          </div>
        </div>
        <div class="col-lg-4 col-md-4 footer-newsletter"></div>
        <div class="col-lg-4 col-md-6 footer-newsletter" align="center">
          <form action="" method="post">
            <input type="text" name="name" /><input type="submit" value="검색" />
          </form>
        </div>
      </div>
    </div>
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
      <button type="button" class="upd" onclick="location.href='/board/update'">수정하기</button>
    </div>
  </section>
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
