<template>
  <div class="chart-container app-container nohead">
    <el-alert title="免责声明：Highcharts组件不属于JNPF产品，只用于介绍第三方组件如何在《JNPF快速开发平台》中使用。如果对这些组件感兴趣，请使用正版。"
      type="warning" :closable="false" class="mb-10" />
    <div style="float: right;padding-right: 10px; margin-top:20px;">
      <el-button type="primary" icon="icon-ym icon-ym-extend-bar-chart" @click="change('plain')">柱状
      </el-button>
      <el-button type="warning" icon="icon-ym icon-ym-extend-mail-forward"
        @click="change('inverted')">条形</el-button>
    </div>
    <highcharts :options="chartOptions" :callback="myCallback"
      style="height:530px;margin-top:30px;"></highcharts>
  </div>
</template>

<script>

import { Chart } from "highcharts-vue";
export default {
  name: 'extend-graphDemo-highchartsColumn',
  components: {
    highcharts: Chart
  },
  data() {
    return {
      chartOptions: {
        chart: {
          type: 'column'
        },
        title: {
          text: '月平均降雨量'
        },
        subtitle: {
          text: '网络数据'
        },
        xAxis: {
          categories: [
            '一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'
          ],
          crosshair: true
        },
        yAxis: {
          min: 0,
          title: {
            text: '降雨量 (mm)'
          }
        },
        tooltip: {
          // head + 每个 point + footer 拼接成完整的 table
          headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
          pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
          footerFormat: '</table>',
          shared: true,
          useHTML: true
        },
        plotOptions: {
          column: {
            borderWidth: 0
          }
        },
        credits: {
          enabled: false
        },
        series: [{
          name: '东京',
          data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
        }, {
          name: '纽约',
          data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3]
        }, {
          name: '伦敦',
          data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3, 51.2]
        }, {
          name: '柏林',
          data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6, 39.1, 46.8, 51.1]
        }]
      }

    }
  },
  mounted() { },

  methods: {
    myCallback() {
      console.log("this is callback function");
    },
    change(key) {
      switch (key) {
        case 'plain':
          this.chartOptions.chart = {
            inverted: false,
          }
          this.chartOptions.subtitle = {
            text: '柱状'
          }
          break;
        case 'inverted':
          this.chartOptions.chart = {
            inverted: true,
          }
          this.chartOptions.subtitle = {
            text: '条形'
          }

          break;
      }
    }
  }
}
</script>
