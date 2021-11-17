<template>
  <div class="chart-container app-container nohead">
    <el-alert title="免责声明：Highcharts组件不属于JNPF产品，只用于介绍第三方组件如何在《JNPF快速开发平台》中使用。如果对这些组件感兴趣，请使用正版。"
      type="warning" :closable="false" class="mb-10" />
    <highcharts :options="chartOptions" :callback="myCallback"
      style="height:530px;margin-top:30px;"></highcharts>
  </div>
</template>

<script>

import { Chart } from "highcharts-vue";
import Highcharts from 'highcharts';
import highchartsHistogramBellcurve from 'highcharts/modules/histogram-bellcurve'
highchartsHistogramBellcurve(Highcharts)
export default {
  name: 'extend-graphDemo-highchartsBellcurve',
  components: {
    highcharts: Chart
  },
  data() {
    return {
      chartOptions: {
        title: {
          text: '贝尔曲线'
        },
        xAxis: [{
          title: { text: '数据源' }
        }, {
          title: { text: '贝尔曲线' },
          opposite: true
        }],
        yAxis: [{
          title: { text: '数据源' }
        }, {
          title: { text: '贝尔曲线' },
          opposite: true
        }],
        credits: {
          enabled: false
        },
        series: [{
          name: '贝尔曲线',
          type: 'bellcurve',
          xAxis: 1,
          yAxis: 1,
          baseSeries: 1,
          zIndex: -1
        }, {
          name: '数据源',
          type: 'scatter',
          data: [3.5, 3, 3.2, 3.1, 3.6, 3.9, 3.4, 3.4, 2.9, 3.1, 3.7, 3.4, 3, 3, 4,
            4.4, 3.9, 3.5, 3.8, 3.8, 3.4, 3.7, 3.6, 3.3, 3.4, 3, 3.4, 3.5, 3.4, 3.2,
            3.1, 3.4, 4.1, 4.2, 3.1, 3.2, 3.5, 3.6, 3, 3.4, 3.5, 2.3, 3.2, 3.5, 3.8, 3,
            3.8, 3.2, 3.7, 3.3, 3.2, 3.2, 3.1, 2.3, 2.8, 2.8, 3.3, 2.4, 2.9, 2.7, 2, 3,
            2.2, 2.9, 2.9, 3.1, 3, 2.7, 2.2, 2.5, 3.2, 2.8, 2.5, 2.8, 2.9, 3, 2.8, 3,
            2.9, 2.6, 2.4, 2.4, 2.7, 2.7, 3, 3.4, 3.1, 2.3, 3, 2.5, 2.6, 3, 2.6, 2.3,
            2.7, 3, 2.9, 2.9, 2.5, 2.8, 3.3, 2.7, 3, 2.9, 3, 3, 2.5, 2.9, 2.5, 3.6,
            3.2, 2.7, 3, 2.5, 2.8, 3.2, 3, 3.8, 2.6, 2.2, 3.2, 2.8, 2.8, 2.7, 3.3, 3.2,
            2.8, 3, 2.8, 3, 2.8, 3.8, 2.8, 2.8, 2.6, 3, 3.4, 3.1, 3, 3.1, 3.1, 3.1, 2.7,
            3.2, 3.3, 3, 2.5, 3, 3.4, 3],
          marker: {
            radius: 1.5
          }
        }]
      }

    }
  },
  mounted() { },

  methods: {
    myCallback() {
      console.log("this is callback function");
    }
  }
}
</script>
