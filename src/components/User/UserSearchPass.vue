<template>
    <div class="regist">
        <h1 class="underline">내 정보</h1>
        <div class="regist_form">
            <label for="id">찾는 아이디</label>
            <div class="view">{{ user.id }}</div>
            <label for="pass">패스워드</label>
            <div class="view">{{ user.pass }} 입니다.</div>
            <button type="button" class="btn btn-light" @click="doLogin">로그인</button>
        </div>
    </div>
</template>
<script>
export default {
    methods: {
        doLogin() {
            this.$store.dispatch("doLogin", { id: this.id, pass: this.pass });
        },
    },
};
</script>
