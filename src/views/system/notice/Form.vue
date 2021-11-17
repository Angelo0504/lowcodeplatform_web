<template>
  <transition name="el-zoom-in-center">
    <div class="JNPF-preview-main">
      <div class="JNPF-common-page-header">
        <el-page-header @back="goBack" :content="!dataForm.id ? '新建公告' : '编辑公告'" />
        <div class="options">
          <el-button type="primary" :loading="btnLoading" @click="dataFormSubmit()">
            {{$t('common.confirmButton')}}</el-button>
          <el-button @click="goBack()">{{$t('common.cancelButton')}}</el-button>
        </div>
      </div>
      <el-form ref="dataForm" :model="dataForm" :rules="dataRule" v-loading="formLoading"
        label-width="60px" class="main">
        <el-form-item label="标题" prop="title">
          <el-input v-model="dataForm.title" placeholder="公告标题" />
        </el-form-item>
        <el-form-item label="正文" prop="bodyText">
          <JNPFQuill v-model="dataForm.bodyText" />
        </el-form-item>
      </el-form>
    </div>
  </transition>
</template>

<script>
import JNPFQuill from '@/components/JNPFEditor/quill'
import { createNotice, updateNotice, getNoticeInfo } from '@/api/system/message'

export default {
  components: { JNPFQuill },
  data() {
    return {
      visible: false,
      formLoading: false,
      btnLoading: false,
      dataForm: {
        id: '',
        title: '',
        bodyText: ''
      },
      dataRule: {
        title: [
          { required: true, message: '公告标题不能为空', trigger: 'blur' }
        ],
        bodyText: [
          { required: true, message: '公告内容不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    goBack() {
      this.$emit('close')
    },
    init(id) {
      this.dataForm.id = id || 0
      this.visible = true
      this.formLoading = true
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        if (this.dataForm.id) {
          getNoticeInfo(this.dataForm.id).then(res => {
            this.dataForm = res.data
          })
        }
        this.formLoading = false
      })
    },
    dataFormSubmit() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.btnLoading = true
          const formMethod = this.dataForm.id ? updateNotice : createNotice
          formMethod(this.dataForm).then(res => {
            this.$message({
              message: res.msg,
              type: 'success',
              duration: 1500,
              onClose: () => {
                this.visible = false
                this.btnLoading = false
                this.$emit('refreshDataList')
                this.goBack()
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
.JNPF-preview-main {
  .content {
    >>> {
      p {
        line-height: 30px;
        img {
          display: block;
          margin-right: auto;
          margin-left: auto;
        }
      }
    }
  }
  .vab-quill-content {
    >>> {
      .el-form-item__content {
        line-height: normal;
      }
    }
  }
}
</style>