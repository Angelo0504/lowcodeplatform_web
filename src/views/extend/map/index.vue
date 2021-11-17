<template>
  <div class="app-container map-container">
    <div id="allmap" style="width: 100%;height: 100% ;"></div>
  </div>
</template>

<script>


export default {
  name: 'extend-map',
  data() {
    return {
      key: ''
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      var map = new BMap.Map("allmap");
      var point = new BMap.Point(116.331398, 39.897445);
      map.centerAndZoom(point, 12);
      map.enableScrollWheelZoom(true);
      var geolocation = new BMap.Geolocation();
      geolocation.getCurrentPosition(function (r) {
        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
          var mk = new BMap.Marker(r.point);
          map.addOverlay(mk);
          map.panTo(r.point);
        }
        else {
          alert('failed' + this.getStatus());
        }
      }, { enableHighAccuracy: true });
      //关于状态码
      //BMAP_STATUS_SUCCESS    检索成功。对应数值“0”。
      //BMAP_STATUS_CITY_LIST    城市列表。对应数值“1”。
      //BMAP_STATUS_UNKNOWN_LOCATION    位置结果未知。对应数值“2”。
      //BMAP_STATUS_UNKNOWN_ROUTE    导航结果未知。对应数值“3”。
      //BMAP_STATUS_INVALID_KEY    非法密钥。对应数值“4”。
      //BMAP_STATUS_INVALID_REQUEST    非法请求。对应数值“5”。
      //BMAP_STATUS_PERMISSION_DENIED    没有权限。对应数值“6”。(自 1.1 新增)
      //BMAP_STATUS_SERVICE_UNAVAILABLE    服务不可用。对应数值“7”。(自 1.1 新增)
      //BMAP_STATUS_TIMEOUT    超时。对应数值“8”。(自 1.1 新增)
    }
  }
}
</script>
<style lang="scss" scoped>
.map-container {
  padding: 0;
}
</style>
