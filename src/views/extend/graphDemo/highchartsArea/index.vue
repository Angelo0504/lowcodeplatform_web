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
export default {
  name: 'extend-graphDemo-highchartsArea',
  components: {
    highcharts: Chart
  },
  data() {
    return {
      chartOptions: {
        chart: {
          type: 'area'
        },
        title: {
          text: '包含负值的面积图'
        },
        xAxis: {
          categories: ['苹果', '橘子', '梨', '葡萄', '香蕉']
        },
        credits: {
          enabled: false
        },
        series: [{
          name: '小张',
          data: [5, 3, 4, 7, 2]
        }, {
          name: '小彭',
          data: [2, -2, -3, 2, 1]
        }, {
          name: '小潘',
          data: [3, 4, 4, -2, 5]
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
