<template>
  <div class="JNPF-common-layout">
    <div class="JNPF-common-layout-center">
      <el-row class="JNPF-common-search-box" :gutter="16">
        <el-form @submit.native.prevent>
          <el-col :span="6">
            <el-form-item label="关键词">
              <el-input v-model="keyword" placeholder="请输入关键词查询" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" @click="search()">
                {{$t('common.search')}}</el-button>
              <el-button icon="el-icon-refresh-right" @click="refresh()">{{$t('common.reset')}}
              </el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <div class="JNPF-common-layout-main  JNPF-flex-main">
        <div class="JNPF-common-head">
          <div></div>
          <div class="JNPF-common-head-right">
            <el-tooltip effect="dark" :content="$t('common.refresh')" placement="top">
              <el-link icon="icon-ym icon-ym-Refresh JNPF-common-head-icon" :underline="false"
                @click="refresh()" />
            </el-tooltip>
            <screenfull />
          </div>
        </div>
        <JNPF-table v-loading="listLoading" :data="list" :span-method="arraySpanMethod" border>
          <el-table-column prop="projectName" label="项目名称" sortable width="200" />
          <el-table-column prop="projectCode" label="项目编码" sortable width="160" />
          <el-table-column label="项目类型" sortable width="100" prop="projectType">
            <template slot-scope="scope">
              {{ scope.row.projectType | getTypeText(industryTypeList) }}
            </template>
          </el-table-column>
          <el-table-column prop="projectPhase" label="项目阶段" sortable width="120" />
          <el-table-column prop="customerName" label="客户名称" sortable width="200" />
          <el-table-column prop="principal" label="负责人" sortable width="100" />
          <el-table-column prop="jackStands" label="立项人" sortable width="100" />
          <el-table-column label="交互时间" sortable width="100" prop="interactionDate">
            <template slot-scope="scope">
              {{ scope.row.interactionDate | toDate("yyyy-MM-dd") }}
            </template>
          </el-table-column>
          <el-table-column prop="costAmount" label="费用金额" sortable width="100" />
          <el-table-column prop="tunesAmount" label="已用金额" sortable width="100" />
          <el-table-column prop="projectedIncome" label="预计收入" sortable width="100" />
          <el-table-column prop="registrant" label="登记人" sortable width="100"
            show-overflow-tooltip />
          <el-table-column label="登记时间" sortable width="120" prop="registerDate">
            <template slot-scope="scope">
              {{ scope.row.registerDate | toDate() }}
            </template>
          </el-table-column>
          <el-table-column prop="description" label="备注" sortable width="300" />
        </JNPF-table>
        <pagination :total="total" :page.sync="listQuery.currentPage"
          :limit.sync="listQuery.pageSize" @pagination="initData" />
      </div>
    </div>
  </div>
</template>

<script>
import { TableExampleList, TableExampleDelete } from '@/api/extend/tableExample'
export default {
  name: 'extend-tableDemo-mergeTable',
  data() {
    return {
      keyword: '',
      list: [],
      total: 0,
      listLoading: true,
      listQuery: {
        currentPage: 1,
        pageSize: 20,
        sort: 'desc'
      },
      formVisible: false,
      industryTypeList: []
    }
  },
  created() {
    this.getDictionaryData()
  },
  filters: {
    getTypeText(id, industryTypeList) {
      let item = industryTypeList.filter(o => o.id == id)[0]
      return item && item.fullName ? item.fullName : ''
    }
  },
  methods: {
    getDictionaryData() {
      this.$store.dispatch('base/getDictionaryData', { sort: 'IndustryType' }).then((res) => {
        this.industryTypeList = res
        this.initData()
      })
    },
    refresh() {
      this.keyword = ''
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
    initData() {
      this.listLoading = true
      let query = {
        ...this.listQuery,
        keyword: this.keyword
      }
      TableExampleList(query).then(res => {
        this.list = res.data.list
        this.total = res.data.pagination.total
        this.listLoading = false
      })
    },
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 4 || columnIndex === 6) {
        const cellValue = row[column.property]
        const prevRow = this.list[rowIndex - 1]
        let nextRow = this.list[rowIndex + 1]
        if (prevRow && prevRow[column.property] === cellValue) {
          return { rowspan: 0, colspan: 0 }
        } else {
          let countRowspan = 1
          while (nextRow && nextRow[column.property] === cellValue) {
            nextRow = this.list[++countRowspan + rowIndex]
          }
          if (countRowspan > 1) {
            return { rowspan: countRowspan, colspan: 1 }
          }
        }
      }
    },
  }
}
</script>