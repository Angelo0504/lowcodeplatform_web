<template>
  <div class="flow-form" v-loading="loading">
    <div class="main">
      <el-form :model="dataForm" :rules="dataRule" ref="dataForm" label-width="90px"
        :disabled="setting.readonly">
        <el-row>
          <el-col :span="6" v-if="JudgeShow('customerName')">
            <el-form-item label="客户名称" prop="customerName">
              <el-autocomplete v-model="dataForm.customerName" :fetch-suggestions="querySearchAsync"
                placeholder="请输入客户名称" @select="handleSelect" :disabled="JudgeWrite('customerName')">
                <template slot-scope="{ item }">
                  <div class="name">{{ item.text }}</div>
                </template>
              </el-autocomplete>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="JudgeShow('salesmanId')">
            <el-form-item label="业务人员" prop="salesmanId">
              <JNPF-TreeSelect :options="treeData" v-model="dataForm.salesmanId"
                @getValue="getValue" placeholder="选择人员" lastLevel lastLevelKey='type'
                lastLevelValue='user' :disabled="JudgeWrite('salesmanId')">
              </JNPF-TreeSelect>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="JudgeShow('orderDate')">
            <el-form-item label="订单日期" prop="orderDate">
              <el-date-picker v-model="dataForm.orderDate" type="datetime" placeholder="选择日期"
                value-format="timestamp" format="yyyy-MM-dd HH:mm" :editable="false"
                :disabled="JudgeWrite('orderDate')">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="JudgeShow('orderCode')">
            <el-form-item label="订单编码">
              <el-input v-model="dataForm.orderCode" placeholder="订单编码" readonly
                :disabled="JudgeWrite('orderCode')"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="JudgeShow('paymentMode')">
            <el-form-item label="付款方式" prop="paymentMode">
              <el-select v-model="dataForm.paymentMode" placeholder="选择付款方式"
                :disabled="JudgeWrite('paymentMode')">
                <el-option :key="item" :label="item" :value="item" v-for="item in options" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="JudgeShow('receivableMoney')">
            <el-form-item label="付款金额">
              <el-input v-model.number="dataForm.receivableMoney" placeholder="付款金额"
                :disabled="JudgeWrite('receivableMoney')">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="JudgeShow('earnestRate')">
            <el-form-item label="定金比率">
              <el-input v-model="dataForm.earnestRate" placeholder="定金比率" type="number"
                :disabled="JudgeWrite('earnestRate')">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="JudgeShow('prepayEarnest')">
            <el-form-item label="预付定金">
              <el-input v-model="dataForm.prepayEarnest" placeholder="预付定金" type="number"
                :disabled="JudgeWrite('prepayEarnest')">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="JudgeShow('transportMode')">
            <el-form-item label="运输方式">
              <el-select v-model="dataForm.transportMode" placeholder="选择运输方式"
                :disabled="JudgeWrite('transportMode')">
                <el-option :key="item" :label="item" :value="item"
                  v-for="item in transportOptions" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="JudgeShow('deliveryDate')">
            <el-form-item label="发货日期">
              <el-date-picker v-model="dataForm.deliveryDate" type="date" placeholder="选择日期"
                value-format="timestamp" :editable="false" :disabled="JudgeWrite('deliveryDate')">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="JudgeShow('deliveryAddress')">
            <el-form-item label="发货地址">
              <el-input v-model="dataForm.deliveryAddress" placeholder="发货地址"
                :disabled="JudgeWrite('deliveryAddress')">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24" v-if="JudgeShow('fileJson')">
            <el-form-item label="相关附件">
              <UploadFile v-model="fileList" :disabled="JudgeWrite('fileJson')" />
            </el-form-item>
          </el-col>
          <el-col :span="24" v-if="JudgeShow('description')">
            <el-form-item label="订单备注">
              <el-input v-model="dataForm.description" placeholder="订单备注" type="textarea" :rows="3"
                :disabled="JudgeWrite('description')" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="box">
        <el-tabs v-model="activeName">
          <el-tab-pane label="订单商品" name="goods">
            <el-table :data="dataForm.goodsList" size='mini' show-summary
              :summary-method="getSummaries">
              <el-table-column type="index" width="50" label="序号" align="center" />
              <el-table-column prop="goodsName" label="商品名称" />
              <el-table-column prop="specifications" label="规格型号" width="80" />
              <el-table-column prop="unit" label="单位" width="80" />
              <el-table-column prop="qty" label="数量" width="80">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.qty" @change="count(scope.row)"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="price" label="单价" width="80">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.price" @change="count(scope.row)"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="amount" label="金额" width="80">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.amount" readonly></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="discount" label="折扣%" width="90">
                <template slot-scope="scope">
                  <el-input-number v-model="scope.row.discount" :precision="2" :step="0.1" :min="0"
                    :max="100" @change="count(scope.row)" controls-position="right">
                  </el-input-number>
                </template>
              </el-table-column>
              <el-table-column prop="cess" label="税率%" width="90">
                <template slot-scope="scope">
                  <el-input-number v-model="scope.row.cess" :precision="2" :step="0.1" :min="0"
                    :max="100" @change="count(scope.row)" controls-position="right">
                  </el-input-number>
                </template>
              </el-table-column>
              <el-table-column prop="actualPrice" label="实际单价" width="80">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.actualPrice" readonly>
                  </el-input>
                </template>
              </el-table-column>
              <el-table-column prop="actualAmount" label="实际金额" width="80">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.actualAmount" readonly></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="description" label="备注" width="80">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.description"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="50" v-if="!setting.readonly">
                <template slot-scope="scope">
                  <el-button size="mini" type="text" class="JNPF-table-delBtn"
                    @click="handleDel(scope.$index,scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="table-actions" @click="choice" v-if="!setting.readonly">
              <el-button type="text" icon="el-icon-plus">新增商品</el-button>
            </div>
          </el-tab-pane>
          <el-tab-pane label="收款计划" name="plan">
            <el-table :data="dataForm.collectionPlanList" size='mini' show-summary
              :summary-method="getSummaries">
              <el-table-column type="index" width="50" label="序号" align="center" />
              <el-table-column prop="receivableDate" label="收款日期">
                <template slot-scope="scope">
                  <el-date-picker v-model="scope.row.receivableDate" type="date"
                    value-format="timestamp" :editable="false">
                  </el-date-picker>
                </template>
              </el-table-column>
              <el-table-column prop="receivableRate" label="收款比率%">
                <template slot-scope="scope">
                  <el-input-number v-model="scope.row.receivableRate" :precision="2" :step="0.1"
                    :min="0" :max="100" controls-position="right">
                  </el-input-number>
                </template>
              </el-table-column>
              <el-table-column prop="receivableMoney" label="收款金额">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.receivableMoney"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="receivableMode" label="收款方式">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.receivableMode"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="abstract" label="收款摘要">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.abstract"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="50" v-if="!setting.readonly">
                <template slot-scope="scope">
                  <el-button size="mini" type="text" class="JNPF-table-delBtn"
                    @click="handleDelPlan(scope.$index,scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="table-actions" @click="addPlan" v-if="!setting.readonly">
              <el-button type="text" icon="el-icon-plus">新增计划</el-button>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <GoodsBox v-if="goodsBoxVisible" ref="goodsBox" @refreshDataList="initList" />
    <UserBox v-if="userBoxVisible" ref="userBox" @submit="submit" />
  </div>
