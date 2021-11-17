<template>
  <el-dialog :title="!dataForm.id ? '新建项目' : '编辑项目'" :close-on-click-modal="false"
    :visible.sync="visible" class="JNPF-dialog JNPF-dialog_center" lock-scroll width="600px">
    <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="100px">
      <el-form-item label="项目名称" prop="projectName">
        <el-input v-model="dataForm.projectName" placeholder="项目名称" />
      </el-form-item>
      <el-form-item label="项目编码" prop="projectCode">
        <el-input v-model="dataForm.projectCode" placeholder="项目编码" />
      </el-form-item>
      <el-form-item label="负责人" prop="principal">
        <el-input v-model="dataForm.principal" placeholder="负责人" />
      </el-form-item>
      <el-form-item label="立项人" prop="jackStands">
        <el-input v-model="dataForm.jackStands" placeholder="立项人" />
      </el-form-item>
      <el-form-item label="项目类型" prop="projectType">
        <el-select v-model="dataForm.projectType" placeholder="请选择项目类型">
          <el-option v-for="item in industryTypeList" :key="item.id" :label="item.fullName"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="项目阶段" prop="projectPhase">
        <el-input v-model="dataForm.projectPhase" placeholder="项目阶段" />
      </el-form-item>
      <el-form-item label="客户名称" prop="customerName">
        <el-input v-model="dataForm.customerName" placeholder="客户名称" />
      </el-form-item>
      <el-form-item label="交互日期" prop="interactionDate">
        <el-date-picker v-model="dataForm.interactionDate" type="date" placeholder="选择交互日期"
          :editable="false" :clearable="false" value-format="timestamp" format="yyyy-MM-dd" />
      </el-form-item>
      <el-form-item label="费用金额" prop="costAmount">
        <el-input v-model="dataForm.costAmount" placeholder="费用金额" type="number" />
      </el-form-item>
      <el-form-item label="已用金额" prop="tunesAmount">
        <el-input v-model="dataForm.tunesAmount" placeholder="已用金额" type="number" />
      </el-form-item>
      <el-form-item label="预计收入" prop="projectedIncome">
        <el-input v-model="dataForm.projectedIncome" placeholder="预计收入" type="number" />
      </el-form-item>
      <el-form-item label="备注" prop="description">
        <el-input v-model="dataForm.description" placeholder="备注" type="textarea" :rows="3" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">{{$t('common.cancelButton')}}</el-button>
      <el-button type="primary" @click="dataFormSubmit()">{{$t('common.confirmButton')}}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { TableExampleInfo, TableExampleUpdate, TableExampleCreate } from '@/api/extend/tableExample'
export default {
  data() {
    return {
      visible: false,
      dataForm: {
        id: 0,
        projectName: '',
        projectCode: '',
        principal: '',
        jackStands: '',
        projectType: '',
        projectPhase: '',
        customerName: '',
        interactionDate: 0,
        costAmount: 0,
        tunesAmount: 0,
        projectedIncome: 0,
        description: '',
      },
      dataRule: {
        projectName: [
          { required: true, message: '项目名称不能为空', trigger: 'blur' }
        ],
        projectCode: [
          { required: true, message: '项目编码不能为空', trigger: 'blur' }
        ],
        principal: [
          { required: true, message: '负责人不能为空', trigger: 'blur' }
        ],
        projectType: [
          { required: true, message: '项目类型不能为空', trigger: 'change' }
        ],
      },
      industryTypeList: []
    }
  },
  methods: {
    init(industryTypeList, id) {
      this.industryTypeList = industryTypeList
      this.dataForm.id = id || 0
      this.visible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        if (this.dataForm.id) {
          TableExampleInfo(this.dataForm.id).then(res => {
            this.dataForm = res.data
          })
        }
      })
    },
    dataFormSubmit() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          if (!this.dataForm.id) {
            delete (this.dataForm.id)
            TableExampleCreate(this.dataForm).then((res) => {
              this.$message({
                message: res.msg,
                type: 'success',
                duration: 1500,
                onClose: () => {
                  this.visible = false
                  this.$emit('refreshDataList')
                }
              })
            })
          } else {
            TableExampleUpdate(this.dataForm).then((res) => {
              this.$message({
                message: res.msg,
                type: 'success',
                duration: 1500,
                onClose: () => {
                  this.visible = false
                  this.$emit('refreshDataList')
                }
              })
            })
          }
        }
      })
    },
  }
}
</script>