<template>
  <transition name="el-zoom-in-center">
    <div class="JNPF-preview-main flow-form-main">
      <div class="JNPF-common-page-header">
        <el-page-header @back="goBack" :content="title" />
        <div class="options">
          <el-button @click="goBack()">{{$t('common.cancelButton')}}</el-button>
        </div>
      </div>
      <div class="main">
        <JNPF-table v-loading="listLoading" :data="list">
          <el-table-column prop="runTime" label="执行时间" :formatter="jnpf.tableDateFormat"
            width="130" />
          <el-table-column prop="runResult" label="执行结果" width="100" align="center">
            <template slot-scope="scope">
              <el-tag :type="scope.row.runResult == 0 ? 'success' : 'danger'">
                {{scope.row.runResult==0?'成功':'失败'}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="description" label="执行说明" />
        </JNPF-table>
        <pagination :total="total" :page.sync="listQuery.currentPage"
          :limit.sync="listQuery.pageSize" @pagination="initData" />
      </div>
    </div>
  </transition>
</template>

<script>
import { TimeTaskTaskLogList } from '@/api/system/timeTask'
export default {
  data() {
    return {
      id: '',
      title: '',
      list: [],
      total: 0,
      listLoading: true,
      listQuery: {
        currentPage: 1,
        pageSize: 20,
        sort: 'desc',
        sidx: ''
      }
    }
  },
  methods: {
    goBack() {
      this.$emit('close')
    },
    init(id, title) {
      if (!id) return this.$emit('close')
      this.id = id
      this.title = title
      this.initData()
    },
    initData() {
      this.listLoading = true
      TimeTaskTaskLogList(this.id, this.listQuery).then(res => {
        this.list = res.data.list
        this.total = res.data.pagination.total
        this.listLoading = false
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.main {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding: 0 0 10px;
  >>> .el-table {
    flex: 1;
    border-top: none;
  }
}
</style>