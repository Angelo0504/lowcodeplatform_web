<template>
  <div class="JNPF-common-layout">
    <div class="JNPF-common-layout-left">
      <div class="JNPF-common-title">
        <h2>{{$t('common.organization')}}</h2>
      </div>
      <el-scrollbar class="JNPF-common-el-tree-scrollbar">
        <el-tree ref="treeBox" v-loading="treeLoading"
          :element-loading-text="$t('common.loadingText')" :data="treeData" :props="defaultProps"
          default-expand-all highlight-current :expand-on-click-node="false" node-key="id"
          @node-click="handleNodeClick" class="JNPF-common-el-tree">
          <span class="custom-tree-node" slot-scope="{ data }">
            <i :class="data.icon" />
            <span class="text">{{data.fullName}}</span>
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
          <topOpts @add="handleAddEdit()" />
          <div class="JNPF-common-head-right">
            <el-tooltip effect="dark" :content="$t('common.refresh')" placement="top">
              <el-link icon="icon-ym icon-ym-Refresh JNPF-common-head-icon" :underline="false"
                @click="reset()" />
            </el-tooltip>
            <screenfull />
          </div>
        </div>
        <JNPF-table v-loading="listLoading" :data="tableData">
          <el-table-column prop="fullName" label="岗位名称" v-if="jnpf.hasP('fullName')" />
          <el-table-column prop="enCode" label="岗位编码" v-if="jnpf.hasP('enCode')" />
          <el-table-column prop="department" label="所属组织" v-if="jnpf.hasP('department')" />
          <el-table-column prop="type" label="岗位类型" v-if="jnpf.hasP('type')" />
          <el-table-column prop="description" label="岗位说明" v-if="jnpf.hasP('description')" />
          <el-table-column prop="creatorTime" :formatter="jnpf.tableDateFormat" label="创建时间"
            width="120" v-if="jnpf.hasP('creatorTime')" />
          <el-table-column prop="sortCode" label="排序" width="70" align="center"
            v-if="jnpf.hasP('sortCode')" />
          <el-table-column label="操作" width="150">
            <template slot-scope="scope">
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
                      {{$t('position.postMember')}}
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
    <Form v-if="formVisible" ref="Form" @refreshDataList="initData" />
    <UserRelationList v-if="userRelationListVisible" ref="UserRelationList"
      @refreshDataList="getOrganizeList" />
  </div>
</template>

<script>
import { getDepartmentSelector } from '@/api/permission/department'
import { getPositionList, delPosition } from '@/api/permission/position'
import Form from './Form'
import UserRelationList from '@/views/permission/userRelation/Selector'

export default {
  name: 'permission-position',
  components: { Form, UserRelationList },
  data() {
    return {
      treeData: [],
      tableData: [],
      treeLoading: false,
      listLoading: false,
      authorizeFormVisible: false,
      userRelationListVisible: false,
      type: '',
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
      formVisible: false
    }
  },
  created() {
    this.getOrganizeList()
  },
  methods: {
    getOrganizeList() {
      this.treeLoading = true
      getDepartmentSelector().then(res => {
        this.treeData = res.data.list
        this.$nextTick(() => {
          this.treeLoading = false
          this.initData()
        })
      }).catch(() => {
        this.treeLoading = false
      })
    },
    initData() {
      this.listLoading = true
      getPositionList(this.params).then(res => {
        this.tableData = res.data.list
        this.total = res.data.pagination.total
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
    },
    search() {
      this.params = {
        ...this.params,
        currentPage: 1,
        pageSize: 20
      }
      this.initData()
    },
    reset() {
      this.params.keyword = ''
      this.search()
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
    removeUserRelationList(isRefresh) {
      this.userRelationListVisible = false
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
    handleDel(id) {
      this.$confirm(this.$t('common.delTip'), this.$t('common.tipTitle'), {
        type: 'warning'
      }).then(() => {
        delPosition(id).then(res => {
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
    handleUserRelation(id, fullName) {
      this.userRelationListVisible = true
      this.$nextTick(() => {
        this.$refs.UserRelationList.init(id, fullName, 'Position')
      })
    }
  }
}
</script>
