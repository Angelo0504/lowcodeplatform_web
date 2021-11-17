<template>
  <div :class="className" :style="{height: height,width: width}" ref="echarts"/>
</template>

<script>
  import echarts from 'echarts'
  require('echarts/theme/macarons') // echarts theme
  import resize from './mixins/resize'

  export default {
    name: 'chart',
    mixins: [resize],
    props: {
      className: {
        type: String,
        default: 'chart'
      },
      width: {
        type: String,
        default: '100%'
      },
      height: {
        type: String,
        default: '350px'
      },
      autoResize: {
        type: Boolean,
        default: true
      },
      options: {
        type: Object,
        default: {},
        required: true
      }
    },
    data() {
      return {
        chart: null
      }
    },
    watch: {
      options: {
        deep: true,
        handler(options) {
          if (!this.chart && options) {
            this.initChart()
          } else {
            this.chart.setOption(this.options, true)
          }
        }
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.initChart()
      })
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
        this.chart = echarts.init(this.$refs.echarts, 'macarons')
        this.chart.setOption(this.options)
      }
    }
  }
</script>
