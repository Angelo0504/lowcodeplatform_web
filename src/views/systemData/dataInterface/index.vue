<template>
  <div class="JNPF-common-layout">
    <div class="JNPF-common-layout-left">
      <div class="JNPF-common-title">
        <h2>接口分类</h2>
      </div>
      <el-tree ref="treeBox" v-loading="treeLoading"
        :element-loading-text="$t('common.loadingText')" :data="treeData" :props="defaultProps"
        default-expand-all highlight-current :expand-on-click-node="false" node-key="id"
        @node-click="handleNodeClick" class="JNPF-common-el-tree" />
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
          <el-table-column prop="fullName" label="接口名称" v-if="jnpf.hasP('fullName')" />
          <el-table-column prop="enCode" label="编码" v-if="jnpf.hasP('enCode')" />
          <el-table-column label="接口类型" v-if="jnpf.hasP('dataType')">
            <template slot-scope="scope">
              <span v-if="scope.row.dataType === 1">SQL数据</span>
              <span v-if="scope.row.dataType === 2">静态数据</span>
              <span v-if="scope.row.dataType === 3">Api数据</span>
            </template>
          </el-table-column>
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
          <el-table-column label="操作" width="150">
            <template slot-scope="scope">
              <tableOpts @edit="handleAddEdit(scope.row.id)" @del="handleDel(scope.row.id)">
                <el-dropdown hide-on-click v-has="'btn_more'">
                  <span class="el-dropdown-link">
                    <el-button type="text" size="mini">{{$t('common.moreBtn')}}<i
                        class="el-icon-arrow-down el-icon--right"></i>
                    </el-button>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item
                      @click.native="handlePreview(scope.row.id, scope.row.enabledMark)"
                      v-has="'btn_preview'">预览
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
    <Form v-show="formVisible" ref="Form" @close="colseForm" />
    <Preview v-if="previewVisible" ref="Preview" @close="colsePreview" />
  </div>
</template>
<script>
import {
  getDataInterfaceTypeSelector,
  getDataInterfaceList,
  updateDataInterfaceState,
  delDataInterface
} from '@/api/systemData/dataInterface'
import Form from './Form'
import Preview from './Preview'

export default {
  name: 'systemData-dataInterface',
  components: { Form, Preview },
  data() {
    return {
      defaultProps: {
        children: 'children',
        label: 'fullName'
      },
      params: {
        keyword: '',
        currentPage: 1,
        pageSize: 20,
        categoryId: '',
        sort: 'desc'
      },
      total: 0,
      treeLoading: false,
      listLoading: false,
      btnLoading: false,
      treeData: [],
      tableData: [],
      formVisible: false,
      previewVisible: false
    }
  },
  created() {
    this.initData()
  },
  methods: {
    initData() {
      this.treeLoading = true
      getDataInterfaceTypeSelector().then(res => {
        this.treeData = res.data.list
        this.$nextTick(() => {
          this.params.categoryId = this.treeData[0].id
          this.$refs.treeBox.setCurrentKey(this.params.categoryId)
          this.treeLoading = false
          this.getList()
        })
      }).catch(() => {
        this.treeLoading = false
      })
    },
    getList() {
      this.listLoading = true
      getDataInterfaceList(this.params).then(res => {
        this.tableData = res.data.list
        this.total = res.data.pagination.total
        this.listLoading = false
        this.btnLoading = false
      }).catch(() => {
        this.listLoading = false
        this.btnLoading = false
      })
    },
    handleUpdateState(row) {
      if (!this.jnpf.hasBtnP('btn_edit')) return this.$message.warning(this.$t('common.noPerTip'))
      const txt = row.enabledMark ? '禁用' : '开启'
      this.$confirm(`您确定要${txt}当前接口吗, 是否继续?`, '提示', {
        type: 'warning'
      }).then(() => {
        updateDataInterfaceState(row.id).then(res => {
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
    handleNodeClick(data) {
      if (this.params.categoryId === data.id) return
      this.params.categoryId = data.id
      this.reset()
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
        delDataInterface(id).then(res => {
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
    },
    handlePreview(id, enabledMark) {
      if (enabledMark === 0) {
        this.$message.error('接口已被禁用，请先开启接口')
      } else {
        this.previewVisible = true
        this.$nextTick(() => {
          this.$refs.Preview.init(id)
        })
      }
    },
    search() {
      this.params.currentPage = 1
      this.params.pageSize = 20
      this.params.sort = 'desc'
      this.getList()
    },
    reset() {
      this.params.keyword = ''
      this.search()
    },
    colseForm(isRefresh) {
      this.formVisible = false
      if (isRefresh) {
        this.reset()
      }
    },
    colsePreview(isRefresh) {
      this.previewVisible = false
      if (isRefresh) {
        this.reset()
      }
    }
  }
}
</script>
