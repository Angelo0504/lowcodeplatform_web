<template>
  <div>
    <el-drawer :title="dialogTitle" :visible.sync="dataAuthorizeListDrawer" :wrapperClosable="false"
      ref="drawer" size="700px" class="JNPF-common-drawer">
      <div class="JNPF-flex-main">
        <el-tabs type="border-card" v-model="tabActiveName" @tab-click="handleClick"
          class="JNPF-flex-tabs">
          <el-tab-pane label="方案管理" name="dataAuthorizeScheme">
            <div class="JNPF-common-head">
              <topOpts @add="handleAddEdit('')" addPerCode="btn_btnPer_add" />
              <div class="JNPF-common-head-right">
                <el-tooltip effect="dark" :content="$t('common.refresh')" placement="top">
                  <el-link icon="icon-ym icon-ym-Refresh
                  JNPF-common-head-icon" :underline="false" @click="getAuthorizeSchemeList()" />
                </el-tooltip>
              </div>
            </div>
            <JNPF-table v-loading="listLoading" :data="dataAuthorizeSchemeList" row-key="id"
              default-expand-all :tree-props="{children: 'children', hasChildren: ''}">
              <el-table-column prop="fullName" label="方案名称" width="160" />
              <el-table-column prop="conditionText" label="过滤条件" />
              <el-table-column label="操作" width="100">
                <template slot-scope="scope">
                  <tableOpts @edit="handleAddEdit(scope.row.id)" @del="handleDel(scope.row.id)"
                    editPerCode="btn_dataPer_edit" delPerCode="btn_dataPer_remove">
                  </tableOpts>
                </template>
              </el-table-column>
            </JNPF-table>
          </el-tab-pane>
          <el-tab-pane label="字段管理" name="dataAuthorize">
            <div class="JNPF-common-head">
              <topOpts @add="handleAddEdit('')" addPerCode="btn_btnPer_add" />
              <div class="JNPF-common-head-right">
                <el-tooltip effect="dark" :content="$t('common.refresh')" placement="top">
                  <el-link icon="icon-ym icon-ym-Refresh
                  JNPF-common-head-icon" :underline="false" @click="getAuthorizeList()" />
                </el-tooltip>
              </div>
            </div>
            <JNPF-table v-loading="dataListLoading" :data="dataAuthorizeList" row-key="id"
              default-expand-all :tree-props="{children: 'children', hasChildren: ''}">
              <el-table-column prop="enCode" label="字段名称" />
              <el-table-column prop="fullName" label="字段注解" show-overflow-tooltip />
              <el-table-column prop="type" label="字段类型" width="70" />
              <el-table-column prop="conditionSymbol" label="条件符号" show-overflow-tooltip />
              <el-table-column label="条件内容" width="70">
                <template slot-scope="scope">
                  <span v-if="scope.row.conditionText === 'text'">任意文本</span>
                  <span v-if="scope.row.conditionText === '@userId'">当前用户</span>
                  <span v-if="scope.row.conditionText === '@organizeId'">当前公司</span>
                  <span v-if="scope.row.conditionText === '@dempmentId'">当前部门</span>
                  <span v-if="scope.row.conditionText === '@subordinateId'">我的下属</span>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="100">
                <template slot-scope="scope">
                  <tableOpts @edit="handleAddEdit(scope.row.id)" @del="handleDel(scope.row.id)"
                    editPerCode="btn_dataPer_edit" delPerCode="btn_dataPer_remove">
                  </tableOpts>
                </template>
              </el-table-column>
            </JNPF-table>
          </el-tab-pane>
        </el-tabs>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false">关闭</el-button>
      </span>
    </el-drawer>
    <DataSchemeForm v-if="dataSchemeFormVisible" ref="DataSchemeForm"
      @refreshDataList="getAuthorizeSchemeList" />
    <DataAuthorizeForm v-if="dataAuthorizeFormVisible" ref="DataAuthorizeForm"
      @refreshDataList="getAuthorizeList" />
  </div>
