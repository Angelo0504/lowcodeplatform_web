<template>
  <div class="offer-container" ref="print">
    <div class="tem_list">
      <div class="tem_main">
        <h1>引迈信息技术有限公司</h1>
        <h2>报 价 单</h2>
        <h4>TO：</h4>
        <p class="title">感谢惠顾，现将贵公司所需配件报价如下：</p>
        <p class="lip">一、产品价格</p>
        <div style="padding: 0 1px 0 0">
          <el-table :data="tableData" border>
            <el-table-column prop="order" label="序号" width="50"></el-table-column>
            <el-table-column prop="name" label="品名" width="150"></el-table-column>
            <el-table-column prop="standards" label="规格" width="100"></el-table-column>
            <el-table-column prop="num" label="数量" width="60"></el-table-column>
            <el-table-column prop="unit" label="单位" width="60"></el-table-column>
            <el-table-column prop="unitprice" label="单价"></el-table-column>
            <el-table-column prop="total" label="金额"></el-table-column>
            <el-table-column prop="remarks" label="备注"></el-table-column>
          </el-table>
        </div>
        <p class="lip">二、通讯联络</p>
        <div class="content1">
          <div class="item">
            <span>需方联系人员：</span>
            <span>丰梦琪</span>
          </div>
          <div class="item">
            <span>供方联系人员：</span>
            <span>应白梦</span>
          </div>
          <div class="item">
            <span>需方联系电话：</span>
            <span>13802141322</span>
          </div>
          <div class="item">
            <span>供方联系电话：</span>
            <span>13802141322</span>
          </div>
          <div class="item">
            <span>需方传真号码：</span>
            <span>010-88888888</span>
          </div>
          <div class="item">
            <span>供方传真号码：</span>
            <span>021-88888888</span>
          </div>
          <div class="item">
            <span>供方地址：</span>
            <span>北京市海淀区西直门北大街42号</span>
          </div>
          <div class="item">
            <span>供方地址：</span>
            <span>上海市青浦区</span>
          </div>
          <div class="item">
            <span>供方邮编：</span>
            <span>100000</span>
          </div>
          <div class="item">
            <span>供方邮编：</span>
            <span>201799</span>
          </div>
        </div>
        <div class="temdate">日 期：2017-11-29</div>
        <div class="seal">盖章：</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      connect: {
        user: "丰梦琪",
        supply: "应白梦",
        userPhone: "13802141322",
        supplyPhone: "13004363886",
        useremail: "010-88888888",
        supplyemail: "021-88888888",
        useraddress: "北京市海淀区西直门北大街42号",
        supplyaddress: "上海市青浦区",
        userPostcode: "100000",
        suPostcode: "201799",
      },
      tableData: [
        {
          order: "1",
          name: "服务器硬件",
          standards: "联想",
          num: "5",
          unit: "台",
          unitprice: "20000.00",
          total: "100000.00",
          remarks: "",
        },
        {
          order: "2",
          name: "数据库正版",
          standards: "SQLServer",
          num: "5",
          unit: "套",
          unitprice: "9998.00",
          total: "49990.00",
          remarks: "",
        },
        {
          order: "3",
          name: "OA内部管理系统",
          standards: "定制",
          num: "5",
          unit: "套",
          unitprice: "390000.00",
          total: "	390000.00",
          remarks: "",
        },
        {
          order: "4",
          name: "进销存管理系统",
          standards: "定制",
          num: "5",
          unit: "套",
          unitprice: "260000.00",
          total: "260000.00",
          remarks: "",
        },
        {
          order: "5",
          name: "	服务费",
          standards: "",
          num: "5",
          unit: "年",
          unitprice: "80000.00",
          total: "80000.00",
          remarks: "",
        },
        {
          order: "6",
          name: "差旅费用",
          standards: "",
          num: "5",
          unit: "年",
          unitprice: "60000.00",
          total: "80000.00",
          remarks: "",
        },
      ],
    };
  }
};
</script>

<style lang="scss" scoped>
.tem_main {
  width: 800px;
  margin: 0 auto;
}
.content1 {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  .item {
    width: 345px;
    padding: 8px 0;
    border-bottom: 1px solid #ebeef5;
    span {
      font-size: 12px;
      padding: 10px 0;
      color: #606266;
    }
  }
}
.el-table,
.content1 {
  width: 720px !important;
  margin: 0 auto !important;
}
h1,
h2,
h3 {
  text-align: center !important;
}
p,
h4 {
  width: 720px !important;
  margin: 0 auto !important;
}
p.title {
  border-bottom: 2px dashed #606266;
  line-height: 30px;
  font-size: 12px;
  color: #606266;
}
p.lip {
  padding: 20px 0;
  color: #606266;
}
.temdate {
  font-size: 12px;
  width: 602px;
  margin: 0 auto;
  text-align: right;
  margin: 20px 60px;
  color: #606266;
}
.seal {
  font-size: 12px;
  width: 480px;
  margin: 0 auto;
  text-align: right;
  margin: 10px 120px;
  padding-bottom: 40px;
  color: #606266;
}
.offer-container {
  height: 100%;
  overflow: auto;
  .tem_list {
    width: 800px;
    height: 100%;
    margin: 0 auto;
    background: #fff;
    .tem_main {
      width: 90%;
      margin: 0 auto;
      font-size: 12px;
      padding-top: 10px;
      color: #606266;
      h1,
      h2 {
        text-align: center;
        color: #606266;
      }
      .title {
        border-bottom: 2px dashed #606266;
        line-height: 30px;
        font-size: 12px;
        color: #606266;
      }
      >>> .el-table thead tr th {
        background-color: #fff;
        color: #606266;
      }
      .lip {
        padding: 20px 0;
        color: #606266;
      }
      .demo-form-inline {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
      }
      .el-form-item--mini.el-form-item,
      .el-form-item--small.el-form-item {
        border-bottom: 1px solid #ebeef5;
        width: 48%;
        margin: 0;
        >>> .el-input__inner {
          border: 0 !important;
          padding: 0;
          width: 220px;
          font-size: 12px;
        }
        >>> .el-form-item__label {
          font-size: 12px;
        }
      }
      .temdate {
        text-align: right;
        margin: 20px 60px;
      }
      .seal {
        text-align: right;
        margin: 10px 120px;
        padding-bottom: 40px;
      }
    }
  }
}
</style>