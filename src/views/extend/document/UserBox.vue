<template>
  <el-dialog title="共享文件" :close-on-click-modal="false" :visible.sync="visible"
    class="JNPF-dialog JNPF-dialog_center JNPF-dialog-tree" lock-scroll width='450px'>
    <el-input placeholder="输入姓名或者编号进行过滤" v-model="filterText">
    </el-input>
    <el-tree :data="treeData" :props="defaultProps" default-expand-all highlight-current
      ref="treeBox" :expand-on-click-node="false" check-on-click-node @node-click="handleNodeClick"
      class="JNPF-common-el-tree" node-key="id" show-checkbox :default-checked-keys="checkedKeys"
      v-loading="loading" :filter-node-method="filterNode">
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
import { ShareCreate, ShareUserList } from '@/api/extend/document'
export default {
  data() {
    return {
      visible: false,
      documentId: '',
      defaultProps: {
        children: 'children',
        label: 'fullName'
      },
      treeData: [],
      checkedKeys: [],
      loading: false,
      filterText: ''
    }
  },
  watch: {
    filterText(val) {
      this.$refs.treeBox.filter(val);
    }
  },
  methods: {
    init(id) {
      if (!id) return
      this.documentId = id
      this.visible = true
      this.loading = true
      this.filterText = ''
      this.$nextTick(() => {
        ShareUserList(this.documentId).then(res => {
          let list = res.data.list.map(o => o.shareUserId)
          this.checkedKeys = list.length ? list : []
          this.$store.dispatch('base/getUserTree').then(resTree => {
            this.treeData = resTree
            this.loading = false
          })
        })
      })
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.fullName.indexOf(value) !== -1;
    },
    handleNodeClick(data) { },
    dataFormSubmit() {
      let shareUserId = this.$refs.treeBox.getCheckedKeys()
      if (!shareUserId.length) {
        this.$message({
          message: '请选择共享人员',
          type: 'error',
          duration: 1000,
        })
        return
      }
      ShareCreate(this.documentId, shareUserId.join(',')).then(res => {
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