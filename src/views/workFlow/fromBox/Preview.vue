<template>
  <transition name="el-zoom-in-center">
    <div class="JNPF-preview-main flow-form-main">
      <div class="JNPF-common-page-header">
        <el-page-header @back="goBack" :content="'表单预览【'+setting.fullName+'】'" />
        <div class="options">
          <el-button @click="goBack()">{{$t('common.cancelButton')}}</el-button>
        </div>
      </div>
      <div class="main">
        <component :is="currentView" @close="goBack" ref="form"></component>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      currentView: '',
      setting: {}
    }
  },
  methods: {
    goBack(isRefresh) {
      this.$emit('close', isRefresh)
    },
    init(data) {
      this.setting = data
      if (data.formType == 1) {
        this.currentView = (resolve) => require([`@/views/workFlow/workFlowForm/${data.enCode}`], resolve)
      } else {
        this.currentView = (resolve) => require([`@/views/workFlow/workFlowForm/dynamicForm`], resolve)
      }
      setTimeout(() => {
        this.$nextTick(() => {
          this.$refs.form && this.$refs.form.init(data)
        })
      }, 100)
    },
  }
}
</script>