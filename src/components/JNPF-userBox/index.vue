<template>
  <el-dialog title="选择审批人" :close-on-click-modal="false" :visible.sync="visible"
    class="JNPF-dialog JNPF-dialog_center JNPF-dialog-tree" lock-scroll append-to-body
    width='450px'>
    <el-input placeholder="输入姓名或者编号进行过滤" v-model="filterText" clearable>
    </el-input>
    <el-tree :data="treeData" :props="defaultProps" default-expand-all highlight-current
      ref="treeBox" :expand-on-click-node="false" check-on-click-node @node-click="handleNodeClick"
      class="JNPF-common-el-tree" node-key="id" v-loading="loading"
      :filter-node-method="filterNode">
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
export default {
  name: 'UserBox',
  data() {
    return {
      visible: false,
      id: '',
      defaultProps: {
        children: 'children',
        label: 'fullName'
      },
      treeData: [],
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
      this.visible = true
      this.loading = true
      this.filterText = ''
      this.$nextTick(() => {
        this.$store.dispatch('base/getUserTree').then(res => {
          this.treeData = res
          this.loading = false
        })
      })
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.fullName.indexOf(value) !== -1;
    },
    handleNodeClick(data) {
      if (data.hasChildren) return
      this.id = data.id
    },
    dataFormSubmit() {
      if (!this.id) {
        this.$message({
          message: '请选择审批人员',
          type: 'error',
          duration: 1000,
        })
        return
      }
      this.visible = false
      this.$emit('submit', this.id)
    },
  }
}
</script>