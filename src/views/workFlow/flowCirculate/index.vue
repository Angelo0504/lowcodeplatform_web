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
            <el-form-item label="日期">
              <el-date-picker v-model="pickerVal" type="daterange" start-placeholder="开始日期"
                end-placeholder="结束日期" :picker-options="pickerOptions" value-format="timestamp"
                clearable :editable="false">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <template v-if="showAll">
            <el-col :span="6">
              <el-form-item label="所属分类">
                <el-select v-model="flowCategory" placeholder="选择所属分类" clearable>
                  <el-option v-for="item in categoryList" :key="item.enCode" :label="item.fullName"
                    :value="item.enCode">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="所属流程">
                <el-select v-model="flowId" placeholder="选择所属流程" clearable>
                  <el-option-group v-for="group in flowEngineListAll" :key="group.id"
                    :label="group.fullName+'【'+group.count+'】'">
                    <el-option v-for="item in group.children" :key="item.id" :label="item.fullName"
                      :value="item.id">
                    </el-option>
                  </el-option-group>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="发起人员">
                <JNPF-TreeSelect :options="treeData" v-model="creatorUserId" placeholder="选择发起人员"
                  lastLevel lastLevelKey='type' lastLevelValue='user' clearable></JNPF-TreeSelect>
              </el-form-item>
            </el-col>
          </template>
          <el-col :span="6">
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" @click="search()">
                {{$t('common.search')}}</el-button>
              <el-button icon="el-icon-refresh-right" @click="refresh()">{{$t('common.reset')}}
              </el-button>
              <el-button type="text" icon="el-icon-arrow-down" @click="showAll=true"
                v-if="!showAll">展开</el-button>
              <el-button type="text" icon="el-icon-arrow-up" @click="showAll=false" v-else>
                收起</el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <div class="JNPF-common-layout-main JNPF-flex-main">
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
        <JNPF-table v-loading="listLoading" :data="list">
          <el-table-column prop="fullName" label="流程标题" show-overflow-tooltip
            v-if="jnpf.hasP('fullName')" min-width="150" />
          <el-table-column prop="flowName" label="所属流程" width="130" v-if="jnpf.hasP('flowName')" />
          <el-table-column prop="startTime" label="发起时间" width="130"
            :formatter="jnpf.tableDateFormat" v-if="jnpf.hasP('startTime')" />
          <el-table-column prop="userName" label="发起人员" width="130" v-if="jnpf.hasP('userName')" />
          <el-table-column prop="flowUrgent" label="紧急程度" sortable width="130"
            v-if="jnpf.hasP('flowUrgent')">
            <template slot-scope="scope">
              {{ scope.row.flowUrgent | urgentText() }}
            </template>
          </el-table-column>
          <el-table-column prop="status" label="流程状态" width="130" v-if="jnpf.hasP('status')">
            <template slot-scope="scope">
              <el-tag type="success" v-if="scope.row.status==2">审核通过</el-tag>
              <el-tag type="danger" v-else-if="scope.row.status==3">审核驳回</el-tag>
              <el-tag type="warning" v-else-if="scope.row.status==4">审核撤回</el-tag>
              <el-tag type="info" v-else-if="scope.row.status==5">审核终止</el-tag>
              <el-tag type="primary" v-else>等待审核</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="creatorTime" label="抄送时间" width="130"
            v-if="jnpf.hasP('creatorTime')">
            <template slot-scope="scope">
              {{scope.row.creatorTime | toDate() }}
            </template>
          </el-table-column>
          <el-table-column label="操作" width="50" fixed="right">
            <template slot-scope="scope">
              <el-button size="mini" type="text" @click="toDetail(scope.row)" v-has="'btn_detail'">
                详情</el-button>
            </template>
          </el-table-column>
        </JNPF-table>
        <pagination :total="total" :page.sync="listQuery.currentPage"
          :limit.sync="listQuery.pageSize" @pagination="initData" />
      </div>
    </div>
    <fromBox v-if="formVisible" ref="JNPFForm" @close="colseForm" />
  </div>
