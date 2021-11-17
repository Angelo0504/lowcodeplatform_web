<template>
  <div class="JNPF-common-layout">
    <div class="JNPF-common-layout-left">
      <div class="JNPF-common-title">
        <h2>字典分类</h2>
        <span class="options">
          <el-tooltip content="分类管理" placement="top" v-has="'btn_type'">
            <el-link icon="el-icon-menu" :underline="false" @click="handleTypeManage" />
          </el-tooltip>
        </span>
      </div>
      <el-scrollbar class="JNPF-common-el-tree-scrollbar">
        <el-tree ref="treeBox" v-loading="treeLoading"
          :element-loading-text="$t('common.loadingText')" :data="treeData" :props="defaultProps"
          default-expand-all highlight-current :expand-on-click-node="false" node-key="id"
          @node-click="handleNodeClick" class="JNPF-common-el-tree">
          <span class="custom-tree-node" slot-scope="{ node }">
            <i class="el-icon-notebook-2" />
            <span class="text">{{node.label}}</span>
          </span>
        </el-tree>
      </el-scrollbar>
    </div>
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
        <JNPF-table v-loading="listLoading" :data="tableData" row-key="id" default-expand-all
          :tree-props="{children: 'children', hasChildren: ''}">
          <el-table-column prop="fullName" label="名称" v-if="jnpf.hasP('fullName')" />
          <el-table-column prop="enCode" label="编码" v-if="jnpf.hasP('enCode')" />
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
    <Form v-if="formVisible" ref="Form" @refreshDataList="getDictionaryList" />
    <TypeList v-if="drawer" ref="TypeList" @refreshDataList="initData" />
  </div>
</template>

<script>
import {
  getDictionaryType,
  getDictionaryDataList,
  delDictionaryData,
  updateDictionaryState
} from '@/api/systemData/dictionary'
import Form from './Form'
import TypeList from './components/index'

export default {
  name: 'systemData-dictionary',
  components: {
    Form,
    TypeList
  },
  data() {
    return {
      defaultProps: {
        children: 'children',
        label: 'fullName'
      },
      params: {
        keyword: '',
        isTree: 0
      },
      typeId: '',
      drawer: false,
      formVisible: false,
      treeLoading: false,
      listLoading: false,
      treeData: [],
      tableData: []
    }
  },
  created() {
    this.initData()
  },
  methods: {
    search() {
      this.getDictionaryList()
    },
    reset() {
      this.params.keyword = ''
      this.getDictionaryList()
    },
    initData() {
      this.treeLoading = true
      getDictionaryType().then(res => {
        this.treeData = res.data.list
        this.$nextTick(() => {
          this.typeId = this.treeData[0].id
          this.params.isTree = this.treeData[0].isTree
          this.$refs.treeBox.setCurrentKey(this.typeId)
          this.treeLoading = false
          this.typeId && this.getDictionaryList()
        })
      }).catch(() => {
        this.treeLoading = false
      })
    },
    getDictionaryList() {
      this.listLoading = true
      getDictionaryDataList(this.typeId, this.params).then(res => {
        this.tableData = res.data.list
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
    },
    // 分类管理
    handleTypeManage() {
      this.drawer = true
      this.$nextTick(() => {
        this.$refs.TypeList.init()
      })
    },
    handleNodeClick(data) {
      if (this.typeId === data.id) return
      this.typeId = data.id
      this.params.isTree = data.isTree
      this.reset()
    },
    handleUpdateState(row) {
      if (!this.jnpf.hasBtnP('btn_edit')) return this.$message.warning(this.$t('common.noPerTip'))
      const txt = row.enabledMark ? '禁用' : '开启'
      this.$confirm(`您确定要${txt}当前数据吗, 是否继续?`, '提示', {
        type: 'warning'
      }).then(() => {
        updateDictionaryState(row.id).then(res => {
          this.$message({
            type: 'success',
            message: res.msg,
            duration: 1000,
            onClose: () => {
              this.$store.commit('base/SET_DICTIONARY_LIST', [])
              row.enabledMark = row.enabledMark ? 0 : 1
            }
          })
        })
      }).catch(() => { })
    },
    handleAddEdit(id) {
      this.formVisible = true
      this.$nextTick(() => {
        this.$refs.Form.init(id, this.typeId, this.params.isTree)
      })
    },
    handleDel(id) {
      this.$confirm(this.$t('common.delTip'), this.$t('common.tipTitle'), {
        type: 'warning'
      }).then(() => {
        delDictionaryData(id).then(res => {
          this.$message({
            type: 'success',
            message: res.msg,
            duration: 1500,
            onClose: () => {
              this.$store.commit('base/SET_DICTIONARY_LIST', [])
              this.getDictionaryList()
            }
          })
        })
      }).catch(() => { })
    }
  }
}
</script>