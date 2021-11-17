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
          <topOpts @add="addOrUpdateHandle()" addText="新建菜单"></topOpts>
          <div class="JNPF-common-head-right">
            <el-tooltip effect="dark" :content="$t('common.refresh')" placement="top">
              <el-link icon="icon-ym icon-ym-Refresh JNPF-common-head-icon" :underline="false"
                @click="reset()" />
            </el-tooltip>
            <screenfull />
          </div>
        </div>
        <JNPF-table v-loading="listLoading" row-key="id" :data="treeData" default-expand-all
          :tree-props="{children: 'children', hasChildren: ''}">
          <el-table-column prop="fullName" label="菜单名称" v-if="jnpf.hasP('fullName')" />
          <el-table-column prop="type" label="菜单类型" width="100" v-if="jnpf.hasP('type')">
            <template slot-scope="scope">
              {{scope.row.type== "view"? "页面":scope.row.type== "click"?"文本":"目录"}}
            </template>
          </el-table-column>
          <el-table-column prop="key" label="菜单内容" v-if="jnpf.hasP('key')">
            <template slot-scope="scope">
              {{scope.row.type== "view"? scope.row.url:scope.row.id}}
            </template>
          </el-table-column>
          <el-table-column prop="sortCode" label="排序" width="120" v-if="jnpf.hasP('sortCode')" />
          <el-table-column label="操作" fixed="right" width="100">
            <template slot-scope="scope">
              <tableOpts @edit="addOrUpdateHandle(scope.row.id)" @del="handleDel(scope.row)">
              </tableOpts>
            </template>
          </el-table-column>
        </JNPF-table>
      </div>
    </div>
    <Form v-if="formVisible" ref="Form" @refreshDataList="reset" />
  </div>
</template>

<script>
import { MPMenuList, MPMenuDelete } from '@/api/weChat/MPMenu'
import Form from './Form'
export default {
  name: 'weChat-mpMenu',
  components: {
    Form
  },
  data() {
    return {
      keyword: '',
      listLoading: true,
      formVisible: false,
      treeData: []
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
      let query = { keyword: this.keyword }
      MPMenuList(query).then(res => {
        this.treeData = res.data.list
        this.listLoading = false
      })
    },
    handleDel(row) {
      if (row.hasChildren) {
        this.$message({
          type: 'error',
          message: '此记录被关联引用,不允许被删除!',
          duration: 1000
        });
        return
      }
      this.$confirm(this.$t('common.delTip'), this.$t('common.tipTitle'), {
        type: 'warning'
      }).then(() => {
        MPMenuDelete(row.id).then(res => {
          this.$message({
            type: 'success',
            message: res.msg,
            onClose: () => {
              this.treeData = []
              this.initData()
            }
          });
        })
      }).catch(() => { });
    },
    // 新增 / 修改
    addOrUpdateHandle(id) {
      this.formVisible = true
      this.$nextTick(() => {
        this.$refs.Form.init(id)
      })
    },
  }
}
</script>