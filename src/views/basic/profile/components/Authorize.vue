<template>
  <div class="authorize">
    <el-tabs v-model="activeTab" class="JNPF-el_tabs">
      <el-tab-pane label="菜单权限" name="module"></el-tab-pane>
      <el-tab-pane label="按钮权限" name="button"></el-tab-pane>
      <el-tab-pane label="列表权限" name="column"></el-tab-pane>
      <el-tab-pane label="数据权限" name="resource"></el-tab-pane>
      <el-tree :data="treeData" :props="defaultProps" default-expand-all highlight-current
        ref="treeBox" :expand-on-click-node="false" class="JNPF-common-el-tree" node-key="id"
        v-loading="loading">
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <i :class="data.icon"></i>
          <span class="text">{{node.label}}</span>
        </span>
      </el-tree>
    </el-tabs>
  </div>
</template>

<script>

import { AuthorizeList } from '@/api/permission/userSetting'
export default {
  data() {
    return {
      treeData: [],
      info: [],
      activeTab: 'module',
      defaultProps: {
        children: 'children',
        label: 'fullName'
      },
      loading: false
    }
  },
  watch: {
    activeTab(val) {
      this.treeData = this.info[val]
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.loading = true
      AuthorizeList().then(res => {
        this.info = res.data;
        this.treeData = this.info.module
        this.loading = false
      })
    },
  }
}
</script>
<style lang="scss" scoped>
.authorize {
  height: 100%;
  overflow: hidden;
  >>> .el-tabs__nav-scroll {
    padding-top: 0 !important;
  }
  >>> .el-tabs__content {
    overflow: auto;
    overflow-x: hidden;
    .el-tab-pane {
      height: auto !important;
    }
    .JNPF-common-el-tree {
      padding: 0;
    }
  }
}
</style>
