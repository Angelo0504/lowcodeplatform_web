<template>
  <el-dialog :title="!dataForm.id ? '新建分类' : '编辑分类'" :close-on-click-modal="false"
    :visible.sync="visible" :append-to-body="true" class="JNPF-dialog JNPF-dialog_center"
    lock-scroll width="600px">
    <el-form ref="dataForm" :model="dataForm" :rules="dataRule" v-loading="formLoading"
      label-width="60px">
      <el-form-item label="上级" prop="parentId">
        <JNPF-TreeSelect v-model="dataForm.parentId" :options="treeData" placeholder="选择项目上级" />
      </el-form-item>
      <el-form-item label="名称" prop="fullName">
        <el-input v-model="dataForm.fullName" placeholder="输入名称" />
      </el-form-item>
      <el-form-item label="编码" prop="enCode">
        <el-input v-model="dataForm.enCode" placeholder="输入编码" />
      </el-form-item>
      <el-form-item label="树形" prop="isTree">
        <el-switch v-model="dataForm.isTree" :active-value="1" :inactive-value="0"
          :disabled="treeDisabled" />
      </el-form-item>
      <el-form-item label="排序" prop="sortCode">
        <el-input-number :min="0" :max="9999" v-model="dataForm.sortCode" />
      </el-form-item>
      <el-form-item label="说明" prop="description">
        <el-input type="textarea" :rows="6" v-model="dataForm.description" />
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
  getDictionaryTypeSelector,
  getDictionaryTypeInfo,
  createDictionaryType,
  updateDictionaryType
} from '@/api/systemData/dictionary'

export default {
  data() {
    return {
      visible: false,
      treeDisabled: false,
      dataForm: {
        id: '',
        parentId: '',
        fullName: '',
        enCode: '',
        isTree: 0,
        sortCode: 0,
        description: ''
      },
      formLoading: false,
      btnLoading: false,
      treeData: [],
      dataRule: {
        parentId: [
          { required: true, message: '上级菜单不能为空', trigger: 'input' }
        ],
        fullName: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          { validator: this.formValidate('fullName', '名称不能含有特殊符号'), trigger: 'blur' },
          { max: 50, message: '名称最多为50个字符！', trigger: 'blur' }
        ],
        enCode: [
          { required: true, message: '请输入编码', trigger: 'blur' },
          { validator: this.formValidate('enCode'), trigger: 'blur' },
          { max: 50, message: '编码最多为50个字符！', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    init(id) {
      this.visible = true
      this.dataForm.id = id || ''
      this.formLoading = true
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        getDictionaryTypeSelector().then(res => {
          let topItem = {
            fullName: "顶级节点",
            hasChildren: true,
            id: "-1",
            children: res.data.list
          }
          this.treeData = [topItem]
        })
        if (this.dataForm.id) {
          this.treeDisabled = true
          getDictionaryTypeInfo(this.dataForm.id).then(res => {
            this.dataForm = res.data
          })
        }
        this.formLoading = false
      })
    },
    dataFormSubmit() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.btnLoading = true
          const formMethod = this.dataForm.id ? updateDictionaryType : createDictionaryType
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
