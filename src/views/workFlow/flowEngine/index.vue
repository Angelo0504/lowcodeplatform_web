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
          <!-- <topOpts  @add="addOrUpdateHandle()" addText="新建流程"></topOpts> -->
          <el-dropdown v-has="'btn_add'">
            <el-button type="primary" icon="el-icon-plus">{{$t('common.addBtn')}}<i
                class="el-icon-arrow-down el-icon--right"></i></el-button>
            <el-dropdown-menu>
              <el-dropdown-item @click.native="addOrUpdateHandle('',2)">自定义表单</el-dropdown-item>
              <el-dropdown-item @click.native="addOrUpdateHandle('',1)">系统表单</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <div class="JNPF-common-head-right">
            <el-tooltip effect="dark" :content="$t('common.refresh')" placement="top">
              <el-link icon="icon-ym icon-ym-Refresh JNPF-common-head-icon" :underline="false"
                @click="reset()" />
            </el-tooltip>
            <screenfull />
          </div>
        </div>
        <JNPF-table v-loading="listLoading" :data="flowEngineListAll" row-key="id"
          :tree-props="{children: 'children', hasChildren: ''}" default-expand-all>
          <el-table-column prop="fullName" label="流程名称" min-width="150"
            v-if="jnpf.hasP('fullName')">
            <template slot-scope="scope">
              <span v-if="scope.row.top"
                style="font-weight:bold;">{{scope.row.fullName}}【{{scope.row.count}}】</span>
              <span v-else>{{scope.row.fullName}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="enCode" label="流程编码" width="200" v-if="jnpf.hasP('enCode')">
            <template slot-scope="scope">
              <span v-if="!scope.row.top">{{ scope.row.enCode }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="formType" label="表单类型" width="100" v-if="jnpf.hasP('formType')">
            <template slot-scope="scope">
              <span v-if="!scope.row.top">{{ scope.row.formType == 1? "系统表单" : "自定义表单" }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="type" label="流程类型" width="80" v-if="jnpf.hasP('type')">
            <template slot-scope="scope">
              <span v-if="!scope.row.top">{{ scope.row.type == 0? "发起流程" : "功能流程" }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="visibleType" label="可见范围" width="80"
            v-if="jnpf.hasP('visibleType')">
            <template slot-scope="scope">
              <span v-if="!scope.row.top">{{ scope.row.visibleType ==  0 ? "全部可见" : "部分可见" }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="creatorUser" label="创建人" width="120"
            v-if="jnpf.hasP('creatorUser')" />
          <el-table-column prop="creatorTime" label="创建时间" :formatter="jnpf.tableDateFormat"
            width="120" v-if="jnpf.hasP('creatorTime')" />
          <!-- <el-table-column prop="lastModifyUser" label="最后修改人" width="120" />
      <el-table-column prop="lastModifyTime" label="最后修改时间" :formatter="jnpf.tableDateFormat"
        width="120" /> -->
          <el-table-column prop="sortCode" label="排序" width="70" align="center"
            v-if="jnpf.hasP('sortCode')" />
          <el-table-column label="状态" width="70" align="center" v-if="jnpf.hasP('enabledMark')">
            <template slot-scope="scope">
              <el-switch v-model="scope.row.enabledMark" :active-value="1" :inactive-value="0"
                v-if="!scope.row.top" @click.native="handleUpdate(scope.row)" disabled
                class="table-switch" />
            </template>
          </el-table-column>
          <!-- <el-table-column prop="description" label="流程说明" show-overflow-tooltip /> -->
          <el-table-column label="操作" fixed="right" width="150">
            <template slot-scope="scope" v-if="!scope.row.top">
              <tableOpts @edit="addOrUpdateHandle(scope.row.id,scope.row.formType)"
                @del="handleDel(scope.row.id)">
                <el-dropdown v-has="'btn_more'">
                  <span class="el-dropdown-link">
                    <el-button type="text" size="mini">{{$t('common.moreBtn')}}<i
                        class="el-icon-arrow-down el-icon--right"></i>
                    </el-button>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="copy(scope.row.id)" v-has="'btn_copy'">
                      复制流程</el-dropdown-item>
                    <el-dropdown-item @click.native="preview(scope.row)" v-has="'btn_preview'">
                      预览表单 </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
                <!-- <el-button size="mini" type="text" v-if="!scope.row.enabledMark"
              @click="handleUpdate(scope.row)" v-has="'btn_release'">发布</el-button>
            <el-button size="mini" type="text" v-else @click="handleUpdate(scope.row)"
              v-has="'btn_stop'">停止</el-button> -->
              </tableOpts>
            </template>
          </el-table-column>
        </JNPF-table>
      </div>
    </div>
    <Form v-if="formVisible" ref="Form" @close="colseForm" />
    <preview v-if="previewVisible" ref="preview" @close="previewVisible=false" />
  </div>
</template>

<script>
import { FlowEngineList, Delete, Release, Stop, Copy } from '@/api/workFlow/FlowEngine'
import Form from './Form'
import preview from '../fromBox/Preview'
export default {
  name: 'workFlow-flowEngine',
  components: { Form, preview },
  data() {
    return {
      keyword: '',
      list: [],
      listLoading: true,
      formVisible: false,
      previewVisible: false,
      categoryList: [],
      flowEngineList: [],
      flowEngineListAll: []
    }
  },
  created() {
    this.getDictionaryData()
  },
  methods: {
    reset() {
      this.keyword = ''
      this.initData()
    },
    initData() {
      this.listLoading = true
      let query = { keyword: this.keyword }
      FlowEngineList(query).then((res) => {
        this.flowEngineList = res.data.list
        this.flowEngineListAll = JSON.parse(JSON.stringify(this.categoryList))
        for (let i = 0; i < this.flowEngineListAll.length; i++) {
          let child = this.flowEngineList.filter(o => this.flowEngineListAll[i].enCode === o.category)
          let count = child.length
          this.$set(this.flowEngineListAll[i], 'children', child)
          this.$set(this.flowEngineListAll[i], 'count', count)
          this.$set(this.flowEngineListAll[i], 'top', true)
        }
        this.flowEngineListAll = this.flowEngineListAll.filter(o => o.children.length)
        this.listLoading = false
      })
    },
    getDictionaryData() {
      this.$store.dispatch('base/getDictionaryData', { sort: 'WorkFlowCategory' }).then((res) => {
        this.categoryList = JSON.parse(JSON.stringify(res))
        this.initData()
      })
    },
    handleDel(id) {
      this.$confirm(this.$t('common.delTip'), this.$t('common.tipTitle'), {
        type: 'warning'
      }).then(() => {
        Delete(id).then(res => {
          this.initData()
          this.$message({
            type: 'success',
            message: res.msg
          });
        })
      }).catch(() => { });
    },
    // 新增 / 修改
    addOrUpdateHandle(id, formType) {
      this.formVisible = true
      this.$nextTick(() => {
        this.$refs.Form.init(this.categoryList, id, formType)
      })
    },
    copy(id) {
      this.$confirm('您确定要复制该流程表单, 是否继续?', '提示', {
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
    preview(row) {
      let data = {
        enCode: row.enCode,
        fullName: row.fullName,
        formType: row.formType,
        formConf: row.formData
      }
      this.previewVisible = true
      this.$nextTick(() => {
        this.$refs.preview.init(data)
      })
    },
    colseForm(isRefresh) {
      this.formVisible = false
      if (isRefresh) {
        this.keyword = ''
        this.initData()
      }
    },
    handleUpdate(row) {
      if (row.enabledMark) {
        this.$confirm('您确定要停止当前流程吗, 是否继续?', '提示', {
          type: 'warning'
        }).then(() => {
          Stop(row.id).then(res => {
            row.enabledMark = 0
            this.$message({
              type: 'success',
              message: res.msg
            });
          })
        }).catch(() => { });
      } else {
        this.$confirm('您确定要发布当前流程吗, 是否继续?', '提示', {
          type: 'warning'
        }).then(() => {
          Release(row.id).then(res => {
            row.enabledMark = 1
            this.$message({
              type: 'success',
              message: res.msg
            });
          })
        }).catch(() => { });
      }
    }
  }
}
</script>