<template>
  <div class="CommonForm-container app-container nohead">
    <div class="dataForm">
      <el-alert title="查询选择、客户选择、商品选择器" type="warning" :closable="false" />
      <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="110px" class="mt-10">
        <el-form-item label="用户邮箱">
          <el-col class="mb-10">
            <el-select v-model="emailItem.email" filterable placeholder="选择邮箱"
              @change="handleChange">
              <el-option v-for="item in options" :key="item.enCode" :label="item.fullName"
                :value="item.enCode">
              </el-option>
            </el-select>
            <el-input v-model="emailItem.emailText" placeholder="" />
            <el-button type="primary" icon="el-icon-plus" @click="add"></el-button>
          </el-col>
          <el-col v-for="(item,i) in emailList" :key="i" class="mb-10">
            <el-select v-model="item.email" filterable placeholder="选择邮箱" @change="handleChange">
              <el-option v-for="item in options" :key="item.enCode" :label="item.fullName"
                :value="item.enCode">
              </el-option>
            </el-select>
            <el-input v-model="item.emailText" placeholder="" />
            <el-button type="danger" icon="el-icon-close" @click="del(i)"></el-button>
          </el-col>
        </el-form-item>
        <el-form-item label="产品评价">
          <el-rate v-model="rate" show-text>
          </el-rate>
        </el-form-item>
        <el-form-item label="主题颜色">
          <el-color-picker v-model="color"></el-color-picker>
        </el-form-item>
        <el-form-item label="进度条">
          <el-slider v-model="range" style="width:300px"></el-slider>
        </el-form-item>
        <el-form-item label="选择商品">
          <el-input v-model="dataForm.Goods" placeholder="选择商品" readonly>
            <template slot="append">
              <el-button slot="append" @click="choice">选择</el-button>
            </template>
          </el-input>
        </el-form-item>
      </el-form>
      <div class="JNPF-common-title">
        <h2>订单详细</h2>
      </div>
      <el-table :data="list" height="400">
        <el-table-column type="index" width="50" label="序号" align="center" />
        <el-table-column prop="text" label="商品名称" width="200" />
        <el-table-column prop="code" label="商品编码" />
        <el-table-column prop="specifications" label="规格型号" />
        <el-table-column prop="unit" label="单位" />
        <el-table-column prop="price" label="售价" />
      </el-table>
    </div>
    <Form v-if="formVisible" ref="form" @refreshDataList="initData" />
  </div>
</template>

<script>
import { GoodsList } from '@/api/extend/order'
import Form from '@/views/extend/order/GoodsBox'
export default {
  name: 'extend-formDemo-fieldForm6',
  components: { Form },
  data() {
    return {
      dataForm: {},
      dataRule: {},
      options: [],
      formVisible: false,
      list: [],
      emailItem: {
        email: '',
        emailText: '',
      },
      emailList: [],
      rate: null,
      color: null,
      range: 50
    }
  },
  created() {
    this.getDictionaryData()
  },
  methods: {
    add() {
      let emailItem = { email: '', emailText: '' }
      this.emailList.push(emailItem)
    },
    del(i) {
      this.emailList.splice(i, 1)
    },
    getDictionaryData() {
      this.$store.dispatch('base/getDictionaryData', { sort: 'Email' }).then((res) => {
        this.options = res
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
      this.list = [...this.list, ...list]
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