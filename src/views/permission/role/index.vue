<template>
  <div class="JNPF-common-layout JNPF-flex-main">
    <div class="JNPF-common-layout-center">
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
        <JNPF-table v-loading="listLoading" :data="tableListAll" row-key="id" default-expand-all
          :tree-props="{children: 'children', hasChildren: ''}">
          <el-table-column prop="fullName" label="名称" v-if="jnpf.hasP('fullName')">
            <template slot-scope="scope">
              <span v-if="scope.row.top"
                style="font-weight:bold;">{{scope.row.fullName}}【{{scope.row.count}}】</span>
              <span v-else>{{scope.row.fullName}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="enCode" label="编码" v-if="jnpf.hasP('enCode')">
            <template slot-scope="scope">
              <span v-if="!scope.row.top">{{ scope.row.enCode }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="description" label="描述" v-if="jnpf.hasP('description')" />
          <el-table-column prop="creatorTime" label="创建时间" :formatter="jnpf.tableDateFormat"
            width="120" v-if="jnpf.hasP('creatorTime')" />
          <el-table-column prop="sortCode" label="排序" width="70" align="center"
            v-if="jnpf.hasP('sortCode')" />
          <el-table-column label="状态" width="70" align="center" v-if="jnpf.hasP('enabledMark')">
            <template slot-scope="scope" v-if="!scope.row.top">
              <el-switch v-model="scope.row.enabledMark" :active-value="1" :inactive-value="0"
                @click.native="handleUpdateState(scope.row)" disabled class="table-switch" />
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150">
            <template slot-scope="scope" v-if="!scope.row.top">
              <tableOpts @edit="handleAddEdit(scope.row.id)" @del="handleDel(scope.row.id)">
                <el-dropdown hide-on-click v-has="'btn_more'">
                  <span class="el-dropdown-link">
                    <el-button type="text" size="mini">
                      {{$t('common.moreBtn')}}<i class="el-icon-arrow-down el-icon--right"></i>
                    </el-button>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item
                      @click.native="handleUserRelation(scope.row.id, scope.row.fullName)"
                      v-has="'btn_member'">
                      {{$t('role.roleMember')}}
                    </el-dropdown-item>
                    <el-dropdown-item
                      @click.native="handleAuthorize(scope.row.id, scope.row.fullName)"
                      v-has="'btn_authorize'">
                      {{$t('role.rolePermission')}}
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </tableOpts>
            </template>
          </el-table-column>
        </JNPF-table>
      </div>
      <Form v-if="formVisible" ref="Form" @refreshDataList="initData" />
      <AuthorizeForm v-if="authorizeFormVisible" ref="AuthorizeForm" @close="removeAuthorizeForm" />
      <UserRelationList v-if="userRelationListVisible" ref="UserRelationList"
        @refreshDataList="initData" />
    </div>
  </div>
</template>

<script>
import {
  getRoleList,
  delRole,
  updateRoleState
} from '@/api/permission/role'
import Form from './Form'
import AuthorizeForm from '@/views/permission/authorize/AuthorizeForm'
import UserRelationList from '@/views/permission/userRelation/Selector'

export default {
  components: {
    Form,
    AuthorizeForm,
    UserRelationList
  },
  name: 'permission-role',
  data() {
    return {
      params: {
        keyword: '',
      },
      tableList: [],
      roleTypeList: [],
      tableListAll: [],
      btnLoading: false,
      listLoading: true,
      formVisible: false,
      authorizeFormVisible: false,
      userRelationListVisible: false
    }
  },
  created() {
    this.getDictionaryData()
  },
  methods: {
    initData() {
      this.loading = true
      let query = { keyword: this.params.keyword }
      getRoleList(query).then(res => {
        this.tableList = res.data.list
        this.tableListAll = JSON.parse(JSON.stringify(this.roleTypeList))
        for (let i = 0; i < this.tableListAll.length; i++) {
          let child = this.tableList.filter(o => this.tableListAll[i].enCode === o.type)
          let count = child.length
          this.$set(this.tableListAll[i], 'children', child)
          this.$set(this.tableListAll[i], 'count', count)
          this.$set(this.tableListAll[i], 'top', true)
        }
        this.tableListAll = this.tableListAll.filter(o => o.children.length)
        this.listLoading = false
        this.btnLoading = false
      }).catch(() => {
        this.listLoading = false
        this.btnLoading = false
      })
    },
    getDictionaryData() {
      this.$store.dispatch('base/getDictionaryData', { sort: 'RoleType' }).then(res => {
        this.roleTypeList = JSON.parse(JSON.stringify(res))
        this.initData()
      })
    },
    handleReLoad() {
      this.btnLoading = true
      this.initData()
    },
    handleAddEdit(id) {
      this.formVisible = true
      this.$nextTick(() => {
        this.$refs.Form.init(id)
      })
    },
    removeAuthorizeForm(isRefresh) {
      this.authorizeFormVisible = false
      if (isRefresh) {
        this.keyword = ''
        this.initData()
      }
    },
    removeUserRelationList(isRefresh) {
      this.userRelationListVisible = false
      if (isRefresh) {
        this.keyword = ''
        this.initData()
      }
    },
    search() {
      this.initData()
    },
    reset() {
      this.params.keyword = ''
      this.initData()
    },
    handleUpdateState(row) {
      if (!this.jnpf.hasBtnP('btn_edit')) return this.$message.warning(this.$t('common.noPerTip'))
      const txt = row.enabledMark ? '禁用' : '开启'
      this.$confirm(`您确定要${txt}当前角色吗, 是否继续?`, '提示', {
        type: 'warning'
      }).then(() => {
        updateRoleState(row.id).then(res => {
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
        delRole(id).then(res => {
          this.$message({
            type: 'success',
            message: res.msg,
            duration: 1500,
            onClose: () => {
              this.getDictionaryData()
            }
          })
        })
      }).catch(() => { })
    },
    handleUserRelation(id, fullName) {
      this.userRelationListVisible = true
      this.$nextTick(() => {
        this.$refs.UserRelationList.init(id, fullName, 'Role')
      })
    },
    handleAuthorize(id, fullName) {
      this.authorizeFormVisible = true
      this.$nextTick(() => {
        this.$refs.AuthorizeForm.init(id, fullName, 'Role')
      })
    }
  }
}
</script>
