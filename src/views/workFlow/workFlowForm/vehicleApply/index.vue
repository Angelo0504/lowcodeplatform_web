<template>
  <div class="flow-form" v-loading="loading">
    <div class="com-title">
      <h1>车辆申请</h1>
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
        <el-col :span="12" v-if="JudgeShow('department')">
          <el-form-item label="所属部门" prop="department">
            <el-input v-model="dataForm.department" placeholder="所属部门" readonly
              :disabled="JudgeWrite('department')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('carMan')">
          <el-form-item label="用车人员" prop="carMan">
            <el-input v-model="dataForm.carMan" placeholder="用车人员" readonly
              :disabled="JudgeWrite('carMan')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('startDate')">
          <el-form-item label="用车时间" prop="startDate">
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
        <el-col :span="12" v-if="JudgeShow('plateNum')">
          <el-form-item label="车牌号" prop="plateNum">
            <el-input v-model="dataForm.plateNum" placeholder="车牌号"
              :disabled="JudgeWrite('plateNum')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('destination')">
          <el-form-item label="目的地" prop="destination">
            <el-input v-model="dataForm.destination" placeholder="目的地"
              :disabled="JudgeWrite('destination')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('roadFee')">
          <el-form-item label="路费金额" prop="roadFee">
            <el-input v-model="dataForm.roadFee" placeholder="路费金额" type="number"
              :disabled="JudgeWrite('roadFee')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('kilometreNum')">
          <el-form-item label="公里数" prop="kilometreNum">
            <el-input v-model="dataForm.kilometreNum" placeholder="公里数" type="number"
              :disabled="JudgeWrite('kilometreNum')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('entourage')">
          <el-form-item label="随行人数" prop="entourage">
            <el-input v-model="dataForm.entourage" placeholder="随行人数"
              :disabled="JudgeWrite('entourage')"></el-input>
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
  name: 'VehicleApply',
  data() {
    var checkStartTime = (rule, value, callback) => {
      if (!this.dataForm.endDate) {
        callback()
      } else {
        if (this.dataForm.endDate < value) {
          callback(new Error('用车日期应该小于结束日期'));
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
          callback(new Error('结束日期应该大于用车日期'));
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
        carMan: '',
        department: '',
        startDate: '',
        endDate: '',
        plateNum: '',
        destination: '',
        roadFee: '',
        kilometreNum: '',
        entourage: '',
        description: ''
      },
      dataRule: {
        flowTitle: [
          { required: true, message: '流程标题不能为空', trigger: 'blur' },
        ],
        flowUrgent: [
          { required: true, message: '紧急程度不能为空', trigger: 'change' },
        ],
        startDate: [
          { required: true, message: '用车时间不能为空', trigger: 'change' },
          { validator: checkStartTime, trigger: 'change' }
        ],
        endDate: [
          { required: true, message: '结束时间不能为空', trigger: 'change' },
          { validator: checkEndTime, trigger: 'change' }
        ],
        entourage: [
          { pattern: /^[1-9]\d*$/, message: '请输入正整数' }
        ]
      }
    }
  },
  methods: {
    selfInit(data) {
      this.dataForm.flowTitle = this.userInfo.userName + "的车辆申请"
      this.dataForm.carMan = this.userInfo.userName + '/' + this.userInfo.userAccount
      this.dataForm.department = this.userInfo.departmentName
    }
  }
}
</script>