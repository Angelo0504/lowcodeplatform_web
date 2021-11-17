<template>
  <div class="flow-form" v-loading="loading">
    <div class="com-title">
      <h1>员工加班申请单</h1>
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
          <el-form-item label="所在部门" prop="department">
            <el-input v-model="dataForm.department" placeholder="所在部门" readonly
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
        <el-col :span="12" v-if="JudgeShow('totleTime')">
          <el-form-item label="总计时间" prop="totleTime">
            <el-input v-model="dataForm.totleTime" placeholder="总计时间"
              :disabled="JudgeWrite('totleTime')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('startTime')">
          <el-form-item label="开始时间" prop="startTime">
            <el-date-picker v-model="dataForm.startTime" type="datetime" placeholder="选择日期"
              value-format="timestamp" format="yyyy-MM-dd HH:mm" :editable='false'
              :disabled="JudgeWrite('startTime')">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('endTime')">
          <el-form-item label="结束时间" prop="endTime">
            <el-date-picker v-model="dataForm.endTime" type="datetime" placeholder="选择日期"
              value-format="timestamp" format="yyyy-MM-dd HH:mm" :editable='false'
              :disabled="JudgeWrite('endTime')">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="24" v-if="JudgeShow('category')">
          <el-form-item label="记入类别" prop="category">
            <el-radio-group v-model="dataForm.category" :disabled="JudgeWrite('category')">
              <el-radio label="记入调休">记入调休</el-radio>
              <el-radio label="加班费">加班费</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="24" v-if="JudgeShow('cause')">
          <el-form-item label="加班事由" prop="cause">
            <el-input v-model="dataForm.cause" placeholder="加班事由" type="textarea" :rows="3"
              :disabled="JudgeWrite('cause')" />
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
  name: 'StaffOvertime',
  data() {
    var checkStartTime = (rule, value, callback) => {
      if (!this.dataForm.endTime) {
        callback()
      } else {
        if (this.dataForm.endTime < value) {
          callback(new Error('开始日期应该小于结束日期'));
        } else {
          this.$refs.dataForm.validateField('endTime');
          callback()
        }
      }
    }
    var checkEndTime = (rule, value, callback) => {
      if (!this.dataForm.startTime) {
        callback()
      } else {
        if (this.dataForm.startTime > value) {
          callback(new Error('结束日期应该大于开始日期'));
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
        department: '',
        category: '记入调休',
        startTime: '',
        endTime: '',
        totleTime: '',
        cause: ''
      },
      dataRule: {
        flowTitle: [
          { required: true, message: '流程标题不能为空', trigger: 'blur' },
        ],
        flowUrgent: [
          { required: true, message: '紧急程度不能为空', trigger: 'change' },
        ],
        startTime: [
          { required: true, message: '开始时间不能为空', trigger: 'change' },
          { validator: checkStartTime, trigger: 'change' }
        ],
        endTime: [
          { required: true, message: '结束时间不能为空', trigger: 'change' },
          { validator: checkEndTime, trigger: 'change' }
        ],
        category: [
          { required: true, message: '记入类别不能为空', trigger: 'change' },
        ]
      }
    }
  },
  methods: {
    selfInit(data) {
      this.dataForm.applyDate = new Date().getTime()
      this.dataForm.flowTitle = this.userInfo.userName + "的员工加班申请单"
      this.dataForm.applyUser = this.userInfo.userName + '/' + this.userInfo.userAccount
      this.dataForm.department = this.userInfo.departmentName
    }
  }
}
</script>