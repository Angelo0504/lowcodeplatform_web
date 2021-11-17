<template>
  <div class="tem-container app-container">
    <el-button @click="print" class="signs print">打印</el-button>
    <el-button @click="showlip" v-if="showBtn" class="signs">盖章</el-button>
    <div ref="print">
      <div class="tem_list">
        <div class="tem_main">
          <h1>引迈信息技术有限公司</h1>
          <h2>报 价 单</h2>
          <h4>TO：</h4>
          <p class="title"> 感谢惠顾，现将贵公司所需配件报价如下：</p>
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
        <VueDragResize :isDraggable="showBtn" :w="150" :h="150" :isResizable='false' v-if="showsin">
          <img
            src="data:image/gif;base64,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"
            alt="">
          <div class="signBtn">
            <el-button @click="signclick" v-if="showBtn">确认</el-button>
            <el-button @click="canclesign" v-if="showBtn">取消</el-button>
          </div>
        </VueDragResize>
      </div>
    </div>
  </div>
</template>
<script>
import VueDragResize from 'vue-drag-resize'
import printStyle from '../printData/printStyle'

export default {
  name: 'extend-signet',
  data() {
    return {
      showSign: true,
      showBtn: true,
      showsin: false,
      key: '',
      labelPosition: 'right',
      connect: {
        user: '丰梦琪',
        supply: '应白梦',
        userPhone: '13802141322',
        supplyPhone: '13004363886',
        useremail: '010-88888888',
        supplyemail: '021-88888888',
        useraddress: '北京市海淀区西直门北大街42号',
        supplyaddress: '上海市青浦 区',
        userPostcode: '100000',
        suPostcode: '201799'
      },
      tableData: [{
        order: '1',
        name: '服务器硬件',
        standards: '联想',
        num: '5',
        unit: '台',
        unitprice: '20000.00',
        total: '100000.00',
        remarks: ''
      }, {
        order: '2',
        name: '数据库正版',
        standards: 'SQLServer',
        num: '5',
        unit: '套',
        unitprice: '9998.00',
        total: '49990.00',
        remarks: ''
      }, {
        order: '3',
        name: 'OA内部管理系统',
        standards: '定制',
        num: '5',
        unit: '套',
        unitprice: '	390000.00',
        total: '	390000.00',
        remarks: ''
      }, {
        order: '4',
        name: '进销存管理系统',
        standards: '定制',
        num: '5',
        unit: '套',
        unitprice: '260000.00',
        total: '260000.00',
        remarks: ''
      }, {
        order: '5',
        name: '	服务费',
        standards: '',
        num: '5',
        unit: '年',
        unitprice: '80000.00',
        total: '80000.00',
        remarks: ''
      }, {
        order: '6',
        name: '差旅费用',
        standards: '',
        num: '5',
        unit: '年',
        unitprice: '60000.00',
        total: '80000.00',
        remarks: ''
      }]
    }
  },
  components: { VueDragResize },
  methods: {
    print() {
      let print = this.$refs.print.innerHTML
      let printPart = print + printStyle;
      let newTab = window.open('_blank');
      newTab.document.body.innerHTML = printPart;
      newTab.print();
      newTab.close();
    },
    showlip() {
      this.showsin = true
    },
    signclick() {
      this.showSign = false
      this.showBtn = false
    },
    canclesign() {
      this.showsin = false
    }
  }
} 
</script>

<style lang="scss" scoped>
.tem-container {
  background: #ebeef5 !important;
  overflow: auto;
  position: relative;
  padding: 0;
  .signs {
    position: absolute;
    right: 10px;
    top: 70px;
    &.print {
      top: 20px;
    }
  }
  .signBtn {
    display: flex;
    justify-content: space-between;
  }
  .tem_list {
    width: 800px;
    margin: 0 auto;
    background: #fff;
    // box-shadow: rgb(189, 189, 189) 0px 0px 10px;
    color: #606266;
    position: relative;
    .tem_main {
      width: 90%;
      margin: 0 auto;
      font-size: 12px;
      padding-bottom: 15px;
      h1 {
        padding-top: 36px;
      }
      h1,
      h2 {
        text-align: center;
        color: #475059;
      }
      .title {
        border-bottom: 2px dashed #000;
        padding-left: 30px;
        line-height: 30px;
        font-size: 12px;
      }
      .lip {
        padding: 20px 0;
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
  .vdr.active:before {
    outline: 0;
  }
  .vdr.active {
    img {
      width: 100%;
      height: 100%;
    }
  }
  >>> .el-table thead tr th {
    background: #fff !important;
  }
  .el-table td,
  .el-table th.is-leaf {
    background: #fff !important;
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
}
</style>