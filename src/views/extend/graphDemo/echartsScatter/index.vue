<template>
  <div class="chart-container app-container nohead">
    <div id="chart" style="height:530px;margin-top:30px;"></div>
  </div>
</template>

<script>

import echarts from 'echarts'
import ecStat from 'echarts-stat'
import resize from '../mixins/resize'
export default {
  name: 'extend-graphDemo-echartsScatter',
  mixins: [resize],
  data() {
    return {
      chart: null,
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
      var data = [
        [20, 60],
        [5, 11],
        [4, 19],
        [20, 80],
        [45, 90],
        [22, 34],
        [56, 78],
        [34, 66],
        [45, 90],
        [60, 89],
        [65, 120],
        [43, 87],
        [34, 65],
        [34, 45],
        [53, 87],
        [21, 39],
        [32, 76],
        [12, 54],
        [28, 73],
        [38, 87],
        [23, 24],
        [34, 65],
        [45, 43],
        [78, 100],
        [68, 72],
        [38, 70],
        [43, 72],
        [60, 93],
        [28, 58],
        [28, 54],
        [65, 98],
        [45, 80],
        [12, 30],
        [60, 94],
        [43, 63],
        [68, 102],
        [44, 89],
        [20, 48.32],
        [12, 38.78],
        [45, 78.49],
        [46.34, 88.49],
        [36.34, 65.49],
        [23.34, 43.34],
        [54.34, 98.34],
        [68.34, 106.49],
        [56.32, 91.34],
        [5.34, 31.49],
        [43.34, 74.34],
        [43.34, 76.49],
        [60.34, 99.49],
        [32.34, 65.49],
        [23.34, 54.79],
        [17.34, 43.49],
        [19.34, 45.49],
        [56.34, 88.49],
        [26.34, 65.49],
        [27.34, 85.49],
        [64.34, 110.49],
        [22, 45]
      ];
      var myRegression = ecStat.regression('linear', data);
      myRegression.points.sort(function (a, b) {
        return a[0] - b[0];
      });
      var option = {
        title: {
          text: '汽车速度与刹车距离',
          left: 'center'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        xAxis: {
          type: 'value',
          name: '汽车速度',
          splitLine: {
            lineStyle: {
              type: 'dashed'
            }
          },
        },
        yAxis: {
          type: 'value',
          name: '刹车距离',
          min: 1.5,
          splitLine: {
            lineStyle: {
              type: 'dashed'
            }
          },
        },
        series: [{
          name: 'scatter',
          type: 'scatter',
          label: {
            emphasis: {
              show: true,
              position: 'left',
              textStyle: {
                color: 'blue',
                fontSize: 16
              }
            }
          },
          data: data
        }, {
          name: 'line',
          type: 'line',
          showSymbol: false,
          data: myRegression.points,
          markPoint: {
            itemStyle: {
              normal: {
                color: 'transparent'
              }
            },
            label: {
              normal: {
                show: true,
                position: 'left',
                formatter: myRegression.expression,
                textStyle: {
                  color: '#333',
                  fontSize: 14
                }
              }
            },
            data: [{
              coord: myRegression.points[myRegression.points.length - 1]
            }]
          }
        }]
      };
      this.chart.setOption(option)
    }
  }
}
</script>
