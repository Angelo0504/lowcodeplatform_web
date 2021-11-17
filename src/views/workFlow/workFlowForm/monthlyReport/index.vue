<template>
  <div class="flow-form" v-loading="loading">
    <div class="com-title">
      <h1>月工作总结</h1>
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
          <el-form-item label="创建人员" prop="applyUser">
            <el-input v-model="dataForm.applyUser" placeholder="创建人员" readonly
              :disabled="JudgeWrite('applyUser')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('applyDate')">
          <el-form-item label="创建日期" prop="applyDate">
            <el-date-picker v-model="dataForm.applyDate" type="date" placeholder="创建日期"
              value-format="timestamp" format="yyyy-MM-dd" :editable="false" readonly
              :disabled="JudgeWrite('applyDate')">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('applyDept')">
          <el-form-item label="所属部门" prop="applyDept">
            <el-input v-model="dataForm.applyDept" placeholder="所属部门" readonly
              :disabled="JudgeWrite('applyDept')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('applyPost')">
          <el-form-item label="所属职位" prop="applyPost">
            <el-input v-model="dataForm.applyPost" placeholder="所属职位" readonly
              :disabled="JudgeWrite('applyPost')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('planEndTime')">
          <el-form-item label="完成时间" prop="planEndTime">
            <el-date-picker v-model="dataForm.planEndTime" type="datetime" placeholder="选择日期"
              value-format="timestamp" format="yyyy-MM-dd HH:mm" :editable='false'
              :disabled="JudgeWrite('planEndTime')">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="24" v-if="JudgeShow('overalEvaluat')">
          <el-form-item label="总体评价" prop="overalEvaluat">
            <el-input v-model="dataForm.overalEvaluat" placeholder="总体评价" type="textarea" :rows="3"
              :disabled="JudgeWrite('overalEvaluat')" />
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('npworkMatter')">
          <el-form-item label="工作事项" prop="npworkMatter">
            <el-input v-model="dataForm.npworkMatter" placeholder="工作事项"
              :disabled="JudgeWrite('npworkMatter')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('npfinishTime')">
          <el-form-item label="次月时间" prop="npfinishTime">
            <el-date-picker v-model="dataForm.npfinishTime" type="datetime" placeholder="选择日期"
              value-format="timestamp" format="yyyy-MM-dd HH:mm" :editable='false'
              :disabled="JudgeWrite('npfinishTime')">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="24" v-if="JudgeShow('nfinishMethod')">
          <el-form-item label="次月目标" prop="nfinishMethod">
            <el-input v-model="dataForm.nfinishMethod" placeholder="次月目标" type="textarea" :rows="3"
              :disabled="JudgeWrite('nfinishMethod')" />
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
  name: 'MonthlyReport',
  data() {
    return {
      dataForm: {
        flowId: '',
        id: '',
        billNo: '',
        flowTitle: '',
        flowUrgent: 1,
        applyUser: '',
        applyDate: '',
        applyDept: '',
        applyPost: '',
        overalEvaluat: '',
        nfinishMethod: '',
        planEndTime: '',
        npfinishTime: '',
        npworkMatter: '',
        fileJson: ''
      },
      dataRule: {
        flowTitle: [
          { required: true, message: '流程标题不能为空', trigger: 'blur' },
        ],
        flowUrgent: [
          { required: true, message: '紧急程度不能为空', trigger: 'change' },
        ],
      }
    }
  },
  methods: {
    selfInit(data) {
      this.dataForm.applyDate = new Date().getTime()
      this.dataForm.flowTitle = this.userInfo.userName + "的月工作总结"
      this.dataForm.applyUser = this.userInfo.userName + '/' + this.userInfo.userAccount
      this.dataForm.applyDept = this.userInfo.departmentName
      if (this.userInfo.positionIds && this.userInfo.positionIds.length) {
        let list = this.userInfo.positionIds.map(o => o.name)
        this.dataForm.applyPost = list.join(',')
      }
    }
  }
}
</script>