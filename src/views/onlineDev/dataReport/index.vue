<template>
  <div class="JNPF-common-layout">
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
          <topOpts addText="新建报表" @add="handleAddEdit()" />
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
          <el-table-column prop="fullName" label="报表名称" v-if="jnpf.hasP('fullName')">
            <template slot-scope="scope">
              <span v-if="scope.row.top" style="font-weight:bold;">
                {{scope.row.fullName}}【{{scope.row.count}}】
              </span>
              <span v-else>{{ scope.row.fullName }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="enCode" label="编码" v-if="jnpf.hasP('enCode')">
            <template slot-scope="scope">
              <span v-if="!scope.row.top">{{ scope.row.enCode }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="creatorUser" label="创建人" width="120"
            v-if="jnpf.hasP('creatorUser')">
            <template slot-scope="scope">
              <span v-if="!scope.row.top">{{scope.row.creatorUser}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="creatorTime" label="创建时间" :formatter="jnpf.tableDateFormat"
            width="120" v-if="jnpf.hasP('creatorTime')" />
          <el-table-column prop="lastModifyUser" label="修改人" width="120"
            v-if="jnpf.hasP('lastModifyUser')">
            <template slot-scope="scope">
              <span v-if="!scope.row.top">{{scope.row.lastModifyUser}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="lastModifyTime" label="最后修改时间" :formatter="jnpf.tableDateFormat"
            width="120" v-if="jnpf.hasP('lastModifyTime')" />
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
                      @click.native="handlePreview(scope.row.id, scope.row.fullName)"
                      v-has="'btn_preview'">预览</el-dropdown-item>
                    <el-dropdown-item @click.native="handleExport(scope.row.id,'pdf')"
                      v-has="'btn_preview'">导出PDF</el-dropdown-item>
                    <el-dropdown-item @click.native="handleExport(scope.row.id,'excel')"
                      v-has="'btn_exportExcel'">导出Excel</el-dropdown-item>
                    <el-dropdown-item @click.native="handleExport(scope.row.id,'word')"
                      v-has="'btn_exportWord'">导出Word</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </tableOpts>
            </template>
          </el-table-column>
        </JNPF-table>
      </div>
    </div>
    <Form v-if="formVisible" ref="Form" @refreshDataList="initData" />
    <Preview v-show="previewVisible" ref="Preview" @close="previewVisible=false" />
  </div>
</template>
<script>
import {
  getDataReportList,
  delDataReport
} from '@/api/onlineDev/dataReport'
import { reportServer } from '@/utils/define'
import Form from './Form'
import Preview from './Preview'

export default {
  components: {
    Form,
    Preview
  },
  name: 'onlineDev-dataReport',
  data() {
    return {
      defaultProps: {
        children: 'children',
        label: 'fullName'
      },
      params: {
        keyword: ''
      },
      listLoading: false,
      btnLoading: false,
      formVisible: false,
      previewVisible: false,
      tableList: [],
      reportTypeList: [],
      tableListAll: [],
    }
  },
  created() {
    this.getDictionaryData()
  },
  methods: {
    initData() {
      this.listLoading = true
      // 列表
      getDataReportList(this.params).then(res => {
        this.tableList = res.data.list
        this.tableListAll = JSON.parse(JSON.stringify(this.reportTypeList))
        for (let i = 0; i < this.tableListAll.length; i++) {
          let child = this.tableList.filter(o => this.tableListAll[i].id === o.categoryId)
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
      this.$store.dispatch('base/getDictionaryData', { sort: 'ReportSort' }).then(res => {
        this.reportTypeList = JSON.parse(JSON.stringify(res))
        this.initData()
      })
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
        delDataReport(id).then(res => {
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
    handlePreview(id) {
      this.previewVisible = true
      this.$nextTick(() => {
        this.$refs.Preview.init(id)
      })
    },
    handleExport(id, type) {
      let link = document.createElement('a')
      link.href = `${reportServer}/api/DataReport/${id}/Actions/Export/${type}`
      link.click();
    },
    search() {
      this.getDictionaryData()
    },
    reset() {
      this.params.keyword = ''
      this.search()
    }
  }
}
</script>
