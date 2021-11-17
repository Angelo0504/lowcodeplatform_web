<template>
  <el-drawer v-bind="$attrs" v-on="$listeners" @opened="onOpen" @close="onClose"
    :modal-append-to-body="false" append-to-body>
    <div class="action-bar">
      <!-- <el-button icon="el-icon-refresh" type="text" @click="refresh">刷新</el-button> -->
      <el-button icon="el-icon-document-copy" type="text" class="copy-json-btn">复制JSON</el-button>
      <el-button icon="el-icon-download" type="text" @click="exportJsonFile">导出JSON文件</el-button>
      <el-button icon="el-icon-circle-close" type="text" @click="$emit('update:visible', false)"
        class="delete-btn">关闭</el-button>
    </div>
    <JSONEditor v-model="template" class="json-editor" />
  </el-drawer>
</template>

<script>
import ClipboardJS from 'clipboard'
import { saveAs } from 'file-saver'
import JSONEditor from '@/components/JsonEditor'

export default {
  components: { JSONEditor },
  props: {
    jsonData: {
      type: Object,
      default: () => { }
    }
  },
  data() {
    return {
      template: '',
      clipboard: null
    }
  },
  methods: {
    onOpen() {
      this.clipboard = new ClipboardJS('.copy-json-btn', {
        text: trigger => {
          this.$notify({
            title: '复制成功',
            message: '代码已复制到剪切板，可粘贴。',
            type: 'success'
          })
          return this.template
        }
      })
      this.clipboard.on('error', e => {
        this.$message.error('代码复制失败')
      })
      this.template = this.jsonData
    },
    onClose() {
      this.clipboard && this.clipboard.destroy()
    },
    exportJsonFile() {
      this.$prompt('文件名:', '导出文件', {
        inputValue: `${+new Date()}.json`,
        closeOnClickModal: false,
        inputPlaceholder: '请输入文件名'
      }).then(({ value }) => {
        if (!value) value = `${+new Date()}.json`
        const blob = new Blob([this.template], { type: 'text/plain;charset=utf-8' })
        saveAs(blob, value)
      })
    },
    refresh() {
      try {
        this.$emit('refresh', this.template)
      } catch (error) {
        this.$notify({
          title: '错误',
          message: 'JSON格式错误，请检查',
          type: 'error'
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
>>> .el-drawer__header {
  display: none;
}
.action-bar {
  text-align: left;
}
.json-editor {
  height: calc(100vh - 42px);
}
</style>