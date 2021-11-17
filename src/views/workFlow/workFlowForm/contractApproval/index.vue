<template>
  <div class="flow-form" v-loading="loading">
    <div class="com-title">
      <h1>合同审批</h1>
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
        <el-col :span="12" v-if="JudgeShow('firstPartyUnit')">
          <el-form-item label="甲方单位" prop="firstPartyUnit">
            <el-input v-model="dataForm.firstPartyUnit" placeholder="甲方单位"
              :disabled="JudgeWrite('firstPartyUnit')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('secondPartyUnit')">
          <el-form-item label="乙方单位" prop="secondPartyUnit">
            <el-input v-model="dataForm.secondPartyUnit" placeholder="乙方单位"
              :disabled="JudgeWrite('secondPartyUnit')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('firstPartyPerson')">
          <el-form-item label="甲方负责人" prop="firstPartyPerson">
            <el-input v-model="dataForm.firstPartyPerson" placeholder="甲方负责人"
              :disabled="JudgeWrite('firstPartyPerson')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('secondPartyPerson')">
          <el-form-item label="乙方负责人" prop="secondPartyPerson">
            <el-input v-model="dataForm.secondPartyPerson" placeholder="乙方负责人"
              :disabled="JudgeWrite('secondPartyPerson')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('firstPartyContact')">
          <el-form-item label="甲方联系方式" prop="firstPartyContact">
            <el-input v-model="dataForm.firstPartyContact" placeholder="甲方联系方式"
              :disabled="JudgeWrite('firstPartyContact')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('secondPartyContact')">
          <el-form-item label="乙方联系方式" prop="secondPartyContact">
            <el-input v-model="dataForm.secondPartyContact" placeholder="乙方联系方式"
              :disabled="JudgeWrite('secondPartyContact')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('contractName')">
          <el-form-item label="合同名称" prop="contractName">
            <el-input v-model="dataForm.contractName" placeholder="合同名称"
              :disabled="JudgeWrite('contractName')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('contractClass')">
          <el-form-item label="合同分类" prop="contractClass">
            <el-input v-model="dataForm.contractClass" placeholder="合同分类"
              :disabled="JudgeWrite('contractClass')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('contractType')">
          <el-form-item label="合同类型" prop="contractType">
            <el-input v-model="dataForm.contractType" placeholder="合同类型"
              :disabled="JudgeWrite('contractType')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('contractId')">
          <el-form-item label="合同编码" prop="contractId">
            <el-input v-model="dataForm.contractId" placeholder="合同编码"
              :disabled="JudgeWrite('contractId')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('businessPerson')">
          <el-form-item label="业务人员" prop="businessPerson">
            <el-input v-model="dataForm.businessPerson" placeholder="业务人员"
              :disabled="JudgeWrite('businessPerson')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('signingDate')">
          <el-form-item label="签约时间" prop="signingDate">
            <el-date-picker v-model="dataForm.signingDate" type="datetime" placeholder="选择日期"
              value-format="timestamp" format="yyyy-MM-dd HH:mm" :editable='false'
              :disabled="JudgeWrite('signingDate')">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('startDate')">
          <el-form-item label="开始时间" prop="startDate">
            <el-date-picker v-model="dataForm.startDate" type="datetime" placeholder="选择日期"
              value-format="timestamp" format="yyyy-MM-dd HH:mm" :editable='false'
              :disabled="JudgeWrite('startDate')">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('endDate')">
          <el-form-item label="结束时间" prop="endDate">
            <el-date-picker v-model="dataForm.endDate" type="datetime" placeholder="选择日期"
              value-format="timestamp" format="yyyy-MM-dd HH:mm" :editable='false'
              :disabled="JudgeWrite('endDate')">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('incomeAmount')">
          <el-form-item label="收入金额" prop="incomeAmount">
            <el-input v-model="dataForm.incomeAmount" placeholder="收入金额" type="number"
              :disabled="JudgeWrite('incomeAmount')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('inputPerson')">
          <el-form-item label="填写人员" prop="inputPerson">
            <el-input v-model="dataForm.inputPerson" placeholder="填写人员"
              :disabled="JudgeWrite('inputPerson')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24" v-if="JudgeShow('fileJson')">
          <el-form-item label="相关附件" prop="fileJson">
            <UploadFile v-model="fileList" :disabled="JudgeWrite('fileJson')" />
          </el-form-item>
        </el-col>
        <el-col :span="24" v-if="JudgeShow('primaryCoverage')">
          <el-form-item label="主要内容" prop="primaryCoverage">
            <el-input v-model="dataForm.primaryCoverage" placeholder="主要内容" type="textarea"
              :rows="3" :disabled="JudgeWrite('primaryCoverage')" />
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
  name: 'ContractApproval',
  data() {
    return {
      dataForm: {
        flowId: '',
        id: '',
        billNo: '',
        flowTitle: '',
        flowUrgent: 1,
        firstPartyUnit: '',
        secondPartyUnit: '',
        firstPartyPerson: '',
        secondPartyPerson: '',
        firstPartyContact: '',
        secondPartyContact: '',
        contractName: '',
        contractClass: '',
        contractId: '',
        businessPerson: '',
        signingDate: '',
        startDate: '',
        endDate: '',
        incomeAmount: '',
        inputPerson: '',
        fileJson: '',
        primaryCoverage: '',
        description: '',
        contractType: '',
      },
      dataRule: {
        flowTitle: [
          { required: true, message: '流程标题不能为空', trigger: 'blur' },
        ],
        flowUrgent: [
          { required: true, message: '紧急程度不能为空', trigger: 'change' },
        ],
        contractName: [
          { required: true, message: '合同名称不能为空', trigger: 'blur' },
        ],
        contractId: [
          { required: true, message: '合同编码不能为空', trigger: 'blur' },
        ],
        signingDate: [
          { required: true, message: '签约时间不能为空', trigger: 'change' },
        ],
        startDate: [
          { required: true, message: '开始时间不能为空', trigger: 'change' },
        ],
        endDate: [
          { required: true, message: '结束时间不能为空', trigger: 'change' },
        ],
      }
    }
  },
  methods: {
    selfInit(data) {
      this.dataForm.flowTitle = this.userInfo.userName + "的合同审批"
    }
  }
}
</script>