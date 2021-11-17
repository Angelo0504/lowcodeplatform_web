<template>
  <div class="chart-container app-container nohead">
    <div id="chart" style="height:530px;margin-top:30px;"></div>
  </div>
</template>

<script>

import echarts from 'echarts'
import resize from '../mixins/resize'
export default {
  name: 'extend-graphDemo-echartsBarAcross',
  mixins: [resize],
  data() {
    return {
      chart: null,
      option: {
        title: {
          text: '世界人口总量',
          subtext: '网络数据'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['2017年', '2018年']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01]
        },
        yAxis: {
          type: 'category',
          data: ['巴西', '印尼', '美国', '印度', '中国', '世界人口(人)']
        },
        series: [
          {
            name: '2017年',
            type: 'bar',
            data: [205290000, 257740000, 322760000, 1304200000, 1405372834, 7500000000]
          },
          {
            name: '2018年',
            type: 'bar',
            data: [210867954, 266794980, 326766748, 1354051854, 1394102196, 7577908055]
          }
        ]
      }
    }
  },
  mounted() {
    this.initChart()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(document.getElementById('chart'))
      this.chart.setOption(this.option)
    }
  }
}
</script>
