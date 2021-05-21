<template>
  <section id="why-us" class="why-us">
    <div class="container">
      <div class="row">
        <div class="col-lg-4">
          <div class="box">
            <span>01</span>
            <h4><a href="/board/1">공지제목 1</a></h4>
            <p>공지사항 1</p>
          </div>
        </div>

        <div class="col-lg-4 mt-4 mt-lg-0">
          <div class="box">
            <span>02</span>
            <h4><a href="/board/2">공지제목 2</a></h4>
            <p>공지사항 2</p>
          </div>
        </div>

        <div class="col-lg-4 mt-4 mt-lg-0">
          <div class="box">
            <span>03</span>
            <h4><a href="/board/3">공지제목 3</a></h4>
            <p>공지사항 3</p>
          </div>
        </div>

        <div class="col-lg-4 mt-4 mt-lg-0">
          <div class="box">
            <span>04</span>
            <h4><a href="/board/4">공지제목 4</a></h4>
            <p>공지사항 4</p>
          </div>
        </div>

        <div class="col-lg-4 mt-4 mt-lg-0">
          <div class="box">
            <span>05</span>
            <h4><a href="/board/5">공지제목 5</a></h4>
            <p>공지사항 5</p>
          </div>
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
      list: [],
    };
  },
  created() {
    http.get("/board").then(({ data }) => {
      this.list = data;
    });
  },
};
</script>
<style>
.box {
  width: 100%;
  height: 300px;
}
.box p {
  height: 130px;
  text-overflow: ellipsis;
  overflow: hidden;
}
.box h4 {
  text-overflow: ellipsis;
  overflow: hidden;
}
.box a {
  color: inherit;
}
</style>
