<template>
  <el-dialog title="选择预览用户" :close-on-click-modal="false" :visible.sync="visible"
    class="JNPF-dialog JNPF-dialog_center JNPF-dialog-tree" lock-scroll append-to-body
    width='450px'>
    <el-tree :data="treeData" :props="defaultProps" default-expand-all highlight-current
      ref="treeBox" :expand-on-click-node="false" @node-click="handleNodeClick"
      class="JNPF-common-el-tree" node-key="id">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <i :class="data.icon"></i>
        <span class="text">{{node.label}}</span>
      </span>
    </el-tree>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">{{$t('common.cancelButton')}}</el-button>
      <el-button type="primary" @click="dataFormSubmit()">{{$t('common.confirmButton')}}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { TreeViewUsers, Preview } from '@/api/weChat/MPMessage'
export default {
  data() {
    return {
      visible: false,
      openid: '',
      defaultProps: {
        children: 'children',
        label: 'nickName'
      },
      treeData: [],
      dataForm: {}
    }
  },
  methods: {
    init(dataForm) {
      if (!dataForm) return
      this.dataForm = dataForm
      this.visible = true
      this.$nextTick(() => {
        TreeViewUsers().then(res => {
          this.treeData = res.data.list
        })
      })
    },
    handleNodeClick(data) {
      if (this.openid == data.id) return
      this.openid = data.id
    },
    dataFormSubmit() {
      if (!this.openid) {
        this.$message({ message: '请选择预览用户', type: 'error', duration: 1500 })
        return
      }
      Preview(this.openid, this.dataForm).then((res) => {
        this.$message({
          message: res.msg,
          type: 'success',
          duration: 1500,
          onClose: () => {
            this.visible = false
            // this.$emit('refresh')
          }
        })
      })
    }
  }
}
</script>