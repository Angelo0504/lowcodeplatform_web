<template>
  <div class="flow-form" v-loading="loading">
    <div class="com-title">
      <h1>合同开票流程</h1>
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
        <el-col :span="12" v-if="JudgeShow('drawer')">
          <el-form-item label="开票人" prop="drawer">
            <el-input v-model="dataForm.drawer" placeholder="开票人" :disabled="JudgeWrite('drawer')">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('billDate')">
          <el-form-item label="开票日期" prop="billDate">
            <el-date-picker v-model="dataForm.billDate" type="datetime" placeholder="选择日期"
              value-format="timestamp" format="yyyy-MM-dd HH:mm" :editable='false'
              :disabled="JudgeWrite('billDate')">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('companyName')">
          <el-form-item label="公司名称" prop="companyName">
            <el-input v-model="dataForm.companyName" placeholder="公司名称"
              :disabled="JudgeWrite('companyName')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('conName')">
          <el-form-item label="关联名称" prop="conName">
            <el-input v-model="dataForm.conName" placeholder="关联名称"
              :disabled="JudgeWrite('conName')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('bank')">
          <el-form-item label="开户银行" prop="bank">
            <el-input v-model="dataForm.bank" placeholder="开户银行" :disabled="JudgeWrite('bank')">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('amount')">
          <el-form-item label="开户账号" prop="amount">
            <el-input v-model="dataForm.amount" placeholder="开户账号" :disabled="JudgeWrite('amount')">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('billAmount')">
          <el-form-item label="开票金额" prop="billAmount">
            <el-input v-model="dataForm.billAmount" placeholder="开票金额" type="number"
              :disabled="JudgeWrite('billAmount')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('taxId')">
          <el-form-item label="税号" prop="taxId">
            <el-input v-model="dataForm.taxId" placeholder="税号" :disabled="JudgeWrite('taxId')">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('invoiceId')">
          <el-form-item label="发票号" prop="invoiceId">
            <el-input v-model="dataForm.invoiceId" placeholder="发票号"
              :disabled="JudgeWrite('invoiceId')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('invoAddress')">
          <el-form-item label="发票地址" prop="invoAddress">
            <el-input v-model="dataForm.invoAddress" placeholder="发票地址"
              :disabled="JudgeWrite('invoAddress')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('payAmount')">
          <el-form-item label="付款金额" prop="payAmount">
            <el-input v-model="dataForm.payAmount" placeholder="付款金额" type="number"
              :disabled="JudgeWrite('payAmount')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24" v-if="JudgeShow('fileJson')">
          <el-form-item label="相关附件" prop="fileJson">
            <UploadFile v-model="fileList" :disabled="JudgeWrite('fileJson')" />
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
  name: 'ConBilling',
  data() {
    return {
      dataForm: {
        flowId: '',
        id: '',
        billNo: '',
        flowTitle: '',
        flowUrgent: 1,
        drawer: '',
        billDate: '',
        companyName: '',
        conName: '',
        amount: '',
        billAmount: '',
        taxId: '',
        invoiceId: '',
        invoAddress: '',
        payAmount: '',
        fileJson: '',
        description: '',
        bank: '',
      },
      dataRule: {
        flowTitle: [
          { required: true, message: '流程标题不能为空', trigger: 'blur' },
        ],
        flowUrgent: [
          { required: true, message: '紧急程度不能为空', trigger: 'change' },
        ],
        drawer: [
          { required: true, message: '开票人不能为空', trigger: 'blur' },
        ],
        billDate: [
          { required: true, message: '开票日期不能为空', trigger: 'change' },
        ],
      }
    }
  },
  methods: {
    selfInit(data) {
      this.dataForm.flowTitle = this.userInfo.userName + "的合同开票流程"
    }
  }
}
</script>
