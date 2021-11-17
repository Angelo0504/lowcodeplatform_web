<template>
  <div>
    <el-drawer :title="dialogTitle" :visible.sync="columnAuthorizeListDrawer"
      :wrapperClosable="false" ref="drawer" size="700px" class="JNPF-common-drawer">
      <div class="JNPF-flex-main">
        <div class="JNPF-common-head">
          <topOpts @add="handleAddEdit('')" addPerCode="btn_columnPer_add">
            <el-button type="text" icon="el-icon-copy-document" @click="handleBatchAdd"
              v-has="'btn_columnPer_batchAdd'">
              批量新增
            </el-button>
          </topOpts>
          <div class="JNPF-common-head-right">
            <el-tooltip effect="dark" :content="$t('common.refresh')" placement="top">
              <el-link icon="icon-ym icon-ym-Refresh
              JNPF-common-head-icon" :underline="false" @click="getList()" />
            </el-tooltip>
          </div>
        </div>
        <JNPF-table v-loading="listLoading" :data="treeList" row-key="id" default-expand-all
          :tree-props="{children: 'children', hasChildren: ''}">
          <el-table-column prop="enCode" label="字段名称" width="160" />
          <el-table-column prop="fullName" label="字段注解" />
          <el-table-column label="状态" width="90">
            <template slot-scope="scope">
              <el-switch v-model="scope.row.enabledMark" :active-value="1" :inactive-value="0"
                @click.native="handleUpdateState(scope.row)" disabled class="table-switch" />
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <tableOpts @edit="handleAddEdit(scope.row.id)" @del="handleDel(scope.row.id)"
                editPerCode="btn_columnPer_edit" delPerCode="btn_columnPer_remove" />
            </template>
          </el-table-column>
        </JNPF-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false">关闭</el-button>
      </span>
    </el-drawer>
    <ColumnAuthorizeForm v-if="columnAuthorizeFormVisible" ref="ColumnAuthorizeForm"
      @refreshDataList="getList" />
    <ColumnAuthorizeBatchForm v-if="columnAuthorizeBatchFormVisible" ref="ColumnAuthorizeBatchForm"
      @refreshDataList="getList" />
  </div>
</template>

<script>
import {
  getColumnAuthorizeList,
  updateColumnState,
  delColumn
} from '@/api/system/columnAuthorize'
import ColumnAuthorizeForm from './Form'
import ColumnAuthorizeBatchForm from './BatchForm'

export default {
  components: {
    ColumnAuthorizeForm,
    ColumnAuthorizeBatchForm
  },
  data() {
    return {
      columnAuthorizeListDrawer: false,
      columnAuthorizeFormVisible: false,
      columnAuthorizeBatchFormVisible: false,
      dialogTitle: '',
      params: {
        keyword: ''
      },
      moduleId: '',
      loading: false,
      btnLoading: false,
      listLoading: false,
      treeList: [],
    }
  },
  methods: {
    init(moduleId, fullName) {
      this.columnAuthorizeListDrawer = true
      this.moduleId = moduleId
      this.dialogTitle = `列表权限 - ${fullName}`
      this.$nextTick(() => {
        this.params.keyword = ''
        this.getList()
      })
    },
    getList() {
      this.listLoading = true
      getColumnAuthorizeList(this.moduleId, this.params).then(res => {
        this.treeList = res.data.list
        this.listLoading = false
        this.btnLoading = false
      }).catch(() => {
        this.listLoading = false
        this.btnLoading = false
      })
    },
    handleReLoad() {
      this.btnLoading = true
      this.getList()
    },
    handleUpdateState(row) {
      const txt = row.enabledMark ? '禁用' : '开启'
      this.$confirm(`您确定要${txt}当前列表权限吗, 是否继续?`, '提示', {
        type: 'warning'
      }).then(() => {
        updateColumnState(row.id).then(res => {
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
    handleAddEdit(id) {
      this.columnAuthorizeFormVisible = true
      this.$nextTick(() => {
        this.$refs.ColumnAuthorizeForm.init(this.moduleId, id)
      })
    },
    handleBatchAdd() {
      this.columnAuthorizeBatchFormVisible = true
      this.$nextTick(() => {
        this.$refs.ColumnAuthorizeBatchForm.init(this.moduleId)
      })
    },
    handleDel(id) {
      this.$confirm(this.$t('common.delTip'), this.$t('common.tipTitle'), {
        type: 'warning'
      }).then(() => {
        delColumn(id).then(res => {
          this.$message({
            type: 'success',
            message: res.msg,
            duration: 1500,
            onClose: () => {
              this.getList()
            }
          })
        })
      }).catch(() => { })
    }
  }
}
</script>
