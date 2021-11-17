<template>
  <div class="flow-form" v-loading="loading">
    <div class="com-title">
      <h1>用品入库申请表</h1>
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
          <el-form-item label="所属部门" prop="department">
            <el-input v-model="dataForm.department" placeholder="所属部门" readonly
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
        <el-col :span="12" v-if="JudgeShow('articles')">
          <el-form-item label="用品库存" prop="articles">
            <el-input v-model="dataForm.articles" placeholder="用品库存"
              :disabled="JudgeWrite('articles')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('classification')">
          <el-form-item label="用品分类" prop="classification">
            <el-input v-model="dataForm.classification" placeholder="用品分类"
              :disabled="JudgeWrite('classification')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('articlesId')">
          <el-form-item label="用品编码" prop="articlesId">
            <el-input v-model="dataForm.articlesId" placeholder="用品编码"
              :disabled="JudgeWrite('articlesId')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('company')">
          <el-form-item label="单位" prop="company">
            <el-input v-model="dataForm.company" placeholder="单位" :disabled="JudgeWrite('company')">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('estimatePeople')">
          <el-form-item label="数量" prop="estimatePeople">
            <el-input v-model="dataForm.estimatePeople" placeholder="数量"
              :disabled="JudgeWrite('estimatePeople')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24" v-if="JudgeShow('applyReasons')">
          <el-form-item label="申请原因" prop="applyReasons">
            <el-input v-model="dataForm.applyReasons" placeholder="申请原因" type="textarea" :rows="3"
              :disabled="JudgeWrite('applyReasons')" />
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
  name: 'ArticlesWarehous',
  data() {
    return {
      dataForm: {
        flowId: '',
        id: '',
        billNo: '',
        flowTitle: '',
        flowUrgent: 1,
        applyUser: '',
        department: '',
        applyDate: '',
        articles: '',
        classification: '',
        articlesId: '',
        company: '',
        estimatePeople: '',
        applyReasons: '',
      },
      dataRule: {
        destination: [
          { required: true, message: '流程标题不能为空', trigger: 'blur' },
        ],
        flowUrgent: [
          { required: true, message: '紧急程度不能为空', trigger: 'change' },
        ],
        estimatePeople: [
          { pattern: /^[1-9]\d*$/, message: '请输入正整数' }
        ]
      },
    }
  },
  methods: {
    selfInit(data) {
      this.dataForm.applyDate = new Date().getTime()
      this.dataForm.flowTitle = this.userInfo.userName + "的用品入库申请表"
      this.dataForm.applyUser = this.userInfo.userName + '/' + this.userInfo.userAccount
      this.dataForm.department = this.userInfo.departmentName
    }
  }
}
</script>