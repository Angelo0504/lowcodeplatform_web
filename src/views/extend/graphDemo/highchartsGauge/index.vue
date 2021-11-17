<template>
  <div class="chart-container app-container nohead">
    <el-alert title="免责声明：Highcharts组件不属于JNPF产品，只用于介绍第三方组件如何在《JNPF快速开发平台》中使用。如果对这些组件感兴趣，请使用正版。"
      type="warning" :closable="false" class="mb-10" />
    <highcharts :options="chartOptions" :callback="myCallback" style="height:530px;margin-top:30px;"
      ref="highcharts"></highcharts>
  </div>
</template>

<script>

import { Chart } from "highcharts-vue";
import Highcharts from 'highcharts'
import HighchartsMore from 'highcharts/highcharts-more';
HighchartsMore(Highcharts)

export default {
  name: 'extend-graphDemo-highchartsGauge',
  components: {
    highcharts: Chart
  },
  data() {
    return {
      timer: null,
      chartOptions: {
        chart: {
          type: 'gauge',
          alignTicks: false,
          plotBackgroundColor: null,
          plotBackgroundImage: null,
          plotBorderWidth: 0,
          plotShadow: false
        },
        title: {
          text: '双刻度仪表图'
        },
        pane: {
          startAngle: -150,
          endAngle: 150
        },
        credits: {
          enabled: false
        },
        yAxis: [{
          min: 0,
          max: 200,
          lineColor: '#339',
          tickColor: '#339',
          minorTickColor: '#339',
          offset: -25,
          lineWidth: 2,
          labels: {
            distance: -20,
            rotation: 'auto'
          },
          tickLength: 5,
          minorTickLength: 5,
          endOnTick: false
        }, {
          min: 0,
          max: 124,
          tickPosition: 'outside',
          lineColor: '#933',
          lineWidth: 2,
          minorTickPosition: 'outside',
          tickColor: '#933',
          minorTickColor: '#933',
          tickLength: 5,
          minorTickLength: 5,
          labels: {
            distance: 12,
            rotation: 'auto'
          },
          offset: -20,
          endOnTick: false
        }],
        series: [{
          name: '速度',
          data: [80],
          dataLabels: {
            formatter: function () {
              var kmh = this.y,
                mph = Math.round(kmh * 0.621);
              return '<span style="color:#339">' + kmh + ' km/h</span><br/>' +
                '<span style="color:#933">' + mph + ' mph</span>';
            },
            backgroundColor: {
              linearGradient: {
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 1
              },
              stops: [
                [0, '#DDD'],
                [1, '#FFF']
              ]
            }
          },
          tooltip: {
            valueSuffix: ' km/h'
          }
        }]
      }
    }
  },
  mounted() { },
  beforeDestroy() {
    if (!this.timer) {
      return
    }
    clearInterval(this.timer)
    this.timer = null
  },

  methods: {
    myCallback() {
      this.timer = setInterval(() => {
        let inc = Math.floor(Math.random() * 200) + 1
        let list = []
        list.push(inc)
        this.chartOptions.series[0].data = list
      }, 3000);
    }
  }
}
</script>
