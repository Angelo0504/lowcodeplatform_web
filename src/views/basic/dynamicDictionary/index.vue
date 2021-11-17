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
        <JNPF-table v-loading="listLoading" :data="tableData" row-key="id" default-expand-all
          :tree-props="{children: 'children', hasChildren: ''}">
          <el-table-column prop="fullName" label="名称" />
          <el-table-column prop="enCode" label="编码" />
          <el-table-column prop="sortCode" label="排序" width="70" align="center" />
          <el-table-column label="状态" width="70" align="center">
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
  </div>
</template>

<script>
import { getDictionaryDataList, delDictionaryData, updateDictionaryState } from '@/api/systemData/dictionary'
import Form from './Form'

export default {
  name: 'dynamicDictionary',
  components: { Form },
  data() {
    return {
      params: {
        keyword: '',
        isTree: 0
      },
      typeId: '',
      formVisible: false,
      treeLoading: false,
      listLoading: false,
      tableData: []
    }
  },
  created() {
    this.typeId = this.$route.meta.relationId
    this.params.isTree = this.$route.meta.isTree || 0
    if (!this.typeId) return
    this.getDictionaryList()
  },
  methods: {
    search() {
      this.getDictionaryList()
    },
    reset() {
      this.params.keyword = ''
      this.getDictionaryList()
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
    handleNodeClick(data) {
      this.listLoading = true
      this.typeId = data.id
      this.params.isTree = data.isTree
      this.getDictionaryList()
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