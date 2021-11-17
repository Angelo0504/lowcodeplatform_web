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
import highchartsFunnel from 'highcharts/modules/funnel'
highchartsFunnel(Highcharts)
export default {
  name: 'extend-graphDemo-highchartsFunnel',
  components: {
    highcharts: Chart
  },
  data() {
    return {
      chartOptions: {
        chart: {
          type: 'funnel',
          marginRight: 100
        },
        title: {
          text: '销售漏斗',
          x: -50
        },
        plotOptions: {
          series: {
            dataLabels: {
              enabled: true,
              crop: false,
              overflow: 'none',
              format: '<b>{point.name}</b> ({point.y:,.0f})',
              color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black',
              softConnector: true
            },
            neckWidth: '30%',
            neckHeight: '25%'
            //-- Other available options
            // height: pixels or percent
            // width: pixels or percent
          }
        },
        legend: {
          enabled: false
        },
        credits: {
          enabled: false
        },
        series: [{
          name: '用户',
          data: [
            ['访问网站', 9654],
            ['下载产品', 4064],
            ['询价', 2987],
            ['商定', 1976],
            ['发送合同', 987],
            ['成交', 846]
          ]
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
