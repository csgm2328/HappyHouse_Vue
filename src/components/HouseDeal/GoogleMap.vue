<template>
  <GmapMap :zoom="zoom" :center="center" style="height: 50vh">
    <GmapMarker v-for="(m, index) in markers" :key="index" :position="m.position"> </GmapMarker>
  </GmapMap>
</template>
<script>
export default {
  props : {
    zoom : {
      type : Number,
      default: ()=> {
        	return 14;
      }
    },
    markers : {
      type:Array,
      default: ()=> [
        {
          position:{
            lat: 37.5012743,
            lng: 127.039585
          }
        }
      ]
    },
    center : {
      type:Object,
      default: ()=> {
        	return{
            lat: 37.5012743,
            lng: 127.039585,
        	}
      }
    }
  },
};
</script>
<style></style>
