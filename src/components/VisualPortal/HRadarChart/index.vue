<template>
  <el-card shadow="never" class="portal-eChart-box">
    <div slot="header" class="portal-common-title">
      <span>{{title}}</span>
    </div>
    <div class="eChart-box-body">
      <div ref="chart" id="chart" v-show="!isEmpty"></div>
      <div class="portal-common-noData portal-common-noData-eChart" v-show="isEmpty">
        <img src="@/assets/images/portal-nodata.png" alt="" class="noData-img">
        <p class="noData-txt">暂无数据</p>
      </div>
    </div>
  </el-card>
</template>
<script>
import echarts from 'echarts'
import resize from '@/components/Charts/mixins/resize'
export default {
  mixins: [resize],
  props: {
    title: { type: String, default: '' },
    option: { type: Object, default: () => { } }
  },
  data() {
    return {
      chart: null,
      currOption: {},
      isEmpty: false
    }
  },
  mounted() {
    this.currOption = this.option
    this.initChart()
  },
  watch: {
    option: {
      handler(val) {
        this.currOption = val
        this.isEmpty = JSON.stringify(val) === "{}"
        if (!this.isEmpty) this.initChart()
      },
      deep: true
    }
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$refs.chart)
      this.chart.setOption(this.currOption)
      setTimeout(() => {
        this.$nextTick(() => {
          this.chart.resize();
        })
      }, 50);
    }
  },
  beforeDestroy() {
    if (!this.chart) return
    this.chart.dispose()
    this.chart = null
  }
}
</script>