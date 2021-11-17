<template>
  <el-dialog :title="!dataForm.id ? '新建区域' : '编辑区域'" :close-on-click-modal="false"
    :visible.sync="visible" class="JNPF-dialog JNPF-dialog_center" lock-scroll width="600px">
    <el-form ref="dataForm" :model="dataForm" :rules="dataRule" v-loading="formLoading"
      label-width="100px">
      <el-form-item label="区域上级" prop="parentId">
        <el-select ref="singleTree" v-model="singleSelectTreeVal" clearable
          popper-class="select-tree" value-key="id" @clear="selectTreeClearHandle">
          <el-option :value="singleSelectTreeKey" class="options">
            <el-tree ref="singleSelectTree" :element-loading-text="$t('common.loadingText')"
              :current-node-key="singleSelectTreeKey" :data="treeData" highlight-current
              :expand-on-click-node="false" :props="props" node-key="id" lazy
              v-loading="treeLoading" :load="loadNode" @node-click="selectTreeNodeClick">
              <span slot-scope="{ node }" class="vab-custom-tree-node">
                <span class="vab-tree-item">{{ node.data.fullName }}</span>
              </span>
            </el-tree>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="区域名称" prop="fullName">
        <el-input v-model="dataForm.fullName" placeholder="输入名称" />
      </el-form-item>
      <el-form-item label="区域编码" prop="enCode">
        <el-input v-model="dataForm.enCode" placeholder="输入编码" />
      </el-form-item>
      <el-form-item label="排序" prop="sortCode">
        <el-input-number :min="0" :max="9999" v-model="dataForm.sortCode" />
      </el-form-item>
      <el-form-item label="状态" prop="enabledMark">
        <el-switch v-model="dataForm.enabledMark" :active-value="1" :inactive-value="0" />
      </el-form-item>
      <el-form-item label="区域说明" prop="description">
        <el-input v-model="dataForm.description" type="textarea" :rows="6" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">{{$t('common.cancelButton')}}</el-button>
      <el-button type="primary" :loading="btnLoading" @click="dataFormSubmit()">
        {{$t('common.confirmButton')}}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {
  getProvinceInfo,
  getProvinceSelector,
  createProvince,
  updateProvince
} from '@/api/system/province'

export default {
  data() {
    return {
      visible: false,
      formLoading: false,
      treeLoading: false,
      btnLoading: false,
      singleSelectTreeVal: "", //单选树默认label值
      singleSelectTreeKey: "", //单选树默认key值
      treeData: [], //单选树的值
      props: {
        children: "children",
        label: "fullName",
        isLeaf: 'isLeaf'
      },
      dataForm: {
        parentId: '',
        fullName: '',
        enCode: '',
        enabledMark: 1,
        sortCode: 0,
        description: ''
      },
      nodeId: '0',
      dataRule: {
        parentId: [
          { required: true, message: '请选择区域上级', trigger: 'blur' },
        ],
        fullName: [
          { required: true, message: '请输入区域名称', trigger: 'blur' },
          { validator: this.formValidate('fullName', '区域名称不能含有特殊符号'), trigger: 'blur' },
          { max: 50, message: '区域名称最多为50个字符！', trigger: 'blur' }
        ],
        enCode: [
          { required: true, message: '请输入区域编码', trigger: 'blur' },
          { validator: this.formValidate('userCode', '区域编码只能是数字'), trigger: 'blur' },
          { max: 50, message: '区域编码最多为50个字符！', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    init(id) {
      this.dataForm.id = id || 0
      this.visible = true
      this.formLoading = true
      this.$nextTick(() => {
        this.selectTreeClearHandle()
        this.$refs['dataForm'].resetFields()
        this.treeLoading = true
        getProvinceSelector('-1').then(res => {
          let topItem = { fullName: "顶级节点", id: "-1", isLeaf: true }
          this.treeData = [topItem, ...res.data.list]
          this.treeLoading = false
        })
        if (this.dataForm.id) {
          getProvinceInfo(this.dataForm.id).then(res => {
            this.dataForm = res.data
            if (res.data.parentName) {
              this.singleSelectTreeKey = res.data.parentId
              this.singleSelectTreeVal = res.data.parentName
            } else {
              this.singleSelectTreeVal = '顶级节点'
              this.singleSelectTreeKey = '-1'
            }
          })
        }
        this.formLoading = false
      })
    },
    getChildrenNode(node, resolve) {
      this.nodeId = node.data.id
      getProvinceSelector(this.nodeId).then(res => {
        this.childrenList = res.data.list
        resolve(this.childrenList)
      })
    },
    loadNode(node, resolve) {
      if (node.level === 0) {
        this.nodeId = '-1'
        return resolve(this.treeData)
      }
      if (node.level > 0) {
        this.getChildrenNode(node, resolve)
      }
    },
    selectTreeNodeClick(data) {
      this.singleSelectTreeVal = data.fullName
      this.singleSelectTreeKey = data.id
      this.dataForm.parentId = data.id
      this.$refs.singleTree.blur()
    },
    selectTreeClearHandle() {
      this.singleSelectTreeVal = ''
      this.singleSelectTreeKey = ''
      this.dataForm.parentId = ''
      this.$refs.singleSelectTree.setCurrentKey('')
    },
    dataFormSubmit() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.btnLoading = true
          const formMethod = this.dataForm.id ? updateProvince : createProvince
          formMethod(this.dataForm).then(res => {
            this.$message({
              message: res.msg,
              type: 'success',
              duration: 1500,
              onClose: () => {
                this.visible = false
                this.btnLoading = false
                this.$emit('refreshDataList')
              }
            })
          }).catch(() => {
            this.btnLoading = false
          })
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.select-tree {
  .el-select-dropdown__item {
    padding: 5px 10px;
    height: auto;
    overflow: hidden;
  }
  .el-select-dropdown__item.hover,
  .el-select-dropdown__item:hover {
    background-color: #fff;
  }
  .el-select-dropdown__item.selected {
    font-weight: normal;
  }
}
</style>
