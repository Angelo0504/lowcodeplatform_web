<template>
  <div class="flow-form" v-loading="loading">
    <div class="com-title">
      <h1>宴请申请</h1>
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
        <el-col :span="12" v-if="JudgeShow('applyDate')">
          <el-form-item label="申请日期" prop="applyDate">
            <el-date-picker v-model="dataForm.applyDate" type="date" placeholder="选择日期"
              value-format="timestamp" format="yyyy-MM-dd" :editable="false" readonly
              :disabled="JudgeWrite('applyDate')">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('banquetNum')">
          <el-form-item label="宴请人数" prop="banquetNum">
            <el-input v-model="dataForm.banquetNum" placeholder="宴请人数"
              :disabled="JudgeWrite('banquetNum')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('banquetPeople')">
          <el-form-item label="宴请人员" prop="banquetPeople">
            <el-input v-model="dataForm.banquetPeople" placeholder="宴请人员"
              :disabled="JudgeWrite('banquetPeople')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('total')">
          <el-form-item label="人员总数" prop="total">
            <el-input v-model="dataForm.total" placeholder="人员总数" :disabled="JudgeWrite('total')">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('place')">
          <el-form-item label="宴请地点" prop="place">
            <el-input v-model="dataForm.place" placeholder="宴请地点" :disabled="JudgeWrite('place')">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('expectedCost')">
          <el-form-item label="预计费用" prop="expectedCost">
            <el-input v-model="dataForm.expectedCost" placeholder="预计费用" type="number"
              :disabled="JudgeWrite('expectedCost')"></el-input>
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
  name: 'ApplyBanquet',
  mixins: [comMinix],
  data() {
    return {
      dataForm: {
        flowId: '',
        id: '',
        billNo: '',
        flowTitle: '',
        flowUrgent: 1,
        applyUser: '',
        position: '',
        applyDate: '',
        banquetNum: '',
        banquetPeople: '',
        total: '',
        place: '',
        expectedCost: '',
        description: '',
      },
      dataRule: {
        destination: [
          { required: true, message: '流程标题不能为空', trigger: 'blur' },
        ],
        flowUrgent: [
          { required: true, message: '紧急程度不能为空', trigger: 'change' },
        ],
        banquetNum: [
          { pattern: /^[1-9]\d*$/, message: '请输入正整数' }
        ],
        total: [
          { pattern: /^[1-9]\d*$/, message: '请输入正整数' }
        ]
      },
    }
  },
  methods: {
    selfInit(data) {
      this.dataForm.applyDate = new Date().getTime()
      this.dataForm.flowTitle = this.userInfo.userName + "的宴请申请"
      this.dataForm.applyUser = this.userInfo.userName + '/' + this.userInfo.userAccount
      if (this.userInfo.positionIds && this.userInfo.positionIds.length) {
        let list = this.userInfo.positionIds.map(o => o.name)
        this.dataForm.position = list.join(',')
      }
    }
  }
}
</script>