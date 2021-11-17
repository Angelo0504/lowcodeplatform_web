<template>
  <el-dialog title="查看公告" :close-on-press-escape="false" :close-on-click-modal="false"
    :visible.sync="visible" class="JNPF-dialog JNPF-dialog_center" lock-scroll width="80%">
    <div class="notice-wapper">
      <h1 class="title">{{dataForm.title}}</h1>
      <div class="info">
        <span>{{dateFormat(dataForm.lastModifyTime)}}</span><span>{{dataForm.creatorUser}}</span>
      </div>
      <div class="main" v-html="dataForm.bodyText"></div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">{{$t('common.cancelButton')}}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getNoticeInfo } from '@/api/system/message'

export default {
  data() {
    return {
      visible: false,
      loading: false,
      dataForm: {
        id: '',
        title: '',
        creatorUser: '',
        creatorTime: Number,
        bodyText: ''
      }
    }
  },
  methods: {
    init(id) {
      this.dataForm.id = id
      this.visible = true
      this.loading = true
      this.$nextTick(() => {
        getNoticeInfo(this.dataForm.id).then(res => {
          this.dataForm = res.data
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
      })
    },
    dateFormat(date) {
      return this.jnpf.dateFormat(date)
    },
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
      line-height: 22px;
    }
  }
}
</style>
