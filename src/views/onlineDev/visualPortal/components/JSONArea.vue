<template>
  <el-dialog title="数据源" :close-on-click-modal="false" :visible.sync="visible"
    class="JNPF-dialog JNPF-dialog_center" lock-scroll width="600px" append-to-body>
    <JSONEditor v-model="responseData" class="preview" />
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">{{$t('common.cancelButton')}}</el-button>
      <el-button type="primary" @click="closeDialog()">{{$t('common.confirmButton')}}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import JSONEditor from '@/components/JsonEditor'

export default {
  components: { JSONEditor },
  data() {
    return {
      visible: false,
      responseData: ''
    }
  },
  methods: {
    init(option) {
      this.visible = true
      this.responseData = option
    },
    closeDialog() {
      this.visible = false
      this.$emit('refresh', this.responseData)
    },
  }
}
</script>
<style lang="scss" scoped>
.JNPF-dialog_center {
  >>> .el-dialog__body {
    padding-bottom: 20px !important;
  }
}
>>> .preview {
  border: 1px solid #dcdfe6;
}
>>> .json-editor {
  height: 430px;
  overflow: auto;
}
</style>