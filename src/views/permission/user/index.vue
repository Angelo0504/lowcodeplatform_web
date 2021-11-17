<template>
  <div class="JNPF-common-layout">
    <div class="JNPF-common-layout-left">
      <div class="JNPF-common-title">
        <h2>{{$t('common.organization')}}</h2>
        <span class="options">
          <el-tooltip content="组织架构图" placement="top">
            <el-link icon="el-icon-menu" :underline="false" @click="showDiagram" />
          </el-tooltip>
        </span>
      </div>
      <el-scrollbar class="JNPF-common-el-tree-scrollbar">
        <el-tree ref="treeBox" :data="treeData" :element-loading-text="$t('common.loadingText')"
          :props="defaultProps" default-expand-all highlight-current :expand-on-click-node="false"
          node-key="id" @node-click="handleNodeClick" class="JNPF-common-el-tree">
          <span class="custom-tree-node" slot-scope="{ data, node }">
            <i :class="data.icon" />
            <span class="text">{{node.label}}</span>
          </span>
        </el-tree>
      </el-scrollbar>
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
          <topOpts @add="handleAddEdit()"></topOpts>
          <div class="JNPF-common-head-right">
            <el-tooltip effect="dark" :content="$t('common.refresh')" placement="top">
              <el-link icon="icon-ym icon-ym-Refresh JNPF-common-head-icon" :underline="false"
                @click="reset()" />
            </el-tooltip>
            <screenfull />
          </div>
        </div>
        <JNPF-table v-loading="listLoading" :data="tableData">
          <el-table-column prop="account" label="账号" width="100" v-if="jnpf.hasP('account')" />
          <el-table-column prop="realName" label="姓名" width="100" v-if="jnpf.hasP('realName')" />
          <el-table-column label="性别" width="90" align="center" v-if="jnpf.hasP('gender')">
            <template slot-scope="scope" sortable>
              <span>{{ scope.row.gender ==1 ? '男': ( scope.row.gender == 2 ? '女' : '保密') }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="mobilePhone" label="手机" v-if="jnpf.hasP('mobilePhone')" />
          <el-table-column prop="department" label="部门" v-if="jnpf.hasP('department')" />
          <el-table-column prop="position" label="岗位" v-if="jnpf.hasP('position')" />
          <el-table-column prop="sortCode" label="排序" width="70" align="center"
            v-if="jnpf.hasP('sortCode')" />
          <el-table-column label="状态" width="70" align="center" v-if="jnpf.hasP('enabledMark')">
            <template slot-scope="scope">
              <el-switch v-model="scope.row.enabledMark" :active-value="1" :inactive-value="0"
                @click.native="handleUpdateState(scope.row)" disabled class="table-switch" />
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150">
            <template slot-scope="scope" v-if="!scope.row.isAdministrator">
              <tableOpts @edit="handleAddEdit(scope.row.id)" @del="handleDel(scope.row.id)">
                <el-dropdown hide-on-click v-has="'btn_more'">
                  <span class="el-dropdown-link">
                    <el-button size="mini" type="text">
                      {{$t('common.moreBtn')}}<i class="el-icon-arrow-down el-icon--right"></i>
                    </el-button>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item
                      @click.native="handleResetPwd(scope.row.id, scope.row.account)"
                      v-has="'btn_password'">{{$t('user.resetPassword')}}
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </tableOpts>
            </template>
          </el-table-column>
        </JNPF-table>
        <pagination :total="total" :page.sync="params.currentPage" :limit.sync="params.pageSize"
          @pagination="initData" />
      </div>
    </div>
    <Form v-show="formVisible" ref="Form" @close="removeForm" />
    <Diagram v-if="diagramVisible" ref="Diagram" @close="diagramVisible = false" />
    <ResetPwdForm v-if="resetFormVisible" ref="ResetPwdForm" @refreshDataList="initData" />
  </div>
</template>
<script>
import {
  getDepartmentSelector
} from '@/api/permission/department'
import {
  getUserList,
  updateUserState,
  delUser
} from '@/api/permission/user'
import Form from './Form'
import Diagram from './Diagram'
import ResetPwdForm from './ResetPassword'

export default {
  name: 'permission-user',
  components: {
    Form,
    Diagram,
    ResetPwdForm
  },
  data() {
    return {
      keyword: '',
      treeData: [],
      tableData: [],
      treeLoading: false,
      listLoading: true,
      params: {
        organizeId: '',
        keyword: '',
        currentPage: 1,
        pageSize: 20
      },
      defaultProps: {
        children: 'children',
        label: 'fullName'
      },
      total: 0,
      type: '',
      formVisible: false,
      diagramVisible: false,
      resetFormVisible: false,
      authorizeFormVisible: false
    }
  },
  created() {
    this.getOrganizeList()
  },
  methods: {
    showDiagram() {
      this.diagramVisible = true
      this.$nextTick(() => {
        this.$refs.Diagram.init()
      })
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
    },
    getOrganizeList() {
      this.treeLoading = true
      getDepartmentSelector().then(res => {
        this.treeData = res.data.list
        this.treeLoading = false
        this.initData()
      }).catch(() => {
        this.treeLoading = false
      })
    },
    initData() {
      this.listLoading = true
      getUserList(this.params).then(res => {
        this.tableData = res.data.list
        this.total = res.data.pagination.total
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
    },
    handleNodeClick(data) {
      if (this.params.organizeId === data.id) return
      this.params.organizeId = data.id
      this.type = data.type
      this.reset()
    },
    handleAddEdit(id) {
      this.formVisible = true
      this.$nextTick(() => {
        this.$refs.Form.init(id, this.type === 'department' ? this.params.organizeId : '')
      })
    },
    removeForm(isRefresh) {
      this.formVisible = false
      if (isRefresh) {
        this.keyword = ''
        this.initData()
      }
    },
    removeAuthorizeForm(isRefresh) {
      this.authorizeFormVisible = false
      if (isRefresh) {
        this.keyword = ''
        this.initData()
      }
    },
    handleUpdateState(row) {
      if (!this.jnpf.hasBtnP('btn_edit')) return this.$message.warning(this.$t('common.noPerTip'))
      const txt = row.enabledMark ? '禁用' : '开启'
      this.$confirm(`您确定要${txt}当前用户吗, 是否继续?`, '提示', {
        type: 'warning'
      }).then(() => {
        updateUserState(row.id).then(res => {
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
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        type: 'warning'
      }).then(() => {
        delUser(id).then(res => {
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
    handleResetPwd(id, account) {
      this.resetFormVisible = true
      this.$nextTick(() => {
        this.$refs.ResetPwdForm.init(id, account)
      })
    }
  }
}
</script>
