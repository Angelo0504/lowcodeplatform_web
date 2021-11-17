<template>
  <div class="chart-container app-container nohead">
    <div id="chart" style="height:530px;margin-top:30px;"></div>
  </div>
</template>

<script>

import echarts from 'echarts'
import resize from '../mixins/resize'
export default {
  name: 'extend-graphDemo-echartsFunnel',
  mixins: [resize],
  data() {
    return {
      chart: null,
      option: {
        title: {
          text: '漏斗图',
          subtext: '签约演示图'
        },
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c}%"
        },
        legend: {
          data: ['初次接触', '兴趣激发', '会见决策者', '确定需求', '产品演示', '提交建议书', '口头同意', '商定合同', '签约']
        },
        series: [
          {
            name: '预期',
            type: 'funnel',
            left: '10%',
            width: '80%',
            label: {
              normal: {
                formatter: '{b}-预期'
              },
              emphasis: {
                position: 'inside',
                formatter: '{b}预期: {c}%'
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            itemStyle: {
              normal: {
                opacity: 0.7
              }
            },
            data: [
              { value: 100, name: '初次接触' },
              { value: 85, name: '兴趣激发' },
              { value: 76, name: '会见决策者' },
              { value: 65, name: '确定需求' },
              { value: 54, name: '产品演示' },
              { value: 48, name: '提交建议书' },
              { value: 38, name: '口头同意' },
              { value: 27, name: '商定合同' },
              { value: 10, name: '签约' }
            ]
          },
          {
            name: '实际',
            type: 'funnel',
            left: '10%',
            width: '80%',
            maxSize: '80%',
            label: {
              normal: {
                position: 'inside',
                formatter: '{c}%',
                textStyle: {
                  color: '#fff'
                }
              },
              emphasis: {
                position: 'inside',
                formatter: '{b}-实际: {c}%'
              }
            },
            itemStyle: {
              normal: {
                opacity: 0.5,
                borderColor: '#fff',
                borderWidth: 2
              }
            },
            data: [
              { value: 90, name: '初次接触' },
              { value: 79, name: '兴趣激发' },
              { value: 69, name: '会见决策者' },
              { value: 57, name: '确定需求' },
              { value: 48, name: '产品演示' },
              { value: 39, name: '提交建议书' },
              { value: 30, name: '口头同意' },
              { value: 21, name: '商定合同' },
              { value: 10, name: '签约' }
            ]
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
