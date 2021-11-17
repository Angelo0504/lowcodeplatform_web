<template>
  <div class="CommonForm-container app-container nohead">
    <div class="dataForm">
      <el-alert title="普通文本、普通数值、日期时间主键的使用" type="warning" :closable="false" />
      <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="110px" class="mt-10">
        <el-divider content-position="left">普通文本框的使用</el-divider>
        <el-form-item label="普通文本框">
          <el-input v-model="dataForm.CommonText" placeholder="" />
        </el-form-item>
        <el-form-item label="座机号码">
          <el-input v-model="dataForm.TelePhone" placeholder="" />
        </el-form-item>
        <el-form-item label="当前登录人">
          <el-input v-model="dataForm.RealName" placeholder="" />
        </el-form-item>
        <el-divider content-position="left">普通数值框的使用</el-divider>
        <el-form-item label="自然数">
          <el-input v-model="dataForm.Natural" placeholder="" type="number" />
        </el-form-item>
        <el-form-item label="报销款">
          <el-input v-model="dataForm.Reimbursement" placeholder="" type="number">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="产品价格">
          <el-input v-model="dataForm.ProductPrice" placeholder="" type="number">
            <el-button slot="append" @click="redy">随机设定</el-button>
          </el-input>
        </el-form-item>
        <el-divider content-position="left">日期时间主键的使用</el-divider>
        <!-- format="yyyy-MM-dd HH:mm"  value-format="yyyy-MM-dd HH:mm" -->
        <el-form-item label="生产日期">
          <el-date-picker v-model="dataForm.ProductionDate" type="date" placeholder="选择日期"
            value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="回款日期">
          <el-date-picker v-model="dataForm.ReturnMoneyDate" type="datetime" placeholder="选择日期"
            value-format="yyyy-MM-dd HH:mm:ss">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="计划执行日期">
          <el-date-picker v-model="dataForm.PlanExecutionDate" type="datetime" placeholder="选择日期"
            value-format="yyyy-MM-dd HH:mm:ss">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="统计月份">
          <el-date-picker v-model="dataForm.StatisticalMonth" type="month" placeholder="选择日期"
            value-format="yyyy-MM">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="规划日期">
          <el-date-picker v-model="dataForm.Programme" type="date" placeholder="选择日期"
            value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="日期时间范围">
          <el-date-picker v-model="dataForm.Dates" type="datetimerange" start-placeholder="开始日期"
            end-placeholder="结束日期" value-format="yyyy-MM-dd HH:mm:ss">
          </el-date-picker>
        </el-form-item>
      </el-form>
    </div>

  </div>
</template>

<script>
export default {
  name: 'extend-formDemo-fieldForm1',
  data() {
    return {
      dataForm: {
        CommonText: '',
        TelePhone: '0000-00000000',
        RealName: '',
        Natural: '',
        Reimbursement: '',
        ProductPrice: '',
        ProductionDate: '',
        ReturnMoneyDate: '',
        PlanExecutionDate: '',
        StatisticalMonth: '',
        Programme: '',
        Dates: '',
      },
      dataRule: {},
    }
  },
  methods: {
    init() {
      this.$refs['dataForm'].resetFields()
    },
    dataFormSubmit() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          // this.$message({
          //   message: '验证成功',
          //   type: 'success',
          //   duration: 1500,
          // })
        }
      })
    },
    redy() {
      function GetRandomNum(Min, Max) {
        let Range = Max - Min;
        let Rand = Math.random();
        return (Min + Math.round(Rand * Range));
      }
      let num = GetRandomNum(1, 100);
      this.dataForm.ProductPrice = num
    }
  }
}
</script>
<style lang="scss" scoped>
.CommonForm-container {
  .JNPF-common-head {
    height: 50px;
    border-bottom: 1px solid #ddd;
    margin-bottom: 10px;
  }
  .dataForm {
    flex: 1;
    overflow: auto;
    .el-input {
      width: 300px;
    }
    .tip {
      margin-left: 10px;
      color: darkgray;
    }
  }
}
</style>