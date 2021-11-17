<template>
  <div class="JNPF-common-layout MessageRecord-container">
    <div class="JNPF-common-layout-center">
      <el-row class="JNPF-common-search-box" :gutter="16">
        <el-form @submit.native.prevent>
          <el-col :span="6">
            <el-form-item label="关键词">
              <el-input v-model="keyword" placeholder="请输入关键词查询" clearable />
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
        <el-tabs type="border-card" v-model="activeName" class="messageRecord-tab">
          <el-tab-pane label="全部" name="0"></el-tab-pane>
          <el-tab-pane label="通知" name="1"></el-tab-pane>
          <el-tab-pane label="私信" name="2"></el-tab-pane>
          <div class="box">
            <div class="JNPF-common-head">
              <div class="left-btn">
                <el-button type="danger" @click="handleDel" icon="el-icon-delete">删除</el-button>
              </div>
              <div class="JNPF-common-head-right">
                <el-tooltip effect="dark" :content="$t('common.refresh')" placement="top">
                  <el-link icon="icon-ym icon-ym-Refresh JNPF-common-head-icon" :underline="false"
                    @click="reset()" />
                </el-tooltip>
                <screenfull />
              </div>
            </div>
            <JNPF-table v-loading="listLoading" :data="list" hasC
              @selection-change="handleSelectionChange">
              <el-table-column prop="title" label="消息标题">
                <template slot-scope="scope">
                  <el-link @click="readInfo(scope.row)" style="font-size:12px">{{ scope.row.title }}
                  </el-link>
                </template>
              </el-table-column>
              <el-table-column prop="type" label="消息类型" width="120">
                <template slot-scope="scope">
                  <!-- {{ scope.row.type==1?'系统公告':scope.row.type==2?"系统消息":"私信信息"}} -->
                  {{ scope.row.type==1?'系统消息':"私信信息"}}
                </template>
              </el-table-column>
              <el-table-column prop="creatorUser" label="发送人员" width="120">
              </el-table-column>
              <el-table-column prop="lastModifyTime" label="发送时间" :formatter="jnpf.tableDateFormat"
                width="120" />
              <el-table-column prop="isRead" label="状态" width="100">
                <template slot-scope="scope">
                  <el-tag type="success" v-if="scope.row.isRead=='1'">已读</el-tag>
                  <el-tag type="info" v-else>未读</el-tag>
                </template>
              </el-table-column>
            </JNPF-table>
            <pagination :total="total" :page.sync="listQuery.currentPage"
              :limit.sync="listQuery.pageSize" @pagination="initData" />
          </div>
        </el-tabs>
      </div>
    </div>
    <Form v-if="formVisible" ref="Form" @refreshDataList="initData" />
  </div>
</template>

<script>
import { getMessageList, MessageDeleteRecord, ReadInfo } from '@/api/system/message'
import Form from './Form'
export default {
  name: 'messageRecord',
  components: { Form },
  data() {
    return {
      visible: false,
      formVisible: false,
      keyword: '',
      activeName: "0",
      list: [],
      multipleSelection: [],
      total: 0,
      listLoading: true,
      listQuery: {
        currentPage: 1,
        pageSize: 20,
        sort: 'desc',
      }
    }
  },
  watch: {
    activeName(val) {
      this.keyword = ''
      this.search()
    }
  },
  created() {
    this.initData()
  },
  methods: {
    search() {
      this.listQuery = {
        currentPage: 1,
        pageSize: 20,
        sort: 'desc',
      }
      this.initData()
    },
    reset() {
      this.keyword = ''
      this.search()
    },
    initData() {
      this.listLoading = true
      let type = this.activeName == '0' ? '' : this.activeName
      let data = {
        ...this.listQuery,
        keyword: this.keyword,
        type
      }
      this.list = []
      getMessageList(data).then(res => {
        this.list = res.data.list
        this.total = res.data.pagination.total
        this.listLoading = false
      })
    },
    handleDel() {
      if (!this.multipleSelection.length) {
        this.$message({ type: 'error', message: '请选择一条数据' });
        return
      }
      let data = {
        ids: this.multipleSelection.join(',')
      }
      this.$confirm('您确定要删除这些数据吗, 是否继续?', '提示', {
        type: 'warning'
      }).then(() => {
        MessageDeleteRecord(data).then(res => {
          this.$message({
            type: 'success',
            message: res.msg
          });
          this.initData();
        })
      }).catch(() => { });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val.map(item => item.id)
    },
    readInfo(item) {
      if (item.type == 1) {
        this.formVisible = true
        item.isRead = '1'
        this.$nextTick(() => {
          this.$refs.Form.init(item.id)
        })
      } else {
        ReadInfo(item.id).then(res => {
          item.isRead = '1'
          let body = res.data.bodyText ? JSON.parse(res.data.bodyText) : {}
          let url = 'flowLaunch'
          if (body.type == 2) url = 'flowTodo'
          if (body.type == 3) url = 'flowCirculate'
          this.$router.push(`/workFlow/${url}`)
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.MessageRecord-container {
  .JNPF-common-layout-main {
    padding: 0;
  }
  .messageRecord-tab {
    height: 100%;
    >>> .el-tabs__content {
      padding: 0;
      height: calc(100% - 40px);
      .box {
        flex: 1;
        height: 100%;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        padding-bottom: 10px;
      }
    }
  }
}
</style>