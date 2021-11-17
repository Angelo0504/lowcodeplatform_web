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
              <el-button icon="el-icon-refresh-right" @click="reset()">{{$t('common.reset')}}
              </el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <div class="JNPF-common-layout-main JNPF-flex-main">
        <div class="JNPF-common-head">
          <topOpts @add="addOrUpdateHandle()"></topOpts>
          <div class="JNPF-common-head-right">
            <el-tooltip effect="dark" :content="$t('common.refresh')" placement="top">
              <el-link icon="icon-ym icon-ym-Refresh JNPF-common-head-icon" :underline="false"
                @click="reset()" />
            </el-tooltip>
            <screenfull />
          </div>
        </div>
        <JNPF-table v-loading="listLoading" :data="list" row-key="id"
          :tree-props="{children: 'children', hasChildren: ''}" default-expand-all>
          <el-table-column prop="fullName" label="连接名称" width="300" v-if="jnpf.hasP('fullName')">
            <template slot-scope="scope">
              <span v-if="scope.row.top"
                style="font-weight:bold;">{{scope.row.name}}【{{scope.row.count}}】</span>
              <span v-else>{{scope.row.fullName}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="host" label="主机地址" v-if="jnpf.hasP('host')" />
          <el-table-column prop="port" label="端口" width="60" v-if="jnpf.hasP('port')" />
          <el-table-column prop="creatorTime" label="创建时间" width="120"
            :formatter="jnpf.tableDateFormat" v-if="jnpf.hasP('creatorTime')" />
          <el-table-column label="创建人" prop="creatorUser" width="120"
            v-if="jnpf.hasP('creatorUser')" />
          <el-table-column prop="lastModifyTime" label="修改时间" width="120"
            :formatter="jnpf.tableDateFormat" v-if="jnpf.hasP('lastModifyTime')" />
          <el-table-column label="修改人" prop="lastModifyUser" width="120"
            v-if="jnpf.hasP('lastModifyUser')" />
          <el-table-column prop="sortCode" label="排序" width="70" align="center"
            v-if="jnpf.hasP('sortCode')" />
          <el-table-column label="操作" fixed="right" width="100">
            <template slot-scope="scope" v-if="!scope.row.top">
              <tableOpts @edit="addOrUpdateHandle(scope.row.id)" @del="handleDel(scope.row.id)" />
            </template>
          </el-table-column>
        </JNPF-table>
      </div>
    </div>
    <Form v-if="formVisible" ref="Form" @refreshDataList="reset" />
  </div>
</template>

<script>
import { getDataSourceList, DataSourceDelete } from '@/api/systemData/dataSource'
import Form from './Form'
export default {
  name: 'systemData-dataSource',
  components: { Form },
  data() {
    return {
      list: [],
      keyword: '',
      listLoading: true,
      formVisible: false,
      listAll: [{ name: 'SqlServer', id: 'SqlServer' }, { name: 'MySql', id: 'MySql' }, { name: 'Oracle', id: 'Oracle' }]
    }
  },
  created() {
    this.initData()
  },
  methods: {
    reset() {
      this.keyword = ''
      this.initData()
    },
    initData() {
      this.listLoading = true
      getDataSourceList({ keyword: this.keyword }).then(res => {
        let list = res.data.list
        this.list = JSON.parse(JSON.stringify(this.listAll))
        for (let i = 0; i < this.list.length; i++) {
          let child = list.filter(o => this.list[i].name === o.dbType)
          let count = child.length
          this.$set(this.list[i], 'children', child)
          this.$set(this.list[i], 'count', count)
          this.$set(this.list[i], 'top', true)
        }
        this.list = this.list.filter(o => o.children.length)
        this.listLoading = false
      })
    },
    handleDel(id) {
      this.$confirm(this.$t('common.delTip'), this.$t('common.tipTitle'), {
        type: 'warning'
      }).then(() => {
        DataSourceDelete(id).then(res => {
          this.$message({ type: 'success', message: res.msg });
          this.initData()
        })
      }).catch(() => { });
    },
    // 新增 / 修改
    addOrUpdateHandle(id) {
      this.formVisible = true
      this.$nextTick(() => {
        this.$refs.Form.init(id)
      })
    }
  }
}
</script>
