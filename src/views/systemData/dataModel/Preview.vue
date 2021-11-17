<template>
  <transition name="el-zoom-in-center">
    <div class="JNPF-preview-main">
      <div class="JNPF-common-page-header">
        <el-page-header @back="goBack" :content="table+'表的数据'" />
        <div class="options">
          <el-button @click="goBack()">{{$t('common.cancelButton')}}</el-button>
        </div>
      </div>
      <el-row class="JNPF-common-search-box" :gutter="16">
        <el-form @submit.native.prevent>
          <el-col :span="6">
            <el-form-item label="字段">
              <el-select v-model="queryJson.field" placeholder="请选择字段">
                <el-option v-for="item in options" :key="item.field" :label="item.field"
                  :value="item.field">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="关键词">
              <el-input v-model="queryJson.keyword" placeholder="请输入关键词查询" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" @click="search()">
                {{$t('common.search')}}</el-button>
              <el-button icon="el-icon-refresh-right" @click="reset()">{{$t('common.reset')}}
              </el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <JNPF-table v-loading="listLoading" :data="list">
        <el-table-column :prop="item.field.toLowerCase()" :label="item.field" show-overflow-tooltip
          v-for="item in options" :key="item.field" />
      </JNPF-table>
      <pagination :total="total" :page.sync="listQuery.currentPage" :limit.sync="listQuery.pageSize"
        @pagination="initData" />
    </div>
  </transition>
</template>

<script>
import { DataModelData, DataModelFieldList } from '@/api/systemData/dataModel'
export default {
  data() {
    return {
      visible: false,
      options: [],
      queryJson: {
        field: '',
        keyword: ""
      },
      total: 0,
      listLoading: true,
      listQuery: {
        currentPage: 1,
        pageSize: 20,
        sort: 'desc'
      },
      dataBase: '',
      table: '',
      list: []
    }
  },
  methods: {
    goBack() {
      this.$emit('close')
    },
    reset() {
      this.queryJson.keyword = ''
      this.search()
    },
    search() {
      this.listQuery = {
        currentPage: 1,
        pageSize: 20,
        sort: 'desc'
      }
      this.initData()
    },
    init(dataBase, table) {
      if (!dataBase || !table) {
        this.$emit('close')
        return
      }
      this.dataBase = dataBase
      this.table = table
      this.$nextTick(() => {
        DataModelFieldList(dataBase, table).then(res => {
          this.options = res.data.list
          this.queryJson.field = this.options[0].field
          this.initData()
        })
      })
    },
    initData() {
      let query = {
        ...this.listQuery,
        ...this.queryJson
      }
      this.listLoading = true
      this.list = []
      DataModelData(this.dataBase, this.table, query).then(res => {
        this.list = res.data.list
        this.total = res.data.pagination.total
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.JNPF-preview-main {
  padding-bottom: 10px;
}
</style>