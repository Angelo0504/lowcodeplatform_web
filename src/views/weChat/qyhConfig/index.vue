<template>
  <div class="app-container JNPF-flex-main systemConfig">
    <el-tabs v-model="activeName" type="border-card" class="JNPF-el_tabs">
      <el-tab-pane label="微信企业号配置" name="first">
        <el-form ref="baseForm" :model="baseForm" label-width="90px" size="medium"
          style="width: 50%">
          <el-form-item label="企业号Id">
            <el-input v-model="baseForm.qyh_CorpId" clearable />
          </el-form-item>
          <el-form-item label="凭证密钥">
            <el-input v-model="baseForm.qyh_CorpSecret" clearable />
          </el-form-item>
          <el-form-item label="应用凭证">
            <el-input v-model="baseForm.qyh_AgentSecret" clearable />
          </el-form-item>
          <el-form-item label="应用编码">
            <el-input v-model="baseForm.qyh_AgentId" clearable />
          </el-form-item>
          <el-form-item label="邀请标题">
            <el-input v-model="baseForm.qyh_JoinTitle" clearable />
          </el-form-item>
          <el-form-item label="邀请链接">
            <el-input v-model="baseForm.qyh_JoinUrl" clearable />
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
  getQYHConfig,
  updateQYHConfig,
} from '@/api/weChat/config'

export default {
  name: 'weChat-qyhConfig',
  data() {
    return {
      activeName: 'first',
      listLoading: false,
      btnLoading: false,
      baseForm: {
        qyh_CorpId: '',
        qyh_CorpSecret: '',
        qyh_AgentSecret: '',
        qyh_AgentId: '',
        qyh_JoinTitle: '',
        qyh_JoinUrl: ''
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
        getQYHConfig().then(res => {
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
          updateQYHConfig(this.baseForm).then(res => {
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