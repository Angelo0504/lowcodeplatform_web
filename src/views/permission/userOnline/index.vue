<template>
  <div class="JNPF-common-layout JNPF-flex-main">
    <div class="JNPF-common-layout-center">
      <el-row class="JNPF-common-search-box" :gutter="16">
        <el-form @submit.native.prevent>
          <el-col :span="6">
            <el-form-item :label="$t('common.keyWord')">
              <el-input v-model="params.keyword" :placeholder="$t('common.enterKeyword')" clearable
                @change="initData()" />
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
      <div class="JNPF-common-layout-main">
        <div class="JNPF-common-head">
          <div></div>
          <div class="JNPF-common-head-right">
            <el-tooltip effect="dark" :content="$t('common.refresh')" placement="top">
              <el-link icon="icon-ym icon-ym-Refresh JNPF-common-head-icon" :underline="false"
                @click="reset()" />
            </el-tooltip>
            <screenfull />
          </div>
        </div>
        <JNPF-table v-loading="listLoading" :data="tableDataList" max-height="100%">
          <el-table-column prop="userName" label="用户名" width="120" v-if="jnpf.hasP('userName')" />
          <el-table-column prop="loginIPAddress" label="IP" width="120"
            v-if="jnpf.hasP('loginIPAddress')" />
          <el-table-column prop="loginTime" label="登录时间" width="150"
            v-if="jnpf.hasP('loginTime')" />
          <el-table-column prop="loginPlatForm" label="登录设备" show-overflow-tooltip
            v-if="jnpf.hasP('loginPlatForm')" />
          <el-table-column label="操作" width="90">
            <template slot-scope="scope">
              <el-button slot="reference" type="text" class="JNPF-table-delBtn"
                @click="handleDel(scope.row.userId)" v-has="'btn_remove'">
                {{$t('userOnline.forcedOffline')}}
              </el-button>
            </template>
          </el-table-column>
        </JNPF-table>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getOnlineUser,
  deleteOnlineUser
} from '@/api/permission/onlineUser'

export default {
  name: 'permission-userOnline',
  data() {
    return {
      formVisible: false,
      tableDataList: [],
      refreshLoading: false,
      listLoading: true,
      params: {
        keyword: ''
      }
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
      let query = {
        ...this.listQuery,
        keyword: this.keyword
      }
      getOnlineUser(this.params).then(res => {
        this.tableDataList = res.data
        this.listLoading = false
        this.refreshLoading = false
      }).catch(() => {
        this.listLoading = false
        this.refreshLoading = false
      })
    },
    handleDel(userId) {
      this.$confirm(this.$t(`userOnline.cancelAccountTip`), this.$t(`common.tipTitle`), {
        type: 'warning'
      }).then(() => {
        deleteOnlineUser(userId).then(res => {
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
    }
  }
}
</script>
