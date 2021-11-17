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
          <el-button type="primary" icon="el-icon-plus" @click="addOrUpdateHandle()">新建项目
          </el-button>
          <div class="JNPF-common-head-right">
            <el-tooltip effect="dark" :content="$t('common.refresh')" placement="top">
              <el-link icon="icon-ym icon-ym-Refresh JNPF-common-head-icon" :underline="false"
                @click="refresh()" />
            </el-tooltip>
            <screenfull />
          </div>
        </div>
        <JNPF-table v-loading="listLoading" :data="list" @cell-click="tabClick">
          <el-table-column label="项目名称" width="200">
            <template slot-scope="scope">
              <el-input v-model="scope.row.projectName" v-if="tabClickId==scope.row.id"></el-input>
              <span v-else>{{scope.row.projectName}}</span>
            </template>
          </el-table-column>
          <el-table-column label="项目编码" width="160">
            <template slot-scope="scope">
              <el-input v-model="scope.row.projectCode" v-if="tabClickId==scope.row.id"></el-input>
              <span v-else>{{scope.row.projectCode}}</span>
            </template>
          </el-table-column>
          <el-table-column label="项目类型" width="180">
            <template slot-scope="scope">
              <el-select v-model="scope.row.projectType" v-if="tabClickId==scope.row.id">
                <el-option v-for="item in industryTypeList" :key="item.id" :label="item.fullName"
                  :value="item.id">
                </el-option>
              </el-select>
              <span v-else>{{scope.row.projectType | getTypeText(industryTypeList)}}</span>
            </template>
          </el-table-column>
          <el-table-column label="项目阶段" width="120">
            <template slot-scope="scope">
              <el-input v-model="scope.row.projectPhase" v-if="tabClickId==scope.row.id"></el-input>
              <span v-else>{{scope.row.projectPhase}}</span>
            </template>
          </el-table-column>
          <el-table-column label="客户名称" width="200">
            <template slot-scope="scope">
              <el-input v-model="scope.row.customerName" v-if="tabClickId==scope.row.id"></el-input>
              <span v-else>{{scope.row.customerName}}</span>
            </template>
          </el-table-column>
          <el-table-column label="负责人" width="100">
            <template slot-scope="scope">
              <el-input v-model="scope.row.principal" v-if="tabClickId==scope.row.id"></el-input>
              <span v-else>{{scope.row.principal}}</span>
            </template>
          </el-table-column>
          <el-table-column label="立项人" width="100">
            <template slot-scope="scope">
              <el-input v-model="scope.row.jackStands" v-if="tabClickId==scope.row.id"></el-input>
              <span v-else>{{scope.row.jackStands}}</span>
            </template>
          </el-table-column>
          <el-table-column label="交互时间" width="230">
            <template slot-scope="scope">
              <el-date-picker v-model="scope.row.registerDate" type="date" :editable="false"
                :clearable="false" value-format="timestamp" format="yyyy-MM-dd"
                v-if="tabClickId==scope.row.id" />
              <span v-else>{{scope.row.interactionDate | toDate("yyyy-MM-dd")}}</span>
            </template>
          </el-table-column>
          <el-table-column label="费用金额" width="100">
            <template slot-scope="scope">
              <el-input v-model="scope.row.costAmount" v-if="tabClickId==scope.row.id"></el-input>
              <span v-else>{{scope.row.costAmount}}</span>
            </template>
          </el-table-column>
          <el-table-column label="已用金额" width="100">
            <template slot-scope="scope">
              <el-input v-model="scope.row.tunesAmount" v-if="tabClickId==scope.row.id"></el-input>
              <span v-else>{{scope.row.tunesAmount}}</span>
            </template>
          </el-table-column>
          <el-table-column label="预计收入" width="100">
            <template slot-scope="scope">
              <el-input v-model="scope.row.projectedIncome" v-if="tabClickId==scope.row.id">
              </el-input>
              <span v-else>{{scope.row.projectedIncome}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="registrant" label="登记人" width="80" show-overflow-tooltip />
          <el-table-column label="登记时间" width="120">
            <template slot-scope="scope">
              {{ scope.row.registerDate | toDate() }}
            </template>
          </el-table-column>
          <el-table-column label="备注" width="300">
            <template slot-scope="scope">
              <el-input v-model="scope.row.description" v-if="tabClickId==scope.row.id"></el-input>
              <span v-else>{{scope.row.description}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope" v-if="tabClickId==scope.row.id">
              <el-button size="mini" type="text" @click="save(scope.row)">保存</el-button>
              <el-button size="mini" type="text" class="JNPF-table-delBtn"
                @click="handleDel(scope.$index,scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </JNPF-table>
        <pagination :total="total" :page.sync="listQuery.currentPage"
          :limit.sync="listQuery.pageSize" @pagination="initData" />
        <JNPF-Form v-if="formVisible" ref="JNPFForm" @refreshDataList="initData" />
      </div>
    </div>
  </div>
</template>

<script>
import { TableExampleList, TableExampleDelete, RowsEdit } from '@/api/extend/tableExample'
import JNPFForm from '../commonForm'
export default {
  name: 'extend-tableDemo-redactTable',
  components: {
    JNPFForm
  },
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
      industryTypeList: [],
      tabClickId: "",

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
    handleDel(index, id) {
      this.$confirm(this.$t('common.delTip'), this.$t('common.tipTitle'), {
        type: 'warning'
      }).then(() => {
        TableExampleDelete(id).then(res => {
          this.list.splice(index, 1);
          this.$message({
            type: 'success',
            message: res.msg
          });
        })
      }).catch(() => { });
    },
    // 新增 / 修改
    addOrUpdateHandle(id) {
      this.formVisible = true
      this.$nextTick(() => {
        this.$refs.JNPFForm.init(this.industryTypeList, id)
      })
    },
    tabClick(row, column, cell, event) {
      this.tabClickId = row.id
    },
    save(row) {
      RowsEdit(row).then(res => {
        this.$message({
          type: 'success',
          message: res.msg
        });
        this.tabClickId = null
      })
    }
  }
}
</script>