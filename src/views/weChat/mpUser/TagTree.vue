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
import { TagsTree, SetTagged } from '@/api/weChat/MPTag'
export default {
  data() {
    return {
      visible: false,
      openid: '',
      defaultProps: {
        children: 'children',
        label: 'fullName'
      },
      treeData: [],
      tagId: ''
    }
  },
  methods: {
    init(openid) {
      if (!openid) return
      this.openid = openid
      this.visible = true
      this.$nextTick(() => {
        TagsTree().then(res => {
          this.treeData = res.data.list
        })
      })
    },
    handleNodeClick(data) {
      if (this.tagId == data.id) return
      this.tagId = data.id
    },
    dataFormSubmit() {
      if (!this.tagId) {
        this.$message({ message: '请选择标签', type: 'error', duration: 1500 })
        return
      }
      SetTagged({ openId: this.openid, tagId: this.tagId }).then((res) => {
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
    },
  }
}
</script>