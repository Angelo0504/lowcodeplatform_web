<template>
  <div class="flow-form" v-loading="loading">
    <div class="com-title">
      <h1>批包装指令</h1>
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
        <el-col :span="12" v-if="JudgeShow('productName')">
          <el-form-item label="产品名称" prop="productName">
            <el-input v-model="dataForm.productName" placeholder="产品名称"
              :disabled="JudgeWrite('productName')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('production')">
          <el-form-item label="生产车间" prop="production">
            <el-input v-model="dataForm.production" placeholder="生产车间"
              :disabled="JudgeWrite('production')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('compactor')">
          <el-form-item label="编制人员" prop="compactor">
            <el-input v-model="dataForm.compactor" placeholder="编制人员"
              :disabled="JudgeWrite('compactor')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('compactorDate')">
          <el-form-item label="编制日期" prop="compactorDate">
            <el-date-picker v-model="dataForm.compactorDate" type="datetime" placeholder="选择日期"
              value-format="timestamp" format="yyyy-MM-dd HH:mm" :editable='false'
              :disabled="JudgeWrite('compactorDate')">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('standard')">
          <el-form-item label="产品规格" prop="standard">
            <el-input v-model="dataForm.standard" placeholder="产品规格"
              :disabled="JudgeWrite('standard')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('warehousNo')">
          <el-form-item label="入库序号" prop="warehousNo">
            <el-input v-model="dataForm.warehousNo" placeholder="入库序号"
              :disabled="JudgeWrite('warehousNo')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('productionQuty')">
          <el-form-item label="批产数量" prop="productionQuty">
            <el-input v-model="dataForm.productionQuty" placeholder="批产数量"
              :disabled="JudgeWrite('productionQuty')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('operationDate')">
          <el-form-item label="操作日期" prop="operationDate">
            <el-date-picker v-model="dataForm.operationDate" type="datetime" placeholder="选择日期"
              value-format="timestamp" format="yyyy-MM-dd HH:mm" :editable='false'
              :disabled="JudgeWrite('operationDate')">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('regulations')">
          <el-form-item label="工艺规程" prop="regulations">
            <el-input v-model="dataForm.regulations" placeholder="工艺规程"
              :disabled="JudgeWrite('regulations')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('packing')">
          <el-form-item label="包装规格" prop="packing">
            <el-input v-model="dataForm.packing" placeholder="包装规格"
              :disabled="JudgeWrite('packing')"></el-input>
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
  name: 'BatchPack',
  data() {
    return {
      dataForm: {
        flowId: '',
        id: '',
        billNo: '',
        flowTitle: '',
        flowUrgent: 1,
        productName: '',
        production: '',
        compactor: '',
        standard: '',
        warehousNo: '',
        productionQuty: '',
        regulations: '',
        packing: '',
        description: '',
        compactorDate: '',
        operationDate: '',
      },
      dataRule: {
        destination: [
          { required: true, message: '流程标题不能为空', trigger: 'blur' },
        ],
        flowUrgent: [
          { required: true, message: '紧急程度不能为空', trigger: 'change' },
        ],
        compactorDate: [
          { required: true, message: '编制日期不能为空', trigger: 'change' },
        ],
        productionQuty: [
          { pattern: /^[1-9]\d*$/, message: '请输入正整数' }
        ]
      }
    }
  },
  methods: {
    selfInit(data) {
      this.dataForm.flowTitle = this.userInfo.userName + "的批包装指令"
    }
  }
}
</script>