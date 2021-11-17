<template>
  <div class="monaco-container" ref="codeEditor"></div>
</template>
<script>
import * as monaco from "monaco-editor"
const defaultOptions = {
  selectOnLineNumbers: true,
  roundedSelection: false,
  wordWrap: 'on', // 自动换行 'on','off'
  language: 'java', // 常用的有css/html/java/javascript/json/csharp(.net)'
  theme: 'vs', // vs, hc-black, or vs-dark
  formatOnPaste: true,
  formatOnType: true,
  glyphMargin: true, //字形边缘
  fontSize: 14, // 字体大小
  readOnly: false // 只读
}
export default {
  name: 'MonacoEditor',
  props: {
    options: {
      type: Object,
      default: () => { }
    },
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      content: this.value,
      monacoEditor: null
    }
  },
  watch: {
    value(val) {
      this.content = val
    },
    options: {
      handler(val) {
        this.monacoEditor.updateOptions({ ...val })
      },
      deep: true
    }
  },
  mounted() {
    this.initEditor()
  },
  methods: {
    initEditor() {
      // 初始化编辑器实例
      this.monacoEditor = monaco.editor.create(this.$refs['codeEditor'], {
        value: this.content,
        autoIndex: true,
        ...defaultOptions,
        ...this.options
      })
      // 监听编辑器content变化
      this.monacoEditor.onDidChangeModelContent(() => {
        this.$emit('input', this.monacoEditor.getValue())
      })
    },
    changeEditor(data) {
      this.monacoEditor.setValue(data.value)
      this.monacoEditor.updateOptions({ ...data.options })
    }
  }
}

</script>
<style lang="scss" scoped>
.monaco-container {
  height: 100%;
  width: 100%;
  overflow: hidden;
}
</style>
