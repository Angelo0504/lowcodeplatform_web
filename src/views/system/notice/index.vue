<template>
  <div class="JNPF-common-layout">
    <div class="JNPF-common-layout-center">
      <el-row class="JNPF-common-search-box" :gutter="16">
        <el-form @submit.native.prevent>
          <el-col :span="6">
            <el-form-item label="关键词">
              <el-input v-model="params.keyword" placeholder="请输入关键词查询" clearable />
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
          <topOpts @add="handleAddEdit()"></topOpts>
          <div class="JNPF-common-head-right">
            <el-tooltip effect="dark" :content="$t('common.refresh')" placement="top">
              <el-link icon="icon-ym icon-ym-Refresh JNPF-common-head-icon" :underline="false"
                @click="reset()" />
            </el-tooltip>
            <screenfull />
          </div>
        </div>
        <JNPF-table v-loading="listLoading" :data="list" max-height="100%">
          <el-table-column prop="title" label="标题" show-overflow-tooltip
            v-if="jnpf.hasP('title')" />
          <el-table-column prop="creatorUser" label="发布人员" width="120"
            v-if="jnpf.hasP('creatorUser')" />
          <el-table-column prop="lastModifyTime" label="发布时间" :formatter="jnpf.tableDateFormat"
            width="120" v-if="jnpf.hasP('lastModifyTime')" />
          <el-table-column label="状态" width="100" v-if="jnpf.hasP('enabledMark')">
            <template slot-scope="scope">
              <el-tag :type="scope.row.enabledMark == 1 ? 'success' : 'danger'" disable-transitions>
                {{ scope.row.enabledMark==1?'已发送':'存草稿' }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150">
            <template slot-scope="scope">
              <tableOpts @edit="handleAddEdit(scope.row.id)" @del="handleDel(scope.row.id)"
                :editDisabled="scope.row.enabledMark != 0">
                <el-dropdown v-if="scope.row.enabledMark == 0" v-has="'btn_more'">
                  <el-button type="text" size="mini">
                    {{$t('common.moreBtn')}}<i class="el-icon-arrow-down el-icon--right" />
                  </el-button>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="handleView(scope.row.id)" v-has="'btn_detail'">
                      详情</el-dropdown-item>
                    <el-dropdown-item @click.native="handlePublish(scope.row.id)"
                      v-has="'btn_release'">发布</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
                <el-button v-if="scope.row.enabledMark == 1" type="text" size="mini"
                  @click="handleView(scope.row.id)" v-has="'btn_detail'">详情</el-button>
              </tableOpts>
            </template>
          </el-table-column>
        </JNPF-table>
        <pagination :total="total" :page.sync="params.currentPage" :limit.sync="params.pageSize"
          @pagination="initData" />
      </div>
    </div>
    <Form v-show="formVisible" ref="Form" @close="formVisible=false" @refreshDataList="initData" />
    <ViewNotice v-if="viewVisible" ref="View" @refreshDataList="initData" />
  </div>
</template>

<script>
import { getNoticeList, delNotice, releaseNotice } from '@/api/system/message'
import Form from './Form'
import ViewNotice from './View'

export default {
  name: 'system-notice',
  components: { Form, ViewNotice },
  data() {
    return {
      list: [],
      total: 0,
      btnLoading: false,
      listLoading: true,
      params: {
        keyword: '',
        currentPage: 1,
        pageSize: 20
      },
      formVisible: false,
      viewVisible: false
    }
  },
  created() {
    this.initData()
  },
  methods: {
    initData() {
      this.listLoading = true
      getNoticeList(this.params).then(res => {
        this.list = res.data.list
        this.total = res.data.pagination.total
        this.listLoading = false
        this.btnLoading = false
      }).catch(() => {
        this.listLoading = false
        this.btnLoading = false
      })
    },
    handleAddEdit(id) {
      this.formVisible = true
      this.$nextTick(() => {
        this.$refs.Form.init(id)
      })
    },
    handleView(id) {
      this.viewVisible = true
      this.$nextTick(() => {
        this.$refs.View.init(id)
      })
    },
    handleDel(id) {
      this.$confirm(this.$t('common.delTip'), this.$t('common.tipTitle'), {
        type: 'warning'
      }).then(() => {
        delNotice(id).then(res => {
          this.$message({
            type: 'success',
            message: res.msg,
            duration: 1500,
            onClose: () => {
              this.initData()
            }
          })
        }).catch(() => { })
      })
    },
    handlePublish(id) {
      this.$confirm('您确定要发布当前公告, 是否继续?', '提示', {
        type: 'warning'
      }).then(() => {
        releaseNotice(id).then(res => {
          this.$message({
            type: 'success',
            message: res.msg,
            duration: 1500,
            onClose: () => {
              this.initData()
            }
          })
        })
      }).catch(() => { })
    },
    search() {
      this.params.currentPage = 1
      this.params.pageSize = 20
      this.params.sort = 'desc'
      this.initData()
    },
    reset() {
      this.params.keyword = ''
      this.search()
    }
  }
}
</script>