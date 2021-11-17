
<template>
  <el-dialog title="选择角色" :close-on-click-modal="false"
    class="JNPF-dialog JNPF-dialog_center transfer-dialog" lock-scroll append-to-body
    v-bind="$attrs" width="800px" :modal-append-to-body="false" v-on="$listeners" @open="onOpen">
    <JNPFTransfer :loading="loading" :treeData="treeData" v-model="selectedData"
      ref="JNPFTransfer" />
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeTransfer">{{$t('common.cancelButton')}}</el-button>
      <el-button type="primary" @click="confirm">{{$t('common.confirmButton')}}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getModelData, setModelData } from '@/api/permission/authorize'
import { getRoleSelector } from '@/api/permission/role'
import JNPFTransfer from '@/components/JNPF-transfer'

export default {
  name: 'transfer',
  components: { JNPFTransfer },
  props: {
    id: {
      type: String,
      default: ''
    },
  },
  data() {
    return {
      selectedData: [],
      treeData: [],
      loading: false,
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
      let query = { itemType: 'portal', objectType: 'Role', objectId: this.selectedData }
      setModelData(this.id, query).then(res => {
        this.$message({
          type: 'success',
          message: res.msg,
          duration: 1000,
          onClose: () => {
            this.closeTransfer()
          }
        });
      })
    },
    async dataInit() {
      this.loading = true
      this.selectedData = []
      this.$nextTick(() => {
        this.$refs.JNPFTransfer && (this.$refs.JNPFTransfer.filterText = '')
      })
      this.$store.dispatch('base/getDictionaryData', { sort: 'RoleType' }).then(data => {
        this.treeData = JSON.parse(JSON.stringify(data))
        getRoleSelector().then(res => {
          let roleTreeData = res.data.list
          for (let i = 0; i < this.treeData.length; i++) {
            let child = roleTreeData.filter(o => this.treeData[i].enCode === o.type)
            let count = child.length
            this.$set(this.treeData[i], 'children', child)
            this.$set(this.treeData[i], 'count', count)
          }
          getModelData(this.id, 'Role').then(res => {
            this.selectedData = res.data.ids
            this.loading = false
          })
        })
      })
    },
  }
}
</script>