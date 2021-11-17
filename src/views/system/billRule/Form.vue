<template>
  <el-dialog :title="!dataForm.id ? '新建单据' : '编辑单据'" :close-on-click-modal="false"
    :visible.sync="visible" class="JNPF-dialog JNPF-dialog_center" lock-scroll width="600px">
    <el-form ref="dataForm" :model="dataForm" :rules="dataRule" v-loading="formLoading"
      label-width="100px">
      <el-form-item label="业务名称" prop="fullName">
        <el-input v-model="dataForm.fullName" placeholder="输入名称" />
      </el-form-item>
      <el-form-item label="业务编码" prop="enCode">
        <el-input v-model="dataForm.enCode" placeholder="业务编码" />
      </el-form-item>
      <el-form-item label="流水前辍" prop="prefix">
        <el-input v-model="dataForm.prefix" placeholder="输入前缀" @keyup.native="handleChange" />
      </el-form-item>
      <el-form-item label="流水日期" prop="dateFormat">
        <el-select v-model="dataForm.dateFormat" placeholder="请选择" clearable @change="handleChange">
          <el-option label="yyyymmdd" value="yyyyMMdd" />
          <el-option label="yyyymm" value="yyyyMM" />
          <el-option label="yyyy" value="yyyy" />
          <el-option label="no" value="no" />
        </el-select>
      </el-form-item>
      <el-form-item label="流水位数" prop="digit">
        <el-input v-model.number="dataForm.digit" maxlength="1" @keyup.native="handleChange" />
      </el-form-item>
      <el-form-item label="流水起始" prop="startNumber">
        <el-input v-model="dataForm.startNumber" placeholder="不允许输入0或特殊字符"
          @keyup.native="handleChange" />
      </el-form-item>
      <el-form-item label="流水范例" prop="example">
        <el-input v-model="dataForm.example" disabled />
      </el-form-item>
      <el-form-item label="状态" prop="enabledMark">
        <el-switch v-model="dataForm.enabledMark" :active-value="1" :inactive-value="0" />
      </el-form-item>
      <el-form-item label="流水说明" prop="description">
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
  getBillRuleInfo,
  createBillRule,
  updateBillRule
} from '@/api/system/billRule'
import dayjs from 'dayjs'

export default {
  data() {
    return {
      visible: false,
      formLoading: false,
      btnLoading: false,
      dataForm: {
        fullName: '',
        enCode: '',
        prefix: '',
        dateFormat: '',
        digit: '',
        startNumber: '',
        example: '',
        enabledMark: 1,
        description: ''
      },
      dataRule: {
        fullName: [
          { required: true, message: '请输入业务名称', trigger: 'blur' },
          { max: 50, message: '业务名称最多为50个字符！', trigger: 'blur' }
        ],
        enCode: [
          { required: true, message: '请输入业务编码', trigger: 'blur' },
          { max: 50, message: '业务编码最多为50个字符！', trigger: 'blur' }
        ],
        prefix: [
          { required: true, message: '请输入流水前缀', trigger: 'blur' }
        ],
        dateFormat: [
          { required: true, message: '请输入选择流水日期格式', trigger: 'change' }
        ],
        digit: [
          { required: true, message: '请输入流水位数', trigger: 'blur' },
          { type: 'number', message: '仅能输入正整数' },
          { pattern: /^[1-9]\d*$/, message: '仅能输入正整数' }
        ],
        startNumber: [
          { required: true, message: '只能输入数字', trigger: 'blur' },
          { pattern: /^[0-9]*$/, message: '只能输入数字', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    init(id) {
      this.dataForm.id = id || ''
      this.visible = true
      this.formLoading = true
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        if (this.dataForm.id) {
          getBillRuleInfo(this.dataForm.id).then(res => {
            this.dataForm = res.data
          })
        }
      })
      this.formLoading = false
    },
    handleChange() {
      // 流水前缀
      const prefix = this.dataForm.prefix

      // 流水日期格式
      const dateFormat = this.dataForm.dateFormat
      let dateVal = ''
      if (dateFormat && dateFormat !== 'no') {
        dateVal = dayjs().format(dateFormat.toUpperCase())
      }
      // 流水位数
      let digitVal = this.dataForm.digit
      if (digitVal != "") digitVal = Array(digitVal > 0 ? (digitVal - ('' + 0).length + 1) : 0).join('0') + 0

      // 流水起始
      const startNumber = this.dataForm.startNumber
      let startNumberVal = ''
      if (startNumber != "") {
        startNumberVal = (digitVal + startNumber)
        digitVal = startNumberVal.substring(startNumberVal.length - digitVal.length, startNumberVal.length)
        this.dataForm.startNumber = digitVal
      }
      // 流水范例
      this.dataForm.example = prefix + dateVal + digitVal
    },
    dataFormSubmit() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.btnLoading = true
          const formMethod = this.dataForm.id ? updateBillRule : createBillRule
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
