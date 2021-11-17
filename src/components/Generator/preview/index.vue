<template>
  <div class="test-form">
    <el-dialog v-bind="$attrs" :close-on-click-modal="false" :modal-append-to-body="false"
      v-on="$listeners" @open="onOpen" @close="onClose" class="JNPF-dialog JNPF-dialog_center"
      title="预览">
      <parser :form-conf="formConf" @submit="sumbitForm" :key="key" ref="dynamicForm" />
      <div slot="footer">
        <el-button @click="close">{{formConf.cancelButtonText||'取 消'}}</el-button>
        <el-button type="primary" @click="handelConfirm">{{formConf.confirmButtonText||'确 定'}}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Parser from '@/components/Generator/parser/Parser'

export default {
  components: {
    Parser
  },
  props: ['formData'],
  data() {
    return {
      key: +new Date(),
      formConf: {},
    }
  },
  computed: {},
  watch: {},
  created() { },
  mounted() { },
  methods: {
    onOpen() {
      this.key = +new Date()
      this.formConf = this.formData
    },
    onClose() {
    },
    close(e) {
      this.$emit('update:visible', false)
    },
    handelConfirm() {
      this.$refs.dynamicForm && this.$refs.dynamicForm.submitForm()
    },
    fillFormData(form, data) {
      form.fields.forEach(item => {
        const val = data[item.__vModel__]
        if (val) {
          item.__config__.defaultValue = val
        }
      })
    },
    sumbitForm(data) {
      console.log('sumbitForm提交数据：', data)
    },
  }
}
</script>

<style lang="scss" scoped>
.test-form {
  margin: 15px auto;
  width: 800px;
  padding: 15px;
}
</style>