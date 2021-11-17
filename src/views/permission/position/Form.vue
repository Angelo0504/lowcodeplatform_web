<template>
  <el-dialog :title="!dataForm.id ? $t(`position.newPost`) : $t(`position.editPost`)"
    :close-on-click-modal="false" :close-on-press-escape="false" :visible.sync="visible" lock-scroll
    class="JNPF-dialog JNPF-dialog_center" width="600px">
    <el-form ref="dataForm" v-loading="formLoading" :model="dataForm" :rules="dataRule"
      label-width="90px">
      <el-form-item label="所属组织" prop="organizeId">
        <JNPF-TreeSelect v-model="dataForm.organizeId" :options="treeData" @getValue="getValue"
          placeholder="选择所属组织" />
      </el-form-item>
      <el-form-item label="岗位名称" prop="fullName">
        <el-input v-model="dataForm.fullName" placeholder="输入名称" />
      </el-form-item>
      <el-form-item label="岗位编码" prop="enCode">
        <el-input v-model="dataForm.enCode" placeholder="输入编码" />
      </el-form-item>
      <el-form-item label="岗位类型" prop="type">
        <el-select v-model="dataForm.type" placeholder="请选择类型">
          <el-option v-for="item in typeOptions" :key="item.enCode" :label="item.fullName"
            :value="item.enCode">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="排序" prop="sortCode">
        <el-input-number :min="0" :max="9999" v-model="dataForm.sortCode" />
      </el-form-item>
      <el-form-item label="岗位说明" prop="description">
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
  getDepartmentSelector
} from '@/api/permission/department'
import {
  createPosition,
  updatePosition,
  getPositionInfo
} from '@/api/permission/position'

export default {
  data() {
    return {
      visible: false,
      formLoading: false,
      btnLoading: false,
      typeOptions: [],
      dataForm: {
        id: '',
        organizeId: '',
        fullName: '',
        type: '',
        enCode: '',
        enabledMark: 1,
        sortCode: 0,
        description: ''
      },
      treeData: [],
      usersTreeData: [],
      dataRule: {
        organizeId: [
          { required: true, message: '所属组织不能为空', trigger: 'input' }
        ],
        fullName: [
          { required: true, message: '请输入岗位名称', trigger: 'blur' },
          { validator: this.formValidate('fullName', '岗位名称不能含有特殊符号'), trigger: 'blur' },
          { max: 50, message: '岗位名称最多为50个字符！', trigger: 'blur' }
        ],
        enCode: [
          { required: true, message: '请输入岗位编码', trigger: 'blur' },
          { validator: this.formValidate('userAccount', '岗位编码只能是数字、英文'), trigger: 'blur' },
          { max: 50, message: '岗位编码最多为50个字符！', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '岗位类型不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    init(id, organizeId) {
      this.visible = true
      this.dataForm.id = id || ''
      this.formLoading = true
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        getDepartmentSelector().then(res => {
          this.treeData = res.data.list
        })
        // 获取岗位类型
        this.$store.dispatch('base/getDictionaryData', { sort: 'PositionType' }).then(res => {
          this.typeOptions = res
        })
        if (this.dataForm.id) {
          getPositionInfo(this.dataForm.id).then(res => {
            this.dataForm = res.data
          })
        } else {
          this.dataForm.organizeId = organizeId
        }
        this.formLoading = false
      })
    },
    getValue(value) {
      this.dataForm.parentId = value
    },
    dataFormSubmit() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.btnLoading = true
          const formMethod = this.dataForm.id ? updatePosition : createPosition
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
