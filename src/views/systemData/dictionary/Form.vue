<template>
  <el-dialog :title="!dataForm.id ? '新建字典' : '编辑字典'" :close-on-click-modal="false"
    :close-on-press-escape="false" :visible.sync="visible" lock-scroll width="600px"
    class="JNPF-dialog JNPF-dialog_center">
    <el-form ref="dataForm" :model="dataForm" :rules="dataRule" v-loading="formLoading"
      label-width="80px">
      <el-form-item label="项目上级" prop="parentId">
        <JNPF-TreeSelect v-model="dataForm.parentId" :options="treeData" placeholder="选择项目上级"
          :disabled="parentDisabled" />
      </el-form-item>
      <el-form-item label="字典名称" prop="fullName">
        <el-input v-model="dataForm.fullName" placeholder="输入名称" />
      </el-form-item>
      <el-form-item label="字典编码" prop="enCode">
        <el-input v-model="dataForm.enCode" placeholder="输入编码" />
      </el-form-item>
      <el-form-item label="排序" prop="sortCode">
        <el-input-number :min="0" :max="9999" v-model="dataForm.sortCode" />
      </el-form-item>
      <el-form-item label="状态" prop="enabledMark">
        <el-switch v-model="dataForm.enabledMark" :active-value="1" :inactive-value="0" />
      </el-form-item>
      <el-form-item label="字典说明" prop="description">
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
  getDictionaryDataTypeSelector,
  getDictionaryDataInfo,
  updateDictionaryData,
  createDictionaryData
} from '@/api/systemData/dictionary'

export default {
  data() {
    return {
      visible: false,
      formLoading: false,
      btnLoading: false,
      parentDisabled: false,
      dataForm: {
        id: '',
        dictionaryTypeId: '',
        parentId: '0',
        fullName: '',
        enCode: '',
        enabledMark: 1,
        sortCode: 0,
        description: ''
      },
      treeData: [],
      dataRule: {
        parentId: [
          { required: true, message: '请选择', trigger: 'input' }
        ],
        fullName: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          { max: 50, message: '字典名称最多为50个字符！', trigger: 'blur' }
        ],
        enCode: [
          { required: true, message: '请输入编码', trigger: 'blur' },
          { max: 50, message: '字典编码最多为50个字符！', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    init(id, typeId, isTree) {
      this.visible = true
      this.dataForm.id = id || ''
      this.dataForm.dictionaryTypeId = typeId
      this.formLoading = true
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        if (isTree === 1) {
          this.parentDisabled = false
        } else {
          this.parentDisabled = true
        }
        getDictionaryDataTypeSelector(this.dataForm.dictionaryTypeId, isTree).then(res => {
          this.treeData = res.data.list
          if (this.dataForm.id) {
            getDictionaryDataInfo(this.dataForm.id).then(res => {
              this.dataForm = res.data
              this.formLoading = false
            })
          } else {
            this.dataForm.parentId = res.data.list[0].id
            this.formLoading = false
          }
        })
      })
    },
    dataFormSubmit() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.btnLoading = true
          this.dataForm.parentId = this.dataForm.dictionaryTypeId === this.dataForm.parentId ? '0' : this.dataForm.parentId
          const formMethod = this.dataForm.id ? updateDictionaryData : createDictionaryData
          formMethod(this.dataForm).then(res => {
            this.$message({
              message: res.msg,
              type: 'success',
              duration: 1500,
              onClose: () => {
                this.$store.commit('base/SET_DICTIONARY_LIST', [])
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
