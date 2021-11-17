<template>
  <div class="tem-container app-container">
    <el-button @click="print" class="signs print">打印</el-button>

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
          <div class="sigbut">
            <div class="tip">请在这里输入你的签名</div>
            <div class="left-bu">
              <el-button class="clear-bu" size="mini" @click="handleReset">清空</el-button>
              <el-button class="sure" size="mini" @click="handleGenerate" :disabled="!showSig">确定签名
              </el-button>
            </div>
          </div>
          <div class="online-sig">
            <vue-esign ref="esign" :width="800" :height="150" :isCrop="isCrop"
              :lineWidth="lineWidth" :lineColor="lineColor" :bgColor.sync="bgColor"
              v-if="showSig" />
            <img :src="resultImg" alt="" v-if="!showSig" class="sig-img">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import vueEsign from 'vue-esign'
import printStyle from '../printData/printStyle'

export default {
  name: 'extend-signature',
  data() {
    return {
      lineWidth: 6,
      lineColor: '#000000',
      bgColor: '',
      resultImg: '',
      isCrop: false,
      showSig: true,
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
  components: {
    vueEsign
  },
  methods: {
    // 清空画布
    handleReset() {
      this.resultImg = ''
      this.showSig = true;
      this.$nextTick(() => {
        this.$refs.esign.reset()
      })
    },
    handleGenerate() {
      this.$refs.esign.generate().then(res => {
        if (res) {
          this.showSig = false;
          this.resultImg = res;
        }
      }).catch(err => {
        this.$message({
          message: '请签名',
          type: 'warning'
        });
      })
    },
    print() {
      let print = this.$refs.print.innerHTML
      let printPart = print + printStyle;
      let newTab = window.open('_blank');
      newTab.document.body.innerHTML = printPart;
      newTab.print();
      newTab.close();
    },
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
  .sigbut {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #606266;
    padding: 8px;
    border: 1px solid #ebeef5;
    border-top: 0;
    .left-bu {
      display: flex;
      align-items: center;
      .clear-bu,
      .sure {
        margin-left: 5px;
      }
    }
  }
  .online-sig {
    border: 1px solid #ebeef5;
    border-top: 0;
    height: 150px;
    padding-top: 10px;
  }
  .sig-img {
    width: 100%;
  }
}
</style>