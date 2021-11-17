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
          <div></div>
          <div class="JNPF-common-head-right">
            <el-tooltip effect="dark" :content="$t('common.refresh')" placement="top">
              <el-link icon="icon-ym icon-ym-Refresh JNPF-common-head-icon" :underline="false"
                @click="refresh()" />
            </el-tooltip>
            <screenfull />
          </div>
        </div>
        <JNPF-table v-loading="listLoading" :data="list" @expand-change="expandChange"
          :hasNO="false">
          <el-table-column type="expand" width="40">
            <template slot-scope="scope">
              <el-table v-loading="scope.row.childLoading" :data="scope.row.childTable" size='mini'
                :element-loading-text="$t('common.loadingText')">
                <el-table-column prop="fullName" label="名称" />
                <el-table-column prop="enCode" label="编码" width="150" />
              </el-table>
            </template>
          </el-table-column>
          <el-table-column type="index" width="50" label="序号" align="center" />
          <el-table-column prop="fullName" label="名称" />
          <el-table-column prop="enCode" label="编码" width="175" />
        </JNPF-table>
      </div>
    </div>
  </div>
</template>

<script>
import { CityList, IndustryList } from '@/api/extend/tableExample'
export default {
  name: 'extend-tableDemo-extension',
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
      formVisible: false
    }
  },
  created() {
    this.initData()
  },
  methods: {
    refresh() {
      this.keyword = ''
      this.initData()
    },
    initData() {
      this.listLoading = true
      IndustryList({ keyword: this.keyword }).then(res => {
        this.list = res.data.list
        for (let i = 0; i < this.list.length; i++) {
          this.$set(this.list[i], 'isExpanded', false)
          this.$set(this.list[i], 'childTable', [])
          this.$set(this.list[i], 'childLoading', false)
        }
        this.listLoading = false
      })
    },
    expandChange(rows) {
      rows.isExpanded = !rows.isExpanded
      if (!rows.isExpanded) return
      if (rows.childTable.length) return
      rows.childLoading = true
      CityList(rows.id).then(res => {
        rows.childLoading = false
        rows.childTable = res.data.list
      }).catch(() => {
        rows.childLoading = false
      })
    }
  }
}
</script>