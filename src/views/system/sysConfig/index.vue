<template>
  <div class="app-container JNPF-flex-main systemConfig">
    <el-form ref="baseForm" :model="baseForm" label-width="90px">
      <el-tabs v-model="activeName" type="border-card" class="JNPF-el_tabs">
        <el-tab-pane label="基本设置" name="first">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="系统名称" prop="sysName">
                <el-input v-model="baseForm.sysName" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="系统版本" prop="sysVersion">
                <el-input v-model="baseForm.sysVersion" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="公司名称" prop="companyName">
                <el-input v-model="baseForm.companyName" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="版权信息" prop="copyright">
                <el-input v-model="baseForm.copyright" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="公司简称" prop="companyCode">
                <el-input v-model="baseForm.companyCode" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="公司地址" prop="companyAddress">
                <el-input v-model="baseForm.companyAddress" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="公司法人" prop="companyContacts">
                <el-input v-model="baseForm.companyContacts" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="公司电话" prop="companyTelePhone">
                <el-input v-model="baseForm.companyTelePhone" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="公司邮箱" prop="companyEmail">
                <el-input v-model="baseForm.companyEmail" clearable />
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="系统描述" prop="sysDescription">
                <el-input v-model="baseForm.sysDescription" type="textarea" :rows="6" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" size="small" :loading="btnLoading" class="saveBtn"
                  @click="submitForm()" v-has="'btn_save'">保 存</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="安全设置" name="second">
          <el-alert title="注意：系统登录安全、黑名单IP限制" type="warning" :closable="false" show-icon />
          <el-row>
            <el-col :span="18">
              <el-divider content-position="left">登录设置</el-divider>
              <el-form-item label="单一登录">
                <el-select v-model="baseForm.singleLogin" placeholder="请选择">
                  <el-option label="后登录踢出先登录" value="1" />
                </el-select>
              </el-form-item>
              <el-form-item label="超时登出">
                <el-input-number v-model="baseForm.tokenTimeout" :min="1" :precision="0" :step="1"
                  controls-position="right" /> 分钟
              </el-form-item>
              <el-form-item label="上次登录">
                <el-switch v-model="baseForm.lastLoginTimeSwitch" :active-value="1"
                  :inactive-value="0" />
              </el-form-item>
              <el-form-item>
                <el-card class="box-card" shadow="never" style="width: 300px;"
                  :body-style="{ padding: '0px 20px' }">
                  <div slot="header">
                    <span>上次登录信息提示</span>
                    <i style="float: right; padding: 11px 0" class="el-icon-close" />
                  </div>
                  <div class="item">
                    <p>时间：2018-10-17 12:40</p>
                    <p>地点：上海市</p>
                    <p>IP：255.255.0.0</p>
                  </div>
                </el-card>
              </el-form-item>
              <el-divider content-position="left">访问设置</el-divider>
              <el-form-item label="开启验证">
                <el-switch v-model="baseForm.whitelistSwitch" :active-value="1"
                  :inactive-value="0" />
              </el-form-item>
              <el-form-item label="允许访问IP">
                <el-input v-model="baseForm.whitelistIP" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" size="small" :loading="btnLoading" class="saveBtn"
                  @click="submitForm()" v-has="'btn_save'">保 存</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="邮箱设置" name="third">
          <el-alert title="注意：系统邮件设置成功后所有邮件会由此邮箱发出" type="warning" :closable="false" show-icon />
          <el-row :gutter="20" style="margin-top: 15px">
            <el-col :span="12">
              <el-form-item label="POP3服务" prop="emailPOP3Host">
                <el-input v-model="baseForm.emailPOP3Host" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="SMTP服务" prop="emailSMTPHost">
                <el-input v-model="baseForm.emailSMTPHost" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="POP3端口" prop="emailPOP3Port">
                <el-input-number v-model="baseForm.emailPOP3Port" controls-position="right" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="SMTP端口" prop="emailSMTPPort">
                <el-input-number v-model="baseForm.emailSMTPPort" controls-position="right" />
              </el-form-item>
            </el-col>
            <el-col :span="12" :offset="6" :pull="6">
              <el-form-item label="显示名称">
                <el-input v-model="baseForm.emailSenderName" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="12" :offset="6" :pull="6">
              <el-form-item label="邮箱账户" prop="emailAccount">
                <el-input v-model="baseForm.emailAccount" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="12" :offset="6" :pull="6">
              <el-form-item label="邮箱密码" prop="emailPassword">
                <el-input v-model="baseForm.emailPassword" show-password>
                  <el-button slot="append" @click="checkEmailStauts" :loading="testLoading">测试连接
                  </el-button>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="SSL登录" prop="emailSsl">
                <el-switch v-model="baseForm.emailSsl" :active-value="1" :inactive-value="0" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" size="small" :loading="btnLoading" class="saveBtn"
                  @click="submitForm()" v-has="'btn_save'">保 存</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="短信设置" name="fourth">
          <el-alert title="注意：请在短信厂家官网网站开通申请" type="warning" :closable="false" show-icon />
          <el-row style="margin-top: 15px">
            <el-col :span="12">
              <el-form-item label="短信厂家" prop="smsCompany" label-width="120px">
                <el-radio-group v-model="baseForm.smsCompany">
                  <el-radio-button label="1">阿里</el-radio-button>
                  <el-radio-button label="2">腾讯</el-radio-button>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="accessKeyId" prop="accessKeyId" label-width="120px">
                <el-input v-model="baseForm.accessKeyId" clearable />
              </el-form-item>
              <el-form-item label="accessKeySecret" prop="accessKeySecret" label-width="120px">
                <el-input v-model="baseForm.accessKeySecret" show-password clearable />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" size="small" :loading="btnLoading" class="saveBtn"
                  @click="submitForm()" v-has="'btn_save'">保 存</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </el-form>
  </div>
