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
          <topOpts @add="handleCrateBackup()" addText="创建备份"></topOpts>
          <div class="JNPF-common-head-right">
            <el-tooltip effect="dark" :content="$t('common.refresh')" placement="top">
              <el-link icon="icon-ym icon-ym-Refresh JNPF-common-head-icon" :underline="false"
                @click="reset()" />
            </el-tooltip>
            <screenfull />
          </div>
        </div>
        <JNPF-table v-loading="listLoading" :data="tableList">
          <el-table-column prop="fileName" label="文件名" sortable show-overflow-tooltip
            v-if="jnpf.hasP('fileName')" />
          <el-table-column prop="fileSize" label="文件大小" sortable width="120"
            v-if="jnpf.hasP('fileSize')" />
          <el-table-column prop="creatorTime" :formatter="jnpf.tableDateFormat" sortable
            label="备份时间" width="120" v-if="jnpf.hasP('creatorTime')" />
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <tableOpts @del="handleDel(scope.row.id)">
                <el-button type="text" @click="handleDownload(scope.row.fileUrl)"
                  v-has="'btn_download'">下载</el-button>
              </tableOpts>
            </template>
          </el-table-column>
        </JNPF-table>
        <pagination :total="total" :page.sync="params.currentPage" :limit.sync="params.pageSize"
          @pagination="initData" />
      </div>
    </div>
  </div>
</template>

<script>
import { getDataBackupList, createDataBackup, delDataBackup } from '@/api/systemData/dataBackup'

export default {
  name: 'systemData-dataBackup',
  data() {
    return {
      params: {
        keyword: '',
        currentPage: 1,
        pageSize: 20
      },
      tableList: [],
      total: 0,
      btnLoading: false,
      listLoading: true
    }
  },
  created() {
    this.initData()
  },
  methods: {
    initData() {
      this.listLoading = true
      getDataBackupList(this.params).then(res => {
        this.tableList = res.data.list
        this.total = res.data.pagination.total
        this.listLoading = false
        this.btnLoading = false
      }).catch(() => {
        this.listLoading = false
        this.btnLoading = false
      })
    },
    handleCrateBackup() {
      this.$confirm('您确定要备份数据库吗, 是否继续？', '提示', {
        type: 'warning'
      }).then(() => {
        createDataBackup().then(res => {
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
    handleDel(id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        type: 'warning'
      }).then(() => {
        delDataBackup(id).then(res => {
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
    handleDownload(fileUrl) {
      if (!fileUrl) return
      window.location.href = this.define.comUrl + fileUrl
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
    }
  }
}
</script>
