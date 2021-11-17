<template>
  <transition name="el-zoom-in-center">
    <div class="JNPF-preview-main">
      <div class="JNPF-common-page-header">
        <el-page-header @back="goBack" content="写邮件" />
        <div class="options">
          <el-button type="primary" @click="dataFormSubmit(true)" :loading="sendLoading"
            :disabled="saveLoading">发 送</el-button>
          <el-button type="warning" @click="dataFormSubmit()" :loading="saveLoading"
            :disabled="sendLoading">草 稿</el-button>
          <el-button @click="goBack()">{{$t('common.cancelButton')}}</el-button>
        </div>
      </div>
      <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="100px" class="main">
        <el-form-item label="收件人" prop="recipient">
          <el-select v-model="dataForm.recipient" multiple filterable allow-create
            default-first-option placeholder="收件人" title="输入完按回车" popper-class="JNPF-select-tags">
          </el-select>
        </el-form-item>
        <el-form-item label="抄送人" prop="cc" v-if="showCC">
          <el-select v-model="dataForm.cc" multiple filterable allow-create default-first-option
            placeholder="抄送人" title="输入完按回车" popper-class="JNPF-select-tags">
          </el-select>
        </el-form-item>
        <el-form-item label="密送人" prop="bcc" v-if="showBCC">
          <el-select v-model="dataForm.bcc" multiple filterable allow-create default-first-option
            placeholder="密送人" title="输入完按回车" popper-class="JNPF-select-tags">
          </el-select>
        </el-form-item>
        <el-form-item class="add">
          <el-link @click="showCC=!showCC;dataForm.cc=[]">{{showCC?'删除抄送':'添加抄送'}}</el-link>
          &nbsp;-&nbsp;
          <el-link @click="showBCC=!showBCC;dataForm.bcc=[]">{{showBCC?'删除密送':'添加密送'}}</el-link>
        </el-form-item>
        <el-form-item label="主题" prop="subject">
          <el-input v-model="dataForm.subject" placeholder="输入主题" />
        </el-form-item>
        <el-form-item label="附件" prop="attachment">
          <UploadFile v-model="fileList" type="mail" />
        </el-form-item>
        <el-form-item label="正文" prop="bodyText">
          <JNPF-Quill v-model="dataForm.bodyText" />
        </el-form-item>
      </el-form>
    </div>
  </transition>
</template>

<script>
import { SaveSent, EmailInfo, SaveDraft } from '@/api/extend/email'
export default {
  data() {
    return {
      visible: false,
      sendLoading: false,
      saveLoading: false,
      dataForm: {
        recipient: [],
        cc: [],
        bcc: [],
        subject: '',
        bodyText: '',
        id: '',
        attachment: ""
      },
      showCC: false,
      showBCC: false,
      dataRule: {
        recipient: [
          { type: 'array', required: true, message: '收件人不能为空', trigger: 'blur' },
        ],
        cc: [
          { type: 'array', required: true, message: '抄送人不能为空', trigger: 'blur' },
        ],
        bcc: [
          { type: 'array', required: true, message: '密送人不能为空', trigger: 'blur' }
        ],
        subject: [
          { required: true, message: '主题不能为空', trigger: 'blur' }
        ],
      },
      fileList: []
    }
  },
  created() { },
  methods: {
    goBack() {
      this.$emit('close')
    },
    init(id) {
      this.$nextTick(() => {
        this.fileList = []
        this.$refs['dataForm'].resetFields()
        if (id) {
          EmailInfo(id).then(res => {
            this.dataForm = {
              recipient: res.data.recipient ? res.data.recipient.split(',') : [],
              cc: res.data.cc ? res.data.cc.split(',') : [],
              bcc: res.data.bcc ? res.data.bcc.split(',') : [],
              subject: res.data.subject,
              bodyText: res.data.bodyText,
              id: res.data.id
            }
            this.showCC = !!this.dataForm.cc.length
            this.showBCC = !!this.dataForm.bcc.length
            this.fileList = JSON.parse(res.data.attachment)
            for (let i = 0; i < this.fileList.length; i++) {
              this.$set(this.fileList[i], 'name', this.fileList[i].fileName)
            }
          })
        }
      })
    },
    dataFormSubmit(isSend) {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          isSend ? (this.sendLoading = true) : (this.saveLoading = true)
          let list = this.fileList.map(o => ({
            fileId: o.fileId || o.response.data.name,
            fileName: o.fileName || o.name,
            fileSize: o.fileSize || this.jnpf.toFileSize(o.raw.size),
            fileTime: o.fileTime || o.raw.lastModifiedDate,
            fileState: o.fileState || "success",
            fileType: o.fileType || o.raw.type
          }))
          let attachment = JSON.stringify(list)
          let data = {
            recipient: this.dataForm.recipient.join(','),
            subject: this.dataForm.subject,
            bodyText: this.dataForm.bodyText,
            attachment
          }
          if (this.showCC) data = { ...data, cc: this.dataForm.cc.join(',') }
          if (this.showBCC) data = { ...data, bcc: this.dataForm.bcc.join(',') }
          if (this.dataForm.id) data = { ...data, id: this.dataForm.id }
          const formMethod = isSend ? SaveSent : SaveDraft
          formMethod(data).then(res => {
            this.$message({
              message: res.msg,
              type: 'success',
              duration: 1500,
              onClose: () => {
                isSend ? (this.sendLoading = false) : (this.saveLoading = false)
                this.$emit('refresh', isSend)
              }
            })
          }).catch(() => { isSend ? (this.sendLoading = false) : (this.saveLoading = false) })
        }
      })
    },
  }
}
</script>
<style lang="scss" scoped>
.el-form {
  >>> .el-select {
    width: 100%;
    .el-select__tags {
      max-width: 100% !important;
    }
    .el-input__suffix {
      display: none;
    }
    .el-input__inner {
      padding-right: 0;
    }
  }
  .el-link {
    font-size: 12px;
    line-height: 1;
  }
}
</style>