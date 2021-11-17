<template>
  <div class="JNPF-common-layout">
    <div class="JNPF-common-layout-center">
      <el-row class="JNPF-common-search-box" :gutter="16">
        <el-form @submit.native.prevent>
          <el-col :span="6">
            <el-form-item label="关键词">
              <el-input v-model="query.keyword" placeholder="请输入关键词查询" clearable />
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
          <topOpts @add="addOrUpdateHandle('',1)" addText="新建表单"></topOpts>
          <div class="JNPF-common-head-right">
            <el-tooltip effect="dark" :content="$t('common.refresh')" placement="top">
              <el-link icon="icon-ym icon-ym-Refresh JNPF-common-head-icon" :underline="false"
                @click="reset()" />
            </el-tooltip>
            <screenfull />
          </div>
        </div>
        <JNPF-table v-loading="listLoading" :data="listAll" row-key="id"
          :tree-props="{children: 'children', hasChildren: ''}" default-expand-all>
          <el-table-column prop="fullName" label="名称" show-overflow-tooltip width="200"
            v-if="jnpf.hasP('fullName')">
            <template slot-scope="scope">
              <span v-if="scope.row.top"
                style="font-weight:bold;">{{scope.row.fullName}}【{{scope.row.count}}】</span>
              <span v-else>{{scope.row.fullName}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="enCode" label="编码" width="200" v-if="jnpf.hasP('enCode')">
            <template slot-scope="scope" v-if="!scope.row.top">{{scope.row.enCode}}</template>
          </el-table-column>
          <el-table-column prop="creatorUser" label="创建人" width="120"
            v-if="jnpf.hasP('creatorUser')" />
          <el-table-column prop="creatorTime" label="创建时间" :formatter="jnpf.tableDateFormat"
            width="120" v-if="jnpf.hasP('creatorTime')" />
          <el-table-column prop="lastmodifyuser" label="最后修改人" width="120"
            v-if="jnpf.hasP('lastmodifyuser')" />
          <el-table-column prop="lastmodifytime" label="最后修改时间" :formatter="jnpf.tableDateFormat"
            width="120" v-if="jnpf.hasP('lastmodifytime')" />
          <el-table-column prop="description" label="说明" show-overflow-tooltip
            v-if="jnpf.hasP('description')" />
          <el-table-column label="状态" width="70" align="center" v-if="jnpf.hasP('state')">
            <template slot-scope="scope" v-if="!scope.row.top">
              <el-tag :type="scope.row.state == 1 ? 'success' : 'danger'" disable-transitions>
                {{scope.row.state==1?'正常':'停用'}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right" width="150">
            <template slot-scope="scope" v-if="!scope.row.top">
              <tableOpts @edit="addOrUpdateHandle(scope.row.id)" @del="handleDel(scope.row.id)">
                <el-dropdown v-has="'btn_more'">
                  <span class="el-dropdown-link">
                    <el-button type="text" size="mini">{{$t('common.moreBtn')}}<i
                        class="el-icon-arrow-down el-icon--right"></i>
                    </el-button>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="copy(scope.row.id)" v-has="'btn_copy'">
                      复制</el-dropdown-item>
                    <el-dropdown-item @click.native="preview(scope.row.id)" v-has="'btn_preview'">
                      预览</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </tableOpts>
            </template>
          </el-table-column>
        </JNPF-table>
      </div>
    </div>
    <Form v-if="formVisible" ref="Form" @close="colseForm" />
  </div>
</template>

<script>
import { getVisualDevList, Delete, Copy } from '@/api/onlineDev/visualDev'
import Form from './Form'
export default {
  name: 'onlineDev-webDesign',
  components: {
    Form
  },
  data() {
    return {
      query: { keyword: '', type: 1 },
      list: [],
      listLoading: false,
      listQuery: {
        currentPage: 1,
        pageSize: 20,
        sort: 'desc',
        sidx: ''
      },
      formVisible: false,
      categoryList: [],
      listAll: []
    }
  },
  created() {
    this.getDictionaryData()
  },
  methods: {
    search() {
      this.initData()
    },
    reset() {
      this.query.keyword = ''
      this.initData()
    },
    getDictionaryData() {
      this.$store.dispatch('base/getDictionaryData', { sort: 'webDesign' }).then((res) => {
        this.categoryList = JSON.parse(JSON.stringify(res))
        this.initData()
      })
    },
    initData() {
      this.listLoading = true
      getVisualDevList(this.query).then(res => {
        this.list = res.data.list
        this.listAll = JSON.parse(JSON.stringify(this.categoryList))
        for (let i = 0; i < this.listAll.length; i++) {
          let child = this.list.filter(o => this.listAll[i].id === o.category)
          let count = child.length
          this.$set(this.listAll[i], 'children', child)
          this.$set(this.listAll[i], 'count', count)
          this.$set(this.listAll[i], 'top', true)
        }
        this.listAll = this.listAll.filter(o => o.children.length)
        this.listLoading = false
      })
    },
    handleDel(id) {
      this.$confirm(this.$t('common.delTip'), this.$t('common.tipTitle'), {
        type: 'warning'
      }).then(() => {
        Delete(id).then(res => {
          this.$message({
            type: 'success',
            message: res.msg,
            duration: 1000,
            onClose: () => {
              this.initData()
            }
          });
        })
      }).catch(() => { });
    },
    copy(id) {
      this.$confirm('您确定要复制该功能表单, 是否继续?', '提示', {
        type: 'warning'
      }).then(() => {
        Copy(id).then(res => {
          this.$message({
            type: 'success',
            message: res.msg,
            duration: 1000,
            onClose: () => {
              this.initData()
            }
          });
        })
      }).catch(() => { });
    },
    preview(id) {
      this.$router.push(`/previewModel?id=${id}`)
    },
    // 新增 / 修改
    addOrUpdateHandle(id, type) {
      this.formVisible = true
      this.$nextTick(() => {
        this.$refs.Form.init(this.categoryList, id, type)
      })
    },
    colseForm(isRefresh) {
      this.formVisible = false
      if (isRefresh) {
        this.query.keyword = ''
        this.initData()
      }
    }
  }
}
</script>