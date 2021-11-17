<template>
  <el-dialog title="查看消息" :close-on-click-modal="false" :visible.sync="visible"
    class="JNPF-dialog JNPF-dialog_center" lock-scroll width="80%">
    <div class="notice-wapper" v-loading="loading">
      <h1 class="title">{{info.title}}</h1>
      <div class="info">
        <span>{{info.lastModifyTime|toDate()}}</span><span>{{info.creatorUser}}</span>
      </div>
      <div class="main" v-html="info.bodyText"></div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">{{$t('common.cancelButton')}}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { ReadInfo } from '@/api/system/message'
export default {
  data() {
    return {
      visible: false,
      loading: false,
      info: {}
    }
  },
  methods: {
    init(id) {
      this.visible = true
      this.loading = true
      ReadInfo(id).then(res => {
        this.info = res.data
        this.loading = false
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.JNPF-dialog {
  >>> .el-dialog__body {
    min-height: 500px;
    padding: 0 20px !important;
  }
  .notice-wapper {
    .title {
      font-size: 18px;
      font-weight: normal;
      text-align: center;
    }
    .info {
      line-height: 35px;
      border-bottom: 1px solid #dcdfe6;
      text-align: center;
      span {
        padding: 0 10px;
      }
    }
    .main {
      padding: 20px 10px 0 10px;
      line-height: 1.5;
      * {
        line-height: 1.5;
      }
    }
  }
}
</style>