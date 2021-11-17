<template>
  <div class="flow-form" v-loading="loading">
    <div class="com-title">
      <h1>入库申请单</h1>
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
        <el-col :span="12" v-if="JudgeShow('supplierName')">
          <el-form-item label="供应商名称" prop="supplierName">
            <el-input v-model="dataForm.supplierName" placeholder="供应商名称"
              :disabled="JudgeWrite('supplierName')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('contactPhone')">
          <el-form-item label="联系电话" prop="contactPhone">
            <el-input v-model="dataForm.contactPhone" placeholder="联系电话"
              :disabled="JudgeWrite('contactPhone')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('warehousCategory')">
          <el-form-item label="入库类别" prop="warehousCategory">
            <el-input v-model="dataForm.warehousCategory" placeholder="入库类别"
              :disabled="JudgeWrite('warehousCategory')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('warehouse')">
          <el-form-item label="仓库" prop="warehouse">
            <el-input v-model="dataForm.warehouse" placeholder="仓库"
              :disabled="JudgeWrite('warehouse')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('warehousesPeople')">
          <el-form-item label="入库人" prop="warehousesPeople">
            <el-input v-model="dataForm.warehousesPeople" placeholder="入库人"
              :disabled="JudgeWrite('warehousesPeople')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('deliveryNo')">
          <el-form-item label="送货单号" prop="deliveryNo">
            <el-input v-model="dataForm.deliveryNo" placeholder="送货单号"
              :disabled="JudgeWrite('deliveryNo')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('warehouseNo')">
          <el-form-item label="入库单号" prop="warehouseNo">
            <el-input v-model="dataForm.warehouseNo" placeholder="入库单号"
              :disabled="JudgeWrite('warehouseNo')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('warehousDate')">
          <el-form-item label="入库日期" prop="warehousDate">
            <el-date-picker v-model="dataForm.warehousDate" type="datetime" placeholder="选择日期"
              value-format="timestamp" format="yyyy-MM-dd HH:mm" :editable='false'
              :disabled="JudgeWrite('warehousDate')">
            </el-date-picker>
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
    <div class="JNPF-common-title">
      <h2>入库明细</h2>
    </div>
    <el-table :data="dataForm.entryList" size='mini'>
      <el-table-column type="index" width="50" label="序号" align="center" />
      <el-table-column prop="goodsName" label="商品名称">
        <template slot-scope="scope">
          <el-input v-model="scope.row.goodsName"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="specifications" label="规格型号">
        <template slot-scope="scope">
          <el-input v-model="scope.row.specifications"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="unit" label="单位">
        <template slot-scope="scope">
          <el-input v-model="scope.row.unit"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="qty" label="数量">
        <template slot-scope="scope">
          <el-input v-model="scope.row.qty" @change="count(scope.row)" type="number"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="price" label="单价">
        <template slot-scope="scope">
          <el-input v-model="scope.row.price" @change="count(scope.row)" type="number"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="amount" label="金额">
        <template slot-scope="scope">
          <el-input v-model="scope.row.amount" readonly></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="description" label="备注">
        <template slot-scope="scope">
          <el-input v-model="scope.row.description"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="50" v-if="!setting.readonly">
        <template slot-scope="scope">
          <el-button size="mini" type="text" class="JNPF-table-delBtn"
            @click="handleDel(scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="table-actions" @click="addHandle()" v-if="!setting.readonly">
      <el-button type="text" icon="el-icon-plus" :disabled="setting.readonly">新增</el-button>
    </div>
    <UserBox v-if="userBoxVisible" ref="userBox" @submit="submit" />
  </div>
</template>

<script>
import comMinix from '../minix';
export default {
  mixins: [comMinix],
  name: 'WarehouseReceipt',
  data() {
    return {
      activeTab: '',
      dataForm: {
        flowId: '',
        id: '',
        billNo: '',
        flowTitle: '',
        flowUrgent: 1,
        supplierName: '',
        warehouse: '',
        warehousesPeople: '',
        deliveryNo: '',
        warehouseNo: '',
        warehousDate: '',
        description: '',
        contactPhone: '',
        warehousCategory: '',
        entryList: []
      },
      dataRule: {
        flowTitle: [
          { required: true, message: '流程标题不能为空', trigger: 'blur' },
        ],
        flowUrgent: [
          { required: true, message: '紧急程度不能为空', trigger: 'change' },
        ],
        contactPhone: [
          { required: true, message: '联系电话不能为空', trigger: 'blur' },
        ],
        warehousDate: [
          { required: true, message: '入库日期不能为空', trigger: 'change' },
        ]
      },
      paymentMethodOptions: []
    }
  },
  methods: {
    selfInit(data) {
      this.dataForm.flowTitle = this.userInfo.userName + "的入库申请单"
    },
    beforeInit() { this.getPaymentMethodOptions() },
    addHandle() {
      let item = {
        goodsName: "", specifications: "", unit: "", qty: 0, price: 0, amount: 0, description: ""
      }
      this.dataForm.entryList.push(item)
    },
    count(row) {
      //金额 = 数量*单价
      row.amount = this.jnpf.toDecimal(parseFloat(row.price) * parseFloat(row.qty))
    },
    handleDel(index) {
      this.dataForm.entryList.splice(index, 1);
    }
  }
}
</script>