</template>

<script>
import {
  getDataAuthorizeSchemeList,
  getDataAuthorizeList,
  delDataScheme,
  delDataAuthorize
} from '@/api/system/dataAuthorize'
import DataSchemeForm from './DataSchemeForm'
import DataAuthorizeForm from './DataAuthorizeForm'

export default {
  components: {
    DataSchemeForm,
    DataAuthorizeForm
  },
  data() {
    return {
      tabActiveName: 'dataAuthorizeScheme',
      dataAuthorizeListDrawer: false,
      dialogTitle: '',
      moduleId: '',
      loading: false,
      btnLoading: false,
      listLoading: false,
      dataListLoading: false,
      dataAuthorizeSchemeList: [],
      dataAuthorizeList: [],
      dataSchemeFormVisible: false,
      dataAuthorizeFormVisible: false
    }
  },
  methods: {
    init(moduleId, fullName) {
      this.dataAuthorizeListDrawer = true
      this.moduleId = moduleId
      this.tabActiveName = 'dataAuthorizeScheme'
      this.dialogTitle = `数据权限 - ${fullName}`
      this.$nextTick(() => {
        this.listLoading = true
        this.dataListLoading = true
        this.getAuthorizeSchemeList()
      })
    },
    getAuthorizeSchemeList() {
      // 获取方案管理列表
      getDataAuthorizeSchemeList(this.moduleId).then(res => {
        this.dataAuthorizeSchemeList = res.data.list
        this.listLoading = false
        this.btnLoading = false
      }).catch(() => {
        this.listLoading = false
        this.btnLoading = false
      })
    },
    getAuthorizeList() {
      // 获取字段列表
      getDataAuthorizeList(this.moduleId).then(res => {
        this.dataAuthorizeList = res.data.list
        this.dataListLoading = false
        this.btnLoading = false
      }).catch(() => {
        this.dataListLoading = false
        this.btnLoading = false
      })
    },
    handleClick(tab, event) {
      this.btnLoading = false
      const activeTab = this.tabActiveName
      if (activeTab === 'dataAuthorizeScheme') {
        this.getAuthorizeSchemeList()
      } else {
        this.getAuthorizeList()
      }
    },
    handleReLoad() {
      this.btnLoading = true
      const activeTab = this.tabActiveName
      if (activeTab === 'dataAuthorizeScheme') {
        this.getAuthorizeSchemeList()
      } else {
        this.getAuthorizeList()
      }
    },
    handleAddEdit(id) {
      const activeTab = this.tabActiveName
      if (activeTab === 'dataAuthorizeScheme') {
        this.dataSchemeFormVisible = true
        this.$nextTick(() => {
          this.$refs.DataSchemeForm.init(this.moduleId, id)
        })
      } else {
        this.dataAuthorizeFormVisible = true
        this.$nextTick(() => {
          this.$refs.DataAuthorizeForm.init(this.moduleId, id)
        })
      }
    },
    handleDel(id) {
      this.$confirm(this.$t('common.delTip'), this.$t('common.tipTitle'), {
        type: 'warning'
      }).then(() => {
        const delMethod = this.tabActiveName === 'dataAuthorizeScheme' ? delDataScheme : delDataAuthorize
        delMethod(id).then(res => {
          this.$message({
            type: 'success',
            message: res.msg,
            duration: 1500,
            onClose: () => {
              this.handleReLoad()
            }
          })
        })
      }).catch(() => { })
    }
  }
}
</script>
<style lang="scss" scoped>
.JNPF-flex-main {
  .el-tabs--border-card {
    border: none;
    box-shadow: none;
    >>> .el-tabs__content {
      padding: 0 !important;
    }
  }
}
.JNPF-flex-tabs {
  >>> .el-table__body-wrapper {
    height: 100vh !important;
  }
  >>> .el-tabs__nav-scroll {
    padding-left: 20px;
  }
}
</style>
