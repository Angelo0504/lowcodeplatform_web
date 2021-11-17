<template>
  <div class="JNPF-common-layout menu-list">
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
              <el-button type="primary" icon="el-icon-search" @click="initData()">
                {{$t('common.search')}}</el-button>
              <el-button icon="el-icon-refresh-right" @click="reset()">{{$t('common.reset')}}
              </el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <div class="JNPF-common-layout-main JNPF-flex-main">
        <el-tabs type="border-card" v-model="params.category" class="menu-tab">
          <el-tab-pane label="Web菜单" name="Web"></el-tab-pane>
          <el-tab-pane label="App菜单" name="App"></el-tab-pane>
          <div class="box">
            <div class="JNPF-common-head">
              <topOpts @add="handleAddEdit()" />
              <div class="JNPF-common-head-right">
                <el-tooltip effect="dark" content="展开" placement="top">
                  <el-link v-show="!expands" type="text"
                    icon="icon-ym icon-ym-btn-expand JNPF-common-head-icon" :underline="false"
                    @click="toggleExpand()" />
                </el-tooltip>
                <el-tooltip effect="dark" content="折叠" placement="top">
                  <el-link v-show="expands" type="text"
                    icon="icon-ym icon-ym-btn-collapse JNPF-common-head-icon" :underline="false"
                    @click="toggleExpand()" />
                </el-tooltip>
                <el-tooltip effect="dark" :content="$t('common.refresh')" placement="top">
                  <el-link icon="icon-ym icon-ym-Refresh JNPF-common-head-icon" :underline="false"
                    @click="reset()" />
                </el-tooltip>
                <screenfull />
              </div>
            </div>
            <JNPF-table v-loading="listLoading" :data="treeList" row-key="id" v-if="refreshTable"
              :default-expand-all="expands" :tree-props="{children: 'children', hasChildren: ''}">
              <el-table-column label="菜单名称" width="260" v-if="jnpf.hasP('fullName')">
                <template slot-scope="scope">
                  <i :class="scope.row.icon+' table-icon'" />
                  <label>{{ scope.row.fullName }}</label>
                </template>
              </el-table-column>
              <el-table-column prop="urlAddress" label="菜单地址" show-overflow-tooltip
                v-if="jnpf.hasP('urlAddress')" />
              <el-table-column label="类型" width="90" align="center" v-if="jnpf.hasP('type')">
                <template slot-scope="scope">
                  <span v-if="scope.row.type === 1">目录</span>
                  <span v-if="scope.row.type === 2">页面</span>
                  <span v-if="scope.row.type === 3">功能</span>
                  <span v-if="scope.row.type === 4">字典</span>
                  <span v-if="scope.row.type === 5">报表</span>
                  <span v-if="scope.row.type === 6">大屏</span>
                  <span v-if="scope.row.type === 7">外链</span>
                </template>
              </el-table-column>
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
                    <template
                      v-if="params.category==='Web' && [2,3,4].indexOf(scope.row.type)>-1&& (scope.row.isButtonAuthorize === 1 || scope.row.isColumnAuthorize === 1 || scope.row.isDataAuthorize === 1)">
                      <el-dropdown v-has="'btn_more'">
                        <span class="el-dropdown-link">
                          <el-button type="text" size="mini">{{$t('common.moreBtn')}}<i
                              class="el-icon-arrow-down el-icon--right"></i>
                          </el-button>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item v-if="scope.row.isButtonAuthorize === 1"
                            @click.native="handleButtonAuthorize(scope.row)" v-has="'btn_btnPer'">
                            按钮权限
                          </el-dropdown-item>
                          <el-dropdown-item v-if="scope.row.isColumnAuthorize === 1"
                            @click.native="handleColumnAuthorize(scope.row)"
                            v-has="'btn_columnPer'">
                            列表权限
                          </el-dropdown-item>
                          <el-dropdown-item v-if="scope.row.isDataAuthorize === 1"
                            @click.native="handleDataAuthorize(scope.row)" v-has="'btn_dataPer'">
                            数据权限
                          </el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </template>
                  </tableOpts>
                </template>
              </el-table-column>
            </JNPF-table>
          </div>
        </el-tabs>
      </div>
    </div>
    <Form v-if="formVisible" ref="Form" @refreshDataList="initData" />
    <ButtonAuthorizeListDrawer v-if="buttonAuthorizeListDrawer" ref="buttonAuthorizeList" />
    <ColumnAuthorizeListDrawer v-if="columnAuthorizeListDrawer" ref="ColumnAuthorizeList" />
    <DataAuthorizeListDrawer v-if="dataAuthorizeListDrawer" ref="DataAuthorizeList" />
  </div>
