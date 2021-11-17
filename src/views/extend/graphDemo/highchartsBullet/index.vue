<template>
  <div class="chart-container app-container nohead">
    <el-alert title="免责声明：Highcharts组件不属于JNPF产品，只用于介绍第三方组件如何在《JNPF快速开发平台》中使用。如果对这些组件感兴趣，请使用正版。"
      type="warning" :closable="false" class="mb-10" />
    <highcharts :options="chartOptions1" :callback="myCallback"
      style="height:115px;margin-top:30px;"></highcharts>
    <highcharts :options="chartOptions2" :callback="myCallback"
      style="height:85px;margin-top:30px;">
    </highcharts>
    <highcharts :options="chartOptions3" :callback="myCallback"
      style="height:85px;margin-top:30px;">
    </highcharts>
  </div>
</template>

<script>

import { Chart } from "highcharts-vue";
import Highcharts from 'highcharts';
import highchartsBullet from 'highcharts/modules/bullet'
highchartsBullet(Highcharts)
export default {
  name: 'extend-graphDemo-highchartsBullet',
  components: {
    highcharts: Chart
  },
  data() {
    return {
      chartOptions1: {

        title: {
          text: '2017 年公司运营情况'
        },
        xAxis: {
          categories: ['<span class="hc-cat-title">营收</span><br/> 千美元']
        },
        yAxis: {
          plotBands: [{
            from: 0,
            to: 150,
            color: '#666'
          }, {
            from: 150,
            to: 225,
            color: '#999'
          }, {
            from: 225,
            to: 9e9,
            color: '#bbb'
          }],
          title: null
        },
        series: [{
          data: [{
            y: 275,
            target: 250
          }]
        }],
        tooltip: {
          pointFormat: '<b>{point.y}</b> （目标值 {point.target}）'
        }
      },
      chartOptions2: {
        xAxis: {
          categories: ['<span class="hc-cat-title">利润率</span><br/>%']
        },
        yAxis: {
          plotBands: [{
            from: 0,
            to: 20,
            color: '#666'
          }, {
            from: 20,
            to: 25,
            color: '#999'
          }, {
            from: 25,
            to: 100,
            color: '#bbb'
          }],
          labels: {
            format: '{value}%'
          },
          title: null
        },
        series: [{
          data: [{
            y: 22,
            target: 27
          }]
        }],
        tooltip: {
          pointFormat: '<b>{point.y}</b> （目标值 {point.target}）'
        }
      },
      chartOptions3: {
        xAxis: {
          categories: ['<span class="hc-cat-title">新客户</span><br/>数量']
        },
        yAxis: {
          plotBands: [{
            from: 0,
            to: 1400,
            color: '#666'
          }, {
            from: 1400,
            to: 2000,
            color: '#999'
          }, {
            from: 2000,
            to: 9e9,
            color: '#bbb'
          }],
          labels: {
            format: '{value}'
          },
          title: null
        },
        series: [{
          data: [{
            y: 1650,
            target: 2100
          }]
        }],
        tooltip: {
          pointFormat: '<b>{point.y}</b> （目标值 {point.target}）'
        },
        credits: {
          enabled: false
        }
      },

    }
  },
  mounted() {
    let option = {
      chart: {
        inverted: true,
        marginLeft: 135,
        type: 'bullet'
      },
      title: {
        text: null
      },
      legend: {
        enabled: false
      },
      yAxis: {
        gridLineWidth: 0
      },
      plotOptions: {
        series: {
          pointPadding: 0.25,
          borderWidth: 0,
          color: '#000',
          targetOptions: {
            width: '200%'
          }
        }
      },
      credits: {
        enabled: false
      },
      exporting: {
        enabled: false
      }
    }
    // Highcharts.setOptions(option);
    this.chartOptions1 = Object.assign({}, option, this.chartOptions1)
    this.chartOptions2 = Object.assign({}, option, this.chartOptions2)
    this.chartOptions3 = Object.assign({}, option, this.chartOptions3)
  },

  methods: {
    myCallback() {
      // console.log("this is callback function");
    }
  }
}
</script>
