<template>
  <div class="flow-form" v-loading="loading">
    <div class="com-title">
      <h1>付款申请单</h1>
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
        <el-col :span="12" v-if="JudgeShow('departmental')">
          <el-form-item label="申请部门" prop="departmental">
            <el-input v-model="dataForm.departmental" placeholder="申请部门" readonly
              :disabled="JudgeWrite('departmental')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('paymentUnit')">
          <el-form-item label="付款单位" prop="paymentUnit">
            <el-input v-model="dataForm.paymentUnit" placeholder="付款单位"
              :disabled="JudgeWrite('paymentUnit')"></el-input>
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
        <el-col :span="12" v-if="JudgeShow('purposeName')">
          <el-form-item label="用途名称" prop="purposeName">
            <el-input v-model="dataForm.purposeName" placeholder="用途名称"
              :disabled="JudgeWrite('purposeName')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('projectCategory')">
          <el-form-item label="项目类别" prop="projectCategory">
            <el-input v-model="dataForm.projectCategory" placeholder="项目类别"
              :disabled="JudgeWrite('projectCategory')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('projectLeader')">
          <el-form-item label="项目负责人" prop="projectLeader">
            <el-input v-model="dataForm.projectLeader" placeholder="项目负责人"
              :disabled="JudgeWrite('projectLeader')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('openingBank')">
          <el-form-item label="开户银行" prop="openingBank">
            <el-input v-model="dataForm.openingBank" placeholder="开户银行"
              :disabled="JudgeWrite('openingBank')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('beneficiaryAccount')">
          <el-form-item label="收款人账号" prop="beneficiaryAccount">
            <el-input v-model="dataForm.beneficiaryAccount" placeholder="收款人账号"
              :disabled="JudgeWrite('beneficiaryAccount')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('receivableContact')">
          <el-form-item label="联系方式" prop="receivableContact">
            <el-input v-model="dataForm.receivableContact" placeholder="联系方式"
              :disabled="JudgeWrite('receivableContact')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('applyAmount')">
          <el-form-item label="申请金额" prop="applyAmount">
            <el-input v-model="dataForm.applyAmount" placeholder="申请金额" type="number"
              :disabled="JudgeWrite('applyAmount')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('settlementMethod')">
          <el-form-item label="结算方式" prop="settlementMethod">
            <el-select v-model="dataForm.settlementMethod" placeholder="选择结算方式"
              :disabled="JudgeWrite('settlementMethod')">
              <el-option :key="item.enCode" :label="item.fullName" :value="item.enCode"
                v-for="item in paymentMethodOptions" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('paymentType')">
          <el-form-item label="付款类型" prop="paymentType">
            <el-radio-group v-model="dataForm.paymentType" :disabled="JudgeWrite('paymentType')">
              <el-radio label="订金">订金</el-radio>
              <el-radio label="首付">首付</el-radio>
              <el-radio label="尾款">尾款</el-radio>
              <el-radio label="全额">全额</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('amountPaid')">
          <el-form-item label="付款金额" prop="amountPaid">
            <el-input v-model="dataForm.amountPaid" placeholder="付款金额" type="number"
              :disabled="JudgeWrite('amountPaid')"></el-input>
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
  name: 'PaymentApply',
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
        departmental: '',
        paymentUnit: '',
        purposeName: '',
        projectCategory: '',
        projectLeader: '',
        beneficiaryAccount: '',
        settlementMethod: '',
        receivableContact: '',
        applyAmount: '',
        openingBank: '',
        description: '',
        amountPaid: '',
        paymentType: ''
      },
      dataRule: {
        flowTitle: [
          { required: true, message: '流程标题不能为空', trigger: 'blur' },
        ],
        flowUrgent: [
          { required: true, message: '紧急程度不能为空', trigger: 'change' },
        ],
        openingBank: [
          { required: true, message: '开户银行不能为空', trigger: 'blur' },
        ],
        settlementMethod: [
          { required: true, message: '结算方式不能为空', trigger: 'change' },
        ],
        paymentType: [
          { required: true, message: '付款类型不能为空', trigger: 'change' },
        ],
        receivableContact: [
          { pattern: /^1[3456789]\d{9}$|^0\d{2,3}-?\d{7,8}$/, message: '请输入正确的联系方式', trigger: 'blur' }
        ],
      },
      paymentMethodOptions: []
    }
  },
  methods: {
    selfInit(data) {
      this.dataForm.applyDate = new Date().getTime()
      this.dataForm.flowTitle = this.userInfo.userName + "的付款申请单"
      this.dataForm.applyUser = this.userInfo.userName + '/' + this.userInfo.userAccount
      this.dataForm.departmental = this.userInfo.departmentName
    },
    beforeInit() { this.getPaymentMethodOptions() }
  }
}
</script>