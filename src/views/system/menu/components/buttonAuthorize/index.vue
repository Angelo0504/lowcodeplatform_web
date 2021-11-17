<template>
  <div>
    <el-drawer :title="dialogTitle" :visible.sync="buttonAuthorizeListDrawer"
      :wrapperClosable="false" ref="drawer" size="700px" class="JNPF-common-drawer">
      <div class="JNPF-flex-main">
        <div class="JNPF-common-head">
          <div>
            <topOpts @add="handleAddEdit('')" addPerCode="btn_btnPer_add" />
            <el-dropdown style="margin-left: 10px">
              <el-button icon="el-icon-plus" :loading="loading" type="text">
                常用按钮权限<i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="addHandle(item)" v-for="item in btnList"
                  :key="item.enCode">{{item.fullName}}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div class="JNPF-common-head-right">
            <el-tooltip effect="dark" :content="$t('common.refresh')" placement="top">
              <el-link icon="icon-ym icon-ym-Refresh JNPF-common-head-icon" :underline="false"
                @click="getList()" />
            </el-tooltip>
          </div>
        </div>
        <JNPF-table v-loading="listLoading" :data="treeList" row-key="id" default-expand-all
          :tree-props="{children: 'children', hasChildren: ''}">
          <el-table-column prop="fullName" label="按钮名称" width="160" />
          <el-table-column prop="enCode" label="按钮编码" />
          <el-table-column prop="sortCode" label="排序" width="90" align="center" />
          <el-table-column label="状态" width="90">
            <template slot-scope="scope">
              <el-switch v-model="scope.row.enabledMark" :active-value="1" :inactive-value="0"
                @click.native="handleUpdateState(scope.row)" disabled class="table-switch" />
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <tableOpts @edit="handleAddEdit(scope.row.id)" @del="handleDel(scope.row.id)"
                editPerCode="btn_btnPer_edit" delPerCode="btn_btnPer_remove" />
            </template>
          </el-table-column>
        </JNPF-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false">关闭</el-button>
      </span>
    </el-drawer>
    <ButtonAuthorizeForm v-if="buttonAuthorizeFormVisible" ref="ButtonAuthorizeForm"
      @refreshDataList="getList" />
  </div>
</template>

<script>
import {
  getButtonAuthorizeList,
  updateButtonState,
  delButton,
  createButton
} from '@/api/system/buttonAuthorize'
import ButtonAuthorizeForm from './Form'

export default {
  components: {
    ButtonAuthorizeForm
  },
  inheritAttrs: false,
  data() {
    return {
      buttonAuthorizeListDrawer: false,
      buttonAuthorizeFormVisible: false,
      dialogTitle: '',
      params: {
        keyword: ''
      },
      moduleId: '',
      loading: false,
      btnLoading: false,
      listLoading: false,
      treeList: [],
      btnList: [
        { fullName: '新增', enCode: 'btn_add' },
        { fullName: '编辑', enCode: 'btn_edit' },
        { fullName: '详情', enCode: 'btn_detail' },
        { fullName: '删除', enCode: 'btn_remove' },
        { fullName: '导入', enCode: 'btn_upload' },
        { fullName: '导出', enCode: 'btn_download' }
      ]
    }
  },
  methods: {
    init(moduleId, fullName) {
      this.buttonAuthorizeListDrawer = true
      this.moduleId = moduleId
      this.dialogTitle = `按钮权限 - ${fullName}`
      this.$nextTick(() => {
        this.params.keyword = ''
        this.getList()
      })
    },
    getList() {
      this.listLoading = true
      getButtonAuthorizeList(this.moduleId, this.params).then(res => {
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
      this.$confirm(`您确定要${txt}当前按钮权限吗, 是否继续?`, '提示', {
        type: 'warning'
      }).then(() => {
        updateButtonState(row.id).then(res => {
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
      this.buttonAuthorizeFormVisible = true
      this.$nextTick(() => {
        this.$refs.ButtonAuthorizeForm.init(this.moduleId, id)
      })
    },
    addHandle(item) {
      this.loading = true
      let query = {
        parentId: '-1',
        moduleId: this.moduleId,
        fullName: item.fullName,
        enCode: item.enCode,
        sortCode: 0,
        icon: '',
        enabledMark: 1,
        description: ''
      }
      createButton(query).then(res => {
        this.$message({
          message: res.msg,
          type: 'success',
          duration: 1500,
          onClose: () => {
            this.getList()
            this.loading = false
          }
        })
      })
    },
    handleDel(id) {
      this.$confirm(this.$t('common.delTip'), this.$t('common.tipTitle'), {
        type: 'warning'
      }).then(() => {
        delButton(id).then(res => {
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
