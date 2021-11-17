<template>
  <div class="flow-form" v-loading="loading">
    <div class="com-title">
      <h1>费用支出单</h1>
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
        <el-col :span="12" v-if="JudgeShow('applyUser')">
          <el-form-item label="申请人员" prop="applyUser">
            <el-input v-model="dataForm.applyUser" placeholder="申请人员" readonly
              :disabled="JudgeWrite('applyUser')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('department')">
          <el-form-item label="申请部门" prop="department">
            <el-input v-model="dataForm.department" placeholder="申请部门" readonly
              :disabled="JudgeWrite('department')"></el-input>
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
        <el-col :span="12" v-if="JudgeShow('contractNum')">
          <el-form-item label="合同编码" prop="contractNum">
            <el-input v-model="dataForm.contractNum" placeholder="合同编码"
              :disabled="JudgeWrite('contractNum')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('nonContract')">
          <el-form-item label="非合同支出" prop="nonContract">
            <el-input v-model="dataForm.nonContract" placeholder="非合同支出" type="number"
              :disabled="JudgeWrite('nonContract')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('accountOpeningBank')">
          <el-form-item label="开户银行" prop="accountOpeningBank">
            <el-input v-model="dataForm.accountOpeningBank" placeholder="开户银行"
              :disabled="JudgeWrite('accountOpeningBank')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('bankAccount')">
          <el-form-item label="银行账号" prop="bankAccount">
            <el-input v-model="dataForm.bankAccount" placeholder="银行账号"
              :disabled="JudgeWrite('bankAccount')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('openAccount')">
          <el-form-item label="开户姓名" prop="openAccount">
            <el-input v-model="dataForm.openAccount" placeholder="开户姓名"
              :disabled="JudgeWrite('openAccount')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('total')">
          <el-form-item label="合计费用" prop="total">
            <el-input v-model="dataForm.total" placeholder="合计费用" type="number"
              :disabled="JudgeWrite('total')"></el-input>
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
        <el-col :span="12" v-if="JudgeShow('amountPayment')">
          <el-form-item label="支付金额" prop="amountPayment">
            <el-input v-model="dataForm.amountPayment" placeholder="支付金额" type="number"
              :disabled="JudgeWrite('amountPayment')"></el-input>
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
  name: 'ExpenseExpenditure',
  data() {
    return {
      dataForm: {
        flowId: '',
        id: '',
        billNo: '',
        flowTitle: '',
        flowUrgent: 1,
        applyUser: '',
        applyDate: '',
        department: '',
        contractNum: '',
        nonContract: '',
        accountOpeningBank: '',
        openAccount: '',
        paymentMethod: '',
        total: '',
        amountPayment: '',
        bankAccount: '',
        description: '',
      },
      dataRule: {
        flowTitle: [
          { required: true, message: '流程标题不能为空', trigger: 'blur' },
        ],
        flowUrgent: [
          { required: true, message: '紧急程度不能为空', trigger: 'change' },
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
      this.dataForm.flowTitle = this.userInfo.userName + "的费用支出单"
      this.dataForm.applyUser = this.userInfo.userName + '/' + this.userInfo.userAccount
      this.dataForm.department = this.userInfo.departmentName
    },
    beforeInit() { this.getPaymentMethodOptions() }
  }
}
</script>