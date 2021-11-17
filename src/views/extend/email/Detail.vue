<template>
  <transition name="el-zoom-in-center">
    <div class="JNPF-preview-main">
      <div class="JNPF-common-page-header">
        <el-page-header @back="goBack" :content="isSend?'查看邮件 - 已发送':'查看邮件 - 收件箱'" />
        <div class="options">
          <el-button @click="goBack()">{{$t('common.cancelButton')}}</el-button>
        </div>
      </div>
      <el-form ref="dataForm" :model="dataForm" label-width="80px" size="mini" v-loading="loading"
        class="main">
        <el-form-item label-width="10px">
          <h4 class="text">{{dataForm.subject}}</h4>
        </el-form-item>
        <el-divider></el-divider>
        <el-form-item label="发件人">
          <el-link :underline="false" class="text" type="success">
            {{isSend?dataForm.sender: dataForm.senderName + "&lt;" + dataForm.sender + ">"}}
          </el-link>
        </el-form-item>
        <el-divider></el-divider>
        <el-form-item label="时间">
          <p class="text" v-if="isSend">{{dataForm.creatorTime|toDate()}}</p>
          <p class="text" v-if="!isSend">{{dataForm.date|toDate()}}</p>
        </el-form-item>
        <el-divider></el-divider>
        <el-form-item label="收件人">
          <p class="text">{{ isSend?dataForm.recipient:dataForm.mAccount}}</p>
        </el-form-item>
        <el-divider></el-divider>
        <template v-if="dataForm.cc">
          <el-form-item label="抄送人" prop="cc">
            <p>{{dataForm.cc}}</p>
          </el-form-item>
          <el-divider></el-divider>
        </template>
        <template v-if="dataForm.bcc">
          <el-form-item label="密送人" prop="bcc">
            <p class="text">{{dataForm.bcc}}</p>
          </el-form-item>
          <el-divider></el-divider>
        </template>
        <template v-if="fileList.length">
          <el-form-item label="附件">
            <ul class="el-upload-list el-upload-list--text">
              <li class="el-upload-list__item" v-for="(item,i) in fileList" :key="i"
                @click="download(item.fileId)">
                <a class="el-upload-list__item-name"><i
                    class="el-icon-document"></i>{{item.fileName}}
                </a>
              </li>
            </ul>
          </el-form-item>
          <el-divider></el-divider>
        </template>
        <el-form-item label-width="10px">
          <p class="content" v-html="dataForm.bodyText"></p>
        </el-form-item>
      </el-form>
    </div>
  </transition>
</template>

<script>
import { getDownloadUrl } from '@/api/common'
import { EmailInfo } from '@/api/extend/email'
export default {
  data() {
    return {
      isSend: false,
      dataForm: {
        recipient: '',
        cc: '',
        bcc: '',
        subject: '',
        bodyText: '',
        id: '',
        sender: '',
        senderName: '',
        creatorTime: '',
        date: '',
      },
      fileList: [],
      loading: false
    }
  },
  methods: {
    goBack() {
      this.$emit('close')
    },
    init(id, isSend, index) {
      this.isSend = isSend
      this.loading = true
      if (id) {
        EmailInfo(id).then(res => {
          this.dataForm = res.data
          this.fileList = JSON.parse(res.data.attachment)
          this.loading = false
          if (!isSend) this.$emit('setRead', index)
        })
      }
    },
    download(id) {
      getDownloadUrl('mail', id).then(res => {
        if (res.data.url) window.location.href = this.define.comUrl + res.data.url
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.el-form {
  >>> .el-form-item {
    margin-bottom: 0;
  }
  >>> .el-divider--horizontal {
    margin: 5px 0;
  }
  .text {
    word-break: break-all;
  }
  h4.text {
    font-size: 15px;
  }
  >>> .el-upload-list__item:first-child {
    margin-top: 3px;
  }
}
</style>