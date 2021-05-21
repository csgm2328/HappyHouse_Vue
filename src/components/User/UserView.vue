<template>
    <div>
        <view-detail />
    </div>
</template>

<script>
import ViewDetail from "@/components/User/include/ViewDetail.vue";

export default {
    name: "userview",
    components: {
        ViewDetail,
    },
    created() {
        this.$store.dispatch("getuser", `/${this.$route.query.id}`);
    },
};
</script>