</template>
<script>
import { getMenuList, updateMenuState, delMenu } from '@/api/system/menu'
import Form from './Form'
import ButtonAuthorizeListDrawer from './components/buttonAuthorize/index'
import ColumnAuthorizeListDrawer from './components/columnAuthorize/index'
import DataAuthorizeListDrawer from './components/dataAuthorize/index'

export default {
  name: 'system-menu',
  components: {
    Form,
    ButtonAuthorizeListDrawer,
    ColumnAuthorizeListDrawer,
    DataAuthorizeListDrawer
  },
  data() {
    return {
      options: [],
      params: {
        keyword: '',
        category: 'Web'
      },
      treeList: [],
      btnLoading: false,
      listLoading: true,
      formVisible: false,
      buttonAuthorizeListDrawer: false,
      columnAuthorizeListDrawer: false,
      dataAuthorizeListDrawer: false,
      expands: true,
      refreshTable: true
    }
  },
  watch: {
    "params.category": function (val) {
      this.reset()
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
      getMenuList(this.params).then(res => {
        this.treeList = res.data.list
        this.listLoading = false
        this.btnLoading = false
      }).catch(() => {
        this.listLoading = false
        this.btnLoading = false
      })
    },
    toggleExpand() {
      this.refreshTable = false
      this.expands = !this.expands
      this.$nextTick(() => {
        this.refreshTable = true
      })
    },
    handleAddEdit(id) {
      this.formVisible = true
      this.$nextTick(() => {
        this.$refs.Form.init(id, this.params.category)
      })
    },
    handleUpdateState(row) {
      if (!this.jnpf.hasBtnP('btn_edit')) return this.$message.warning(this.$t('common.noPerTip'))
      const txt = row.enabledMark ? '禁用' : '开启'
      this.$confirm(`您确定要${txt}当前菜单吗, 是否继续?`, '提示', {
        type: 'warning'
      }).then(() => {
        updateMenuState(row.id).then(res => {
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
        delMenu(id).then(res => {
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
    handleButtonAuthorize(row) {
      const moduleId = row.id
      const fullName = row.fullName
      this.buttonAuthorizeListDrawer = true
      this.$nextTick(() => {
        this.$refs.buttonAuthorizeList.init(moduleId, fullName)
      })
    },
    handleColumnAuthorize(row) {
      const moduleId = row.id
      const fullName = row.fullName
      this.columnAuthorizeListDrawer = true
      this.$nextTick(() => {
        this.$refs.ColumnAuthorizeList.init(moduleId, fullName)
      })
    },
    handleDataAuthorize(row) {
      const moduleId = row.id
      const fullName = row.fullName
      this.dataAuthorizeListDrawer = true
      this.$nextTick(() => {
        this.$refs.DataAuthorizeList.init(moduleId, fullName)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.menu-list {
  .table-icon {
    vertical-align: middle;
  }
  .JNPF-common-layout-main {
    padding: 0;
  }
  .menu-tab {
    height: 100%;
    >>> .el-tabs__content {
      padding: 0;
      height: calc(100% - 40px);
      .box {
        flex: 1;
        height: 100%;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        padding-bottom: 10px;
      }
    }
  }
}
</style>
