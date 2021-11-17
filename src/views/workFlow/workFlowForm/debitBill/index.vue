<template>
  <div class="flow-form" v-loading="loading">
    <div class="com-title">
      <h1>借支单</h1>
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
        <el-col :span="12" v-if="JudgeShow('departmental')">
          <el-form-item label="所属部门" prop="departmental">
            <el-input v-model="dataForm.departmental" placeholder="所属部门" readonly
              :disabled="JudgeWrite('departmental')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('applyDate')">
          <el-form-item label="申请日期" prop="applyDate">
            <el-date-picker v-model="dataForm.applyDate" type="date" placeholder="选择日期"
              value-format="timestamp" format="yyyy-MM-dd" :editable="false" readonly
              :disabled="JudgeWrite('applyDate')">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('staffName')">
          <el-form-item label="员工姓名" prop="staffName">
            <el-input v-model="dataForm.staffName" placeholder="员工姓名" readonly
              :disabled="JudgeWrite('staffName')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('staffPost')">
          <el-form-item label="员工职务" prop="staffPost">
            <el-input v-model="dataForm.staffPost" placeholder="员工职务" readonly
              :disabled="JudgeWrite('staffPost')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('staffId')">
          <el-form-item label="员工编码" prop="staffId">
            <el-input v-model="dataForm.staffId" placeholder="员工编码"
              :disabled="JudgeWrite('staffId')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('loanMode')">
          <el-form-item label="借款方式" prop="loanMode">
            <el-input v-model="dataForm.loanMode" placeholder="借款方式"
              :disabled="JudgeWrite('loanMode')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('transferAccount')">
          <el-form-item label="转账账户" prop="transferAccount">
            <el-input v-model="dataForm.transferAccount" placeholder="转账账户"
              :disabled="JudgeWrite('transferAccount')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('paymentMethod')">
          <el-form-item label="支付方式" prop="paymentMethod">
            <el-select v-model="dataForm.paymentMethod" placeholder="选择支付方式"
              :disabled="JudgeWrite('paymentMethod')">
              <el-option :key="item.enCode" :label="item.fullName" :value="item.enCode"
                v-for="item in paymentMethodOptions" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('amountDebit')">
          <el-form-item label="借支金额" prop="amountDebit">
            <el-input v-model="dataForm.amountDebit" placeholder="借支金额" type="number"
              :disabled="JudgeWrite('amountDebit')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('repaymentBill')">
          <el-form-item label="还款票据" prop="repaymentBill">
            <el-input v-model="dataForm.repaymentBill" placeholder="还款票据"
              :disabled="JudgeWrite('repaymentBill')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('teachingDate')">
          <el-form-item label="还款日期" prop="teachingDate">
            <el-date-picker v-model="dataForm.teachingDate" type="datetime" placeholder="选择日期"
              value-format="timestamp" format="yyyy-MM-dd HH:mm" :editable='false'
              :disabled="JudgeWrite('teachingDate')">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="24" v-if="JudgeShow('reason')">
          <el-form-item label="借款原因" prop="reason">
            <el-input v-model="dataForm.reason" placeholder="借款原因" type="textarea" :rows="3"
              :disabled="JudgeWrite('reason')" />
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
  name: 'DebitBill',
  data() {
    return {
      dataForm: {
        flowId: '',
        id: '',
        billNo: '',
        flowTitle: '',
        flowUrgent: 1,
        staffName: '',
        applyDate: '',
        departmental: '',
        staffPost: '',
        staffId: '',
        loanMode: '',
        transferAccount: '',
        paymentMethod: '',
        amountDebit: '',
        repaymentBill: '',
        teachingDate: '',
        reason: '',
      },
      dataRule: {
        flowTitle: [
          { required: true, message: '流程标题不能为空', trigger: 'blur' },
        ],
        flowUrgent: [
          { required: true, message: '紧急程度不能为空', trigger: 'change' },
        ],
        staffId: [
          { required: true, message: '员工编码不能为空', trigger: 'blur' },
        ],
        loanMode: [
          { required: true, message: '借款方式不能为空', trigger: 'blur' },
        ],
        paymentMethod: [
          { required: true, message: '支付方式不能为空', trigger: 'change' },
        ],
      },
      paymentMethodOptions: []
    }
  },
  methods: {
    selfInit(data) {
      this.dataForm.applyDate = new Date().getTime()
      this.dataForm.flowTitle = this.userInfo.userName + "的借支单"
      this.dataForm.staffName = this.userInfo.userName + '/' + this.userInfo.userAccount
      this.dataForm.departmental = this.userInfo.departmentName
      if (this.userInfo.positionIds && this.userInfo.positionIds.length) {
        let list = this.userInfo.positionIds.map(o => o.name)
        this.dataForm.staffPost = list.join(',')
      }
    },
    beforeInit() { this.getPaymentMethodOptions() }
  }
}
</script>
