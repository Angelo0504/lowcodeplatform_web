
<template>
  <el-dialog :title="title" :close-on-click-modal="false"
    class="JNPF-dialog JNPF-dialog_center transfer-dialog" lock-scroll append-to-body
    v-bind="$attrs" width="800px" :modal-append-to-body="false" v-on="$listeners" @open="onOpen">
    <JNPFTransfer :loading="loading" :treeData="treeData" v-model="selectedData" :type="type"
      ref="JNPFTransfer" />
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeTransfer">{{$t('common.cancelButton')}}</el-button>
      <el-button type="primary" @click="confirm">{{$t('common.confirmButton')}}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { TreeView as userTreeView } from '@/api/permission/user'
import { TreeView as positionTreeView } from '@/api/permission/position'
import JNPFTransfer from '@/components/JNPF-transfer'

export default {
  name: 'org-transfer',
  components: { JNPFTransfer },
  props: {
    value: {
      type: Array,
      default: () => []
    },
    type: {
      type: String,
      default: 'user'
    },
    title: {
      type: String,
      default: '组织机构'
    },
  },
  data() {
    return {
      loading: false,
      treeData: [],
      selectedData: []
    }
  },
  methods: {
    onOpen() {
      this.dataInit()
    },
    closeTransfer() {
      this.$emit('update:visible', false)
    },
    confirm() {
      this.$emit('confirm', this.selectedData)
      this.closeTransfer()
    },
    async dataInit() {
      this.loading = true
      this.selectedData = []
      this.$nextTick(() => {
        this.$refs.JNPFTransfer && (this.$refs.JNPFTransfer.filterText = '')
      })
      let res = null
      if (this.type == 'position') {
        res = await this.$store.dispatch('base/getPositionTree')
      } else {
        res = await this.$store.dispatch('base/getUserTree')
      }
      this.treeData = res
      this.selectedData = this.value
      this.loading = false
    }
  }
}
</script>