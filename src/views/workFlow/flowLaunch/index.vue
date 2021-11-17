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
          <topOpts @add="addFlow()" addText="新建流程"></topOpts>
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
          <el-table-column prop="thisStep" label="当前节点" width="150" v-if="jnpf.hasP('thisStep')" />
          <el-table-column prop="flowUrgent" label="紧急程度" width="130"
            v-if="jnpf.hasP('flowUrgent')">
            <template slot-scope="scope">
              {{ scope.row.flowUrgent | urgentText() }}
            </template>
          </el-table-column>
          <el-table-column prop="status" label="流程状态" sortable width="150"
            v-if="jnpf.hasP('status')">
            <template slot-scope="scope">
              <el-tag type="primary" v-if="scope.row.status==1">等待审核</el-tag>
              <el-tag type="success" v-else-if="scope.row.status==2">审核通过</el-tag>
              <el-tag type="danger" v-else-if="scope.row.status==3">审核驳回</el-tag>
              <el-tag type="warning" v-else-if="scope.row.status==4">审核撤回</el-tag>
              <el-tag v-else-if="scope.row.status==5" type="info">审核终止</el-tag>
              <el-tag v-else type="info">等待提交</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="completion" label="流程进度" width="150"
            v-if="jnpf.hasP('completion')">
            <template slot-scope="scope">
              <p class="text-grey" v-if="scope.row.status==5 || scope.row.completion == 0">----</p>
              <p v-else-if=" scope.row.completion == 100">已完成</p>
              <el-progress :percentage="scope.row.completion" v-else></el-progress>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150" fixed="right">
            <template slot-scope="scope">
              <el-button size="mini" type="text" @click="addOrUpdateHandle(scope.row)"
                :disabled="[1,2,5].indexOf(scope.row.status)>-1" v-has="'btn_edit'">编辑
              </el-button>
              <el-button size="mini" type="text" class="JNPF-table-delBtn"
                @click="handleDel(scope.$index,scope.row.id)"
                :disabled="[1,2,5].indexOf(scope.row.status)>-1" v-has="'btn_remove'">删除</el-button>
              <el-button size="mini" type="text" @click="toDetail(scope.row)"
                :disabled="scope.row.status==0" v-has="'btn_detail'">详情
              </el-button>
            </template>
          </el-table-column>
        </JNPF-table>
        <pagination :total="total" :page.sync="listQuery.currentPage"
          :limit.sync="listQuery.pageSize" @pagination="initData" />
      </div>
    </div>
    <flow v-show="flowVisible" ref="flow" @close="flowVisible=false" @chioceFlow="chioceFlow" />
    <component :is="currentView" v-if="formVisible" @close="colseForm" ref="JNPFForm" />
  </div>
</template>

<script>
import { FlowLaunchList, Delete } from '@/api/workFlow/FlowLaunch'
import { FlowEngineListAll } from '@/api/workFlow/FlowEngine'
import edit from '../fromBox/Edit'
import audit from '../fromBox/Audit'
import flow from './Flow'
export default {
  name: 'workFlow-flowLaunch',
  components: { edit, audit, flow },
  data() {
    return {
      currentView: 'edit',
      list: [],
      total: 0,
      showAll: false,
      listLoading: false,
      listQuery: {
        currentPage: 1,
        pageSize: 20,
        sort: 'desc',
        sidx: ''
      },
      formVisible: false,
      flowVisible: false,
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
      categoryList: [],
      flowEngineList: [],
      flowEngineListAll: []
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
    initData() {
      this.listLoading = true
      let query = {
        ...this.listQuery,
        keyword: this.keyword,
        startTime: this.startTime,
        endTime: this.endTime,
        flowId: this.flowId,
        flowCategory: this.flowCategory
      }
      FlowLaunchList(query).then(res => {
        this.list = res.data.list
        this.total = res.data.pagination.total
        this.listLoading = false
      })
    },
    handleDel(index, id) {
      this.$confirm(this.$t('common.delTip'), this.$t('common.tipTitle'), {
        type: 'warning'
      }).then(() => {
        this.asyncDel(index, id);
      }).catch(() => { });
    },
    asyncDel(index, id) {
      Delete(id).then(res => {
        this.list.splice(index, 1);
        this.$message({
          type: 'success',
          message: res.msg
        });
      })
    },
    addFlow() {
      this.flowVisible = true
      this.$nextTick(() => {
        this.$refs.flow.init(this.flowEngineListAll)
      })
    },
    chioceFlow(item) {
      let data = {
        enCode: item.enCode,
        flowId: item.id,
        formType: item.formType,
        id: '',
      }
      this.currentView = 'edit'
      this.$nextTick(() => {
        this.formVisible = true
        this.$nextTick(() => {
          this.$refs.JNPFForm.init(data)
          this.flowVisible = false
        })
      })
    },
    // 新增 / 修改
    addOrUpdateHandle(item) {
      let data = {
        enCode: item.flowCode,
        flowId: item.flowId,
        formType: item.formType,
        id: item.id
      }
      this.currentView = 'edit'
      this.$nextTick(() => {
        this.formVisible = true
        this.$nextTick(() => {
          this.$refs.JNPFForm.init(data)
          this.flowVisible = false
        })
      })
    },
    toDetail(item) {
      let data = {
        enCode: item.flowCode,
        flowId: item.flowId,
        delegateId: item.delegateId,
        id: item.id,
        formType: item.formType,
        isSelf: true,
        status: item.status,
        readonly: true,
        showStatus: true
      }
      this.currentView = 'audit'
      this.$nextTick(() => {
        this.formVisible = true
        this.$nextTick(() => {
          this.$refs.JNPFForm.init(data)
        })
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