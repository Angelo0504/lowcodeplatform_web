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
          <topOpts @add="handleAddEdit()" />
          <div class="JNPF-common-head-right">
            <el-tooltip effect="dark" :content="$t('common.refresh')" placement="top">
              <el-link icon="icon-ym icon-ym-Refresh JNPF-common-head-icon" :underline="false"
                @click="reset()" />
            </el-tooltip>
            <screenfull />
          </div>
        </div>
        <JNPF-table v-loading="listLoading" :data="list" max-height="100%">
          <el-table-column prop="fullName" label="地图名称" v-if="jnpf.hasP('fullName')" />
          <el-table-column prop="enCode" label="地图编码" v-if="jnpf.hasP('enCode')" />
          <el-table-column prop="creatorUser" label="创建人" width="120"
            v-if="jnpf.hasP('creatorUser')" />
          <el-table-column prop="creatorTime" label="创建时间" :formatter="jnpf.tableDateFormat"
            width="120" v-if="jnpf.hasP('creatorTime')" />
          <el-table-column prop="sortCode" label="排序" width="70" align="center"
            v-if="jnpf.hasP('sortCode')" />
          <el-table-column label="状态" width="70" align="center" v-if="jnpf.hasP('enabledMark')">
            <template slot-scope="scope">
              <el-switch v-model="scope.row.enabledMark" :active-value="1" :inactive-value="0"
                @click.native="handleUpdateState(scope.row)" disabled class="table-switch" />
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <tableOpts @edit="handleAddEdit(scope.row.id)" @del="handleDel(scope.row.id)" />
            </template>
          </el-table-column>
        </JNPF-table>
        <pagination :total="total" :page.sync="params.currentPage" :limit.sync="params.pageSize"
          @pagination="initData" />
      </div>
    </div>
    <Form v-show="formVisible" ref="Form" @close="colseForm" />
  </div>
</template>

<script>
import { getMapList, delMap, updateMapState } from '@/api/onlineDev/map'
import Form from './Form'

export default {
  name: 'systemData-map',
  components: {
    Form
  },
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
      formVisible: false
    }
  },
  created() {
    this.initData()
  },
  methods: {
    initData() {
      this.listLoading = true
      getMapList(this.params).then(res => {
        this.list = res.data.list
        this.total = res.data.pagination.total
        this.listLoading = false
        this.btnLoading = false
      }).catch(() => {
        this.listLoading = false
        this.btnLoading = false
      })
    },
    colseForm(isRefresh) {
      this.formVisible = false
      if (isRefresh) {
        this.reset()
      }
    },
    handleAddEdit(id) {
      this.formVisible = true
      this.$nextTick(() => {
        this.$refs.Form.init(id)
      })
    },
    handleDel(id) {
      this.$confirm(this.$t('common.delTip'), this.$t('common.tipTitle'), {
        type: 'warning'
      }).then(() => {
        delMap(id).then(res => {
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
    handleUpdateState(row) {
      if (!this.jnpf.hasBtnP('btn_edit')) return this.$message.warning(this.$t('common.noPerTip'))
      const txt = row.enabledMark ? '禁用' : '开启'
      this.$confirm(`您确定要${txt}当前地图吗, 是否继续?`, '提示', {
        type: 'warning'
      }).then(() => {
        updateMapState(row.id).then(res => {
          this.$message({
            type: 'success',
            message: res.msg,
            duration: 1000,
            onClose: () => {
              row.enabledMark = row.enabledMark ? 0 : 1
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
      this.initData()
    }
  }
}
</script>
