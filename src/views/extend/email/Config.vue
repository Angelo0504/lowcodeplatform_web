<template>
  <el-dialog title="邮箱配置" :close-on-click-modal="false" :visible.sync="visible"
    class="JNPF-dialog JNPF-dialog_center" lock-scroll width="600px">
    <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="100px">
      <el-form-item label="POP3服务" prop="pop3Host">
        <el-input v-model="dataForm.pop3Host" placeholder="POP3服务" />
      </el-form-item>
      <el-form-item label="POP3端口" prop="pop3Port">
        <el-input-number v-model="dataForm.pop3Port" controls-position="right"></el-input-number>
      </el-form-item>
      <el-form-item label="SMTP服务" prop="smtpHost">
        <el-input v-model="dataForm.smtpHost" placeholder="SMTP服务" />
      </el-form-item>
      <el-form-item label="SMTP端口" prop="smtpPort">
        <el-input-number v-model="dataForm.smtpPort" controls-position="right"></el-input-number>
      </el-form-item>
      <el-form-item label="显示名称" prop="senderName">
        <el-input v-model="dataForm.senderName" placeholder="显示名称" />
      </el-form-item>
      <el-form-item label="邮箱地址" prop="account">
        <el-input v-model="dataForm.account" placeholder="邮箱地址" />
      </el-form-item>
      <el-form-item label="邮箱密码" prop="password">
        <el-input v-model="dataForm.password" placeholder="邮箱密码">
          <el-button slot="append" @click="test" :loading="testLoad">测试连接</el-button>
        </el-input>
      </el-form-item>
      <el-form-item label="SSL登录" prop="emailSsl">
        <el-switch v-model="dataForm.emailSsl" :active-value="1" :inactive-value="0">
        </el-switch>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">{{$t('common.cancelButton')}}</el-button>
      <el-button type="primary" @click="dataFormSubmit()">{{$t('common.confirmButton')}}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { ConfigInfo, CheckMail, SaveConfig } from '@/api/extend/email'
export default {
  data() {
    return {
      visible: false,
      testLoad: false,
      dataForm: {
        pop3Host: '',
        pop3Port: null,
        smtpHost: '',
        smtpPort: null,
        senderName: '',
        account: '',
        password: '',
        emailSsl: 0
      },
      dataRule: {
        pop3Host: [
          { required: true, message: 'POP3服务不能为空', trigger: 'blur' }
        ],
        pop3Port: [
          { required: true, message: 'POP3端口不能为空', trigger: 'blur' }
        ],
        smtpHost: [
          { required: true, message: 'SMTP服务不能为空', trigger: 'blur' }
        ],
        smtpPort: [
          { required: true, message: 'SMTP端口不能为空', trigger: 'blur' }
        ],
        senderName: [
          { required: true, message: '显示名称不能为空', trigger: 'blur' }
        ],
        account: [
          { required: true, message: '邮箱地址不能为空', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '邮箱密码不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    init() {
      this.visible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        ConfigInfo().then(res => {
          if (!res.data) return
          this.dataForm = res.data
        })
      })
    },
    dataFormSubmit() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          SaveConfig(this.dataForm).then(res => {
            this.$message({
              message: res.msg,
              type: 'success',
              duration: 1500,
              onClose: () => {
                this.visible = false
              }
            })
          })
        }
      })
    },
    test() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.testLoad = true
          CheckMail(this.dataForm).then(res => {
            this.$message({
              message: res.msg,
              type: 'success',
              duration: 1500,
            })
            this.testLoad = false
          }).catch(() => {
            this.testLoad = false
          })
        }
      })
    }
  }
}
</script>