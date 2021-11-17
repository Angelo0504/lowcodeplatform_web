<template>
  <transition name="el-zoom-in-center">
    <div class="JNPF-preview-main">
      <div class="JNPF-common-page-header">
        <el-page-header @back="goBack" content="消息发送" />
        <div class="options">
          <el-button type="primary" icon="el-icon-s-promotion" @click="dataFormSubmit()"
            :loading="btnLoading">发送</el-button>
          <el-button type="warning" icon="el-icon-view" @click="dataFormSubmit(true)">预览
          </el-button>
          <el-button @click="goBack()">{{$t('common.cancelButton')}}</el-button>
        </div>
      </div>
      <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="100px" class="main">
        <el-alert title="注意：" type="warning" :closable="false" class="mb-10">
          <div class="tips">
            <p>1、公众平台群发人数的上限？ 微信公众平台群发消息的人数没有限制，只能群发给粉丝，不支持群发给非订阅用户。</p>
            <p>2、公众平台群发都支持哪些内容？目前支持群发的内容：文字、语音、图片、视频、图文消息</p>
            <p>3、公众平台群发消息的规则及限制。</p>
            <p>1）订阅号（认证用户、非认证用户），1天只能群发1条消息（每天0点更新，次数不会累加）。</p>
            <p>2）服务号（认证用户、非认证用户），1个月（按自然月）内可发送4条群发消息（每月月底0点更新，次数不会累加）。</p>
            <p>3）上传至素材管理中的图片、语音可多次群发，没有有效期。</p>
            <p>4）群发图文消息的标题上限为64个字节。</p>
            <p>5）群发内容为文字的字数上限为600个字符或600个汉字。</p>
            <p>6）语音限制：最大5M，最长60min，支持 mp3、 wma、 wav、 amr格式。</p>
            <p>7）视频限制：最大20M，支持rm、rmvb、wmv、avi、mpg、mpeg、mp4格式（上传视频后为了便于粉丝通过手机查看，系统会自动进行压缩）。</p>
            <p>8）使用本系统发送，人员限制最多是10000用户，如果超过该数量，还是建议用微信公众平台发送，网址:https://mp.weixin.qq.com/。</p>
          </div>
        </el-alert>
        <el-form-item label="消息类别" prop="msgType" class="mt-10">
          <el-radio-group v-model="dataForm.msgType" @change="dataForm.fileJson=''">
            <el-radio :label="1">文本</el-radio>
            <el-radio :label="2">图片</el-radio>
            <el-radio :label="3">语音</el-radio>
            <el-radio :label="4">视频</el-radio>
            <el-radio :label="5">图文</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="全部用户" prop="isToAll">
          <el-switch v-model="dataForm.isToAll" :active-value="1" :inactive-value="0"
            @change="switchChange" />
        </el-form-item>
        <el-form-item label="标签发送" prop="tagId" v-if="!dataForm.isToAll">
          <el-select v-model="tagId" placeholder="请选择标签" multiple @change="handleChange">
            <el-option v-for="item in treeData" :key="item.id" :label="item.fullName"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="文本内容" prop="txtContent" v-if="dataForm.msgType==1">
          <el-input v-model="dataForm.txtContent" placeholder="文本内容" type="textarea" :rows="3" />
        </el-form-item>
        <el-form-item label="上传图片" v-if="dataForm.msgType==2" prop="fileJson">
          <UploadFileSingle v-model="dataForm.fileJson" type="weixin" accept="image/*" />
        </el-form-item>
        <el-form-item label="上传语音" v-if="dataForm.msgType==3" prop="fileJson">
          <UploadFileSingle v-model="dataForm.fileJson" type="weixin"
            accept=".mp3,.wma,.wav,.amr,.mp4" />
        </el-form-item>
        <template v-if="dataForm.msgType==4">
          <el-form-item label="视频描述" prop="txtContent">
            <el-input v-model="dataForm.txtContent" placeholder="视频描述" type="textarea" :rows="3" />
          </el-form-item>
          <el-form-item label="标题" prop="title">
            <el-input v-model="dataForm.title" placeholder="标题" />
          </el-form-item>
          <el-form-item label="上传视频" prop="fileJson">
            <UploadFileSingle v-model="dataForm.fileJson" type="weixin"
              accept=".mp3,.wma,.wav,.amr,.mp4" />
          </el-form-item>
        </template>
        <template v-if="dataForm.msgType==5">
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
      <userBox v-if="userBoxVisible" ref="userBox" />
    </div>
  </transition>
</template>

<script>
import { TreeViewUsers, Preview, Sent } from '@/api/weChat/MPMessage'
import { TagsTree } from '@/api/weChat/MPTag'
import userBox from './UserBox'
export default {
  components: { userBox },
  data() {
    return {
      visible: false,
      userBoxVisible: false,
      dataForm: {
        msgType: 1,
        isToAll: 1,
        txtContent: '',
        fileJson: '',
        title: '',
        digest: '',
        author: '',
        content: '',
        contentSourceUrl: '',
        tagId: ''
      },
      dataRule: {
        msgType: [
          { required: true, message: '消息类别不能为空', trigger: 'blur' },
        ],
        tagId: [
          { required: true, message: '标签发送不能为空', trigger: 'blur' },
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
          { required: true, message: '内容不能为空', trigger: 'change' }
        ],
        fileJson: [
          { required: true, message: '素材不能为空', trigger: 'blur' }
        ],
      },
      tagId: [],
      btnLoading: false,
      treeData: []
    }
  },
  created() { },
  methods: {
    goBack() {
      this.$emit('close')
    },
    init(id) {
      this.tagId = []
      this.dataForm.tagId = ''
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        TagsTree().then(res => {
          this.treeData = res.data.list
        })
      })
    },
    switchChange(val) {
      if (val) {
        this.tagId = []
        this.dataForm.tagId = ''
      }
    },
    handleChange(val) {
      this.dataForm.tagId = val.join(',')
    },
    dataFormSubmit(isPreview) {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          if (!isPreview) {
            this.btnLoading = true
            Sent(this.dataForm).then((res) => {
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
          } else {
            // 预览
            this.userBoxVisible = true
            this.$nextTick(() => {
              this.$refs.userBox.init(this.dataForm)
            })
          }
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
.main {
  >>> .el-select {
    width: 100%;
  }
}
</style>