<template>
  <div class="app-container JNPF-flex-main authorize-container">
    <div class="JNPF-common-head">
      <div class="el-page-header__content">权限批量设置</div>
      <div class="btn-group">
        <el-dropdown style="margin-right: 8px">
          <el-button plain>
            {{$t('authorize.operation')}}<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="handleCheck('checkAll')"> {{$t('authorize.checkAll')}}
            </el-dropdown-item>
            <el-dropdown-item @click.native="handleCheck('cancelCheckAll')">
              {{$t('authorize.deselectAll')}}</el-dropdown-item>
            <el-dropdown-item @click.native="setAllExpand('open')">{{$t('authorize.expandAll')}}
            </el-dropdown-item>
            <el-dropdown-item @click.native="setAllExpand('close')">{{$t('authorize.foldAll')}}
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-button :disabled="active <= 0" @click="handlePrevStep">{{$t('common.prev')}}</el-button>
        <el-button :disabled="active >= 4" @click="handleNextStep">{{$t('common.next')}}</el-button>
        <el-button type="primary" :loading="btnLoading" :disabled="active < 4"
          @click="handleConfirm()" v-has="'btn_save'">{{$t('common.confirmButton')}}</el-button>
      </div>
    </div>
    <el-steps :active="active" finish-status="success" simple>
      <el-step :title="$t('authorize.menuPermission')"></el-step>
      <el-step :title="$t('authorize.buttonPermission')"></el-step>
      <el-step :title="$t('authorize.listPermission')"></el-step>
      <el-step :title="$t('authorize.dataPermission')"></el-step>
      <el-step :title="$t('authorize.selectRoles')"></el-step>
    </el-steps>
    <div class="authorize-bd">
      <div v-if="active < 4">
        <el-tree :data="authorizeTreeData" ref="authorizeTree" v-loading="treeLoading"
          :element-loading-text="$t('common.loadingText')" show-checkbox default-expand-all
          node-key="id" :check-strictly="checkStrictly" check-on-click-node :props="defaultProps"
          :expand-on-click-node="false" @check-change="selectTreeNodeClick">
          <span slot-scope="{ node, data }">
            <i :class="data.icon" />
            <span style="padding-left: 4px;">{{ node.label }}</span>
          </span>
        </el-tree>
      </div>
      <div class="authorize-selectbox" v-else>
        <el-tree :data="roleTreeAllData" ref="roleTree" v-loading="roleTreeLoading"
          :element-loading-text="$t('common.loadingText')" show-checkbox default-expand-all
          node-key="id" :props="defaultProps" check-on-click-node :expand-on-click-node="false"
          @check-change="selectTreeNodeClick">
        </el-tree>
      </div>
    </div>
  </div>
</template>

<script>
import { getRoleSelector } from '@/api/permission/role'
import { getAuthorizeValues, updateBatchAuthorize } from '@/api/permission/authorize'

