<template>
  <div class="flow-form" v-loading="loading">
    <div class="com-title">
      <h1>收文签呈单</h1>
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
        <el-col :span="12" v-if="JudgeShow('receiptTitle')">
          <el-form-item label="收文标题" prop="receiptTitle">
            <el-input v-model="dataForm.receiptTitle" placeholder="收文标题"
              :disabled="JudgeWrite('receiptTitle')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('department')">
          <el-form-item label="收文部门" prop="department">
            <el-input v-model="dataForm.department" placeholder="收文部门"
              :disabled="JudgeWrite('department')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('collector')">
          <el-form-item label="收文人" prop="collector">
            <el-input v-model="dataForm.collector" placeholder="收文人"
              :disabled="JudgeWrite('collector')"></el-input>
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
        <el-col :span="24" v-if="JudgeShow('receiptPaper')">
          <el-form-item label="收文简述" prop="receiptPaper">
            <JNPF-Quill v-model="dataForm.receiptPaper" :disabled="JudgeWrite('receiptPaper')" />
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
  name: 'ReceiptSign',
  data() {
    return {
      dataForm: {
        flowId: '',
        id: '',
        billNo: '',
        flowTitle: '',
        flowUrgent: 1,
        collector: '',
        receiptTitle: '',
        department: '',
        receiptDate: '',
        receiptPaper: '',
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
      this.dataForm.flowTitle = this.userInfo.userName + "的收文签呈单"
    }
  }
}
</script>