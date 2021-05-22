<template>
  <section id="pricing" class="pricing">
    <!-- ======= Breadcrumbs ======= -->
	<div class="container">
		<div class="row">
			<div class="col-lg-4 col-md-3 footer-newsletter wrapper">
				<div class="bottom">
					<button class="btn-buy" onclick="location.href='/board/create'">글 작성하기</button>
				</div>
			</div>
			<div class="col-lg-4 col-md-4 footer-newsletter">
			</div>
			<div class="col-lg-4 col-md-6 footer-newsletter"  align="center">
				<form action="" method="post">
					<input type="text" name="name"><input type="submit" value="검색">
				</form>
			</div>
		</div>
	<router-view/>
	</div>
    <!-- <board-table/> -->
  </section>
</template>
<script>
// import BoardTable from '@/components/BoardTable.vue';
export default {
    components : {
        // BoardTable,
    }
}
</script>
<style>
.wrapper{position:relative;}
.bottom{position:absolute; bottom:0;}
</style>