<template>
  <div class="flow-form" v-loading="loading">
    <div class="com-title">
      <h1>差旅报销申请表</h1>
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
        <el-col :span="12" v-if="JudgeShow('departmental')">
          <el-form-item label="所属部门" prop="departmental">
            <el-input v-model="dataForm.departmental" placeholder="所属部门" readonly
              :disabled="JudgeWrite('departmental')"></el-input>
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
        <el-col :span="12" v-if="JudgeShow('reimbursementId')">
          <el-form-item label="报销编码" prop="reimbursementId">
            <el-input v-model="dataForm.reimbursementId" placeholder="报销编码"
              :disabled="JudgeWrite('reimbursementId')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('billsNum')">
          <el-form-item label="票据数" prop="billsNum">
            <el-input v-model="dataForm.billsNum" placeholder="票据数" type="number"
              :disabled="JudgeWrite('billsNum')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('travelerUser')">
          <el-form-item label="出差人员" prop="travelerUser">
            <el-input v-model="dataForm.travelerUser" placeholder="出差人员"
              :disabled="JudgeWrite('travelerUser')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('vehicleMileage')">
          <el-form-item label="车辆里程" prop="vehicleMileage">
            <el-input v-model="dataForm.vehicleMileage" placeholder="车辆里程" type="number"
              :disabled="JudgeWrite('vehicleMileage')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('roadFee')">
          <el-form-item label="过路费" prop="roadFee">
            <el-input v-model="dataForm.roadFee" placeholder="过路费" type="number"
              :disabled="JudgeWrite('roadFee')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('parkingRate')">
          <el-form-item label="停车费" prop="parkingRate">
            <el-input v-model="dataForm.parkingRate" placeholder="停车费" type="number"
              :disabled="JudgeWrite('parkingRate')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('breakdownFee')">
          <el-form-item label="故障报修费" prop="breakdownFee">
            <el-input v-model="dataForm.breakdownFee" placeholder="故障报修费" type="number"
              :disabled="JudgeWrite('breakdownFee')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24" v-if="JudgeShow('businessMission')">
          <el-form-item label="出差任务" prop="businessMission">
            <el-input v-model="dataForm.businessMission" placeholder="出差任务" type="textarea"
              :rows="3" :disabled="JudgeWrite('businessMission')" />
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('setOutDate')">
          <el-form-item label="出发日期" prop="setOutDate">
            <el-date-picker v-model="dataForm.setOutDate" type="datetime" placeholder="选择日期"
              value-format="timestamp" format="yyyy-MM-dd HH:mm" :editable='false'
              :disabled="JudgeWrite('setOutDate')">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('returnDate')">
          <el-form-item label="回归日期" prop="returnDate">
            <el-date-picker v-model="dataForm.returnDate" type="datetime" placeholder="选择日期"
              value-format="timestamp" format="yyyy-MM-dd HH:mm" :editable='false'
              :disabled="JudgeWrite('returnDate')">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('destination')">
          <el-form-item label="目的地" prop="destination">
            <el-input v-model="dataForm.destination" placeholder="目的地"
              :disabled="JudgeWrite('destination')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('planeTicket')">
          <el-form-item label="机票费" prop="planeTicket">
            <el-input v-model="dataForm.planeTicket" placeholder="机票费" type="number"
              :disabled="JudgeWrite('planeTicket')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('fare')">
          <el-form-item label="车船费" prop="fare">
            <el-input v-model="dataForm.fare" placeholder="车船费" type="number"
              :disabled="JudgeWrite('fare')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('getAccommodation')">
          <el-form-item label="住宿费用" prop="getAccommodation">
            <el-input v-model="dataForm.getAccommodation" placeholder="住宿费用" type="number"
              :disabled="JudgeWrite('getAccommodation')">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('railTransit')">
          <el-form-item label="轨道交通费" prop="railTransit">
            <el-input v-model="dataForm.railTransit" placeholder="轨道交通费" type="number"
              :disabled="JudgeWrite('railTransit')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('travelAllowance')">
          <el-form-item label="出差补助" prop="travelAllowance">
            <el-input v-model="dataForm.travelAllowance" placeholder="出差补助" type="number"
              :disabled="JudgeWrite('travelAllowance')">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('mealAllowance')">
          <el-form-item label="餐补费用" prop="mealAllowance">
            <el-input v-model="dataForm.mealAllowance" placeholder="餐补费用" type="number"
              :disabled="JudgeWrite('mealAllowance')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('other')">
          <el-form-item label="其他费用" prop="other">
            <el-input v-model="dataForm.other" placeholder="其他费用" type="number"
              :disabled="JudgeWrite('other')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('total')">
          <el-form-item label="总计费用" prop="total">
            <el-input v-model="dataForm.total" placeholder="总计费用" type="number"
              :disabled="JudgeWrite('total')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('reimbursementAmount')">
          <el-form-item label="报销金额" prop="reimbursementAmount">
            <el-input v-model="dataForm.reimbursementAmount" placeholder="报销金额" type="number"
              :disabled="JudgeWrite('reimbursementAmount')">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('loanAmount')">
          <el-form-item label="借款金额" prop="loanAmount">
            <el-input v-model="dataForm.loanAmount" placeholder="借款金额" type="number"
              :disabled="JudgeWrite('loanAmount')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('sumOfMoney')">
          <el-form-item label="补找金额" prop="sumOfMoney">
            <el-input v-model="dataForm.sumOfMoney" placeholder="补找金额" type="number"
              :disabled="JudgeWrite('sumOfMoney')"></el-input>
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
  name: 'TravelReimbursement',
  data() {
    var checkStartTime = (rule, value, callback) => {
      if (!this.dataForm.returnDate) {
        callback()
      } else {
        if (this.dataForm.returnDate < value) {
          callback(new Error('出发日期应该小于回归日期'));
        } else {
          this.$refs.dataForm.validateField('endTime');
          callback()
        }
      }
    }
    var checkEndTime = (rule, value, callback) => {
      if (!this.dataForm.setOutDate) {
        callback()
      } else {
        if (this.dataForm.setOutDate > value) {
          callback(new Error('回归日期应该大于出发日期'));
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
        departmental: '',
        applyDate: '',
        reimbursementId: '',
        billsNum: '',
        travelerUser: '',
        vehicleMileage: '',
        roadFee: '',
        parkingRate: '',
        breakdownFee: '',
        businessMission: '',
        setOutDate: '',
        returnDate: '',
        destination: '',
        planeTicket: '',
        fare: '',
        getAccommodation: '',
        railTransit: '',
        travelAllowance: '',
        mealAllowance: '',
        other: '',
        total: '',
        reimbursementAmount: '',
        loanAmount: '',
        sumOfMoney: ''
      },
      dataRule: {
        destination: [
          { required: true, message: '流程标题不能为空', trigger: 'blur' },
        ],
        flowUrgent: [
          { required: true, message: '紧急程度不能为空', trigger: 'change' },
        ],
        businessMission: [
          { required: true, message: '出差任务不能为空', trigger: 'change' },
        ],
        setOutDate: [
          { required: true, message: '出发时间不能为空', trigger: 'change' },
          { validator: checkStartTime, trigger: 'change' }
        ],
        returnDate: [
          { required: true, message: '回归时间不能为空', trigger: 'change' },
          { validator: checkEndTime, trigger: 'change' }
        ],
        flowTitle: [
          { required: true, message: '目的地不能为空', trigger: 'blur' },
        ]
      }
    }
  },
  methods: {
    selfInit(data) {
      this.dataForm.applyDate = new Date().getTime()
      this.dataForm.flowTitle = this.userInfo.userName + "的差旅报销申请表"
      this.dataForm.applyUser = this.userInfo.userName + '/' + this.userInfo.userAccount
      this.dataForm.departmental = this.userInfo.departmentName
    }
  }
}
</script>