</template>

<script>
import comMinix from '../minix'
import { CustomerList } from '@/api/extend/order'
import GoodsBox from '@/views/extend/order/GoodsBox'
export default {
  mixins: [comMinix],
  components: { GoodsBox },
  data() {
    return {
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
        goodsList: [],
        collectionPlanList: [],
        fileJson: ''
      },
      dataRule: {
        customerName: [
          { required: true, message: '客户名称不能为空', trigger: 'click' },
        ],
        salesmanId: [
          { required: true, message: '业务人员不能为空', trigger: 'blur' }
        ],
        orderDate: [
          { required: true, message: '订单日期不能为空', trigger: 'change' }
        ],
        paymentMode: [
          { required: true, message: '付款方式不能为空', trigger: 'change' }
        ],
      },
      options: ['现金', '转帐', '汇票'],
      transportOptions: ['快递', '物流', '配送', '自提'],
      treeData: [],
      goodsBoxVisible: false
    }
  },
  watch: {
    'dataForm.goodsList': {
      handler(newVal, oldVal) {
        let menoy = 0
        for (let i = 0; i < newVal.length; i++) {
          const e = newVal[i];
          menoy += parseFloat(e.amount)
        }
        this.dataForm.receivableMoney = menoy
      },
      deep: true
    }
  },
  created() {
    this.initData()
  },
  methods: {
    initData() {
      this.$store.dispatch('base/getUserTree').then(res => {
        this.treeData = res
      })
    },
    getValue(value, node) {
      this.dataForm.salesmanName = node.fullName
    },
    querySearchAsync(queryString, cb) {
      CustomerList(queryString).then(res => {
        cb(res.data.list)
      })
    },
    handleSelect(item) {
      this.dataForm.customerName = item.text
      this.dataForm.customerId = item.id
    },
    handleDel(index, row) {
      this.dataForm.goodsList.splice(index, 1);
    },
    handleDelPlan(index, row) {
      this.dataForm.collectionPlanList.splice(index, 1);
    },
    choice() {
      this.goodsBoxVisible = true
      this.$nextTick(() => {
        this.$refs.goodsBox.init()
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
          }, 0).toFixed(2);
        } else {
          sums[index] = '';
        }
      });
      return sums
    },
    exist() {
      let isOk = true;
      //  遍历数组，判断非空
      for (let i = 0; i < this.dataForm.goodsList.length; i++) {
        const e = this.dataForm.goodsList[i];
        if (!e.qty) {
          this.$message({
            showClose: true,
            message: '数量不能为空',
            type: 'error',
            duration: 1000
          });
          isOk = false
          break
        }
        if (e.discount === '') {
          this.$message({
            showClose: true,
            message: '折扣不能为空',
            type: 'error',
            duration: 1000
          });
          isOk = false
          break
        }
        if (e.cess === '') {
          this.$message({
            showClose: true,
            message: '税率不能为空',
            type: 'error',
            duration: 1000
          });
          isOk = false
          break
        }
      }
      if (isOk) {
        for (let i = 0; i < this.dataForm.collectionPlanList.length; i++) {
          const e = this.dataForm.collectionPlanList[i];
          if (!e.receivableRate) {
            this.$message({
              showClose: true,
              message: '收款比率不能为空',
              type: 'error',
              duration: 1000
            });
            isOk = false
            break
          }
          if (!e.receivableMoney) {
            this.$message({
              showClose: true,
              message: '收款金额不能为空',
              type: 'error',
              duration: 1000
            });
            isOk = false
            break
          }
          if (!e.receivableMode) {
            this.$message({
              showClose: true,
              message: '收款方式不能为空',
              type: 'error',
              duration: 1000
            });
            isOk = false
            break
          }
        }
      }
      return isOk;
    },
    addPlan() {
      let item = {
        receivableDate: "", receivableRate: 0, receivableMoney: 0, receivableMode: "", abstract: ""
      }
      this.dataForm.collectionPlanList.push(item)
    },
    initList(list) {
      for (let i = 0; i < list.length; i++) {
        const e = list[i];
        let item = {
          goodsId: e.id,
          goodsCode: e.code,
          goodsName: e.text,
          specifications: e.specifications,
          unit: e.unit,
          qty: 1,
          price: e.price,
          amount: e.price,
          discount: 100,
          cess: 0,
          actualPrice: e.price,
          actualAmount: e.price,
          description: ''
        }
        this.dataForm.goodsList.push(item)
      }
    },
    count(row) {
      //金额 = 数量*单价
      row.amount = this.jnpf.toDecimal(parseFloat(row.price) * parseFloat(row.qty))
      //折扣价 = (单价*折扣)
      var discountPrice = row.price * (row.discount / 100);
      //实际单价 = 折扣价 * (1 + (税率 / 100))
      row.actualPrice = this.jnpf.toDecimal(discountPrice * (1 + (row.cess / 100)));
      //实际金额
      row.actualAmount = this.jnpf.toDecimal(parseFloat(row.actualPrice) * parseFloat(row.qty))
    }
  }
}
</script>
<style lang="scss" scoped>
>>> .el-select,
>>> .el-autocomplete,
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
.main {
  flex: 1;
  overflow: auto;
  overflow-x: hidden;
}
</style>