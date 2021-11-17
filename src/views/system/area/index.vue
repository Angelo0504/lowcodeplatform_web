<template>
  <div class="JNPF-common-layout">
    <div class="JNPF-common-layout-center">
      <!-- <el-row class="JNPF-common-search-box" :gutter="16">
        <el-form @submit.native.prevent>
          <el-col :span="6">
            <el-form-item label="关键词">
              <el-input v-model="params.keyword" placeholder="请输入关键词查询" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" @click="initData()">{{$t('common.search')}}</el-button>
              <el-button icon="el-icon-refresh-right" @click="reset()">{{$t('common.reset')}}</el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row> -->
      <div class="JNPF-common-layout-main JNPF-flex-main">
        <div class="JNPF-common-head">
          <topOpts @add="handleAddEdit()" :loading="btnLoading" />
          <div class="JNPF-common-head-right">
            <el-tooltip effect="dark" :content="$t('common.refresh')" placement="top">
              <el-link icon="icon-ym icon-ym-Refresh JNPF-common-head-icon" :underline="false"
                @click="reset()" />
            </el-tooltip>
            <screenfull />
          </div>
        </div>
        <JNPF-table v-loading="listLoading" :data="treeList" row-key="id" lazy v-if="refreshTable"
          :load="loadExpandData" :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
          <el-table-column prop="fullName" label="区域名称" v-if="jnpf.hasP('fullName')" />
          <el-table-column prop="enCode" label="区域编码" v-if="jnpf.hasP('enCode')" />
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
      </div>
    </div>
    <Form v-if="formVisible" ref="Form" @refreshDataList="initData" />
  </div>
</template>

<script>
import {
  getProvinceList,
  updateProvinceState,
  delProvince
} from '@/api/system/province'
import Form from './Form'

export default {
  name: 'system-area',
  components: { Form },
  data() {
    return {
      treeList: [],
      btnLoading: false,
      listLoading: true,
      params: {
        keyword: ''
      },
      nodeId: -1,
      refreshTable: true,
      formVisible: false
    }
  },
  created() {
    this.initData()
  },
  methods: {
    reset() {
      this.params.keyword = ''
      this.initData()
    },
    initData() {
      this.listLoading = true
      this.treeList = []
      getProvinceList(this.nodeId, this.params).then(res => {
        this.refreshTable = false
        this.treeList = res.data.list
        this.listLoading = false
        this.btnLoading = false
        this.$nextTick(() => {
          this.refreshTable = true
        })
      }).catch(() => {
        this.listLoading = false
        this.btnLoading = false
        this.refreshTable = true
      })
    },
    loadExpandData(tree, treeNode, resolve) {
      getProvinceList(tree.id).then(res => {
        resolve(res.data.list)
      })
    },
    handleAddEdit(id) {
      this.formVisible = true
      this.$nextTick(() => {
        this.$refs.Form.init(id)
      })
    },
    handleUpdateState(row) {
      if (!this.jnpf.hasBtnP('btn_edit')) return this.$message.warning(this.$t('common.noPerTip'))
      const txt = row.enabledMark ? '禁用' : '开启'
      this.$confirm(`您确定要${txt}当前区域吗, 是否继续?`, '提示', {
        type: 'warning'
      }).then(() => {
        updateProvinceState(row.id).then(res => {
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
    handleDel(id) {
      this.$confirm(this.$t('common.delTip'), this.$t('common.tipTitle'), {
        type: 'warning'
      }).then(() => {
        delProvince(id).then(res => {
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
    }
  }
}
</script>
