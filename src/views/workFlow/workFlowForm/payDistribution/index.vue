<template>
  <div class="flow-form" v-loading="loading">
    <div class="com-title">
      <h1>薪酬发放</h1>
      <span class="number">流程编码：{{dataForm.billNo}}</span>
    </div>
    <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="100px"
      :disabled="setting.readonly">
      <el-row>
        <el-col :span="12" v-if="JudgeShow('flowTitle')">
          <el-form-item label="流程标题" prop="flowTitle">
            <el-input v-model="dataForm.flowTitle" placeholder="流程标题"
              :disabled="JudgeWrite('flowTitle')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('flowUrgent')">
          <el-form-item label="紧急程度" prop="flowUrgent">
            <el-select v-model="dataForm.flowUrgent" placeholder="选择紧急程度"
              :disabled="JudgeWrite('flowUrgent')">
              <el-option :key="item.value" :label="item.label" :value="item.value"
                v-for="item in flowUrgentOptions" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('month')">
          <el-form-item label="所属月份" prop="month">
            <el-input v-model="dataForm.month" placeholder="所属月份" :disabled="JudgeWrite('month')">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('issuingUnit')">
          <el-form-item label="发放单位" prop="issuingUnit">
            <el-input v-model="dataForm.issuingUnit" placeholder="发放单位"
              :disabled="JudgeWrite('issuingUnit')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('department')">
          <el-form-item label="员工部门" prop="department">
            <el-input v-model="dataForm.department" placeholder="员工部门"
              :disabled="JudgeWrite('department')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('position')">
          <el-form-item label="员工职位" prop="position">
            <el-input v-model="dataForm.position" placeholder="员工职位"
              :disabled="JudgeWrite('position')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('baseSalary')">
          <el-form-item label="基本薪资" prop="baseSalary">
            <el-input v-model="dataForm.baseSalary" placeholder="基本薪资" type="number"
              :disabled="JudgeWrite('baseSalary')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('actualAttendance')">
          <el-form-item label="出勤天数" prop="actualAttendance">
            <el-input v-model="dataForm.actualAttendance" placeholder="出勤天数" type="number"
              :disabled="JudgeWrite('actualAttendance')">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('allowance')">
          <el-form-item label="员工津贴" prop="allowance">
            <el-input v-model="dataForm.allowance" placeholder="员工津贴" type="number"
              :disabled="JudgeWrite('allowance')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('incomeTax')">
          <el-form-item label="所得税" prop="incomeTax">
            <el-input v-model="dataForm.incomeTax" placeholder="所得税" type="number"
              :disabled="JudgeWrite('incomeTax')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('insurance')">
          <el-form-item label="员工保险" prop="insurance">
            <el-input v-model="dataForm.insurance" placeholder="员工保险" type="number"
              :disabled="JudgeWrite('insurance')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('performance')">
          <el-form-item label="员工绩效" prop="performance">
            <el-input v-model="dataForm.performance" placeholder="员工绩效" type="number"
              :disabled="JudgeWrite('performance')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('overtimePay')">
          <el-form-item label="加班费用" prop="overtimePay">
            <el-input v-model="dataForm.overtimePay" placeholder="加班费用" type="number"
              :disabled="JudgeWrite('overtimePay')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('grossPay')">
          <el-form-item label="应发工资" prop="grossPay">
            <el-input v-model="dataForm.grossPay" placeholder="应发工资" type="number"
              :disabled="JudgeWrite('grossPay')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('payroll')">
          <el-form-item label="实发工资" prop="payroll">
            <el-input v-model="dataForm.payroll" placeholder="实发工资" type="number"
              :disabled="JudgeWrite('payroll')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24" v-if="JudgeShow('description')">
          <el-form-item label="备注" prop="description">
            <el-input v-model="dataForm.description" placeholder="备注" type="textarea" :rows="3"
              :disabled="JudgeWrite('description')" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <UserBox v-if="userBoxVisible" ref="userBox" @submit="submit" />
  </div>
</template>

<script>
import comMinix from '../minix';
export default {
  mixins: [comMinix],
  name: 'PayDistribution',
  data() {
    return {
      dataForm: {
        flowId: '',
        id: '',
        billNo: '',
        flowTitle: '',
        flowUrgent: 1,
        month: '',
        baseSalary: '',
        position: '',
        department: '',
        actualAttendance: '',
        allowance: '',
        insurance: '',
        overtimePay: '',
        performance: '',
        grossPay: '',
        incomeTax: '',
        description: '',
        issuingUnit: '',
        payroll: ''
      },
      dataRule: {
        flowTitle: [
          { required: true, message: '流程标题不能为空', trigger: 'blur' },
        ],
        flowUrgent: [
          { required: true, message: '紧急程度不能为空', trigger: 'change' },
        ]
      }
    }
  },
  methods: {
    selfInit(data) {
      this.dataForm.flowTitle = this.userInfo.userName + "的薪酬发放"
    }
  }
}
</script>