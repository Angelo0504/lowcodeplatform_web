<template>
  <div class="flow-form" v-loading="loading">
    <div class="com-title">
      <h1>合同申请单</h1>
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
        <el-col :span="12" v-if="JudgeShow('applyDate')">
          <el-form-item label="申请日期" prop="applyDate">
            <el-date-picker v-model="dataForm.applyDate" type="date" placeholder="选择日期"
              value-format="timestamp" format="yyyy-MM-dd" :editable="false" readonly
              :disabled="JudgeWrite('applyDate')">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('contractId')">
          <el-form-item label="编码支出" prop="contractId">
            <el-input v-model="dataForm.contractId" placeholder="编码支出"
              :disabled="JudgeWrite('contractId')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('contractNum')">
          <el-form-item label="合同号" prop="contractNum">
            <el-input v-model="dataForm.contractNum" placeholder="合同号"
              :disabled="JudgeWrite('contractNum')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('firstParty')">
          <el-form-item label="签署方(甲方)" prop="firstParty">
            <el-input v-model="dataForm.firstParty" placeholder="签署方(甲方)"
              :disabled="JudgeWrite('firstParty')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('secondParty')">
          <el-form-item label="乙方" prop="secondParty">
            <el-input v-model="dataForm.secondParty" placeholder="乙方"
              :disabled="JudgeWrite('secondParty')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('contractName')">
          <el-form-item label="合同名称" prop="contractName">
            <el-input v-model="dataForm.contractName" placeholder="合同名称"
              :disabled="JudgeWrite('contractName')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('contractType')">
          <el-form-item label="合同类型" prop="contractType">
            <el-input v-model="dataForm.contractType" placeholder="合同类型"
              :disabled="JudgeWrite('contractType')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('personCharge')">
          <el-form-item label="合作负责人" prop="personCharge">
            <el-input v-model="dataForm.personCharge" placeholder="合作负责人"
              :disabled="JudgeWrite('personCharge')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('leadDepartment')">
          <el-form-item label="所属部门" prop="leadDepartment">
            <el-input v-model="dataForm.leadDepartment" placeholder="所属部门"
              :disabled="JudgeWrite('leadDepartment')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('signArea')">
          <el-form-item label="签订地区" prop="signArea">
            <el-input v-model="dataForm.signArea" placeholder="签订地区"
              :disabled="JudgeWrite('signArea')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('incomeAmount')">
          <el-form-item label="收入金额" prop="incomeAmount">
            <el-input v-model="dataForm.incomeAmount" placeholder="收入金额" type="number"
              :disabled="JudgeWrite('incomeAmount')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('totalExpenditure')">
          <el-form-item label="支出总额" prop="totalExpenditure">
            <el-input v-model="dataForm.totalExpenditure" placeholder="支出总额" type="number"
              :disabled="JudgeWrite('totalExpenditure')">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('contractPeriod')">
          <el-form-item label="合同期限" prop="contractPeriod">
            <el-input v-model="dataForm.contractPeriod" placeholder="合同期限"
              :disabled="JudgeWrite('contractPeriod')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('paymentMethod')">
          <el-form-item label="结算方式" prop="paymentMethod">
            <el-select v-model="dataForm.paymentMethod" placeholder="选择结算方式"
              :disabled="JudgeWrite('paymentMethod')">
              <el-option :key="item.enCode" :label="item.fullName" :value="item.enCode"
                v-for="item in paymentMethodOptions" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('budgetaryApproval')">
          <el-form-item label="预算批付" prop="budgetaryApproval">
            <el-input v-model="dataForm.budgetaryApproval" placeholder="预算批付"
              :disabled="JudgeWrite('budgetaryApproval')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('startContractDate')">
          <el-form-item label="开始时间" prop="startContractDate">
            <el-date-picker v-model="dataForm.startContractDate" type="datetime" placeholder="选择日期"
              value-format="timestamp" format="yyyy-MM-dd HH:mm" :editable='false'
              :disabled="JudgeWrite('startContractDate')">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('endContractDate')">
          <el-form-item label="结束时间" prop="endContractDate">
            <el-date-picker v-model="dataForm.endContractDate" type="datetime" placeholder="选择日期"
              value-format="timestamp" format="yyyy-MM-dd HH:mm" :editable='false'
              :disabled="JudgeWrite('endContractDate')">
            </el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :span="24" v-if="JudgeShow('fileJson')">
          <el-form-item label="相关附件" prop="fileJson">
            <UploadFile v-model="fileList" :disabled="JudgeWrite('fileJson')" />
          </el-form-item>
        </el-col>
        <el-col :span="24" v-if="JudgeShow('contractContent')">
          <el-form-item label="内容简要" prop="contractContent">
            <el-input v-model="dataForm.contractContent" placeholder="内容简要" type="textarea"
              :rows="3" :disabled="JudgeWrite('contractContent')" />
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
  name: 'ContractApprovalSheet',
  data() {
    var checkStartTime = (rule, value, callback) => {
      if (!this.dataForm.endContractDate) {
        callback()
      } else {
        if (this.dataForm.endContractDate < value) {
          callback(new Error('起始日期应该小于结束日期'));
        } else {
          this.$refs.dataForm.validateField('endTime');
          callback()
        }
      }
    }
    var checkEndTime = (rule, value, callback) => {
      if (!this.dataForm.startContractDate) {
        callback()
      } else {
        if (this.dataForm.startContractDate > value) {
          callback(new Error('结束日期应该大于起始日期'));
        } else {
          callback()
        }
      }
    }
    return {
      dataForm: {
        flowId: '',
        id: '',
        billNo: '',
        flowTitle: '',
        flowUrgent: 1,
        applyUser: '',
        applyDate: '',
        contractId: '',
        contractNum: '',
        firstParty: '',
        secondParty: '',
        personCharge: '',
        leadDepartment: '',
        contractName: '',
        signArea: '',
        incomeAmount: '',
        totalExpenditure: '',
        contractContent: '',
        startContractDate: '',
        endContractDate: '',
        contractPeriod: '',
        paymentMethod: '',
        budgetaryApproval: '',
        contractType: '',
        fileJson: '',
      },
      dataRule: {
        flowTitle: [
          { required: true, message: '流程标题不能为空', trigger: 'blur' },
        ],
        flowUrgent: [
          { required: true, message: '紧急程度不能为空', trigger: 'change' },
        ],
        paymentMethod: [
          { required: true, message: '结算方式不能为空', trigger: 'change' },
        ],
        startContractDate: [
          { required: true, message: '开始时间不能为空', trigger: 'change' },
          { validator: checkStartTime, trigger: 'change' }
        ],
        endContractDate: [
          { required: true, message: '结束时间不能为空', trigger: 'change' },
          { validator: checkEndTime, trigger: 'change' }
        ],
      },
      paymentMethodOptions: []
    }
  },
  methods: {
    selfInit(data) {
      this.dataForm.applyDate = new Date().getTime()
      this.dataForm.flowTitle = this.userInfo.userName + "的合同申请单"
      this.dataForm.applyUser = this.userInfo.userName + '/' + this.userInfo.userAccount
    },
    beforeInit() { this.getPaymentMethodOptions() }
  }
}
</script>
