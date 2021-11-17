<template>
  <div ref="print">
    <div class="storage">
      <el-table :data="tableData3">
        <el-table-column label="配送信息" align="center">
          <el-table-column label="凭证日期" prop="data1"></el-table-column>
          <el-table-column label="客户经理号:" prop="data2"></el-table-column>
          <el-table-column label="客户经理名" prop="data3"></el-table-column>
        </el-table-column>
      </el-table>
      <el-table :data="tableData4" style="border-top: none">
        <el-table-column label="入账机构：黄河银行营业部">
          <el-table-column label="入库详情" width="120">
            <el-table-column label="合同编码" prop="data1"></el-table-column>
          </el-table-column>
          <el-table-column label="电票测试二的电子银承汇票业务按要求办理以下物的抵（质）押，请你部按照本通知书要求，办理记账入库手续：">
            <el-table-column label="2147483647" prop="data2"></el-table-column>
            <el-table-column label="客户编码" prop="data3"></el-table-column>
            <el-table-column label="65000416" prop="data4"></el-table-column>
          </el-table-column>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData3: [{ data1: "20151220", data2: "003503", data3: "马倩超" }],
      tableData4: [
        {
          data1: "贷款类型",
          data2: "承",
          data3: "客户名称",
          data4: "电票测试二",
        },
        {
          data1: "证件类型",
          data2: "组",
          data3: "证件号码",
          data4: "08265046-0",
        },
        {
          data1: "起始日期",
          data2: "20151220",
          data3: "到期日期",
          data4: "20210618",
        },
        {
          data1: "抵（质）押物编码",
          data2: "4000325119",
          data3: "抵（质）押物类型",
          data4: "A0",
        },
        {
          data1: "抵（质）押物价值",
          data2: "80000.00",
          data3: "抵（质）押率(%)",
          data4: "75.000000",
        },
        {
          data1: "所有权人名称",
          data2: "电票测试二",
          data3: "所有权人证件类型",
          data4: "组织机构代码",
        },
        {
          data1: "所有权人证件号码",
          data2: "电票测试二",
          data3: "",
          data4: "接收人",
        },
        {
          data1: "交出人",
          data2: "base.KONGGE",
          data3: "",
          data4: "base.KONGGE",
        },
      ],
    };
  }
};
</script>