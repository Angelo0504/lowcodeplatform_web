<template>
  <div class="printData-container app-container">
    <el-button icon="el-icon-printer" @click="print()" class="prtBtn">打印</el-button>
    <el-tabs type="border-card" v-model="activeName">
      <el-tab-pane label="报价单子" name="offer">
        <offer ref="offer"></offer>
      </el-tab-pane>
      <el-tab-pane label="水电费用" name="bill">
        <bill ref="bill"></bill>
      </el-tab-pane>
      <el-tab-pane label="员工档案" name="record">
        <record ref="record"></record>
      </el-tab-pane>
      <el-tab-pane label="入库通知" name="storage">
        <storage ref="storage"></storage>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import offer from "./Offer";
import bill from "./Bill";
import record from "./Record";
import storage from "./Storage";
import printStyle from './printStyle'
export default {
  name: "extend-printData",
  data() {
    return {
      activeName: "offer",
    };
  },
  components: {
    offer,
    bill,
    record,
    storage,
  },
  methods: {
    print() {
      let print = this.$refs[this.activeName].$refs.print.innerHTML
      let printPart = print + printStyle;
      let newTab = window.open('_blank');
      newTab.document.body.innerHTML = printPart;
      newTab.print();
      newTab.close();
    }
  }
};
</script>

<style lang="scss" scoped>
.printData-container {
  .el-tabs {
    height: 100%;
  }
  padding: 0;
  >>> .el-table thead.is-group th {
    background: #fff !important;
  }
  .prtBtn {
    position: absolute;
    right: 28px;
    top: 4px;
    z-index: 1;
  }
  >>> .el-tabs__content {
    height: calc(100% - 39px);
    .el-tab-pane {
      height: 100%;
    }
  }
  >>> .storage {
    width: 800px;
    margin: 0 auto;
    .el-table thead tr,
    .el-table thead tr th {
      color: #606266;
    }
  }
  >>> .el-table {
    width: 800px;
    margin: 0 auto;
    thead {
      color: #606266;
    }
  }
  >>> .bill {
    width: 800px;
    margin: 0 auto;
    text-align: center;
    .bill-title {
      color: #606266;
    }
  }
}
</style>