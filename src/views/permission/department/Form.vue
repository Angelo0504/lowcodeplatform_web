<template>
  <el-dialog
    :title="!dataForm.id ? $t(`department.addDepartment`) : $t(`department.editDepartment`)"
    :close-on-click-modal="false" :close-on-press-escape="false" :visible.sync="visible" lock-scroll
    class="JNPF-dialog JNPF-dialog_center" width="600px">
    <el-form ref="dataForm" v-loading="formLoading" :model="dataForm" :rules="dataRule"
      label-width="80px">
      <el-form-item label="所属上级" prop="parentId">
        <JNPF-TreeSelect v-model="dataForm.parentId" :options="treeData" placeholder="选择所属上级" />
      </el-form-item>
      <el-form-item label="部门名称" prop="fullName">
        <el-input v-model="dataForm.fullName" placeholder="输入名称" />
      </el-form-item>
      <el-form-item label="部门编码" prop="enCode">
        <el-input v-model="dataForm.enCode" placeholder="输入编码" />
      </el-form-item>
      <el-form-item label="部门主管" prop="managerId">
        <JNPF-TreeSelect v-model="dataForm.managerId" :options="usersTreeData" @getValue="getValue"
          lastLevel lastLevelKey='type' lastLevelValue='user' placeholder="选择所属部门主管" />
      </el-form-item>
      <el-form-item label="排序" prop="sortCode">
        <el-input-number :min="0" :max="9999" v-model="dataForm.sortCode" />
      </el-form-item>
      <el-form-item label="部门说明" prop="description">
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
  getDepartmentSelector,
  createDepartment,
  updateDepartment,
  getDepartmentInfo
} from '@/api/permission/department'
import {
  getUserSelector
} from '@/api/permission/user'

export default {
  data() {
    return {
      visible: false,
      formLoading: false,
      btnLoading: false,
      dataForm: {
        id: '',
        parentId: '',
        managerId: '',
        fullName: '',
        enCode: '',
        sortCode: 0,
        enabledMark: 1,
        description: ''
      },
      treeData: [],
      usersTreeData: [],
      dataRule: {
        parentId: [
          { required: true, message: '所属上级不能为空', trigger: 'input' }
        ],
        fullName: [
          { required: true, message: '请输入部门名称', trigger: 'blur' },
          { validator: this.formValidate('fullName', '部门名称不能含有特殊符号'), trigger: 'blur' },
          { max: 50, message: '部门名称最多为50个字符！', trigger: 'blur' }
        ],
        enCode: [
          { required: true, message: '请输入部门编码', trigger: 'blur' },
          { validator: this.formValidate('enCode', '部门编码只能输入英文、数字和小数点且小数点不能放在首尾'), trigger: 'blur' },
          { max: 50, message: '部门编码最多为50个字符！', trigger: 'blur' }
        ],
        managerId: [
          { required: true, message: '请选择部门主管', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    init(id, parentId) {
      this.visible = true
      this.dataForm.id = id || ''
      this.formLoading = true
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        getDepartmentSelector().then(res => {
          this.treeData = res.data.list
        })
        getUserSelector().then(res => {
          this.usersTreeData = res.data.list
        })
        if (this.dataForm.id) {
          getDepartmentInfo(this.dataForm.id).then(res => {
            this.dataForm = res.data
          })
        } else {
          this.dataForm.parentId = parentId
        }
        this.formLoading = false
      })
    },
    getValue(value, node) {
      this.dataForm.managerId = value
    },
    dataFormSubmit() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.btnLoading = true
          const formMethod = this.dataForm.id ? updateDepartment : createDepartment
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
