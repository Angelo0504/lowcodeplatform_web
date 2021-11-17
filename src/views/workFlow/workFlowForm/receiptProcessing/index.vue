<template>
  <div class="flow-form" v-loading="loading">
    <div class="com-title">
      <h1>收文处理表</h1>
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
        <el-col :span="12" v-if="JudgeShow('fileTitle')">
          <el-form-item label="文件标题" prop="fileTitle">
            <el-input v-model="dataForm.fileTitle" placeholder="文件标题"
              :disabled="JudgeWrite('fileTitle')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('communicationUnit')">
          <el-form-item label="来文单位" prop="communicationUnit">
            <el-input v-model="dataForm.communicationUnit" placeholder="来文单位"
              :disabled="JudgeWrite('communicationUnit')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('letterNum')">
          <el-form-item label="来文字号" prop="letterNum">
            <el-input v-model="dataForm.letterNum" placeholder="来文字号"
              :disabled="JudgeWrite('letterNum')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('receiptDate')">
          <el-form-item label="收文日期" prop="receiptDate">
            <el-date-picker v-model="dataForm.receiptDate" type="datetime" placeholder="选择日期"
              value-format="timestamp" format="yyyy-MM-dd HH:mm" :editable='false'
              :disabled="JudgeWrite('receiptDate')">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="24" v-if="JudgeShow('fileJson')">
          <el-form-item label="相关附件">
            <UploadFile v-model="fileList" :disabled="JudgeWrite('fileJson')" />
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
  name: 'ReceiptProcessing',
  data() {
    return {
      dataForm: {
        flowId: '',
        id: '',
        billNo: '',
        flowTitle: '',
        flowUrgent: 1,
        letterNum: '',
        fileTitle: '',
        communicationUnit: '',
        receiptDate: '',
        fileJson: ''
      },
      dataRule: {
        flowTitle: [
          { required: true, message: '流程标题不能为空', trigger: 'blur' },
        ],
        flowUrgent: [
          { required: true, message: '紧急程度不能为空', trigger: 'change' },
        ],
        receiptDate: [
          { required: true, message: '收文日期不能为空', trigger: 'change' },
        ]
      }
    }
  },
  methods: {
    selfInit(data) {
      this.dataForm.flowTitle = this.userInfo.userName + "的收文处理表"
    }
  }
}
</script>