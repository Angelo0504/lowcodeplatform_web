<template>
  <div class="flow-form" v-loading="loading">
    <div class="com-title">
      <h1>违章处理申请表</h1>
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
        <el-col :span="12" v-if="JudgeShow('plateNum')">
          <el-form-item label="车牌号" prop="plateNum">
            <el-input v-model="dataForm.plateNum" placeholder="车牌号"
              :disabled="JudgeWrite('plateNum')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('driver')">
          <el-form-item label="驾驶人" prop="driver">
            <el-input v-model="dataForm.driver" placeholder="驾驶人" :disabled="JudgeWrite('driver')">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('leadingOfficial')">
          <el-form-item label="负责人" prop="leadingOfficial">
            <el-input v-model="dataForm.leadingOfficial" placeholder="负责人"
              :disabled="JudgeWrite('leadingOfficial')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('peccancyDate')">
          <el-form-item label="违章日期" prop="peccancyDate">
            <el-date-picker v-model="dataForm.peccancyDate" type="datetime" placeholder="选择日期"
              value-format="timestamp" format="yyyy-MM-dd HH:mm" :editable='false'
              :disabled="JudgeWrite('peccancyDate')">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('noticeDate')">
          <el-form-item label="通知日期" prop="noticeDate">
            <el-date-picker v-model="dataForm.noticeDate" type="datetime" placeholder="选择日期"
              value-format="timestamp" format="yyyy-MM-dd HH:mm" :editable='false'
              :disabled="JudgeWrite('noticeDate')">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('limitDate')">
          <el-form-item label="限处理日期" prop="limitDate">
            <el-date-picker v-model="dataForm.limitDate" type="datetime" placeholder="选择日期"
              value-format="timestamp" format="yyyy-MM-dd HH:mm" :editable='false'
              :disabled="JudgeWrite('limitDate')">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('violationSite')">
          <el-form-item label="违章地点" prop="violationSite">
            <el-input v-model="dataForm.violationSite" placeholder="违章地点"
              :disabled="JudgeWrite('violationSite')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('violationBehavior')">
          <el-form-item label="违章行为" prop="violationBehavior">
            <el-input v-model="dataForm.violationBehavior" placeholder="违章行为"
              :disabled="JudgeWrite('violationBehavior')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('deduction')">
          <el-form-item label="违章扣分" prop="deduction">
            <el-input v-model="dataForm.deduction" placeholder="违章扣分" type="number"
              :disabled="JudgeWrite('deduction')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('amountMoney')">
          <el-form-item label="违章罚款" prop="amountMoney">
            <el-input v-model="dataForm.amountMoney" placeholder="违章罚款" type="number"
              :disabled="JudgeWrite('amountMoney')"></el-input>
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
  name: 'ViolationHandling',
  data() {
    return {
      dataForm: {
        flowId: '',
        id: '',
        billNo: '',
        flowTitle: '',
        flowUrgent: 1,
        plateNum: '',
        driver: '',
        leadingOfficial: '',
        peccancyDate: '',
        noticeDate: '',
        limitDate: '',
        deduction: '',
        description: '',
        violationSite: '',
        violationBehavior: '',
        amountMoney: ''
      },
      dataRule: {
        flowTitle: [
          { required: true, message: '流程标题不能为空', trigger: 'blur' },
        ],
        flowUrgent: [
          { required: true, message: '紧急程度不能为空', trigger: 'change' },
        ],
        noticeDate: [
          { required: true, message: '通知日期不能为空', trigger: 'change' },
        ],
        limitDate: [
          { required: true, message: '限处理日期不能为空', trigger: 'change' },
        ],
        peccancyDate: [
          { required: true, message: '违章日期不能为空', trigger: 'change' },
        ]
      }
    }
  },
  methods: {
    selfInit(data) {
      this.dataForm.flowTitle = this.userInfo.userName + "的违章处理申请表"
    }
  }
}
</script>