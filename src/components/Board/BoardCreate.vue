<template lang="">
  <section id="pricing" class="pricing">
    <!-- ======= Breadcrumbs ======= -->
    <div class="portfolio-details" style="padding: 30px">
      <div class="row gy-8">
        <div class="col-lg-0">
          <div class="portfolio-details portfolio-info" align="center">
            <br />
            <h2>제목을 입력하세요</h2>
            <br />
            <input v-model="title" class="customInput" /><br /><br />
            <hr />
            <br />
            <h2>내용을 입력하세요</h2>
            <br />
            <textarea class="customTextarea" v-model="content"></textarea>
          </div>
        </div>
      </div>
    </div>
    <div align="center">
      <button type="button" class="custom" onclick="location.href='/board'">목록으로</button>
      <button type="button" class="upd" v-on:click="createBoard">생성하기</button>
    </div>
  </section>
</template>
<script>
import http from "@/util/http-common";
export default {
  data() {
    return {
      title: "",
      writer: "test",
      content: "",
    };
  },
  methods: {
    createBoard() {
      http
        .post(`/board/write`, {
          title: this.title,
          writer: this.writer,
          content: this.content,
        })
        .then(() => {
          alert("글이 등록되었습니다.");
          location.href = "/board";
        });
    },
  },
};
</script>
<style>
textarea.customTextarea {
  box-shadow: none;
  border-radius: 5px;
  padding: 12px 15px;
  border-color: #5a5af3;
  width: 500px;
  height: 300px;
  border: 0;
  background: none;
  font-size: 16px;
  transition: 0.3s;
  box-shadow: 0px 2px 15px rgba(0, 0, 0, 0.2);
}

input.customInput {
  box-shadow: none;
  border-radius: 5px;
  padding: 12px 15px;
  border-color: #5a5af3;
  width: 500px;
  border: 0;
  background: none;
  font-size: 16px;
  transition: 0.3s;
  box-shadow: 0px 2px 15px rgba(0, 0, 0, 0.2);
}
</style>
