<template>
  <transition name="el-zoom-in-center">
    <div class="JNPF-preview-main">
      <div class="JNPF-common-page-header">
        <el-page-header @back="goBack" :content="title" />
        <div class="options">
          <el-button @click="goBack()">{{$t('common.cancelButton')}}</el-button>
        </div>
      </div>
      <iframe width="100%" height="100%" :src="url" frameborder="0"></iframe>
    </div>
  </transition>
</template>

<script>
import { PreviewFile } from '@/api/extend/documentPreview'
export default {
  data() {
    return {
      title: '',
      url: ''
    }
  },
  methods: {
    goBack() {
      this.$emit('close')
    },
    init(id, name) {
      if (!id) {
        this.goBack()
      } else {
        this.title = '文档预览 - ' + name
        PreviewFile(id).then(res => {
          if (res.data && res.data.filePath) {
            this.url = 'https://view.officeapps.live.com/op/view.aspx?src=' + this.define.comUrl + res.data.filePath
          } else {
            this.$message.warning('文件不存在')
            this.goBack()
          }
        })
      }
    }
  }
}
</script>