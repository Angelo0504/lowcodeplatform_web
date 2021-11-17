<template>
  <el-dialog title="移动到" :close-on-click-modal="false" :visible.sync="visible"
    class="JNPF-dialog JNPF-dialog_center JNPF-dialog-tree" lock-scroll width='450px'>
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
import { FolderTree, MoveTo } from '@/api/extend/document'
export default {
  data() {
    return {
      visible: false,
      id: '',
      toId: '',
      defaultProps: {
        children: 'children',
        label: 'fullName'
      },
      treeData: []
    }
  },
  methods: {
    init(id, parentId) {
      if (!id) return
      this.id = id
      this.toId = parentId != '0' ? parentId : "-1"
      this.visible = true
      this.$nextTick(() => {
        FolderTree().then(res => {
          this.treeData = res.data.list
          this.$nextTick(() => {
            this.$refs.treeBox.setCurrentKey(this.toId);
          })
        })
      })
    },
    handleNodeClick(data) {
      if (this.toId == data.id) return
      this.toId = data.id
    },
    dataFormSubmit() {
      let toId = this.toId == '-1' ? '0' : this.toId
      MoveTo(this.id, toId).then((res) => {
        this.$message({
          message: res.msg,
          type: 'success',
          duration: 1500,
          onClose: () => {
            this.visible = false
            this.$emit('refresh')
          }
        })
      })
    }
  }
}
</script>