<template>
  <transition name="el-zoom-in-center">
    <div class="JNPF-preview-main order-form">
      <div class="JNPF-common-page-header">
        <el-page-header @back="goBack" content="订单详细" />
        <div class="options">
          <el-button-group>
            <el-button icon="el-icon-printer" @click="print()">打印</el-button>
            <el-button icon="el-icon-download" @click="exportExcel">导出</el-button>
          </el-button-group>
          <el-button-group>
            <el-button icon="el-icon-arrow-left" @click="prve">前单</el-button>
            <el-button @click="next">
              后单<i class="el-icon-arrow-right el-icon--right"></i>
            </el-button>
          </el-button-group>
          <el-button @click="goBack()">{{$t('common.cancelButton')}}</el-button>
        </div>
      </div>
      <div class="main" v-loading="loading">
        <div class="form" ref="print1">
          <el-form :model="dataForm" :rules="dataRule" ref="dataForm" label-width="90px">
            <el-row>
              <el-col :span="6">
                <el-form-item label="客户名称">
                  <p class="text">{{dataForm.customerName}}</p>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="业务人员">
                  <p class="text">{{dataForm.salesmanName}}</p>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="订单日期">
                  <p class="text">{{dataForm.orderDate}}</p>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="订单编码">
                  <p class="text">{{dataForm.orderCode}}</p>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="付款方式">
                  <p class="text">{{dataForm.paymentMode}}</p>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="付款金额">
                  <p class="text">{{dataForm.receivableMoney}}</p>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="定金比率">
                  <p class="text">{{dataForm.earnestRate}}</p>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="预付定金">
                  <p class="text">{{dataForm.prepayEarnest}}</p>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="运输方式">
                  <p class="text">{{dataForm.transportMode}}</p>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="发货日期">
                  <p class="text">{{dataForm.deliveryDate}}</p>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="发货地址">
                  <p class="text">{{dataForm.deliveryAddress}}</p>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="相关附件">
                  <ul class="el-upload-list el-upload-list--text">
                    <li class="el-upload-list__item" v-for="(item,i) in fileList" :key="i"
                      @click="download(item.fileId)">
                      <a class="el-upload-list__item-name"><i
                          class="el-icon-document"></i>{{item.fileName}}
                      </a>
                    </li>
                  </ul>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="订单备注">
                  <p>{{dataForm.description}}</p>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="制单人员">
                  <p class="text">{{dataForm.creatorUserId}}</p>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="制单时间">
                  <p class="text">{{dataForm.creatorTime|toDate()}}</p>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="修改人员">
                  <p class="text">{{dataForm.lastModifyUserId}}</p>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="修改时间">
                  <p class="text">{{dataForm.lastModifyTime|toDate()}}</p>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div class="box">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="订单商品" name="goods">
              <el-table :data="list" size='small' show-summary :summary-method="getSummaries"
                id="myTable1">
                <el-table-column type="index" width="50" label="序号" align="center" />
                <el-table-column prop="goodsName" label="商品名称" show-overflow-tooltip />
                <el-table-column prop="specifications" label="规格型号" width="80" />
                <el-table-column prop="unit" label="单位" width="80" />
                <el-table-column prop="qty" label="数量" width="80" />
                <el-table-column prop="price" label="单价" width="80" />
                <el-table-column prop="amount" label="金额" width="80" />
                <el-table-column prop="discount" label="折扣%" width="90" />
                <el-table-column prop="cess" label="税率%" width="90" />
                <el-table-column prop="actualPrice" label="实际单价" width="80" />
                <el-table-column prop="actualAmount" label="实际金额" width="80" />
                <el-table-column prop="description" label="备注" width="80" />
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="收款计划" name="plan">
              <el-table :data="planList" size='small' show-summary :summary-method="getSummaries"
                id="myTable2">
                <el-table-column type="index" width="50" label="序号" align="center" />
                <el-table-column prop="receivableDate" label="收款日期"
                  :formatter="jnpf.tableDateFormat" />
                <el-table-column prop="receivableRate" label="收款比率%" />
                <el-table-column prop="receivableMoney" label="收款金额" />
                <el-table-column prop="receivableMode" label="收款方式" />
                <el-table-column prop="abstract" label="收款摘要" />
              </el-table>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>

    </div>
  </transition>
