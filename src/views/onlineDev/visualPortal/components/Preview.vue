<template>
  <el-dialog v-bind="$attrs" :close-on-click-modal="false" :modal-append-to-body="false"
    v-on="$listeners" @open="onOpen" fullscreen lock-scroll class="JNPF-full-dialog"
    :show-close="false" :modal="false">
    <div class="JNPF-full-dialog-header">
      <div class="header-title">
        <img src="@/assets/images/jnpf.png" class="header-logo" />
        <p class="header-txt"> · 门户预览</p>
      </div>
      <div class="options">
        <el-button @click="closeDialog()">{{$t('common.cancelButton')}}</el-button>
      </div>
    </div>
    <div class="main" style="padding:0">
      <PortalLayout :layout="layout" mask />
    </div>
  </el-dialog>
</template>

<script>
import PortalLayout from '@/components/VisualPortal/Layout'
export default {
  props: ['layout'],
  components: { PortalLayout },
  data() {
    return {}
  },
  methods: {
    onOpen() { },
    closeDialog() {
      this.$emit('update:visible', false)
    }
  }
}
</script>