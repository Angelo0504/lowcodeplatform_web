<template>
  <div class="JNPF-common-layout">
    <div class="JNPF-common-layout-center">
      <el-row class="JNPF-common-search-box" :gutter="16">
        <el-form @submit.native.prevent>
          <el-col :span="6">
            <el-form-item label="查询字段">
              <el-select v-model="listQuery.condition" placeholder="请选择">
                <el-option v-for="item in options" :key="item.value" :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="关键词">
              <el-input v-model="listQuery.keyword" placeholder="请输入关键词查询" clearable />
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
      <div class="JNPF-common-layout-main JNPF-flex-main">
        <div class="JNPF-common-head">
          <div>
            <el-button type="primary" icon="el-icon-download" @click="exportForm">导出</el-button>
            <el-button type="text" icon="el-icon-upload2" @click="uploadForm">导入</el-button>
          </div>
          <div class="JNPF-common-head-right">
            <el-tooltip effect="dark" :content="$t('common.refresh')" placement="top">
              <el-link icon="icon-ym icon-ym-Refresh JNPF-common-head-icon" :underline="false"
                @click="reset()" />
            </el-tooltip>
            <screenfull />
          </div>
        </div>
        <JNPF-table v-loading="listLoading" :data="list" :hasNO="false">
          <el-table-column type="index" width="50" label="序号" fixed="left" align="center" />
          <el-table-column prop="enCode" label="工号" width="100" sortable fixed="left" />
          <el-table-column prop="fullName" label="姓名" width="100" sortable fixed="left" />
          <el-table-column prop="gender" label="性别" width="80" sortable fixed="left" />
          <el-table-column prop="departmentName" label="部门" width="120" sortable />
          <el-table-column prop="positionName" label="岗位" width="120" sortable />
          <el-table-column prop="workingNature" label="用工性质" width="100" sortable />
          <el-table-column prop="idNumber" label="身份证号" width="150" sortable />
          <el-table-column prop="telephone" label="联系电话" width="100" sortable />
          <el-table-column label="出生年月" sortable width="100">
            <template slot-scope="scope">
              {{ scope.row.birthday | toDate('yyyy-MM-dd') }}
            </template>
          </el-table-column>
          <el-table-column label="参加工作" sortable width="100">
            <template slot-scope="scope">
              {{ scope.row.attendWorkTime | toDate('yyyy-MM-dd') }}
            </template>
          </el-table-column>
          <el-table-column prop="education" label="最高学历" width="100" sortable />
          <el-table-column prop="major" label="所学专业" width="120" sortable />
          <el-table-column prop="graduationAcademy" label="毕业院校" width="150" sortable />
          <el-table-column label="毕业时间" sortable width="100">
            <template slot-scope="scope">
              {{ scope.row.graduationTime | toDate('yyyy-MM-dd') }}
            </template>
          </el-table-column>
          <el-table-column label="创建时间" sortable width="150">
            <template slot-scope="scope">
              {{ scope.row.creatorTime | toDate() }}
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right" width="50">
            <template slot-scope="scope">
              <el-button size="mini" type="text" class="JNPF-table-delBtn"
                @click="handleDel(scope.row.id,scope.$index)">删除</el-button>
            </template>
          </el-table-column>
        </JNPF-table>
        <pagination :total="total" :page.sync="listQuery.currentPage"
          :limit.sync="listQuery.pageSize" @pagination="initData" />
      </div>
    </div>
    <ExportForm v-if="exportFormVisible" ref="exportForm" />
    <ImportForm v-if="importFormVisible" ref="importForm" @refresh="reset()" />
  </div>
</template>

<script>
import { EmployeeList, EmployeeDelete } from '@/api/extend/employee'
import ImportForm from './ImportForm'
import ExportForm from './ExportForm'
export default {
  name: 'extend-importAndExport',
  components: { ExportForm, ImportForm },
  data() {
    return {
      list: [],
      total: 0,
      listLoading: true,
      listQuery: {
        keyword: '',
        condition: 'EnCode',
        currentPage: 1,
        pageSize: 20,
        sort: 'desc'
      },
      options: [{ value: 'EnCode', label: '工号' },
      { value: 'FullName', label: '姓名' },
      { value: 'Telephone', label: '电话' },
      { value: 'DepartmentName', label: '部门' },
      { value: 'PositionName', label: '岗位' }],
      importFormVisible: false,
      exportFormVisible: false
    }
  },
  created() {
    this.initData()
  },
  methods: {
    reset() {
      this.listQuery.keyword = ''
      this.listQuery.condition = 'EnCode'
      this.search()
    },
    search() {
      this.listQuery = {
        ...this.listQuery,
        currentPage: 1,
        pageSize: 20,
        sort: 'desc'
      }
      this.initData()
    },
    initData() {
      this.listLoading = true
      EmployeeList(this.listQuery).then(res => {
        this.list = res.data.list
        this.total = res.data.pagination.total
        this.listLoading = false
      })
    },
    handleDel(id, index) {
      this.$confirm(this.$t('common.delTip'), this.$t('common.tipTitle'), {
        type: 'warning'
      }).then(() => {
        EmployeeDelete(id).then(res => {
          this.list.splice(index, 1)
          this.$message({
            type: 'success',
            message: res.msg
          })
        })
      }).catch(() => { })
    },
    exportForm() {
      this.exportFormVisible = true
      this.$nextTick(() => {
        this.$refs.exportForm.init(this.listQuery)
      })
    },
    uploadForm() {
      this.importFormVisible = true
      this.$nextTick(() => {
        this.$refs.importForm.init()
      })
    }
  }
}
</script>