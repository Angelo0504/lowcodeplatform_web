<template>
  <div class="CommonForm-container app-container nohead">
    <div class="dataForm">
      <el-alert title="查询选择、客户选择、商品选择器" type="warning" :closable="false" />
      <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="110px" class="mt-10">
        <el-form-item label="客户名称">
          <el-select v-model="dataForm.CustomerCode" filterable placeholder="请选择"
            @change="handleChange">
            <el-option v-for="item in options" :key="item.code" :label="item.text"
              :value="item.code">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="客户编码" class="mt-10">
          <el-input v-model="dataForm.CustomerCode" placeholder="" readonly />
        </el-form-item>
        <el-form-item label="多选框">
          <el-input v-model="dataForm.Goods" placeholder="选择商品" readonly>
            <template slot="append">
              <el-button slot="append" @click="choice">选择</el-button>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="商品编码">
          <el-input v-model="dataForm.GoodsCode" placeholder="" readonly />
        </el-form-item>
        <el-form-item label="规格型号">
          <el-input v-model="dataForm.Specifications" placeholder="" readonly />
        </el-form-item>
        <el-form-item label="单位">
          <el-input v-model="dataForm.Unit" placeholder="" readonly />
        </el-form-item>
        <el-form-item label="单价">
          <el-input v-model="dataForm.Price" placeholder="" readonly />
        </el-form-item>
      </el-form>
    </div>
    <Form v-if="formVisible" ref="form" @refreshDataList="initData" />
  </div>
</template>

<script>
import { CustomerList, GoodsList } from '@/api/extend/order'
import Form from '@/views/extend/order/GoodsBox'
export default {
  name: 'extend-formDemo-fieldForm5',
  components: { Form },
  data() {
    return {
      dataForm: {
        CustomerName: '',
        CustomerCode: '',
        Goods: '',
        GoodsCode: '',
        Specifications: '',
        Unit: '',
        Price: '',
      },
      dataRule: {},
      options: [],
      formVisible: false,
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      CustomerList().then(res => {
        this.options = res.data.list
      })
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
    handleChange(val) { },
    choice() {
      this.formVisible = true
      this.$nextTick(() => {
        this.$refs.form.init()
      })
    },
    initData(list) {
      let GoodsList = [], GoodsCodeList = [], SpecificationsList = [], UnitList = [], Price = []
      for (let i = 0; i < list.length; i++) {
        const e = list[i];
        GoodsList.push(e.text)
        GoodsCodeList.push(e.code)
        SpecificationsList.push(e.specifications)
        UnitList.push(e.unit)
        Price.push(e.price)
      }
      this.dataForm.Goods = GoodsList.join(',')
      this.dataForm.GoodsCode = GoodsCodeList.join(',')
      this.dataForm.Specifications = SpecificationsList.join(',')
      this.dataForm.Unit = UnitList.join(',')
      this.dataForm.Price = Price.join(',')
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