</template>

<script>
import { ExportExcel, NextInfo, PrevInfo } from '@/api/extend/order'
import { Info } from '@/api/workFlow/workFlowForm'
import { getDownloadUrl } from '@/api/common'
import printStyle from '../printData/printStyle'
export default {
  data() {
    return {
      printId: 'myTable1',
      activeName: 'goods',
      dataForm: {
        id: '',
        customerName: '',
        salesmanId: '',
        orderDate: '',
        orderCode: '',
        paymentMode: '',
        receivableMoney: 0,
        earnestRate: 0,
        prepayEarnest: 0,
        transportMode: '',
        deliveryDate: '',
        deliveryAddress: '',
        description: '',
        customerId: '',
        salesmanName: '',
      },
      dataRule: {},
      list: [],
      planList: [],
      loading: true,
      fileList: [],
    }
  },
  methods: {
    print2() {
      window.document.body.innerHTML = this.detiel.list2 + this.detiel.list + printStyle;
      window.print();
      window.location.reload()
    },
    goBack() {
      this.$emit('close')
    },
    handleClick(tab, event) {
      if (tab.index == '1') {
        this.printId = 'myTable2'
      } else {
        this.printId = 'myTable1'
      }
    },
    init(id) {
      this.dataForm.id = id || ''
      this.loading = true
      this.$nextTick(() => {
        if (this.dataForm.id) {
          this.$refs['dataForm'].resetFields()
          Info('crmOrder', this.dataForm.id).then(res => {
            this.dataForm = res.data
            this.dataForm.orderDate = this.jnpf.toDate(this.dataForm.orderDate)
            this.dataForm.deliveryDate = this.jnpf.toDate(this.dataForm.deliveryDate, "yyyy-MM-dd")
            this.list = res.data.goodsList
            this.planList = res.data.collectionPlanList
            this.fileList = JSON.parse(this.dataForm.fileJson)
            for (let i = 0; i < this.fileList.length; i++) {
              this.$set(this.fileList[i], 'name', this.fileList[i].fileName)
            }
            this.loading = false
          })
        }
      })
    },
    prve() {
      this.loading = true
      PrevInfo(this.dataForm.id).then(res => {
        if (!res.data) {
          this.loading = false
          this.$message({ message: '第一单了哦', type: 'warning', duration: 1500 })
          return
        }
        this.dataForm = res.data
        this.dataForm.orderDate = this.jnpf.toDate(this.dataForm.orderDate)
        this.dataForm.deliveryDate = this.jnpf.toDate(this.dataForm.deliveryDate, "yyyy-MM-dd")
        this.list = res.data.goodsList
        this.planList = res.data.collectionPlanList
        this.fileList = JSON.parse(this.dataForm.fileJson)
        for (let i = 0; i < this.fileList.length; i++) {
          this.$set(this.fileList[i], 'name', this.fileList[i].fileName)
        }
        this.loading = false
      })
    },
    next() {
      this.loading = true
      NextInfo(this.dataForm.id).then(res => {
        if (!res.data) {
          this.loading = false
          this.$message({ message: '最后一单了哦', type: 'warning', duration: 1500 })
          return
        }
        this.dataForm = res.data
        this.dataForm.orderDate = this.jnpf.toDate(this.dataForm.orderDate)
        this.dataForm.deliveryDate = this.jnpf.toDate(this.dataForm.deliveryDate, "yyyy-MM-dd")
        this.list = res.data.goodsList
        this.planList = res.data.collectionPlanList
        this.fileList = JSON.parse(this.dataForm.fileJson)
        for (let i = 0; i < this.fileList.length; i++) {
          this.$set(this.fileList[i], 'name', this.fileList[i].fileName)
        }
        this.loading = false
      })
    },
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计';
          return;
        }
        if (index === 1) {
          sums[index] = '';
          return;
        }
        const values = data.map(item => Number(item[column.property]));
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
        } else {
          sums[index] = '';
        }
      });
      return sums
    },
    exportExcel() {
      ExportExcel(this.dataForm.id).then(res => {
        if (res.data && res.data.url) {
          window.location.href = this.define.comUrl + res.data.url
        } else {
          this.$message({ message: '导出失败', type: 'error', duration: 1500 })
        }
      })
    },
    // 打印
    print() {
      const tabStyle = `<style>
          table{width:100%;display:table-cell!important;box-sizing:border-box;}
          .el-table__header,.el-table__body,.el-table__footer{width:100%!important;border-collapse: collapse;text-align:center;}
          table, table tr td { border:1px solid #333;color:#606266;word-wrap:break-word}
          table tr th,table tr td{padding:4mm 0mm;word-wrap:break-word }
          table thead{border-bottom:0!important;display:none;}
          .el-table__body, tr td .cell{width:100%!important}
          .el-table th.gutter{display: none;}
          .el-table colgroup.gutter{display: none;}                
          </style><body>`;
      // 表单数据
      let printForm = this.$refs.print1.innerHTML;
      let id = this.printId
      // 表格数据
      const html = document.querySelector('#' + id).innerHTML
      // 新建一个 DOM
      const div = document.createElement('div')
      const printDOMID = 'printDOMElement'
      div.id = printDOMID
      div.innerHTML = html;
      // 提取第3个表格的内容
      // const ths1 = div.querySelectorAll('.el-table__footer tbody tr td .cell')
      // const ThsTextArry1 = []
      // for (let i = 0, len = ths1.length; i < len; i++) {
      //   if (ths1[i].innerText !== '') ThsTextArry1.push(ths1[i].innerText)
      // }
      // 提取第一个表格的内容 即表头
      const ths = div.querySelectorAll('.el-table__header-wrapper th')
      const ThsTextArry = []
      for (let i = 0, len = ths.length; i < len; i++) {
        if (ths[i].innerText !== '') ThsTextArry.push(ths[i].innerText)
      }
      // 删除多余的表头
      div.querySelector('.hidden-columns').remove();
      div.querySelector('.has-gutter').remove();

      //  删掉第一个表格的内容
      div.querySelector('.el-table__header-wrapper').remove();
      // 删除第三个表格的内容
      div.querySelector('.el-table__footer-wrapper').remove();
      //取出表头放到tr里面
      let newHTML = '<tr>'
      for (let i = 0, len = ThsTextArry.length; i < len; i++) {
        newHTML += '<td style="text-align: center; font-weight : bold;padding:10px;">' + ThsTextArry[i] + '</td>'
      }
      newHTML += '</tr>'
      //合计取出表头放到tr里面
      // let newHTML1 = '<tr>'
      // for (let i = 0, len = ThsTextArry1.length; i < len; i++) {
      //   newHTML1 += '<td style="text-align: center; font-weight: bold;padding:10px;">' + ThsTextArry1[i] + '</td>'
      // }
      // newHTML1 += '</tr>'
      let printStr = "<html><head><meta http-equiv='Content-Type' content='text/html; charset=utf-8'></head>";
      let content = "";
      let print = document.getElementById(id).innerHTML;
      content = content + print;
      let content1 = content.replace('<tbody>', '<tbody>' + newHTML)
      // let content2 = content.replace('</tbody>', newHTML1 + '</tbody>')
      let printPart1 = printStr + tabStyle + content1 + "</body></html>";
      // 打印方法
      let printPart = printForm + printPart1 + printStyle;
      let newTab = window.open('_blank');
      newTab.document.body.innerHTML = printPart;
      newTab.print();
      newTab.close();
    },
    download(id) {
      getDownloadUrl('workFlow', id).then(res => {
        if (res.data.url) window.location.href = this.define.comUrl + res.data.url
      })
    }
  }
}
</script>
<style lang="scss" scoped>
>>> .el-select,
>>> .el-date-editor {
  width: 100%;
}
>>> .el-tabs__header {
  margin-bottom: 0;
}
.box {
  position: relative;
}
.add-btn {
  position: absolute;
  right: 10px;
  top: 2px;
  z-index: 100;
}
>>> .el-tabs .el-table {
  .cell {
    padding: 0 5px;
  }
  .el-input-number {
    width: 100%;
    .el-input-number__decrease,
    .el-input-number__increase {
      display: none;
    }
    .el-input__inner {
      padding: 0 15px;
      text-align: left;
    }
  }
}
.order-form {
  height: 100%;
  overflow: hidden;
}
.text {
  word-break: break-all;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
>>> .el-upload-list__item:first-child {
  margin-top: 4px;
}
</style>