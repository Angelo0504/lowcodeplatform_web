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
              <el-button type="primary" icon="el-icon-search" @click="initData()">
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
        <JNPF-table v-loading="listLoading" :data="list" row-key="id"
          :tree-props="{children: 'children', hasChildren: 'expanded'}" default-expand-all>
          <el-table-column prop="projectName" label="项目名称" width="200">
            <template slot-scope="scope">
              <span v-if="scope.row.fullName"
                style="font-weight:bold;">{{scope.row.fullName}}【{{scope.row.children.length}}】</span>
              <span v-else>{{scope.row.projectName}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="projectCode" label="项目编码" width="160" />
          <el-table-column label="项目类型" width="100">
            <template slot-scope="scope">
              {{ scope.row.projectType | getTypeText(industryTypeList) }}
            </template>
          </el-table-column>
          <el-table-column prop="projectPhase" label="项目阶段" width="120" />
          <el-table-column prop="customerName" label="客户名称" width="200" />
          <el-table-column prop="principal" label="负责人" width="80" />
          <el-table-column prop="jackStands" label="立项人" width="80" />
          <el-table-column label="交互时间" width="100">
            <template slot-scope="scope">
              {{ scope.row.interactionDate | toDate("yyyy-MM-dd") }}
            </template>
          </el-table-column>
          <el-table-column prop="costAmount" label="费用金额" width="100" />
          <el-table-column prop="tunesAmount" label="已用金额" width="100" />
          <el-table-column prop="projectedIncome" label="预计收入" width="100" />
          <el-table-column prop="registrant" label="登记人" width="80" show-overflow-tooltip />
          <el-table-column label="登记时间" width="120">
            <template slot-scope="scope">
              {{ scope.row.registerDate | toDate() }}
            </template>
          </el-table-column>
          <el-table-column prop="description" label="备注" width="300" />
          <el-table-column label="操作" fixed="right" width="100">
            <template slot-scope="scope" v-if="!scope.row.fullName">
              <el-button size="mini" type="text" @click="addOrUpdateHandle(scope.row.id)">编辑
              </el-button>
              <el-button size="mini" type="text" class="JNPF-table-delBtn"
                @click="handleDel(scope.$index,scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </JNPF-table>
        <JNPF-Form v-if="formVisible" ref="JNPFForm" @refreshDataList="initData" />
      </div>
    </div>
  </div>
</template>

<script>
import { TableExampleListAll, TableExampleDelete } from '@/api/extend/tableExample'
import JNPFForm from '../commonForm'
export default {
  name: 'extend-tableDemo-groupingTable',
  components: {
    JNPFForm
  },
  data() {
    return {
      keyword: '',
      list: [],
      listLoading: true,
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
      this.initData()
    },
    initData() {
      this.listLoading = true
      TableExampleListAll({ keyword: this.keyword }).then(res => {
        this.list = JSON.parse(JSON.stringify(this.industryTypeList))
        for (let i = 0; i < this.list.length; i++) {
          let e = this.list[i];
          e.children = []
          e.id = e.id
          for (let j = 0; j < res.data.list.length; j++) {
            if (e.id == res.data.list[j].projectType) {
              e.children.push(res.data.list[j])
            }
          }
        }
        this.list = this.list.filter(o => o.children.length)
        this.listLoading = false
      })
    },
    handleDel(index, id) {
      this.$confirm(this.$t('common.delTip'), this.$t('common.tipTitle'), {
        type: 'warning'
      }).then(() => {
        TableExampleDelete(id).then(res => {
          this.initData()
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
    }
  }
}
</script>