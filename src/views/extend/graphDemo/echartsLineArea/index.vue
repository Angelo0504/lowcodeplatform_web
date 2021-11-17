<template>
  <div class="chart-container app-container  nohead">
    <div id="chart" style="height:530px;margin-top:30px;"></div>
  </div>
</template>

<script>

import echarts from 'echarts'
import resize from '../mixins/resize'
export default {
  name: 'extend-graphDemo-echartsLineArea',
  mixins: [resize],
  data() {
    return {
      chart: null,
      option: {
        title: {
          text: '苏州片区快递单'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        legend: {
          data: ['顺丰', '京东', '中通', '圆通', '申通', '韵达']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
          }
        ],
        yAxis: [
          {

            type: 'value',
            name: '件',
          }
        ],
        series: [
          {
            name: '顺丰',
            type: 'line',
            stack: '总量',
            areaStyle: { normal: {} },
            data: [320, 332, 301, 98, 390, 330, 320]
          },
          {
            name: '京东',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: '中通',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: [120, 132, 101, 134, 90, 230, 210]
          },

          {
            name: '圆通',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: [150, 232, 111, 154, 190, 211, 211]
          },
          {
            name: '申通',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: '韵达',
            type: 'line',
            stack: '总量',
            label: {
              normal: {
                show: true,
                position: 'top'
              }
            },
            areaStyle: { normal: {} },
            data: [122, 99, 232, 112, 321, 232, 98]
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
