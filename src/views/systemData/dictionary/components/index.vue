<template>
  <el-drawer title="字典分类管理" :visible.sync="drawer" :wrapperClosable="false" ref="drawer"
    size="700px" :before-close="handleDrawerClose" class="JNPF-common-drawer">
    <div class="JNPF-flex-main">
      <div class="JNPF-common-head">
        <topOpts @refresh="handleRefreshData()" @add="handleAddEditType()" :loading="btnLoading"
          addPerCode="btn_type_add" />
        <div class="JNPF-common-head-right">
          <el-tooltip effect="dark" :content="$t('common.refresh')" placement="top">
            <el-link icon="icon-ym icon-ym-Refresh
              JNPF-common-head-icon" :underline="false" @click="reset()" />
          </el-tooltip>
        </div>
      </div>
      <JNPF-table v-loading="listLoading" :data="tableData" row-key="id" default-expand-all
        :tree-props="{children: 'children', hasChildren: ''}">
        <el-table-column prop="fullName" label="名称" />
        <el-table-column prop="enCode" label="编码" />
        <el-table-column prop="sortCode" label="排序" width="70" align="center" />
        <el-table-column prop="isTree" label="是否树" width="60" align="center">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.isTree === 1" type="success" size="mini">是</el-tag>
            <el-tag v-else type="danger" size="mini">否</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="90">
          <template slot-scope="scope">
            <tableOpts @edit="handleAddEditType(scope.row.id)" @del="handleDel(scope.row.id)"
              editPerCode="btn_type_edit" delPerCode="btn_type_remove" />
          </template>
        </el-table-column>
      </JNPF-table>
      <TypeForm v-if="typeFormVisible" ref="TypeForm" @refreshDataList="getDictionaryTypeList" />
    </div>
  </el-drawer>
</template>
<script>
import {
  getDictionaryType,
  delDictionaryType
} from '@/api/systemData/dictionary'
import TypeForm from './Form'

export default {
  components: {
    TypeForm
  },
  data() {
    return {
      drawer: false,
      listLoading: false,
      btnLoading: false,
      typeFormVisible: false,
      tableData: []
    }
  },
  methods: {
    init() {
      this.drawer = true
      this.$nextTick(() => {
        this.getDictionaryTypeList()
      })
    },
    getDictionaryTypeList() {
      this.listLoading = true
      getDictionaryType().then(res => {
        this.tableData = res.data.list
        this.listLoading = false
        this.btnLoading = false
      }).catch(() => {
        this.listLoading = false
        this.btnLoading = false
      })
    },
    handleRefreshData() {
      this.btnLoading = true
      this.getDictionaryTypeList()
    },
    handleAddEditType(id) {
      this.typeFormVisible = true
      this.$nextTick(() => {
        this.$refs.TypeForm.init(id)
      })
    },
    handleDel(id) {
      this.$confirm(this.$t('common.delTip'), this.$t('common.tipTitle'), {
        type: 'warning'
      }).then(() => {
        delDictionaryType(id).then(res => {
          this.$message({
            type: 'success',
            message: res.msg,
            duration: 1500,
            onClose: () => {
              this.$store.commit('base/SET_DICTIONARY_LIST', [])
              this.getDictionaryTypeList()
            }
          })
        })
      }).catch(() => { })
    },
    reset() {
      this.getDictionaryTypeList()
    },
    handleDrawerClose(done) {
      done();
      this.$emit('refreshDataList')
    },
  }
}
</script>
