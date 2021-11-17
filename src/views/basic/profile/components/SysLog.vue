<template>
  <div class="sysLog JNPF-flex-main">
    <el-row class="JNPF-common-search-box" :gutter="16">
      <el-form @submit.native.prevent>
        <el-col :span="6">
          <el-form-item label="关键词">
            <el-input v-model="keyword" placeholder="请输入关键词查询" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="时间">
            <el-date-picker v-model="pickerVal" type="daterange" start-placeholder="开始日期"
              end-placeholder="结束日期" :picker-options="pickerOptions" value-format="timestamp"
              :editable="false" clearable>
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="search()">
              {{$t('common.search')}}</el-button>
            <el-button icon="el-icon-refresh-right" @click="reset()">{{$t('common.reset')}}
            </el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
    <el-tabs v-model="activeName" @tab-click="handleTabClick" class="JNPF-el_tabs">
      <el-tab-pane label="登录日志" name="1">
        <JNPF-table v-loading="listLoading" :data="loginLogData" tooltip-effect="dark">
          <el-table-column prop="creatorTime" label="登录时间" :formatter="jnpf.tableDateFormat"
            width="120" />
          <el-table-column prop="userName" label="登录用户" width="120" />
          <el-table-column prop="ipaddress" label="登录IP" width="120" />
          <el-table-column prop="platForm" label="登录摘要" show-overflow-tooltip />
        </JNPF-table>
      </el-tab-pane>
      <el-tab-pane label="请求日志" name="5">
        <JNPF-table v-loading="listLoading" :data="requestLogData" tooltip-effect="dark">
          <el-table-column prop="creatorTime" label="请求时间" :formatter="jnpf.tableDateFormat"
            width="120" />
          <el-table-column prop="userName" label="请求用户" width="120" />
          <el-table-column prop="ipaddress" label="请求IP" width="120" />
          <el-table-column prop="platForm" label="请求设备" width="120" show-overflow-tooltip />
          <el-table-column prop="requestURL" label="请求地址" show-overflow-tooltip />
          <el-table-column prop="requestMethod" label="请求类型" width="120" />
          <el-table-column prop="requestDuration" label="请求耗时" width="120" />
        </JNPF-table>
      </el-tab-pane>
      <pagination :total="total" :page.sync="listQuery.currentPage" :limit.sync="listQuery.pageSize"
        @pagination="initData" />
    </el-tabs>
  </div>
</template>

<script>
import { LogList } from '@/api/permission/userSetting'

export default {
  name: 'sysLog',
  data() {
    return {
      keyword: '',
      startTime: '',
      endTime: '',
      activeName: '1',
      loginLogData: [],
      requestLogData: [],
      total: 0,
      listLoading: true,
      listQuery: {
        currentPage: 1,
        pageSize: 20,
        sort: 'desc'
      },
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      pickerVal: []
    };
  },
  created() {
    this.initData()
  },
  methods: {
    initData() {
      let category = this.activeName
      this.listLoading = true
      let data = {
        ...this.listQuery,
        keyword: this.keyword,
        startTime: this.startTime,
        endTime: this.endTime,
        category
      }
      LogList(data).then(res => {
        if (category == 1) this.loginLogData = res.data.list
        if (category == 5) this.requestLogData = res.data.list
        this.total = res.data.pagination.total
        this.listLoading = false
      })
    },
    handleTabClick(tab) {
      this.reset();
    },
    search() {
      if (this.pickerVal && this.pickerVal.length) {
        this.startTime = this.pickerVal[0]
        this.endTime = this.pickerVal[1]
      } else {
        this.startTime = ''
        this.endTime = ''
      }
      this.listQuery = {
        currentPage: 1,
        pageSize: 20,
        sort: 'desc'
      }
      this.initData()
    },
    reset() {
      this.list = []
      this.pickerVal = []
      this.startTime = ''
      this.endTime = ''
      this.listQuery = {
        currentPage: 1,
        pageSize: 20,
        sort: 'desc'
      }
      this.initData()
    }
  }
}
</script>
<style lang="scss" scoped>
.sysLog {
  height: 100%;
  overflow: hidden;
  >>> .el-tabs__nav-scroll {
    padding-top: 0 !important;
  }
  .JNPF-el_tabs {
    height: calc(100% - 60px);
    overflow: hidden;
  }
  >>> .el-tabs__content {
    overflow: auto;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    .el-tab-pane {
      height: auto !important;
      flex: 1;
    }
  }
  .JNPF-common-search-box {
    margin-bottom: 0;
  }
}
</style>