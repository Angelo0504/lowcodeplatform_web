<template>
  <div class="flow-form" v-loading="loading">
    <div class="com-title">
      <h1>行政赏罚单</h1>
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
        <el-col :span="12" v-if="JudgeShow('fullName')">
          <el-form-item label="员工姓名" prop="fullName">
            <el-input v-model="dataForm.fullName" placeholder="员工姓名" readonly
              :disabled="JudgeWrite('fullName')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('fillFromDate')">
          <el-form-item label="填表日期" prop="fillFromDate">
            <el-date-picker v-model="dataForm.fillFromDate" type="date" placeholder="选择日期"
              value-format="timestamp" format="yyyy-MM-dd" :editable="false" readonly
              :disabled="JudgeWrite('fillFromDate')">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('department')">
          <el-form-item label="员工部门" prop="department">
            <el-input v-model="dataForm.department" placeholder="员工部门" readonly
              :disabled="JudgeWrite('department')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('position')">
          <el-form-item label="员工职务" prop="position">
            <el-input v-model="dataForm.position" placeholder="员工职务" readonly
              :disabled="JudgeWrite('position')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('rewardPun')">
          <el-form-item label="赏罚金额" prop="rewardPun">
            <el-input v-model="dataForm.rewardPun" placeholder="赏罚金额" type="number"
              :disabled="JudgeWrite('rewardPun')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24" v-if="JudgeShow('flowTitle')">
          <el-form-item label="赏罚原因" prop="reason">
            <el-input v-model="dataForm.reason" placeholder="赏罚原因" type="textarea" :rows="3"
              :disabled="JudgeWrite('reason')" />
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
  name: 'RewardPunishment',
  data() {
    return {
      dataForm: {
        flowId: '',
        id: '',
        billNo: '',
        flowTitle: '',
        flowUrgent: 1,
        fullName: '',
        fillFromDate: '',
        department: '',
        position: '',
        rewardPun: '',
        reason: ''
      },
      dataRule: {
        flowTitle: [
          { required: true, message: '流程标题不能为空', trigger: 'blur' },
        ],
        flowUrgent: [
          { required: true, message: '紧急程度不能为空', trigger: 'change' },
        ],
        rewardPun: [
          { required: true, message: '赏罚金额不能为空', trigger: 'blur' },
        ],
        reason: [
          { required: true, message: '赏罚原因不能为空', trigger: 'blur' },
        ]
      }
    }
  },
  methods: {
    selfInit(data) {
      this.dataForm.fillFromDate = new Date().getTime()
      this.dataForm.flowTitle = this.userInfo.userName + "的行政赏罚单"
      this.dataForm.fullName = this.userInfo.userName + '/' + this.userInfo.userAccount
      this.dataForm.department = this.userInfo.departmentName
      if (this.userInfo.positionIds && this.userInfo.positionIds.length) {
        let list = this.userInfo.positionIds.map(o => o.name)
        this.dataForm.position = list.join(',')
      }
    }
  }
}
</script>