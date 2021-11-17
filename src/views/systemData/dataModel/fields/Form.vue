<template>
  <el-dialog :title="!dataForm.id ? '新建字段' : '编辑字段'" :close-on-click-modal="false"
    :visible.sync="visible" :append-to-body="true" class="JNPF-dialog JNPF-dialog_center"
    lock-scroll width="600px">
    <el-form ref="dataForm" :model="dataForm" :rules="dataRule" v-loading="formLoading"
      label-width="80px">
      <el-form-item label="列名" prop="field">
        <el-input v-model="dataForm.field" placeholder="输入列名" maxlength="50" />
      </el-form-item>
      <el-form-item label="说明" prop="fieldName">
        <el-input v-model="dataForm.fieldName" placeholder="输入说明" maxlength="50" />
      </el-form-item>
      <el-form-item label="类型" prop="dataType">
        <el-select v-model="dataForm.dataType" placeholder="请选择类型">
          <el-option v-for="item in options" :key="item.value" :label="item.label"
            :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="长度" prop="dataLength">
        <el-input-number v-model="dataForm.dataLength" :min="1" :max="10000" label="输入长度">
        </el-input-number>
      </el-form-item>
      <el-form-item label="允许空" prop="allowNull">
        <el-switch v-model="dataForm.allowNull" :active-value="1" :inactive-value="0" />
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
import { getInfo, Update, Create } from '@/api/systemData/commonFields'

export default {
  data() {
    return {
      visible: false,
      dataForm: {
        id: '',
        field: '',
        fieldName: '',
        dataType: '',
        dataLength: 50,
        allowNull: 1
      },
      formLoading: false,
      btnLoading: false,
      options: [
        { label: '字符串', value: 'varchar' },
        { label: '整型', value: 'int' },
        { label: '日期时间', value: 'datetime' },
        { label: '浮点', value: 'decimal' },
        { label: '长整型', value: 'bigint' },
        { label: '文本', value: 'text' }
      ],
      dataRule: {
        field: [
          { required: true, message: '列名不能为空', trigger: 'blur' },
          { pattern: /(^_([a-zA-Z0-9]_?)*$)|(^[a-zA-Z](_?[a-zA-Z0-9])*_?$)/, message: '请输入正确的列名', trigger: ['blur'] },
        ],
        fieldName: [
          { required: true, message: '说明不能为空', trigger: 'blur' },
          { validator: this.formValidate('fullName', '说明不能含有特殊符号'), trigger: 'blur' },
        ],
        dataType: [
          { required: true, message: '类型不能为空', trigger: 'change' }
        ],
        dataLength: [
          { required: true, message: '长度不能为空', trigger: 'change' }
        ],
        allowNull: [
          { required: true, message: '允许空不能为空', trigger: 'change' }
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
        if (this.dataForm.id) {
          getInfo(this.dataForm.id).then(res => {
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
          const formMethod = this.dataForm.id ? Update : Create
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