export default {
  name: 'permission-authorize',
  data() {
    return {
      active: 0,
      roleTreeLoading: false,
      treeLoading: false,
      btnLoading: false,
      checkStrictly: true,
      objectId: 0,
      params: {
        type: 'module',
        moduleIds: ''
      },
      dataForm: {
        roleIds: [],
        module: [],
        button: [],
        column: [],
        resource: []
      },
      roleTreeData: [],
      roleTreeAllData: [],
      roleAllIds: [],
      roleTypeList: [],
      positionTreeData: [],
      authorizeTreeData: [],
      moduleAuthorizeTree: [],
      buttonAuthorizeTree: [],
      columnAuthorizeTree: [],
      resourceAuthorizeTree: [],
      moduleAllData: [],
      buttonAllData: [],
      columnAllData: [],
      resourceAllData: [],
      moduleIdsTemp: [],
      defaultProps: { // 配置项（必选）
        value: 'id',
        label: 'fullName',
        children: 'children',
        disabled: 'disabled'
      }
    }
  },
  created() {
    this.initData()
  },
  methods: {
    initData() {
      Object.assign(this.$data, this.$options.data())
      this.getAuthorizeList()
    },
    getDictionaryData() {
      this.$store.dispatch('base/getDictionaryData', { sort: 'RoleType' }).then(res => {
        this.roleTypeList = JSON.parse(JSON.stringify(res))
        this.getRoleList()
      })
    },
    getRoleList() {
      this.roleTreeLoading = true
      getRoleSelector().then(res => {
        this.roleAllIds = res.data.list.map(e => e.id)
        this.roleTreeData = res.data.list
        this.roleTreeAllData = JSON.parse(JSON.stringify(this.roleTypeList))
        for (let i = 0; i < this.roleTreeAllData.length; i++) {
          let child = this.roleTreeData.filter(o => this.roleTreeAllData[i].enCode === o.type)
          this.$set(this.roleTreeAllData[i], 'children', child)
        }
        this.roleTreeAllData = this.roleTreeAllData.filter(o => o.children.length)
        this.roleTreeLoading = false
      }).catch(() => {
        this.roleTreeLoading = false
      })
    },
    getAuthorizeList() {
      this.treeLoading = true
      getAuthorizeValues(this.objectId, this.params).then(res => {
        switch (this.active) {
          case 0:
            this.moduleAuthorizeTree = res.data.list
            this.moduleAllData = res.data.all
            this.authorizeTreeData = this.moduleAuthorizeTree
            const moduleIds = [...this.moduleIdsTemp, ...res.data.ids]
            this.dataForm.module = [...new Set(moduleIds)]
            this.moduleIdsTemp = this.dataForm.module
            this.$refs.authorizeTree.setCheckedKeys(this.dataForm.module)
            break
          case 1:
            this.buttonAuthorizeTree = res.data.list
            this.buttonAllData = res.data.all
            this.authorizeTreeData = this.buttonAuthorizeTree
            this.dataForm.button = [...this.dataForm.button, ...res.data.ids, ...this.moduleIdsTemp]
            this.$refs.authorizeTree.setCheckedKeys(this.dataForm.button)
            break
          case 2:
            this.columnAuthorizeTree = res.data.list
            this.columnAllData = res.data.all
            this.authorizeTreeData = this.columnAuthorizeTree
            this.dataForm.column = [...this.dataForm.column, ...res.data.ids, ...this.moduleIdsTemp]
            this.$refs.authorizeTree.setCheckedKeys(this.dataForm.column)
            break
          case 3:
            this.resourceAuthorizeTree = res.data.list
            this.resourceAllData = res.data.all
            this.authorizeTreeData = this.resourceAuthorizeTree
            this.dataForm.resource = [...this.dataForm.resource, ...res.data.ids, ...this.moduleIdsTemp]
            this.$refs.authorizeTree.setCheckedKeys(this.dataForm.resource)
            break
        }
        this.checkStrictly = false
        this.treeLoading = false
      }).catch(() => {
        this.treeLoading = false
      })
    },
    // 全选/全不选
    handleCheck(val) {
      if (val === 'checkAll') {
        switch (this.active) {
          case 0:
            this.$refs.authorizeTree.setCheckedKeys(this.moduleAllData)
            break
          case 1:
            this.$refs.authorizeTree.setCheckedKeys(this.buttonAllData)
            break
          case 2:
            this.$refs.authorizeTree.setCheckedKeys(this.columnAllData)
            break
          case 3:
            this.$refs.authorizeTree.setCheckedKeys(this.resourceAllData)
            break
          case 4:
            this.$refs.roleTree.setCheckedKeys(this.roleAllIds)
        }
      }
      if (val === 'cancelCheckAll') {
        if (this.active === 4) {
          this.$refs.roleTree.setCheckedKeys([])
        } else {
          this.$refs.authorizeTree.setCheckedKeys([])
        }
      }
    },
    // 折叠 展开
    setAllExpand(state) {
      let result
      if (state === 'open') {
        result = true
      }
      if (state === 'close') {
        result = false
      }
      let nodes
      if (this.active === 4) {
        nodes = this.$refs.roleTree.store.nodesMap
      } else {
        nodes = this.$refs.authorizeTree.store.nodesMap
      }
      for (let i in nodes) {
        nodes[i].expanded = result
      }
    },
    // 上一步
    handlePrevStep() {
      this.active -= 1
      this.handleInitData()
    },
    // 下一步
    handleNextStep() {
      if (this.active++ > 4) this.active = 0
      this.handleInitData()
    },
    handleInitData() {
      this.checkStrictly = true
      this.treeLoading = true
      switch (this.active) {
        case 0:
          this.params.type = 'module'
          break
        case 1:
          this.params.type = 'button'
          this.params.moduleIds = (this.moduleIdsTemp).toString()
          break
        case 2:
          this.params.type = 'column'
          this.params.moduleIds = (this.moduleIdsTemp).toString()
          break
        case 3:
          this.params.type = 'resource'
          this.params.moduleIds = (this.moduleIdsTemp).toString()
          break
        case 4:
          this.getDictionaryData()
          this.$nextTick(() => {
            this.$refs.roleTree.setCheckedKeys(this.dataForm.roleIds)
          })
          break
      }
      if (this.active !== 4) this.getAuthorizeList()
      this.treeLoading = false
    },
    // 设置数据
    selectTreeNodeClick() {
      let dataIds = []
      if (this.active !== 4) {
        const parentIds = this.$refs.authorizeTree.getHalfCheckedKeys()
        const childrenIds = this.$refs.authorizeTree.getCheckedKeys()
        const newIds = [...parentIds, ...childrenIds]
        dataIds = [...new Set(newIds)]
      }
      switch (this.active) {
        case 0:
          this.dataForm.module = dataIds
          this.moduleIdsTemp = this.dataForm.module
          break
        case 1:
          this.dataForm.button = dataIds
          break
        case 2:
          this.dataForm.column = dataIds
          break
        case 3:
          this.dataForm.resource = dataIds
          break
        case 4:
          this.dataForm.roleIds = this.$refs.roleTree.getCheckedKeys()
          break
      }
    },
    handleConfirm() {
      this.btnLoading = true
      updateBatchAuthorize(this.dataForm).then(res => {
        this.$message({
          message: res.msg,
          type: 'success',
          duration: 1500,
          onClose: () => {
            this.btnLoading = false
            this.active = 0
            this.initData()
          }
        })
      }).catch(() => {
        this.btnLoading = false
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.authorize-container {
  padding: 0;
}
.authorize-bd {
  padding: 20px;
  height: calc(100% - 50px);
  font-size: 14px;
  overflow: auto;
  overflow-x: hidden;
}
</style>
