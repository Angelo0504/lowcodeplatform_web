<template>
  <el-dialog :title="!dataForm.id ? '新建字段' : '编辑字段'" :close-on-click-modal="false"
    :close-on-press-escape="false" :visible.sync="visible" lock-scroll
    class="JNPF-dialog JNPF-dialog_center" width="630px">
    <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="80px"
      v-loading="formLoading" class="menuForm">
      <el-form-item label="字段名称" prop="enCode">
        <el-input v-model="dataForm.enCode" placeholder="输入字段名称" />
      </el-form-item>
      <el-form-item label="字段注解" prop="fullName">
        <el-input v-model="dataForm.fullName" placeholder="输入字段注解" />
      </el-form-item>
      <el-form-item label="字段类型" prop="type">
        <el-select v-model="dataForm.type" placeholder="请选择" clearable>
          <el-option v-for="item in typeOptions" :key="item.value" :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="条件符号" prop="conditionSymbol">
        <el-select v-model="conditionSymbol" multiple placeholder="请选择">
          <el-option v-for="item in conditionSymbolOptions" :key="item.value" :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="条件内容" prop="conditionText">
        <el-select v-model="dataForm.conditionText" placeholder="请选择" clearable>
          <el-option v-for="item in conditionTextOptions" :key="item.value" :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="字段说明" prop="bodyText">
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
  createDataAuthorize,
  updateDataAuthorize,
  getDataAuthorizeInfo
} from '@/api/system/dataAuthorize'

export default {
  data() {
    return {
      visible: false,
      formLoading: false,
      btnLoading: false,
      typeOptions: [{
        value: 'String',
        label: 'String'
      }, {
        value: 'Int32',
        label: 'Int32'
      }, {
        value: 'Double',
        label: 'Double'
      }],
      conditionTextOptions: [{
        value: 'text',
        label: '任意文本'
      }, {
        value: '@userId',
        label: '当前用户'
      }, {
        value: '@organizeId',
        label: '当前公司'
      }, {
        value: '@dempmentId',
        label: '当前部门'
      }, {
        value: '@subordinateId',
        label: '我的下属'
      }
      ],
      conditionSymbolOptions: [{
        value: 'Equal',
        label: '等于'
      }, {
        value: 'NotEqual',
        label: '不等于'
      }, {
        value: 'GreaterThan',
        label: '大于'
      }, {
        value: 'GreaterThanOrEqual',
        label: '大于等于'
      }, {
        value: 'LessThan',
        label: '小于'
      }, {
        value: 'LessThanOrEqual',
        label: '小于等于'
      }],
      dataForm: {
        id: '',
        moduleId: '',
        fullName: '',
        enCode: '',
        type: '',
        conditionSymbol: '',
        conditionText: '',
        description: ''
      },
      conditionSymbol: [],
      dataRule: {
        enCode: [
          { required: true, message: '字段名称不能为空', trigger: 'blur' }
        ],
        fullName: [
          { required: true, message: '字段注解不能为空', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择字段类型', trigger: 'blur' }
        ],
        conditionSymbol: [
          { required: true, message: '请选择条件符号', trigger: 'blur' }
        ],
        conditionText: [
          { required: true, message: '请选择条件内容', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    init(moduleId, id) {
      this.dataForm.id = id || ''
      this.dataForm.moduleId = moduleId
      this.conditionSymbol = []
      this.visible = true
      this.formLoading = true
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        // 获取字段数据
        if (this.dataForm.id) {
          getDataAuthorizeInfo(this.dataForm.id).then(res => {
            this.dataForm = res.data
            this.conditionSymbol = res.data.conditionSymbol ? res.data.conditionSymbol.split(",") : []
          })
        }
        this.formLoading = false
      })
    },
    dataFormSubmit() {
      this.dataForm.conditionSymbol = this.conditionSymbol.join()
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.btnLoading = true
          const formMethod = this.dataForm.id ? updateDataAuthorize : createDataAuthorize
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