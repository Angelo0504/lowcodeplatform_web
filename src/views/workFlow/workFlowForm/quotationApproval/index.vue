<template>
  <div class="flow-form" v-loading="loading">
    <div class="com-title">
      <h1>报价审批表</h1>
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
        <el-col :span="12" v-if="JudgeShow('writer')">
          <el-form-item label="填报人" prop="writer">
            <el-input v-model="dataForm.writer" placeholder="填报人" :disabled="JudgeWrite('writer')">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('writeDate')">
          <el-form-item label="填报日期" prop="writeDate">
            <el-date-picker v-model="dataForm.writeDate" type="datetime" placeholder="选择日期"
              value-format="timestamp" format="yyyy-MM-dd HH:mm" :editable='false'
              :disabled="JudgeWrite('writeDate')">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('customerName')">
          <el-form-item label="客户名称" prop="customerName">
            <el-input v-model="dataForm.customerName" placeholder="客户名称"
              :disabled="JudgeWrite('customerName')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('partnerName')">
          <el-form-item label="合作人名" prop="partnerName">
            <el-input v-model="dataForm.partnerName" placeholder="合作人名"
              :disabled="JudgeWrite('partnerName')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('standardFile')">
          <el-form-item label="模板参考" prop="standardFile">
            <el-input v-model="dataForm.standardFile" placeholder="模板参考"
              :disabled="JudgeWrite('standardFile')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24" v-if="JudgeShow('quotationType')">
          <el-form-item label="报价类型" prop="quotationType">
            <el-radio-group v-model="dataForm.quotationType"
              :disabled="JudgeWrite('quotationType')">
              <el-radio label="SL-I型报价">SL-I型报价</el-radio>
              <el-radio label="SL-II型报价">SL-II型报价</el-radio>
              <el-radio label="SL-III型报价">SL-III型报价</el-radio>
              <el-radio label="SL-IIh型报价">SL-IIh型报价</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="24" v-if="JudgeShow('fileJson')">
          <el-form-item label="相关附件">
            <UploadFile v-model="fileList" :disabled="JudgeWrite('fileJson')" />
          </el-form-item>
        </el-col>
        <el-col :span="24" v-if="JudgeShow('custSituation')">
          <el-form-item label="情况描述" prop="custSituation">
            <el-input v-model="dataForm.custSituation" placeholder="情况描述" type="textarea" :rows="3"
              :disabled="JudgeWrite('custSituation')" />
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
  name: 'QuotationApproval',
  data() {
    return {
      dataForm: {
        flowId: '',
        id: '',
        billNo: '',
        flowTitle: '',
        flowUrgent: 1,
        writer: '',
        writeDate: '',
        customerName: '',
        partnerName: '',
        standardFile: '',
        quotationType: '',
        custSituation: '',
        fileJson: ''
      },
      dataRule: {
        flowTitle: [
          { required: true, message: '流程标题不能为空', trigger: 'blur' },
        ],
        flowUrgent: [
          { required: true, message: '紧急程度不能为空', trigger: 'change' },
        ],
        writer: [
          { required: true, message: '填报人不能为空', trigger: 'blur' },
        ],
        writeDate: [
          { required: true, message: '填报日期不能为空', trigger: 'change' },
        ],
      }
    }
  },
  methods: {
    selfInit(data) {
      this.dataForm.applyDate = new Date().getTime()
      this.dataForm.flowTitle = this.userInfo.userName + "的报价审批表"
    }
  }
}
</script>