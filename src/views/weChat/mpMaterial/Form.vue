<template>
  <transition name="el-zoom-in-center">
    <div class="JNPF-preview-main">
      <div class="JNPF-common-page-header">
        <el-page-header @back="goBack" content="上传素材" />
        <div class="options">
          <el-button type="primary" @click="dataFormSubmit()" :loading="btnLoading">上 传</el-button>
          <el-button @click="goBack()">{{$t('common.cancelButton')}}</el-button>
        </div>
      </div>
      <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="100px" class="main">
        <el-alert title="注意：" type="warning" :closable="false">
          <div class="tips">
            <p>1、上传图片最大支持2MB,支持bmp/png/jpeg/jpg/gif格式</p>
            <p>2、上传语音最大支持2MB,播放长度不超过60s，mp3/wma/wav/amr格式</p>
            <p>3、上传视频最大支持10MB，支持MP4格式、缩略图64KB，支持JPG格式</p>
          </div>
        </el-alert>
        <el-form-item label="文件类别" prop="materialsType" class="mt-10">
          <el-radio-group v-model="dataForm.materialsType" @change="dataForm.fileJson=''">
            <el-radio :label="2">图片</el-radio>
            <el-radio :label="3">语音</el-radio>
            <el-radio :label="4">视频</el-radio>
            <el-radio :label="5">图文</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="上传图片" v-if="dataForm.materialsType==2" prop="fileJson">
          <UploadFileSingle v-model="dataForm.fileJson" type="weixin" accept="image/*" />
        </el-form-item>
        <el-form-item label="上传语音" v-if="dataForm.materialsType==3" prop="fileJson">
          <UploadFileSingle v-model="dataForm.fileJson" type="weixin"
            accept=".mp3,.wma,.wav,.amr,.mp4" />
        </el-form-item>
        <template v-if="dataForm.materialsType==4">
          <el-form-item label="标题" prop="title">
            <el-input v-model="dataForm.title" placeholder="标题" />
          </el-form-item>
          <el-form-item label="上传视频" prop="fileJson">
            <UploadFileSingle v-model="dataForm.fileJson" type="weixin"
              accept=".mp3,.wma,.wav,.amr,.mp4" />
          </el-form-item>
          <el-form-item label="视频描述" prop="introduction">
            <el-input v-model="dataForm.introduction" placeholder="视频描述" type="textarea"
              :rows="3" />
          </el-form-item>
        </template>
        <template v-if="dataForm.materialsType==5">
          <el-form-item label="摘要" prop="digest">
            <el-input v-model="dataForm.digest" placeholder="如若不填抓取正文64个字......" type="textarea"
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
import { UploadForeverMedia } from '@/api/weChat/MPMaterial'
import { TagsTree } from '@/api/weChat/MPTag'
export default {
  data() {
    return {
      visible: false,
      btnLoading: false,
      dataForm: {
        materialsType: 2,
        fileJson: '',
        introduction: '',
        title: '',
        digest: '',
        author: '',
        content: '',
        contentSourceUrl: ''
      },
      dataRule: {
        title: [
          { required: true, message: '标题不能为空', trigger: 'blur' }
        ],
        author: [
          { required: true, message: '作者不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created() { },
  methods: {
    goBack() {
      this.$emit('close')
    },
    init(id) {
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
      })
    },
    dataFormSubmit() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.btnLoading = true
          UploadForeverMedia(this.dataForm).then(res => {
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
    },
  }
}
</script>
<style lang="scss" scoped>
.tips {
  line-height: 1.5;
}
</style>