</template>

<script>
import {
  getSystemConfig,
  updateSystemConfig,
  testEmail
} from '@/api/system/sysConfig'

export default {
  name: 'system-sysConfig',
  data() {
    return {
      activeName: 'first',
      listLoading: false,
      btnLoading: false,
      testLoading: false,
      baseForm: {
        sysName: '',
        sysDescription: '',
        sysVersion: '',
        copyright: '',
        companyName: '',
        companyCode: '',
        companyAddress: '',
        companyContacts: '',
        companyTelePhone: '',
        companyEmail: '',
        singleLogin: '1',
        tokenTimeout: '1',
        lastLoginTimeSwitch: 1,
        whitelistSwitch: 1,
        whitelistIP: '',
        emailPOP3Host: '',
        emailPOP3Port: '110',
        emailSMTPHost: '',
        emailSMTPPort: '25',
        emailSenderName: '',
        emailAccount: '',
        emailPassword: '',
        emailSsl: 0,
        smsCompany: '1',
        accessKeyId: '',
        accessKeySecret: '',
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
        getSystemConfig().then(res => {
          this.baseForm = res.data
          this.listLoading = false
        }).catch(() => {
          this.listLoading = false
        })
      })
    },
    checkEmailStauts() {
      this.$refs['baseForm'].validate((valid) => {
        if (valid) {
          this.testLoading = true
          const data = {
            account: this.baseForm.emailAccount,
            password: this.baseForm.emailPassword,
            pop3Host: this.baseForm.emailPOP3Host,
            pop3Port: this.baseForm.emailPOP3Port,
            smtpHost: this.baseForm.emailSMTPHost,
            smtpPort: this.baseForm.emailSMTPPort,
            ssl: this.baseForm.emailSsl
          }
          testEmail(data).then(res => {
            this.$message({
              message: res.msg,
              type: 'success',
              duration: 1500,
              onClose: () => {
                this.testLoading = false
              }
            })
          }).catch(() => {
            this.testLoading = false
          })
        }
      })
    },
    submitForm() {
      this.$refs['baseForm'].validate((valid) => {
        if (valid) {
          const data = { ...this.baseForm }
          this.btnLoading = true
          updateSystemConfig(data).then(res => {
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
  >>> .el-tabs--border-card {
    box-shadow: none;
    height: calc(100vh - 120px);
  }
  >>> .el-tabs--border-card > .el-tabs__content {
    padding: 30px 36px 10px 36px;
  }
  .saveBtn {
    width: 100px;
  }
}
</style>
