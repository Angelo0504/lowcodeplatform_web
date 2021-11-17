
<template>
  <div class="JNPF-common-layout" v-show="showPage">
    <div class="JNPF-common-layout-left" v-if="columnData.type === 2 && columnData.treeDictionary">
      <div class="JNPF-common-title" v-if="columnData.treeTitle">
        <h2>{{columnData.treeTitle}}</h2>
      </div>
      <el-tree :data="treeData" :props="defaultProps" default-expand-all highlight-current
        ref="treeBox" :expand-on-click-node="false" @node-click="handleNodeClick"
        class="JNPF-common-el-tree" node-key="id">
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <i :class="data.icon"></i>
          <span class="text">{{node.label}}</span>
        </span>
      </el-tree>
    </div>
    <div class="JNPF-common-layout-center">
      <Search ref="Search" :list="columnData.searchList" @reset="reset" @search="search" />
      <div class="JNPF-common-layout-main JNPF-flex-main">
        <div class="JNPF-common-head">
          <div>
            <el-button :type="i==0?'primary':'text'" :icon="item.icon" v-has="'btn_'+item.value"
              @click="headBtnsHandel(item.value)" v-for="(item, i) in columnData.btnsList" :key="i">
              {{item.label}}</el-button>
          </div>
          <div class="JNPF-common-head-right">
            <el-tooltip effect="dark" :content="$t('common.refresh')" placement="top">
              <el-link icon="icon-ym icon-ym-Refresh JNPF-common-head-icon" :underline="false"
                @click="reset()" />
            </el-tooltip>
            <screenfull />
          </div>
        </div>
        <JNPF-table v-loading="listLoading" :data="list" row-key="id"
          :tree-props="{children: 'children', hasChildren: ''}" default-expand-all>
          <el-table-column :prop="item.prop" :label="item.label" :align="item.align"
            :width="item.width" v-for="(item, i) in columnList" :key="i" />
          <el-table-column label="操作" fixed="right" :width="columnData.columnBtnsList.length*50"
            v-if="columnData.columnBtnsList.length">
            <template slot-scope="scope" v-if="!scope.row.top">
              <el-button size="mini" type="text" v-for="(item, i) in columnData.columnBtnsList"
                :key="i" :class="{'JNPF-table-delBtn':item.value=='remove'}"
                @click="columnBtnsHandel(item.value,scope.row.id,scope.$index)"
                v-has="'btn_'+item.value">{{item.label}}</el-button>
            </template>
          </el-table-column>
        </JNPF-table>
        <template v-if="columnData.type !== 3 && columnData.hasPage">
          <pagination :total="total" :page.sync="listQuery.currentPage"
            :limit.sync="listQuery.pageSize" @pagination="initData" />
        </template>
      </div>
    </div>
    <Form v-show="formVisible" ref="Form" @refreshDataList="refresh" />
    <Detail v-show="detailVisible" ref="Detail" @close="detailVisible = false" />
    <ImportBox v-if="importBoxVisible" ref="ImportBox"
      @refreshDataList="importBoxVisible=false;reset()" />
    <ExportBox v-if="exportBoxVisible" ref="ExportBox" @download="download" />
  </div>
</template>

