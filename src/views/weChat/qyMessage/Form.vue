<template>
  <transition name="el-zoom-in-center">
    <div class="JNPF-preview-main">
      <div class="JNPF-common-page-header">
        <el-page-header @back="goBack" content="消息发送" />
        <div class="options">
          <el-button type="primary" @click="dataFormSubmit()" :loading="btnLoading">发 送
          </el-button>
          <el-button @click="goBack()">{{$t('common.cancelButton')}}</el-button>
        </div>
      </div>
      <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="100px" class="main">
        <el-alert title="注意：" type="warning" :closable="false">
          <div class="tips">
            <p>图片（image）：5B ~ 2MB，支持JPG,PNG格式</p>
            <p>语音（voice） ：2MB，播放长度不超过60s，仅支持AMR格式</p>
            <p>视频（video） ：10MB，支持MP4格式</p>
            <p>普通文件（file）：20MB</p>
          </div>
        </el-alert>
        <el-form-item label="消息类别" prop="msgType" class="mt-10">
          <el-radio-group v-model="dataForm.msgType" @change="dataForm.fileJson=''">
            <el-radio :label="1">文本</el-radio>
            <el-radio :label="2">图片</el-radio>
            <el-radio :label="3">语音</el-radio>
            <el-radio :label="4">视频</el-radio>
            <el-radio :label="5">文件</el-radio>
            <el-radio :label="6">图文</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="全部成员" prop="all">
          <el-switch v-model="dataForm.all" :active-value="1" :inactive-value="0"
            @change="switchChange" />
        </el-form-item>
        <el-form-item label="发送范围" prop="toUserId" v-if="!dataForm.all">
          <JNPF-TreeSelect :options="treeData" v-model="dataForm.toUserId" placeholder="发送范围"
            multiple clearable></JNPF-TreeSelect>
        </el-form-item>
        <el-form-item label="文本内容" prop="txtContent" v-if="dataForm.msgType==1">
          <el-input v-model="dataForm.txtContent" placeholder="文本内容" type="textarea" :rows="3" />
        </el-form-item>
        <el-form-item label="上传图片" v-if="dataForm.msgType==2" prop="fileJson">
          <UploadFileSingle v-model="dataForm.fileJson" type="weixin" accept=".jpg,.png" />
        </el-form-item>
        <el-form-item label="上传语音" v-if="dataForm.msgType==3" prop="fileJson">
          <UploadFileSingle v-model="dataForm.fileJson" type="weixin" accept=".amr" />
        </el-form-item>
        <template v-if="dataForm.msgType==4">
          <el-form-item label="视频描述" prop="txtContent">
            <el-input v-model="dataForm.txtContent" placeholder="视频描述" type="textarea" :rows="3" />
          </el-form-item>
          <el-form-item label="标题" prop="title">
            <el-input v-model="dataForm.title" placeholder="标题" />
          </el-form-item>
          <el-form-item label="上传视频" prop="fileJson">
            <UploadFileSingle v-model="dataForm.fileJson" type="weixin" accept=".mp4" />
          </el-form-item>
        </template>
        <el-form-item label="上传文件" v-if="dataForm.msgType==5" prop="fileJson">
          <UploadFileSingle v-model="dataForm.fileJson" type="weixin" />
        </el-form-item>
        <template v-if="dataForm.msgType==6">
          <el-form-item label="摘要" prop="abstract">
            <el-input v-model="dataForm.abstract" placeholder="如若不填抓取正文64个字......" type="textarea"
              :rows="3" />
          </el-form-item>
          <el-form-item label="标题" prop="title">
            <el-input v-model="dataForm.title" placeholder="标题" />
          </el-form-item>
          <el-form-item label="作者" prop="author">
            <el-input v-model="dataForm.author" placeholder="作者" />
          </el-form-item>
          <el-form-item label="内容" prop="content">
            <JNPF-Quill v-model="dataForm.content" />
          </el-form-item>
          <el-form-item label="原文链接" prop="contentSourceUrl">
            <el-input v-model="dataForm.contentSourceUrl" placeholder="原文链接" />
          </el-form-item>
          <el-form-item label="封面图片" prop="fileJson">
            <SingleImg v-model="dataForm.fileJson" type="weixin" />
          </el-form-item>
        </template>
      </el-form>
    </div>
  </transition>
</template>

<script>
import { Sent } from '@/api/weChat/QY'
export default {
  data() {
    return {
      visible: false,
      btnLoading: false,
      dataForm: {
        msgType: 1,
        all: 1,
        txtContent: '',
        title: '',
        abstract: '',
        author: '',
        content: '',
        contentSourceUrl: '',
        toUserId: '',
        fileJson: ''
      },
      dataRule: {
        msgType: [
          { required: true, message: '消息类别不能为空', trigger: 'blur' },
        ],
        toUserId: [
          { required: true, message: '发送范围不能为空', trigger: 'change' },
        ],
        txtContent: [
          { required: true, message: '文本内容不能为空', trigger: 'blur' }
        ],
        title: [
          { required: true, message: '标题不能为空', trigger: 'blur' }
        ],
        author: [
          { required: true, message: '作者不能为空', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '内容不能为空', trigger: 'blur' }
        ],
        fileJson: [
          { required: true, message: '素材不能为空', trigger: 'blur' }
        ],
      },
      toUserId: "",
      treeData: []
    }
  },
  created() { },
  methods: {
    goBack() {
      this.$emit('close')
    },
    init() {
      this.toUserId = ''
      this.dataForm.toUserId = ''
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        if (!this.treeData.length) {
          this.$store.dispatch('base/getUserTree').then(res => {
            this.treeData = res
          })
        }
      })
    },
    switchChange(val) {
      if (val) {
        this.toUserId = ''
        this.dataForm.toUserId = ''
      }
    },
    dataFormSubmit() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.btnLoading = true
          Sent(this.dataForm).then(res => {
            this.$message({
              message: res.msg,
              type: 'success',
              duration: 1500,
              onClose: () => {
                this.btnLoading = false
                this.$emit('refresh', true)
              }
            })
          }).catch(() => { this.btnLoading = false })
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.tips {
  line-height: 1.5;
}
.main {
  >>> .el-select {
    width: 100%;
  }
}
.avatar-uploader >>> .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 150px;
  height: 150px;
  line-height: 150px;
  text-align: center;
}
.avatar {
  width: 150px;
  height: 150px;
  display: block;
}
</style>