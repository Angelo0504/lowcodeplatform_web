<template>
  <transition name="el-zoom-in-center">
    <div class="JNPF-preview-main form-main">
      <div class="JNPF-common-page-header">
        <el-page-header @back="goBack" :content="title" />
        <div class="options">
          <el-button @click="goBack">{{$t('common.cancelButton')}}</el-button>
        </div>
      </div>
      <div class="main" v-loading="formLoading" :element-loading-text="$t('common.loadingText')">
        <JNPFCodeEditor v-model="responseData" :options="options" ref="CodeEditor" />
      </div>
    </div>
  </transition>
</template>

<script>
import { previewDataInterface } from '@/api/systemData/dataInterface'
import JNPFCodeEditor from '@/components/JNPFEditor/monaco'

export default {
  components: {
    JNPFCodeEditor
  },
  data() {
    return {
      title: '',
      formLoading: false,
      responseData: '',
      options: {
        readOnly: true,
        language: 'json'
      }
    }
  },
  methods: {
    goBack() {
      this.$emit('close')
    },
    init(id) {
      this.id = id || ''
      this.formLoading = true

      this.responseData = ''
      this.$nextTick(() => {
        this.title = `接口地址：${this.define.comUrl}/api/DataInterface/${id}/Actions/Response`
        // 获取数据
        previewDataInterface(this.id).then(res => {
          this.responseData = JSON.stringify(res, null, 4)
          this.$refs.CodeEditor.changeEditor({
            value: this.responseData,
            options: this.options
          })
          this.formLoading = false
        }).catch(() => {
          this.formLoading = false
        })
      })

    },
  }
}
</script>
<style lang="scss" scoped>
.main {
  overflow: auto;
  padding: 0;
}
</style>