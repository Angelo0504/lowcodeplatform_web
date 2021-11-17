<template>
  <div class="flow-form" v-loading="loading">
    <div class="com-title">
      <h1>工作联系单</h1>
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
        <el-col :span="12" v-if="JudgeShow('drawPeople')">
          <el-form-item label="发件人" prop="drawPeople">
            <el-input v-model="dataForm.drawPeople" placeholder="发件人"
              :disabled="JudgeWrite('drawPeople')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('issuingDepartment')">
          <el-form-item label="发件部门" prop="issuingDepartment">
            <el-input v-model="dataForm.issuingDepartment" placeholder="发件部门"
              :disabled="JudgeWrite('issuingDepartment')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('toDate')">
          <el-form-item label="发件日期" prop="toDate">
            <el-date-picker v-model="dataForm.toDate" type="datetime" placeholder="选择日期"
              value-format="timestamp" format="yyyy-MM-dd HH:mm" :editable='false'
              :disabled="JudgeWrite('toDate')">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('serviceDepartment')">
          <el-form-item label="收件部门" prop="serviceDepartment">
            <el-input v-model="dataForm.serviceDepartment" placeholder="收件部门"
              :disabled="JudgeWrite('serviceDepartment')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('recipients')">
          <el-form-item label="收件人" prop="recipients">
            <el-input v-model="dataForm.recipients" placeholder="收件人"
              :disabled="JudgeWrite('recipients')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('collectionDate')">
          <el-form-item label="收件日期" prop="collectionDate">
            <el-date-picker v-model="dataForm.collectionDate" type="datetime" placeholder="选择日期"
              value-format="timestamp" format="yyyy-MM-dd HH:mm" :editable='false'
              :disabled="JudgeWrite('collectionDate')">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="24" v-if="JudgeShow('coordination')">
          <el-form-item label="协调事项" prop="coordination">
            <el-input v-model="dataForm.coordination" placeholder="协调事项" type="textarea" :rows="3"
              :disabled="JudgeWrite('coordination')" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="相关附件">
            <UploadFile v-model="fileList" />
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
  name: 'WorkContactSheet',
  data() {
    var checkStartTime = (rule, value, callback) => {
      if (!this.dataForm.collectionDate) {
        callback()
      } else {
        if (this.dataForm.collectionDate < value) {
          callback(new Error('发件日期应该小于收件日期'));
        } else {
          this.$refs.dataForm.validateField('endTime');
          callback()
        }
      }
    }
    var checkEndTime = (rule, value, callback) => {
      if (!this.dataForm.toDate) {
        callback()
      } else {
        if (this.dataForm.toDate > value) {
          callback(new Error('收件日期应该大于发件日期'));
        } else {
          callback()
        }
      }
    }
    return {
      activeTab: '',
      dataForm: {
        flowId: '',
        id: '',
        billNo: '',
        flowTitle: '',
        flowUrgent: 1,
        serviceDepartment: '',
        toDate: '',
        recipients: '',
        drawPeople: '',
        issuingDepartment: '',
        collectionDate: '',
        coordination: '',
        fileJson: ''
      },
      dataRule: {
        flowTitle: [
          { required: true, message: '流程标题不能为空', trigger: 'blur' },
        ],
        flowUrgent: [
          { required: true, message: '紧急程度不能为空', trigger: 'change' },
        ],
        toDate: [
          { required: true, message: '发件日期不能为空', trigger: 'change' },
          { validator: checkStartTime, trigger: 'change' }
        ],
        collectionDate: [
          { required: true, message: '收件日期不能为空', trigger: 'change' },
          { validator: checkEndTime, trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    selfInit(data) {
      this.dataForm.flowTitle = this.userInfo.userName + "的工作联系单"
    }
  }
}
</script>