<template lang="">
  <!-- Page Content -->
  <div class="container" id="Middle">

    <h1 class="my-4">더 많은 기능 알아보기</h1>

    <!-- Marketing Icons Section -->
    <div class="row">
      <div class="col-lg-4 mb-4">
        <div class="card h-100">
          <h4 class="card-header">사용자 아이디 조회 제공</h4>
          <div class="card-body">
            <p class="card-text">검색을 원하는 아이디를 입력하면 사용자 목록을 제공합니다.</p>
          </div>
          <div class="card-footer">
            <a href="${root}/list" class="btn btn-primary">바로가기</a>
          </div>
        </div>
      </div>
      <div class="col-lg-4 mb-4">
        <div class="card h-100">
          <h4 class="card-header">공지 사항</h4>
          <div class="card-body">
            <p class="card-text">공지사항을 제공합니다.</p>
          </div>
          <div class="card-footer">
				      <button type="button" onclick="location.href='/board'" class="btn btn-primary">바로가기</button>
          </div>
        </div>
      </div>
      <div class="col-lg-4 mb-4">
        <div class="card h-100">
          <h4 class="card-header">주변 동네 업종 검색</h4>
          <div class="card-body">
            <p class="card-text">관련 동네 업종 정보를 지도를 통해 제공합니다.</p>
          </div>
          <div class="card-footer">
            <a href="#" class="btn btn-primary">바로가기</a>
          </div>
        </div>
      </div>
    </div>
    <!-- /.row -->

    <!-- Features Section -->
    <div class="row">
      <div class="col-lg-6" style="height: 500px;">
        <h2>서울특별시에서 찾아보기</h2>
        <p>원하는 지역구 법정동으로 아파트 거래 현황을 찾아볼 수 있습니다.</p>
        <p>핀을 클릭하면 지도를 확대합니다. </p>
        <h2>아래에서 주소를 선택하시면 거래 현황 페이지로 이동합니다.</h2>
        <div class="col-lg-12" id="address">
          <select-dong />
        </div>
      </div>
      <div class="col-lg-6" id="map">
        <google-map />
      </div>
    </div>
    <!-- /.row -->
    <hr>
  </div>
  <!-- /.container -->
</template>
<script>
import GoogleMap from '@/components/GoogleMap.vue';
import SelectDong from '@/components/SelectDong.vue';
export default {
    name : "Middle",
    data() {
      return {
        dong : ''
      }
    },
    components : {
      GoogleMap,
      SelectDong
    }
}
</script>