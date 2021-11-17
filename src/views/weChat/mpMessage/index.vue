<template>
  <div class="JNPF-common-layout">
    <div class="JNPF-common-layout-center">
      <el-row class="JNPF-common-search-box" :gutter="16">
        <el-form @submit.native.prevent>
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
      <div class="JNPF-common-layout-main JNPF-flex-main">
        <div class="JNPF-common-head">
          <topOpts @add="addOrUpdateHandle()" addText="消息发送"></topOpts>
          <div class="JNPF-common-head-right">
            <el-tooltip effect="dark" :content="$t('common.refresh')" placement="top">
              <el-link icon="icon-ym icon-ym-Refresh JNPF-common-head-icon" :underline="false"
                @click="reset()" />
            </el-tooltip>
            <screenfull />
          </div>
        </div>
        <JNPF-table v-loading="listLoading" :data="list">
          <el-table-column label="消息类别" v-if="jnpf.hasP('msgType')">
            <template slot-scope="scope">{{ scope.row.msgType |typeFilter }}</template>
          </el-table-column>
          <el-table-column prop="sendUser" label="发送用户" sortable v-if="jnpf.hasP('sendUser')" />
          <el-table-column prop="sendDate" label="发送时间" sortable :formatter="jnpf.tableDateFormat"
            v-if="jnpf.hasP('sendDate')" />
          <el-table-column prop="enabledMark" label="状态" v-if="jnpf.hasP('enabledMark')">
            <template slot-scope="scope">
              <el-tag type="success" v-if="!scope.row.enabledMark">发送成功</el-tag>
              <el-tag type="danger" v-else>发送失败</el-tag>
            </template>
          </el-table-column>
        </JNPF-table>
        <pagination :total="total" :page.sync="listQuery.currentPage"
          :limit.sync="listQuery.pageSize" @pagination="initData" />
      </div>
    </div>
    <Form v-show="formVisible" ref="Form" @close="formVisible=false" @refresh="refresh" />
  </div>
</template>

<script>
import { MPMessageList } from '@/api/weChat/MPMessage'
import Form from './Form'

export default {
  name: 'weChat-mpMessage',
  components: { Form },
  data() {
    return {
      formVisible: false,
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
      pickerVal: [],
      keyword: '',
      startTime: '',
      endTime: '',
      total: 0,
      listLoading: true,
      listQuery: {
        currentPage: 1,
        pageSize: 20,
        sort: 'desc',
        sidx: ""
      },
      list: []
    }
  },
  filters: {
    typeFilter(value) {
      switch (value) {
        case 6:
          return "图文";
          break;
        case 5:
          return "文件";
          break;
        case 4:
          return "视频";
          break;
        case 3:
          return "语音";
          break;
        case 2:
          return "图片";
          break;
        case 1:
          return "文本";
          break;
        default:
          return "图文";
      }
    }
  },
  created() {
    this.initData()
  },
  methods: {
    initData() {
      this.listLoading = true
      let data = {
        ...this.listQuery,
        keyword: this.keyword,
        startTime: this.startTime,
        endTime: this.endTime
      }
      MPMessageList(data).then(res => {
        this.list = res.data.list
        this.total = res.data.pagination.total
        this.listLoading = false
      })
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
    addOrUpdateHandle() {
      this.formVisible = true
      this.$nextTick(() => {
        this.$refs.Form.init()
      })
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
    },
    refresh() {
      this.formVisible = false
      this.reset()
    }
  }
}
</script>