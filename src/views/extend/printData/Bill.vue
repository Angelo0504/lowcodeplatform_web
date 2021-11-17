<template>
  <div ref="print">
    <div class="bill">
      <h1 class="bill-title">水电费用清单汇总</h1>
      <el-table :data="tableData" border id="bill1">
        <el-table-column prop="month" label="月份"> </el-table-column>
        <el-table-column label="2015" width="80">
          <el-table-column label="电费" prop="electric1"></el-table-column>
          <el-table-column label="水费" prop="waterFee1"></el-table-column>
        </el-table-column>
        <el-table-column label="2016" width="80">
          <el-table-column label="电费" prop="electric2"></el-table-column>
          <el-table-column label="水费" prop="waterFee2"></el-table-column>
        </el-table-column>
        <el-table-column label="2017" width="80">
          <el-table-column label="电费" prop="electric3"></el-table-column>
          <el-table-column label="水费" prop="waterFee3"></el-table-column>
        </el-table-column>
        <el-table-column label="2018" width="80">
          <el-table-column label="电费" prop="electric4"></el-table-column>
          <el-table-column label="水费" prop="waterFee4"></el-table-column>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [
        {
          month: "1月份",
          electric1: "968.00",
          electric2: "734.00",
          electric3: "737.00",
          electric4: "651.00",
          waterFee1: "144.00",
          waterFee2: "241.00",
          waterFee3: "234.00",
          waterFee4: "179.00",
        },
        {
          month: "2月份",
          electric1: "968.00",
          electric2: "734.00",
          electric3: "737.00",
          electric4: "651.00",
          waterFee1: "144.00",
          waterFee2: "241.00",
          waterFee3: "234.00",
          waterFee4: "179.00",
        },
        {
          month: "3月份",
          electric1: "968.00",
          electric2: "734.00",
          electric3: "737.00",
          electric4: "651.00",
          waterFee1: "144.00",
          waterFee2: "241.00",
          waterFee3: "234.00",
          waterFee4: "179.00",
        },
        {
          month: "4月份",
          electric1: "968.00",
          electric2: "734.00",
          electric3: "737.00",
          electric4: "651.00",
          waterFee1: "144.00",
          waterFee2: "241.00",
          waterFee3: "234.00",
          waterFee4: "179.00",
        },
        {
          month: "5月份",
          electric1: "968.00",
          electric2: "734.00",
          electric3: "737.00",
          electric4: "651.00",
          waterFee1: "144.00",
          waterFee2: "241.00",
          waterFee3: "234.00",
          waterFee4: "179.00",
        },
        {
          month: "6月份",
          electric1: "968.00",
          electric2: "734.00",
          electric3: "737.00",
          electric4: "651.00",
          waterFee1: "144.00",
          waterFee2: "241.00",
          waterFee3: "234.00",
          waterFee4: "179.00",
        },
        {
          month: "7月份",
          electric1: "837.00",
          electric2: "518.00",
          electric3: "737.00",
          electric4: "651.00",
          waterFee1: "144.00",
          waterFee2: "241.00",
          waterFee3: "234.00",
          waterFee4: "179.00",
        },
        {
          month: "8月份",
          electric1: "938.00",
          electric2: "976.00",
          electric3: "923.00",
          electric4: "856.00",
          waterFee1: "180.00",
          waterFee2: "103.00",
          waterFee3: "285.00",
          waterFee4: "215.00",
        },
        {
          month: "9月份",
          electric1: "938.00",
          electric2: "976.00",
          electric3: "923.00",
          electric4: "856.00",
          waterFee1: "180.00",
          waterFee2: "103.00",
          waterFee3: "285.00",
          waterFee4: "215.00",
        },
        {
          month: "10月份",
          electric1: "938.00",
          electric2: "976.00",
          electric3: "923.00",
          electric4: "856.00",
          waterFee1: "180.00",
          waterFee2: "103.00",
          waterFee3: "285.00",
          waterFee4: "215.00",
        },
        {
          month: "11月份",
          electric1: "938.00",
          electric2: "976.00",
          electric3: "923.00",
          electric4: "856.00",
          waterFee1: "180.00",
          waterFee2: "103.00",
          waterFee3: "285.00",
          waterFee4: "215.00",
        },
        {
          month: "12月份",
          electric1: "938.00",
          electric2: "976.00",
          electric3: "923.00",
          electric4: "856.00",
          waterFee1: "180.00",
          waterFee2: "103.00",
          waterFee3: "285.00",
          waterFee4: "215.00",
        },
      ],
    };
  }
};
</script>