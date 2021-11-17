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
        <JNPF-table v-loading="listLoading" :data="list">
          <el-table-column prop="projectName" label="项目名称" sortable width="200" />
          <el-table-column prop="projectCode" label="项目编码" sortable width="160" />
          <el-table-column label="项目类型" sortable width="100">
            <template slot-scope="scope">
              {{ scope.row.projectType | getTypeText(industryTypeList) }}
            </template>
          </el-table-column>
          <el-table-column label="项目标记" sortable width="170" :filters="filterList"
            :filter-method="filterSign" align="center" :sort-by="sortBy">
            <template slot-scope="scope">
              <template v-if="scope.row.signArray.length">
                <span v-for="(item,i) in scope.row.signArray" :key="i">
                  <i class="ym-custom ym-custom-checkbox-blank-circle"
                    style="color:#ff625c;font-size:16px;" v-if="item=='1'"></i>
                  <i class="ym-custom ym-custom-checkbox-blank-circle"
                    style="color:#f9a646;font-size:16px;" v-if="item=='2'"></i>
                  <i class="ym-custom ym-custom-checkbox-blank-circle"
                    style="color:#f4ce4a;font-size:16px;" v-if="item=='3'"></i>
                  <i class="ym-custom ym-custom-checkbox-blank-circle"
                    style="color:#6dcc51;font-size:16px;" v-if="item=='4'"></i>
                  <i class="ym-custom ym-custom-checkbox-blank-circle"
                    style="color:#4bb8f3;font-size:16px;" v-if="item=='5'"></i>
                  <i class="ym-custom ym-custom-checkbox-blank-circle"
                    style="color:#d088e1;font-size:16px;" v-if="item=='6'"></i>
                  <i class="ym-custom ym-custom-checkbox-blank-circle"
                    style="color:#a5a5a8;font-size:16px;" v-if="item=='7'"></i>
                </span>
              </template>
              <i class="ym-custom ym-custom-checkbox-blank-circle-outline" v-else
                style="font-size:16px;color:#cecece"></i>
            </template>
          </el-table-column>
          <el-table-column prop="projectPhase" label="项目阶段" sortable width="120" />
          <el-table-column prop="customerName" label="客户名称" sortable width="200" />
          <el-table-column prop="principal" label="负责人" sortable width="80" />
          <el-table-column prop="jackStands" label="立项人" sortable width="80" />
          <el-table-column label="交互时间" sortable width="100">
            <template slot-scope="scope">
              {{ scope.row.interactionDate | toDate("yyyy-MM-dd") }}
            </template>
          </el-table-column>
          <el-table-column prop="costAmount" label="费用金额" sortable width="100" />
          <el-table-column prop="tunesAmount" label="已用金额" sortable width="100" />
          <el-table-column prop="projectedIncome" label="预计收入" sortable width="100" />
          <el-table-column prop="registrant" label="登记人" sortable width="80"
            show-overflow-tooltip />
          <el-table-column label="登记时间" sortable width="120">
            <template slot-scope="scope">
              {{ scope.row.registerDate | toDate() }}
            </template>
          </el-table-column>
          <el-table-column prop="description" label="备注" sortable width="300" />
          <el-table-column label="操作" fixed="right" width="90">
            <template slot-scope="scope">
              <el-dropdown>
                <el-button size="mini" type="text">项目标记<i
                    class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item v-for="(item,i) in options" :key="item.value"
                    @click.native="sign(scope.row,item.value,i)">
                    <span :style="{'color':item.color}">{{item.text}}</span>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
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
import { TableExampleList, TableExampleDelete, UpdateSign } from '@/api/extend/tableExample'
import JNPFForm from '../commonForm'
export default {
  name: 'extend-tableDemo-signTable',
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
      filterList: [{ text: '红色', value: '1' }, { text: '橙色', value: '2' }, { text: '黄色', value: '3' }, { text: '绿色', value: '4' }, { text: '蓝色', value: '5' }, { text: '紫色', value: '6' }, { text: '灰色', value: '7' }],
      options: [
        { text: '红色', value: '1', color: '#ff625c' },
        { text: '橙色', value: '2', color: '#f9a646' },
        { text: '黄色', value: '3', color: '#f4ce4a' },
        { text: '绿色', value: '4', color: '#6dcc51' },
        { text: '蓝色', value: '5', color: '#4bb8f3' },
        { text: '紫色', value: '6', color: '#d088e1' },
        { text: '灰色', value: '7', color: '#a5a5a8' },
        { text: '清空', value: '0', color: '' }]
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
        let list = res.data.list
        for (let i = 0; i < list.length; i++) {
          const e = list[i];
          let signArray = e.sign ? e.sign.split('').filter(o => o != '0') : []
          this.$set(e, "signArray", signArray)
        }
        this.list = list
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
    filterSign(value, row) {
      return row.sign.indexOf(value) > -1;
    },
    sign(row, value, i) {
      let sign = '0000000'
      if (value != 0) {
        let signArray = row.sign.split('')
        signArray[i] = signArray[i] == value ? '0' : value
        sign = signArray.join('')
      }
      UpdateSign(row.id, { sign }).then(res => {
        row.signArray = sign.split('').filter(o => o != '0')
        row.sign = sign
        this.$message({
          type: 'success',
          message: res.msg
        });
      })
    },
    sortBy(row, index) {
      return row.signArray.length
    }
  }
}
</script>