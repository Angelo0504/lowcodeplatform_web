<template>
  <div class="monitor-container" v-loading="loading"
    :element-loading-text="$t('common.loadingText')">
    <el-row :gutter="10">
      <el-col :span="24">
        <el-card shadow="never">
          <div slot="header" class="header">
            <div class="title">
              服务器信息<span>系统：{{ data.system.os }}</span><span>IP：{{data.system.ip}}</span><span>项目已不间断运行：{{data.system.day}}</span>
            </div>
          </div>
          <div class="info">
            <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
              <h3>CPU使用率</h3>
              <el-tooltip placement="top">
                <div slot="content" class="tipContent">
                  <p>{{ data.cpu.name }}</p>
                  <p>{{ data.cpu.packageName }}</p>
                  <p>{{ data.cpu.core }}</p>
                  <p>{{ data.cpu.logic }}</p>
                </div>
                <div class="content">
                  <el-progress type="circle" :percentage="cpuPercentage" :color="customColors" />
                </div>
              </el-tooltip>
              <div class="footer">{{ data.cpu.coreNumber }} 核心</div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
              <h3>内存使用率</h3>
              <el-tooltip placement="top">
                <div slot="content" class="tipContent">
                  <p>总量：{{ data.memory.total }}</p>
                  <p>已使用：{{ data.memory.used }}</p>
                  <p>空闲：{{ data.memory.available }}</p>
                </div>
                <div class="content">
                  <el-progress type="circle" :percentage="memoryPercentage" :color="customColors" />
                </div>
              </el-tooltip>
              <div class="footer">{{ data.memory.used }} / {{ data.memory.total }}</div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
              <h3>磁盘使用率</h3>
              <el-tooltip placement="top">
                <div slot="content" class="tipContent">
                  <p>总量：{{ data.disk.total }}</p>
                  <p>空闲：{{ data.disk.available }}</p>
                </div>
                <div class="content">
                  <el-progress type="circle" :percentage="diskPercentage" :color="customColors" />
                </div>
              </el-tooltip>
              <div class="footer">{{ data.disk.used }} / {{ data.disk.total }}</div>
            </el-col>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" style="margin-top: 10px">
        <el-card shadow="never">
          <div slot="header" class="header">
            <div class="title">CPU</div>
          </div>
          <div>
            <lineChart :options="cpuInfo" />
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" style="margin-top: 10px">
        <el-card shadow="never">
          <div slot="header" class="header">
            <div class="title">内存</div>
          </div>
          <div>
            <lineChart :options="memoryInfo" />
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import lineChart from '@/components/Charts/Normal'
import { getSystemMonitor } from '@/api/system/monitor'
export default {
  name: 'system-monitor',
  components: { lineChart },
  data() {
    return {
      loading: true,
      monitor: null,
      data: {
        system: {
          os: '',
          day: '',
          ip: ''
        },
        cpu: {
          name: '',
          package: '',
          core: '',
          coreNumber: '',
          logic: '',
          used: '',
          idle: ''
        },
        memory: {
          total: '',
          available: '',
          used: '',
          usageRate: ''
        },
        disk: {
          total: '',
          available: '',
          used: '',
          usageRate: ''
        }
      },
      cpuPercentage: 0,
      memoryPercentage: 0,
      diskPercentage: 0,
      cpuInfo: {
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          top: '10%',
          left: '2%',
          right: '10%',
          bottom: '2%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          name: '时间',
          boundaryGap: false,
          axisLine: {
            symbol: ['none', 'arrow']
          },
          data: []
        },
        yAxis: {
          type: 'value',
          name: '使用率(%)',
          min: 0,
          max: 100,
          axisLine: {
            symbol: ['none', 'arrow']
          },
          interval: 20
        },
        series: [{
          data: [],
          type: 'line',
          areaStyle: {
            normal: {
              color: 'rgb(32, 160, 255)' // 改变区域颜色
            }
          },
          itemStyle: {
            normal: {
              color: '#6fbae1',
              lineStyle: {
                color: '#6fbae1' // 改变折线颜色
              }
            }
          }
        }]
      },
      memoryInfo: {
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          top: '10%',
          left: '2%',
          right: '10%',
          bottom: '2%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          name: '时间',
          axisLine: {
            symbol: ['none', 'arrow']
          },
          data: []
        },
        yAxis: {
          type: 'value',
          name: '使用率(%)',
          min: 0,
          max: 100,
          interval: 20,
          axisLine: {
            symbol: ['none', 'arrow']
          },
        },
        series: [{
          data: [],
          type: 'line',
          areaStyle: {
            normal: {
              color: 'rgb(32, 160, 255)' // 改变区域颜色
            }
          },
          itemStyle: {
            normal: {
              color: '#6fbae1',
              lineStyle: {
                color: '#6fbae1' // 改变折线颜色
              }
            }
          }
        }]
      }
    }
  },
  created() {
    this.initData()
    this.monitor = window.setInterval(() => {
      setTimeout(() => {
        this.initData()
      }, 2)
    }, 5000)
  },
  destroyed() {
    clearInterval(this.monitor)
  },
  methods: {
    initData() {
      getSystemMonitor().then(res => {
        this.data = res.data
        this.cpuPercentage = this.data.cpu.used == '0.00' ? 0 : Number(this.data.cpu.used)
        this.memoryPercentage = this.data.memory.usageRate == '0.00' ? 0 : Number(this.data.memory.usageRate)
        this.diskPercentage = this.data.disk.usageRate == '0.00' ? 0 : Number(this.data.disk.usageRate)
        if (this.cpuInfo.xAxis.data.length >= 8) {
          this.cpuInfo.xAxis.data.shift()
          this.memoryInfo.xAxis.data.shift()
          this.cpuInfo.series[0].data.shift()
          this.memoryInfo.series[0].data.shift()
        }
        this.cpuInfo.xAxis.data.push(this.jnpf.dateFormat(this.data.time, 'HH:mm:ss'))
        this.memoryInfo.xAxis.data.push(this.jnpf.dateFormat(this.data.time, 'HH:mm:ss'))
        this.cpuInfo.series[0].data.push(parseFloat(this.data.memory.used))
        this.memoryInfo.series[0].data.push(parseFloat(this.data.memory.usageRate))
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    customColors(percentage) {
      if (percentage < 70) {
        return '#5cb87a'
      } else if (percentage < 90) {
        return '#e6a23c'
      } else {
        return '#f56c6c'
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.monitor-container {
  background-color: #e6e9f0;
  >>> .el-card__header {
    padding: 10px 20px;
    .header {
      display: flex;
      justify-content: space-between;
      .title {
        display: inline-block;
        line-height: 32px;
        span {
          display: inline-block;
          font-size: 14px;
          padding: 0 8px;
        }
      }
    }
  }
  >>> .el-card__body {
    min-height: 260px;
  }
  .info {
    padding: 20px 0;
    text-align: center;
    overflow: hidden;
    h3 {
      font-size: 16px;
      font-weight: normal;
    }
    .content {
      padding: 5px 0;
    }
    .tipContent {
      p {
        padding: 3px;
      }
    }
  }
}
</style>
