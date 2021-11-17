<template>
  <div class="flow-form" v-loading="loading">
    <div class="com-title">
      <h1>会议申请</h1>
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
        <el-col :span="12" v-if="JudgeShow('position')">
          <el-form-item label="所属职务" prop="position">
            <el-input v-model="dataForm.position" placeholder="所属职务" readonly
              :disabled="JudgeWrite('position')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('conferenceName')">
          <el-form-item label="会议名称" prop="conferenceName">
            <el-input v-model="dataForm.conferenceName" placeholder="会议名称"
              :disabled="JudgeWrite('conferenceName')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('conferenceTheme')">
          <el-form-item label="会议主题" prop="conferenceTheme">
            <el-input v-model="dataForm.conferenceTheme" placeholder="会议主题"
              :disabled="JudgeWrite('conferenceTheme')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('conferenceType')">
          <el-form-item label="会议类型" prop="conferenceType">
            <el-input v-model="dataForm.conferenceType" placeholder="会议类型"
              :disabled="JudgeWrite('conferenceType')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('estimatePeople')">
          <el-form-item label="预计人数" prop="estimatePeople">
            <el-input v-model="dataForm.estimatePeople" placeholder="预计人数" type="number"
              :disabled="JudgeWrite('estimatePeople')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('conferenceRoom')">
          <el-form-item label="会议室" prop="conferenceRoom">
            <el-input v-model="dataForm.conferenceRoom" placeholder="会议室"
              :disabled="JudgeWrite('conferenceRoom')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('administrator')">
          <el-form-item label="管理人" prop="administrator">
            <el-input v-model="dataForm.administrator" placeholder="管理人"
              :disabled="JudgeWrite('administrator')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('lookPeople')">
          <el-form-item label="查看人" prop="lookPeople">
            <el-input v-model="dataForm.lookPeople" placeholder="查看人"
              :disabled="JudgeWrite('lookPeople')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('memo')">
          <el-form-item label="纪要员" prop="memo">
            <el-input v-model="dataForm.memo" placeholder="纪要员" :disabled="JudgeWrite('memo')">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('attendees')">
          <el-form-item label="出席人" prop="attendees">
            <el-input v-model="dataForm.attendees" placeholder="出席人"
              :disabled="JudgeWrite('attendees')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('applyMaterial')">
          <el-form-item label="申请材料" prop="applyMaterial">
            <el-input v-model="dataForm.applyMaterial" placeholder="申请材料"
              :disabled="JudgeWrite('applyMaterial')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('estimatedAmount')">
          <el-form-item label="预计金额" prop="estimatedAmount">
            <el-input v-model="dataForm.estimatedAmount" placeholder="预计金额" type="number"
              :disabled="JudgeWrite('estimatedAmount')">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('otherAttendee')">
          <el-form-item label="其他出席人" prop="otherAttendee">
            <el-input v-model="dataForm.otherAttendee" placeholder="其他出席人"
              :disabled="JudgeWrite('otherAttendee')"></el-input>
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
        <el-col :span="24" v-if="JudgeShow('fileJson')">
          <el-form-item label="相关附件">
            <UploadFile v-model="fileList" :disabled="JudgeWrite('fileJson')" />
          </el-form-item>
        </el-col>
        <el-col :span="24" v-if="JudgeShow('describe')">
          <el-form-item label="会议描述" prop="describe">
            <el-input v-model="dataForm.describe" placeholder="会议描述" type="textarea" :rows="3"
              :disabled="JudgeWrite('describe')" />
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
  name: 'ApplyMeeting',
  data() {
    var checkStartTime = (rule, value, callback) => {
      if (!this.dataForm.endDate) {
        callback()
      } else {
        if (this.dataForm.endDate < value) {
          callback(new Error('开始日期应该小于结束日期'));
        } else {
          this.$refs.dataForm.validateField('endTime');
          callback()
        }
      }
    }
    var checkEndTime = (rule, value, callback) => {
      if (!this.dataForm.startDate) {
        callback()
      } else {
        if (this.dataForm.startDate > value) {
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
        conferenceName: '',
        conferenceTheme: '',
        position: '',
        conferenceType: '',
        estimatePeople: '',
        conferenceRoom: '',
        administrator: '',
        lookPeople: '',
        memo: '',
        attendees: '',
        applyMaterial: '',
        estimatedAmount: '',
        otherAttendee: '',
        startDate: '',
        endDate: '',
        describe: '',
        fileJson: ''
      },
      dataRule: {
        flowTitle: [
          { required: true, message: '流程标题不能为空', trigger: 'blur' },
        ],
        flowUrgent: [
          { required: true, message: '紧急程度不能为空', trigger: 'change' },
        ],
        conferenceName: [
          { required: true, message: '会议名称不能为空', trigger: 'blur' },
        ],
        startDate: [
          { required: true, message: '开始时间不能为空', trigger: 'change' },
          { validator: checkStartTime, trigger: 'change' }
        ],
        endDate: [
          { required: true, message: '结束时间不能为空', trigger: 'change' },
          { validator: checkEndTime, trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    selfInit(data) {
      this.dataForm.flowTitle = this.userInfo.userName + "的会议申请"
      this.dataForm.applyUser = this.userInfo.userName + '/' + this.userInfo.userAccount
      if (this.userInfo.positionIds && this.userInfo.positionIds.length) {
        let list = this.userInfo.positionIds.map(o => o.name)
        this.dataForm.position = list.join(',')
      }
    }
  }
}
</script>