<script>
import { getConfigData, getColumnData, getFormData, getModelList, deteleModel, importModel, exportModel } from '@/api/onlineDev/visualDev'
import { getDictionaryDataSelector } from '@/api/systemData/dictionary'
import Form from './Form'
import Detail from './detail'
import ImportBox from './ImportBox'
import ExportBox from './ExportBox'
import Search from './Search'
export default {
  name: 'dynamicModel',
  components: { Form, ImportBox, ExportBox, Search, Detail },
  data() {
    return {
      showPage: false,
      keyword: '',
      defaultProps: {
        children: 'children',
        label: 'fullName'
      },
      list: [],
      total: 0,
      listLoading: true,
      listQuery: {
        currentPage: 1,
        pageSize: 20,
        sort: 'desc',
        sidx: '',
        json: ''
      },
      formVisible: false,
      detailVisible: false,
      importBoxVisible: false,
      exportBoxVisible: false,
      treeData: [],
      treeActiveId: '',
      modelId: '',
      columnData: {
        columnBtnsList: []
      },
      formData: {},
      columnList: [],
    }
  },
  created() {
    this.modelId = this.$route.meta.relationId
    if (!this.modelId) return
    this.getColumnData()
  },
  methods: {
    getColumnData() {
      getConfigData(this.modelId).then(res => {
        if (res.code !== 200) {
          this.$store.dispatch('tagsView/delView', this.$route)
          this.$router.replace('/404')
        }
        if (!res.data) return
        this.showPage = true
        if (!res.data.columnData || !res.data.formData) return
        this.columnData = JSON.parse(res.data.columnData)
        if (this.columnData.type === 3) {
          this.columnData.columnList = this.columnData.columnList.filter(o => o.prop != this.columnData.groupField)
        }
        this.formData = JSON.parse(res.data.formData)
        this.listQuery.pageSize = this.columnData.pageSize
        this.listQuery.sort = this.columnData.sort
        this.listQuery.sidx = this.columnData.defaultSidx
        this.getColumnList()
        if (this.columnData.type === 3 || !this.columnData.hasPage) this.listQuery.pageSize = 10000
        if (this.columnData.type === 2 && this.columnData.treeDictionary) {
          this.getTreeView()
        } else {
          this.initData()
        }
      }).catch(() => { })
    },
    initData() {
      this.listLoading = true
      getModelList(this.modelId, this.listQuery).then(res => {
        this.list = res.data.list
        if (this.columnData.type !== 3 && this.columnData.hasPage) this.total = res.data.pagination.total
        this.listLoading = false
      })
    },
    getTreeView() {
      if (this.columnData.treeDataSource === "dictionary") {
        if (!this.columnData.treeDictionary) return
        getDictionaryDataSelector(this.columnData.treeDictionary).then(res => {
          this.treeData = res.data.list
          this.initData()
        })
      }
    },
    getColumnList() {
      const permissionList = this.$store.getters.permissionList
      const modelId = this.$route.meta.modelId
      const list = permissionList.filter(o => o.modelId === modelId)
      const columnList = list[0] && list[0].column ? list[0].column : []
      let realList = []
      for (let i = 0; i < columnList.length; i++) {
        inner: for (let j = 0; j < this.columnData.columnList.length; j++) {
          if (columnList[i].enCode === this.columnData.columnList[j].prop) {
            realList.push(this.columnData.columnList[j])
            break inner
          }
        }
      }
      this.columnList = realList
    },
    handleNodeClick(data) {
      if (this.columnData.treeDataSource === "dictionary") {
        if (this.treeActiveId == data.id) return
        this.treeActiveId = data.id
        this.$refs.Search.treeReset()
        let json = { [this.columnData.treeDbTableFieldRelation]: data.id }
        this.search(JSON.stringify(json))
      }
    },
    handleDel(id, index) {
      this.$confirm(this.$t('common.delTip'), this.$t('common.tipTitle'), {
        type: 'warning'
      }).then(() => {
        deteleModel(this.modelId, id).then(res => {
          this.$message({
            type: 'success',
            message: res.msg,
            duration: 1000,
            onClose: () => { this.list.splice(index, 1) }
          });
        })
      }).catch(() => { });
    },
    // 新增 / 修改
    addOrUpdateHandle(id) {
      this.formVisible = true
      this.$nextTick(() => {
        this.$refs.Form.init(this.formData, this.modelId, id)
      })
    },
    headBtnsHandel(key) {
      if (key === 'add') {
        this.addOrUpdateHandle()
      }
      if (key == 'print') {
        console.log('打印');
      }
      if (key == 'upload') {
        this.importBoxVisible = true
        this.$nextTick(() => {
          this.$refs.ImportBox.init(this.modelId)
        })
      }
      if (key == 'download') {
        this.exportBoxVisible = true
        this.$nextTick(() => {
          this.$refs.ExportBox.init(this.columnData.columnList)
        })
      }
    },
    download(data) {
      let query = { ...this.listQuery, ...data }
      exportModel(this.modelId, query).then(res => {
        if (!res.data.url) return
        window.location.href = this.define.comUrl + res.data.url
        this.$refs.ExportBox.visible = false
        this.exportBoxVisible = false
      })
    },
    columnBtnsHandel(key, id, index) {
      if (key === 'edit') {
        this.addOrUpdateHandle(id)
      }
      if (key === 'detail') {
        this.detailVisible = true
        this.$nextTick(() => {
          this.$refs.Detail.init(this.formData, this.modelId, id)
        })
      }
      if (key == 'remove') {
        this.handleDel(id, index)
      }
    },
    refresh(isrRefresh) {
      this.formVisible = false
      if (isrRefresh) this.reset()
    },
    reset() {
      this.$refs.Search.reset()
    },
    search(json) {
      if (!json) this.$refs.treeBox && this.$refs.treeBox.setCurrentKey(null);
      this.listQuery.json = json
      this.listQuery.currentPage = 1
      this.initData()
    }
  }
}
</script>