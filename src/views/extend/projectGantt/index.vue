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
              <el-button icon="el-icon-refresh-right" @click="reset()">{{$t('common.reset')}}
              </el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <div class="JNPF-common-layout-main JNPF-flex-main">
        <div class="JNPF-common-head">
          <el-button type="primary" icon="el-icon-plus" @click="addOrUpdateHandle()"
            v-has="'btn_add'">新建项目</el-button>
          <div class="JNPF-common-head-right">
            <el-tooltip effect="dark" :content="$t('common.refresh')" placement="top">
              <el-link icon="icon-ym icon-ym-Refresh JNPF-common-head-icon" :underline="false"
                @click="reset()" />
            </el-tooltip>
            <screenfull />
          </div>
        </div>
        <JNPF-table v-loading="listLoading" :data="list" sortable='custom' size="mini"
          @sort-change='sortChange'>
          <el-table-column prop="fullName" label="项目名称/项目编码" sortable show-overflow-tooltip
            width="180">
            <template slot-scope="scope">
              <p>{{ scope.row.fullName }}</p>
              <p class="text-grey">{{ scope.row.enCode }}</p>
            </template>
          </el-table-column>
          <el-table-column prop="startTime" label="开始日期/结束日期" sortable width="160">
            <template slot-scope="scope">
              <p>{{ scope.row.startTime | toDate("yyyy-MM-dd") }}</p>
              <p class="text-grey">{{scope.row.endTime | toDate("yyyy-MM-dd") }}</p>
            </template>
          </el-table-column>
          <el-table-column prop="schedule" label="项目工期/完成进度" sortable width="160">
            <template slot-scope="scope">
              <p>{{ scope.row.timeLimit }}天</p>
              <el-progress :percentage="scope.row.schedule"></el-progress>
            </template>
          </el-table-column>
          <el-table-column label="状态" width="100" sortable prop="state">
            <template slot-scope="scope">
              <el-tag type="success" v-if="scope.row.schedule==100">已完成</el-tag>
              <template v-else>
                <el-tag v-if="scope.row.state==1">进行中</el-tag>
                <el-tag type="danger" v-if="scope.row.state==2">已暂停</el-tag>
              </template>
            </template>
          </el-table-column>
          <el-table-column prop="managerIds" label="参与人员">
            <template slot-scope="scope">
              <el-avatar :size="30" :src="define.comUrl+img.headIcon"
                v-for="(img,i) in scope.row.managersInfo" :key="i" :title="img.account"
                style="margin-right: 6px;"></el-avatar>
              <!-- <img :src="define.comUrl+img.headIcon" v-for="(img,i) in scope.row.managersInfo" :key="i"
            :title="img.account" class="managerImg"> -->
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right" width="150">
            <template slot-scope="scope">
              <el-button size="mini" type="text" @click="addOrUpdateHandle(scope.row.id)"
                v-has="'btn_edit'">编辑</el-button>
              <el-button size="mini" type="text" class="JNPF-table-delBtn" v-has="'btn_remove'"
                @click="handleDel(scope.$index,scope.row.id)">删除</el-button>
              <el-button size="mini" type="text" @click="toTask(scope.row)" v-has="'btn_task'">
                项目任务</el-button>
            </template>
          </el-table-column>
        </JNPF-table>
      </div>
    </div>
    <Form v-if="formVisible" ref="Form" @refreshDataList="reset" />
    <Task v-show="taskVisible" ref="task" @close="taskVisible=false" />
  </div>
</template>

<script>
import { ProjectGanttList, Delete } from '@/api/extend/projectGantt'
import Form from './Form'
import Task from './Task'
export default {
  name: 'extend-projectGantt',
  components: { Form, Task },
  data() {
    return {
      keyword: '',
      list: [],
      listLoading: true,
      formVisible: false,
      taskVisible: false,
    }
  },
  created() {
    this.initData()
  },
  methods: {
    search() {
      this.initData()
    },
    reset() {
      this.keyword = ''
      this.search()
    },
    initData() {
      this.listLoading = true
      let query = { keyword: this.keyword }
      ProjectGanttList(query).then(res => {
        this.list = res.data.list
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
    toTask(row) {
      this.taskVisible = true
      this.$nextTick(() => {
        this.$refs.task.init(row)
      })
    },
    // 新增 / 修改
    addOrUpdateHandle(id) {
      this.formVisible = true
      this.$nextTick(() => {
        this.$refs.Form.init(id)
      })
    },
    sortChange({ column, prop, order }) {
      // this.listQuery.sort = order == 'ascending' ? 'asc' : 'desc'
      // this.listQuery.sidx = !order ? '' : prop
      // this.initData()
    }
  }
}
</script>
<style lang="scss" scoped>
.managerImg {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 6px;
}
</style>