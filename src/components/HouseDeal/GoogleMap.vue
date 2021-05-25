<template>
  <GmapMap ref="mapRef" :zoom="zoom" :center="center" style="height: 50vh">
      <gmap-info-window :options="infoOptions" :position="infoWindowPos" :opened="infoWinOpen" @closeclick="infoWinOpen=false">
      </gmap-info-window>
    <GmapMarker v-for="(m, index) in markers" :key="index" :clickable="true" :position="m.position" @click="toggleInfoWindow(m,index)" :icon = "m.markerOption"> 
    </GmapMarker>
  </GmapMap>
</template>
<script>
const mapMarker = require('@/assets/apt.png');
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
            lng: 127.039585,
          },
          infotext:'',
          markerOption : {
              url: mapMarker,
              size: {width: 30, height: 40, f: 'px', b: 'px',},
              scaledSize: {width: 30, height: 45, f: 'px', b: 'px',},
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
    },
    // infoWindowPos: null,
    // infoWinOpen: false,
    // currentMidx: null,

    // infoOptions: {
    //   content: '',
    // },
  },
  data() {
    return {
      infoWindowPos: null,
      infoWinOpen: false,
      currentMidx: null,

      infoOptions: {
        content: '',
        pixelOffset: {
          width: 0,
          height: -35
        }
      },

    }
  },
  methods: {
      toggleInfoWindow: function(marker, idx) {
        this.infoWindowPos = marker.position;
        this.infoOptions.content = marker.infoText;
        this.$refs.mapRef.$mapPromise.then((map) => {
          map.panTo(marker.position);
          this.zoom = 16;
        })
        if (this.currentMidx == idx) {
          this.infoWinOpen = !this.infoWinOpen;
        }
        else {
          this.infoWinOpen = true;
          this.currentMidx = idx;
        }
      },
  }
};
</script>
<style></style>
