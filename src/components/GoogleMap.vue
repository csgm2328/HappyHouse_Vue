<template>
  <GmapMap :zoom="17" :center="center" style="height: 50vh">
    <GmapMarker v-for="(m, index) in markers" :key="index" :position="m.position"> </GmapMarker>
  </GmapMap>
</template>
<script>
import http from "@/util/http-common";
export default {
  data() {
    return {
      center: {},
      markers: [],
      dong: "",
      list: [],
    };
  },
  methods: {},
  created() {
    var dong = this.$route.params.dong;
    if (dong != null) {
      var url = `/houseInfo/${this.$route.params.dong}`;
      http
        .get(url)
        .then(({ data }) => {
          this.list = data;
          this.center = {
            lat: Number(data[0].lat),
            lng: Number(data[0].lng),
          };
          for (var i = 0; i < data.length; i++) {
            var obj = {
              position: {
                lat: Number(data[i].lat),
                lng: Number(data[i].lng),
              },
            };
            this.markers.push(obj);
          }
        })
        .catch(({ error }) => {
          console.log(error);
          alert("해당하는 거래내역이 없습니다.");
          location.href = "/";
        });
    } else {
      this.center = {
        lat: 37.5012743,
        lng: 127.039585,
      };
      this.markers = [
        {
          position: {
            lat: 37.5012743,
            lng: 127.039585,
          },
        },
      ];
    }
  },
};
</script>
<style></style>
