<template>
  <div class="JNPF-common-layout">
    <div class="JNPF-common-layout-center">
      <el-row class="JNPF-common-search-box" :gutter="16">
        <el-form @submit.native.prevent>
          <el-col :span="6">
            <el-form-item label="关键词">
              <el-input v-model="keyword" placeholder="请输入关键词查询" clearable />
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
        <div class="JNPF-common-head">
          <el-button type="primary" icon="el-icon-plus" @click="synchronization()"
            v-has="'btn_sync_department'" :loading="btnLoading">同步部门</el-button>
          <div class="JNPF-common-head-right">
            <el-tooltip effect="dark" :content="$t('common.refresh')" placement="top">
              <el-link icon="icon-ym icon-ym-Refresh JNPF-common-head-icon" :underline="false"
                @click="reset()" />
            </el-tooltip>
            <screenfull />
          </div>
        </div>
        <JNPF-table v-loading="listLoading" row-key="id" :data="treeData" default-expand-all
          :tree-props="{children: 'children', hasChildren: ''}">
          <el-table-column prop="fullName" label="名称" v-if="jnpf.hasP('fullName')" />
          <el-table-column prop="enCode" label="编码" width="200" v-if="jnpf.hasP('enCode')" />
          <el-table-column prop="category" label="分类" width="100" v-if="jnpf.hasP('category')" />
          <el-table-column prop="syncState" label="状态" width="100" v-if="jnpf.hasP('syncState')">
            <template slot-scope="scope">
              <el-tag type="success" v-if="scope.row.syncState ">同步成功</el-tag>
              <el-tag type="info" v-else>未同步</el-tag>
              <!-- <el-tag type="danger" v-else>同步失败</el-tag> -->
            </template>
          </el-table-column>
          <el-table-column prop="submitState" label="提交状态" width="100"
            v-if="jnpf.hasP('submitState')" />
          <el-table-column prop="description" label="备注" v-if="jnpf.hasP('description')" />
        </JNPF-table>
      </div>
    </div>
  </div>
</template>

<script>
import { QYDepartmentList, QYDSynchronization } from '@/api/weChat/QY'
export default {
  name: 'weChat-qyDepartment',
  data() {
    return {
      keyword: '',
      listLoading: true,
      btnLoading: false,
      treeData: []
    }
  },
  created() {
    this.initData()
  },
  methods: {
    reset() {
      this.keyword = ''
      this.initData()
    },
    initData() {
      this.listLoading = true
      let query = { keyword: this.keyword }
      QYDepartmentList(query).then(res => {
        this.treeData = res.data.list
        this.listLoading = false
      })
    },
    synchronization() {
      this.$confirm('您确定要同步部门, 是否继续?', '提示', {
        type: 'warning'
      }).then(() => {
        this.btnLoading = true
        QYDSynchronization().then(res => {
          this.$message({
            type: 'success',
            message: res.msg
          });
          this.keyword = ''
          this.btnLoading = false
          this.initData()
        }).catch(() => { this.btnLoading = false })
      }).catch(() => { });
    }
  }
}
</script>