</template>

<script>
import { FlowBeforeList } from '@/api/workFlow/FlowBefore'
import { FlowEngineListAll } from '@/api/workFlow/FlowEngine'
import fromBox from '../fromBox/Audit'
export default {
  name: 'workFlow-flowCirculate',
  components: { fromBox },
  data() {
    return {
      list: [],
      total: 0,
      showAll: false,
      listLoading: true,
      listQuery: {
        currentPage: 1,
        pageSize: 20,
        sort: 'desc',
        sidx: ''
      },
      formVisible: false,
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      keyword: '',
      pickerVal: [],
      startTime: '',
      endTime: '',
      flowId: '',
      flowCategory: '',
      creatorUserId: '',
      categoryList: [],
      flowEngineList: [],
      flowEngineListAll: [],
      treeData: []
    }
  },
  filters: {
    getCategoryText(id, categoryList) {
      let item = categoryList.filter(o => o.enCode == id)[0]
      return item && item.fullName ? item.fullName : ''
    }
  },
  created() {
    this.getDictionaryData()
    this.getUserList()
    this.initData()
  },
  methods: {
    search() {
      if (this.pickerVal && this.pickerVal.length) {
        this.startTime = this.pickerVal[0]
        this.endTime = this.pickerVal[1]
      } else {
        this.startTime = ''
        this.endTime = ''
      }
      this.listQuery = {
        currentPage: 1,
        pageSize: 20,
        sort: 'desc',
        sidx: ''
      }
      this.initData()
    },
    getFlowEngineList() {
      FlowEngineListAll().then((res) => {
        this.flowEngineList = res.data.list
        this.flowEngineListAll = JSON.parse(JSON.stringify(this.categoryList))
        for (let i = 0; i < this.flowEngineListAll.length; i++) {
          let child = this.flowEngineList.filter(o => this.flowEngineListAll[i].enCode === o.category)
          let count = child.length
          this.$set(this.flowEngineListAll[i], 'children', child)
          this.$set(this.flowEngineListAll[i], 'count', count)
        }
        this.flowEngineListAll = this.flowEngineListAll.filter(o => o.children.length)
      })
    },
    getDictionaryData() {
      this.$store.dispatch('base/getDictionaryData', { sort: 'WorkFlowCategory' }).then((res) => {
        this.categoryList = res
        this.getFlowEngineList()
      })
    },
    async getUserList() {
      let res = await this.$store.dispatch('base/getUserTree')
      this.treeData = res
    },
    initData() {
      this.listLoading = true
      let query = {
        ...this.listQuery,
        keyword: this.keyword,
        startTime: this.startTime,
        endTime: this.endTime,
        flowId: this.flowId,
        flowCategory: this.flowCategory,
        creatorUserId: this.creatorUserId
      }
      FlowBeforeList(3, query).then(async res => {
        this.list = res.data.list
        this.total = res.data.pagination.total
        this.listLoading = false
      })
    },
    toDetail(item) {
      let data = {
        enCode: item.flowCode,
        flowId: item.flowId,
        delegateId: item.delegateId,
        id: item.processId,
        formType: item.formType,
        readonly: true
      }
      this.formVisible = true
      this.$nextTick(() => {
        this.$refs.JNPFForm.init(data)
      })
    },
    colseForm(isRefresh) {
      this.formVisible = false
      if (isRefresh) this.refresh()
    },
    refresh() {
      this.pickerVal = ''
      this.startTime = ''
      this.endTime = ''
      this.keyword = ''
      this.flowId = ''
      this.flowCategory = ''
      this.creatorUserId = ''
      this.listQuery = {
        currentPage: 1,
        pageSize: 20,
        sort: 'desc',
        sidx: ''
      }
      this.initData()
    }
  }
}
</script>