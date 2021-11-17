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
          <el-button type="primary" icon="el-icon-plus" @click="synchronization()"
            v-has="'btn_sync_users'" :loading="btnLoading">同步用户</el-button>
          <div class="JNPF-common-head-right">
            <el-tooltip effect="dark" :content="$t('common.refresh')" placement="top">
              <el-link icon="icon-ym icon-ym-Refresh JNPF-common-head-icon" :underline="false"
                @click="reset()" />
            </el-tooltip>
            <screenfull />
          </div>
        </div>
        <JNPF-table v-loading="listLoading" :data="list">
          <el-table-column prop="account" label="账户" width="100" v-if="jnpf.hasP('account')" />
          <el-table-column prop="nickName" label="户名" width="100" v-if="jnpf.hasP('nickName')" />
          <el-table-column prop="gender" label="性别" width="60" v-if="jnpf.hasP('gender')">
            <template slot-scope="scope">
              {{scope.row.gender== 1? "男":"女"}}
            </template>
          </el-table-column>
          <el-table-column prop="mobilePhone" label="手机" width="100"
            v-if="jnpf.hasP('mobilePhone')" />
          <el-table-column prop="department" label="机构" width="120"
            v-if="jnpf.hasP('department')" />
          <el-table-column prop="position" label="岗位" width="180" v-if="jnpf.hasP('position')" />
          <el-table-column prop="syncState" label="同步状态" v-if="jnpf.hasP('syncState')">
            <template slot-scope="scope">
              <el-tag type="success" v-if="scope.row.syncState">同步成功</el-tag>
              <el-tag type="info" v-else>未同步</el-tag>
              <!-- <el-tag type="danger" v-else>同步失败</el-tag> -->
            </template>
          </el-table-column>
          <el-table-column prop="enabledMark" label="提交状态" v-if="jnpf.hasP('enabledMark')">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.enabledMark  == 1">正常</el-tag>
              <el-tag type="danger" v-else-if="scope.row.enabledMark  == 0">停用</el-tag>
              <el-tag type="info" v-else>未激活</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="description" label="备注" v-if="jnpf.hasP('description')" />
        </JNPF-table>
      </div>
    </div>
  </div>
</template>

<script>
import { QYUserList, QYUserSynchronization } from '@/api/weChat/QY'
export default {
  name: 'weChat-qyUser',
  data() {
    return {
      keyword: '',
      listLoading: true,
      btnLoading: false,
      list: []
    }
  },
  created() {
    this.initData()
  },
  methods: {
    initData() {
      this.listLoading = true
      let query = { keyword: this.keyword }
      QYUserList(query).then(res => {
        this.list = res.data.list
        this.listLoading = false
      })
    },
    synchronization() {
      this.$confirm('您确定要同步用户, 是否继续?', '提示', {
        type: 'warning'
      }).then(() => {
        this.btnLoading = true
        QYUserSynchronization().then(res => {
          this.$message({
            type: 'success',
            message: res.msg
          });
          this.btnLoading = false
          this.reset()
        }).catch(() => { this.btnLoading = false })
      }).catch(() => { });
    },
    search() {
      this.initData()
    },
    reset() {
      this.keyword = ''
      this.search()
    }
  }
}
</script>