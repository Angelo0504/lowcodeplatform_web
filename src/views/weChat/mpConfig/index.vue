<template>
  <div class="app-container JNPF-flex-main systemConfig">
    <el-tabs v-model="activeName" type="border-card" class="JNPF-el_tabs">
      <el-tab-pane label="微信公众号配置" name="first">
        <el-form ref="baseForm" :model="baseForm" label-width="100px" size="medium"
          style="width: 50%">
          <el-form-item label="公众号Id">
            <el-input v-model="baseForm.wx_GZH_APPID" clearable />
          </el-form-item>
          <el-form-item label="应用密钥">
            <el-input v-model="baseForm.wx_GZH_APPSECRET" clearable />
          </el-form-item>
          <el-form-item label="服务器地址">
            <el-input v-model="baseForm.wx_GZH_URL" clearable />
          </el-form-item>
          <el-form-item label="令牌Token">
            <el-input v-model="baseForm.wx_GZH_TOKEN" clearable />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small" :loading="btnLoading" class="saveBtn"
              @click="submitForm('baseForm')" v-has="'btn_save'">保 存</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import {
  getMPConfig,
  updateMPConfig,
} from '@/api/weChat/config'

export default {
  name: 'weChat-mpConfig',
  data() {
    return {
      activeName: 'first',
      listLoading: false,
      btnLoading: false,
      baseForm: {
        wx_GZH_APPID: '',
        wx_GZH_APPSECRET: '',
        wx_GZH_URL: '',
        wx_GZH_TOKEN: ''
      }
    }
  },
  created() {
    this.initData()
  },
  methods: {
    initData() {
      this.listLoading = true
      this.$nextTick(() => {
        getMPConfig().then(res => {
          this.baseForm = res.data
          this.listLoading = false
        }).catch(() => {
          this.listLoading = false
        })
      })
    },
    submitForm: function () {
      this.$refs['baseForm'].validate((valid) => {
        if (valid) {
          this.btnLoading = true
          updateMPConfig(this.baseForm).then(res => {
            this.$message({
              message: res.msg,
              type: 'success',
              duration: 1500,
              onClose: () => {
                this.btnLoading = false
                this.initData()
              }
            })
          }).catch(() => {
            this.btnLoading = false
          })
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.systemConfig {
  padding: 0;
  >>> .el-card__header {
    padding: 6px 20px;
  }
  >>> .el-tabs--border-card > .el-tabs__content {
    padding: 30px 36px 10px 36px;
    overflow: hidden;
  }
  .saveBtn {
    width: 100px;
  }
}
</style>
