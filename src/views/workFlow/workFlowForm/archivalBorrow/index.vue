<template>
  <div class="flow-form" v-loading="loading">
    <div class="com-title">
      <h1>档案借阅申请</h1>
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
          <el-form-item label="申请人" prop="applyUser">
            <el-input v-model="dataForm.applyUser" placeholder="申请人" readonly
              :disabled="JudgeWrite('applyUser')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('borrowingDepartment')">
          <el-form-item label="借阅部门" prop="borrowingDepartment">
            <el-input v-model="dataForm.borrowingDepartment" placeholder="借阅部门" readonly
              :disabled="JudgeWrite('borrowingDepartment')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('archivesName')">
          <el-form-item label="档案名称" prop="archivesName">
            <el-input v-model="dataForm.archivesName" placeholder="档案名称"
              :disabled="JudgeWrite('archivesName')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('archivesId')">
          <el-form-item label="档案编码" prop="archivesId">
            <el-input v-model="dataForm.archivesId" placeholder="档案编码"
              :disabled="JudgeWrite('archivesId')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('borrowingDate')">
          <el-form-item label="借阅时间" prop="borrowingDate">
            <el-date-picker v-model="dataForm.borrowingDate" type="datetime" placeholder="选择日期"
              value-format="timestamp" format="yyyy-MM-dd HH:mm" :editable='false'
              :disabled="JudgeWrite('borrowingDate')">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('returnDate')">
          <el-form-item label="归还时间" prop="returnDate">
            <el-date-picker v-model="dataForm.returnDate" type="datetime" placeholder="选择日期"
              value-format="timestamp" format="yyyy-MM-dd HH:mm" :editable='false'
              :disabled="JudgeWrite('returnDate')">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('archivalAttributes')">
          <el-form-item label="档案属性" prop="archivalAttributes">
            <el-radio-group v-model="dataForm.archivalAttributes"
              :disabled="JudgeWrite('archivalAttributes')">
              <el-radio label="原件">原件</el-radio>
              <el-radio label="复印件">复印件</el-radio>
              <el-radio label="其他">其他</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('borrowMode')">
          <el-form-item label="借阅方式" prop="borrowMode">
            <el-radio-group v-model="dataForm.borrowMode" :disabled="JudgeWrite('borrowMode')">
              <el-radio label="查阅">查阅</el-radio>
              <el-radio label="复印">复印</el-radio>
              <el-radio label="外借">外借</el-radio>
              <el-radio label="其他">其他</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="24" v-if="JudgeShow('applyReason')">
          <el-form-item label="申请原因" prop="applyReason">
            <el-input v-model="dataForm.applyReason" placeholder="申请原因" type="textarea" :rows="3"
              :disabled="JudgeWrite('applyReason')" />
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
  name: 'ArchivalBorrow',
  data() {
    var checkStartTime = (rule, value, callback) => {
      if (!this.dataForm.returnDate) {
        callback()
      } else {
        if (this.dataForm.returnDate < value) {
          callback(new Error('借阅日期应该小于归还日期'));
        } else {
          this.$refs.dataForm.validateField('endTime');
          callback()
        }
      }
    }
    var checkEndTime = (rule, value, callback) => {
      if (!this.dataForm.borrowingDate) {
        callback()
      } else {
        if (this.dataForm.borrowingDate > value) {
          callback(new Error('归还日期应该大于借阅日期'));
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
        borrowingDepartment: '',
        archivesName: '',
        archivesId: '',
        borrowingDate: '',
        returnDate: '',
        applyReason: '',
        archivalAttributes: '',
        borrowMode: ''
      },
      dataRule: {
        flowTitle: [
          { required: true, message: '流程标题不能为空', trigger: 'blur' },
        ],
        flowUrgent: [
          { required: true, message: '紧急程度不能为空', trigger: 'change' },
        ],
        archivesName: [
          { required: true, message: '档案名称不能为空', trigger: 'blur' },
        ],
        archivesId: [
          { required: true, message: '档案编码不能为空', trigger: 'blur' },
        ],
        borrowingDate: [
          { required: true, message: '借阅时间不能为空', trigger: 'change' },
          { validator: checkStartTime, trigger: 'change' }
        ],
        returnDate: [
          { required: true, message: '归还时间不能为空', trigger: 'change' },
          { validator: checkEndTime, trigger: 'change' }
        ],
        archivalAttributes: [
          { required: true, message: '档案属性不能为空', trigger: 'change' },
        ],
        borrowMode: [
          { required: true, message: '借阅方式不能为空', trigger: 'change' },
        ]
      }
    }
  },
  methods: {
    selfInit(data) {
      this.dataForm.flowTitle = this.userInfo.userName + "的档案借阅申请"
      this.dataForm.applyUser = this.userInfo.userName + '/' + this.userInfo.userAccount
      this.dataForm.borrowingDepartment = this.userInfo.departmentName
    }
  }
}
</script>