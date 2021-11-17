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
          <el-button type="primary" icon="el-icon-printer" @click="print('myTable')">打印</el-button>
          <div class="JNPF-common-head-right">
            <el-tooltip effect="dark" :content="$t('common.refresh')" placement="top">
              <el-link icon="icon-ym icon-ym-Refresh JNPF-common-head-icon" :underline="false"
                @click="refresh()" />
            </el-tooltip>
            <screenfull />
          </div>
        </div>
        <div class="tableList">
          <JNPF-table v-loading="listLoading" :data="list" id="myTable" ref="configurationTable">
            <el-table-column prop="projectName" label="项目名称" sortable width="200" />
            <el-table-column prop="projectCode" label="项目编码" sortable width="160" />
            <el-table-column label="项目类型" sortable width="160" prop="projectType">
              <template slot-scope="scope">
                {{ scope.row.projectType | getTypeText(industryTypeList) }}
              </template>
            </el-table-column>
            <el-table-column prop="projectPhase" label="项目阶段" sortable width="200" />
            <el-table-column prop="customerName" label="客户名称" sortable />
            <el-table-column prop="costAmount" label="费用金额" sortable width="100" />
            <el-table-column prop="tunesAmount" label="已用金额" sortable width="100" />
            <el-table-column prop="projectedIncome" label="预计收入" sortable width="100" />
          </JNPF-table>
        </div>
        <pagination :total="total" :page.sync="listQuery.currentPage"
          :limit.sync="listQuery.pageSize" @pagination="initData" />
      </div>
    </div>
  </div>
</template>

<script>
import { TableExampleList, TableExampleDelete } from '@/api/extend/tableExample'
export default {
  name: 'extend-tableDemo-printTable',
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
    print(id) {
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
      const html = document.querySelector('#' + id).innerHTML
      // 新建一个 DOM
      const div = document.createElement('div')
      const printDOMID = 'printDOMElement'
      div.id = printDOMID
      div.innerHTML = html;
      // 提取第一个表格的内容 即表头
      const ths = div.querySelectorAll('.el-table__header-wrapper th')
      const ThsTextArry = []
      for (let i = 0, len = ths.length; i < len; i++) {
        if (ths[i].innerText !== '') ThsTextArry.push(ths[i].innerText)
      }
      // 删除多余的表头
      div.querySelector('.hidden-columns').remove()
      //  删掉第一个表格的内容
      div.querySelector('.el-table__header-wrapper').remove()
      //取出表头放到tr里面
      let newHTML = '<tr>'
      for (let i = 0, len = ThsTextArry.length; i < len; i++) {
        newHTML += '<td style="text-align: center; font-weight: bold;padding:10px;">' + ThsTextArry[i] + '</td>'
      }
      newHTML += '</tr>'
      let printStr = "<html><head><meta http-equiv='Content-Type' content='text/html; charset=utf-8'></head>";
      let content = "";
      let print = document.getElementById(id).innerHTML;
      content = content + print;
      let content1 = content.replace('<tbody>', '<tbody>' + newHTML)
      let printPart1 = printStr + tabStyle + content1 + "</body></html>";
      let newTab = window.open('_blank');
      newTab.document.body.innerHTML = printPart1;
      newTab.focus();
      newTab.print();
      newTab.close();
    }

  }
}
</script>
<style lang="scss" scoped>
.tableList {
  height: 100%;
}
</style>