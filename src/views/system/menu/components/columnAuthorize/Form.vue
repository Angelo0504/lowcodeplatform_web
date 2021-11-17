<template>
  <el-dialog :title="!dataForm.id ? '新建字段' : '编辑字段'" :close-on-click-modal="false"
    :close-on-press-escape="false" :visible.sync="visible" lock-scroll
    class="JNPF-dialog JNPF-dialog_center" width="600px">
    <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="80px"
      v-loading="formLoading" class="menuForm">
      <!--      <el-form-item label="绑定表格" prop="bindTable">-->
      <!--        <el-input v-model="dataForm.bindTable" placeholder="输入绑定表格" />-->
      <!--      </el-form-item>-->
      <!--      <el-form-item label="表格描述" prop="bindTableName">-->
      <!--        <el-input v-model="dataForm.bindTableName" placeholder="绑定表格描述" />-->
      <!--      </el-form-item>-->
      <el-form-item label="字段名称" prop="enCode">
        <el-input v-model="dataForm.enCode" placeholder="输入字段名称" />
      </el-form-item>
      <el-form-item label="字段注解" prop="fullName">
        <el-input v-model="dataForm.fullName" placeholder="输入字段注解" />
      </el-form-item>
      <el-form-item label="状态" prop="enabledMark">
        <el-switch v-model="dataForm.enabledMark" :active-value="1" :inactive-value="0" />
      </el-form-item>
      <el-form-item label="字段说明" prop="description">
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
  createColumn,
  updateColumn,
  getColumnInfo
} from '@/api/system/columnAuthorize'

export default {
  data() {
    return {
      visible: false,
      formLoading: false,
      btnLoading: false,
      dataForm: {
        id: '',
        moduleId: '',
        bindTable: '',
        bindTableName: '',
        fullName: '',
        enCode: '',
        enabledMark: 1,
        description: ''
      },
      dataRule: {
        enCode: [
          { required: true, message: '字段名称不能为空', trigger: 'blur' }
        ],
        fullName: [
          { required: true, message: '字段注解不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    init(moduleId, id) {
      this.dataForm.id = id || ''
      this.dataForm.moduleId = moduleId
      this.visible = true
      this.formLoading = true
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        // 获取字段数据
        if (this.dataForm.id) {
          getColumnInfo(this.dataForm.id).then(res => {
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
          const formMethod = this.dataForm.id ? updateColumn : createColumn
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
</style>

