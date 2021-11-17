<template>
  <div class="JNPF-common-layout">
    <div class="JNPF-common-layout-left">
      <div class="JNPF-common-title">
        <h2>{{$t('common.organization')}}</h2>
      </div>
      <el-tree ref="treeBox" v-loading="treeLoading"
        :element-loading-text="$t('common.loadingText')" :data="treeData" :props="defaultProps"
        default-expand-all highlight-current :expand-on-click-node="false" node-key="id"
        @node-click="handleNodeClick" class="JNPF-common-el-tree">
        <span class="custom-tree-node" slot-scope="{ data }">
          <i :class="data.icon" />
          <span class="text">{{data.fullName}}</span>
        </span>
      </el-tree>
    </div>
    <div class="JNPF-common-layout-center JNPF-flex-main">
      <el-row class="JNPF-common-search-box" :gutter="16">
        <el-form @submit.native.prevent>
          <el-col :span="6">
            <el-form-item :label="$t('common.keyWord')">
              <el-input v-model="params.keyword" :placeholder="$t('common.enterKeyword')"
                clearable />
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
        <JNPF-table v-loading="listLoading" :data="tableData" row-key="id" default-expand-all
          :tree-props="{children: 'children', hasChildren: ''}">
          <el-table-column prop="fullName" label="名称" v-if="jnpf.hasP('fullName')" />
          <el-table-column prop="enCode" label="编码" v-if="jnpf.hasP('enCode')" />
          <el-table-column prop="manager" label="部门主管" v-if="jnpf.hasP('manager')" />
          <el-table-column prop="description" label="备注" v-if="jnpf.hasP('description')" />
          <el-table-column prop="creatorTime" label="创建时间" :formatter="jnpf.tableDateFormat"
            width="120" v-if="jnpf.hasP('creatorTime')" />
          <el-table-column prop="sortCode" label="排序" width="70" align="center"
            v-if="jnpf.hasP('sortCode')" />
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
import { getOrganizeTree } from '@/api/permission/organize'
import {
  getDepartmentList,
  delDepartment
} from '@/api/permission/department'

import Form from './Form'

export default {
  name: 'permission-department',
  components: {
    Form
  },
  data() {
    return {
      treeData: [],
      tableData: [],
      treeLoading: true,
      btnLoading: false,
      listLoading: true,
      companyId: '',
      params: {
        keyword: ''
      },
      defaultProps: {
        children: 'children',
        label: 'fullName'
      },
      formVisible: false,
      typeListVisible: false,
      typeVisible: false
    }
  },
  created() {
    this.getOrganizeList()
  },
  methods: {
    getOrganizeList() {
      this.treeLoading = true
      getOrganizeTree().then(res => {
        this.treeData = res.data.list
        this.$nextTick(() => {
          if (!this.treeData.length) {
            this.treeLoading = false
            this.listLoading = false
            return
          }
          this.companyId = this.treeData[0].id
          this.$refs.treeBox.setCurrentKey(this.companyId)
          this.treeLoading = false
          this.initData()
        })
      }).catch(() => {
        this.treeLoading = false
      })
    },
    initData() {
      this.listLoading = true
      let query = { keyword: this.keyword }
      getDepartmentList(this.companyId, this.params).then(res => {
        this.tableData = res.data.list
        this.listLoading = false
        this.btnLoading = false
      }).catch(() => {
        this.listLoading = false
        this.btnLoading = false
      })
    },
    handleNodeClick(data) {
      if (this.companyId === data.id) return
      this.companyId = data.id
      this.reset()
    },
    handleAddEdit(id) {
      this.formVisible = true
      this.$nextTick(() => {
        this.$refs.Form.init(id, this.companyId)
      })
    },
    search() {
      this.initData()
    },
    reset() {
      this.params.keyword = ''
      this.initData()
    },
    handleDel(id) {
      this.$confirm(this.$t('common.delTip'), this.$t('common.tipTitle'), {
        type: 'warning'
      }).then(() => {
        delDepartment(id).then(res => {
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
