
<template>
  <div class="JNPF-common-layout MPUser-container">
    <div class="JNPF-common-layout-left">
      <div class="JNPF-common-title">
        <h2>标签管理</h2>
      </div>
      <el-tree :data="treeData" :props="defaultProps" default-expand-all highlight-current
        ref="treeBox" :expand-on-click-node="false" @node-click="handleNodeClick"
        class="JNPF-common-el-tree" node-key="id">
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <i :class="data.icon"></i>
          <span class="text">{{node.label}}</span>
          <el-dropdown v-if="data.id != 'user'">
            <span class="more">
              <i class="el-icon-more"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="rename(data)" v-has="'btn_edit'">编辑
              </el-dropdown-item>
              <el-dropdown-item @click.native="deleteTag(data)" v-has="'btn_remove'">删除
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </span>
      </el-tree>
    </div>
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
          <div></div>
          <div class="JNPF-common-head-right">
            <el-tooltip effect="dark" :content="$t('common.refresh')" placement="top">
              <el-link icon="icon-ym icon-ym-Refresh JNPF-common-head-icon" :underline="false"
                @click="reset()" />
            </el-tooltip>
            <screenfull />
          </div>
        </div>
        <el-tabs type="border-card" v-model="activeTab">
          <el-tab-pane label="已关注" name="1"></el-tab-pane>
          <el-tab-pane label="黑名单" name="unblack"></el-tab-pane>
          <JNPF-table v-loading="listLoading" :data="list">
            <el-table-column prop="headimgurl" label="头像" width="50" v-if="jnpf.hasP('fullName')">
              <template slot-scope="scope">
                <el-avatar shape="square" :size="20" :src="scope.row.headimgurl"
                  style="vertical-align:middle">
                </el-avatar>
              </template>
            </el-table-column>
            <el-table-column prop="nickname" label="昵称" width="150" v-if="jnpf.hasP('nickname')" />
            <el-table-column prop="sex" label="性别" width="50" v-if="jnpf.hasP('sex')">
              <template slot-scope="scope">
                {{scope.row.sex==1? "男" : "女"}}
              </template>
            </el-table-column>
            <el-table-column prop="country" label="国家" width="100" v-if="jnpf.hasP('country')" />
            <el-table-column prop="province" label="省份" width="100" v-if="jnpf.hasP('province')" />
            <el-table-column prop="city" label="城市" width="100" v-if="jnpf.hasP('city')" />
            <el-table-column prop="remark" label="备注" v-if="jnpf.hasP('remark')" />
            <el-table-column label="操作" fixed="right" width="240">
              <template slot-scope="scope">
                <el-button size="mini" type="text" @click="updateRemark(scope.row)"
                  v-has="'btn_remark'">修改备注</el-button>
                <el-button size="mini" type="text" @click="setTag(scope.row.openid)"
                  v-has="'btn_tagged'">设置标签</el-button>
                <el-button size="mini" type="text" v-has="'btn_black'"
                  @click="deleteBatchUnBlack(scope.$index,scope.row.openid)"
                  v-if="activeTab=='unblack'">移除黑名单</el-button>
                <el-button size="mini" type="text" class="JNPF-table-delBtn"
                  @click="addBatchBlack(scope.$index,scope.row.openid)" v-else
                  v-has="'btn_unblack'">加入黑名单</el-button>
              </template>
            </el-table-column>
          </JNPF-table>
          <pagination :total="total" :page.sync="listQuery.currentPage"
            :limit.sync="listQuery.pageSize" @pagination="initData" />
        </el-tabs>
      </div>
    </div>
    <tagTree v-if="tagTreeVisible" ref="tagTree" @refresh="getTreeView" />
  </div>
</template>

<script>
import { MPTagList, DeleteTag, UpdateTag } from '@/api/weChat/MPTag'
import { MPUserList, UpdateRemark, AddBatchBlack, DeleteBatchUnBlack } from '@/api/weChat/MPUser'
import tagTree from './TagTree'
export default {
  name: 'weChat-mpUser',
  components: { tagTree },
  data() {
    return {
      tagTreeVisible: false,
      keyword: '',
      defaultProps: {
        children: 'children',
        label: 'fullName'
      },
      list: [],
      listLoading: true,
      listQuery: {
        currentPage: 1,
        pageSize: 20,
        sort: 'desc'
      },
      formVisible: false,
      treeData: [],
      tagId: '',
      id: '',
      activeTab: '1',
      total: 0
    }
  },
  watch: {
    activeTab(val) {
      this.keyword = ''
      if (val == '1') {
        this.id = this.tagId
      } else {
        this.id = this.activeTab
      }
      this.initData()
    }
  },
  computed: {},
  created() {
    this.getTreeView()
  },
  methods: {
    getTreeView() {
      MPTagList().then(res => {
        this.treeData = res.data.list
        this.$nextTick(() => {
          this.tagId = this.treeData[0].id
          this.id = this.tagId
          this.$refs.treeBox.setCurrentKey(this.tagId);
          this.initData()
        });
      })
    },
    search() {
      this.listQuery = {
        currentPage: 1,
        pageSize: 20,
        sort: 'desc'
      }
      this.initData()
    },
    reset() {
      this.keyword = ''
      this.search()
    },
    initData() {
      this.listLoading = true
      let query = {
        ...this.listQuery,
        keyword: this.keyword
      }
      MPUserList(this.id, query).then(res => {
        this.list = res.data.list
        this.total = res.data.pagination.total
        this.listLoading = false
      })
    },
    setTag(openid) {
      this.tagTreeVisible = true
      this.$nextTick(() => {
        this.$refs.tagTree.init(openid)
      })
    },
    updateRemark(data) {
      this.$prompt('备注名', "修改备注", {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPlaceholder: '备注名',
        inputValue: data.remark,
        closeOnClickModal: false
      }).then(({ value }) => {
        UpdateRemark(data.openid, { remark: value }).then(res => {
          this.$message({
            type: 'success',
            message: res.msg
          });
          data.remark = value
        })
      }).catch(() => { });
    },
    rename(data) {
      this.$prompt('标签名', "编辑标签", {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPlaceholder: '标签名（必填）',
        inputErrorMessage: '标签名不能为空',
        inputValue: data.fullName,
        inputValidator: (val) => { if (!val) return false },
        closeOnClickModal: false
      }).then(({ value }) => {
        let tableInfo = {
          id: data.id,
          fullName: value
        }
        UpdateTag(tableInfo).then(res => {
          this.$message({
            type: 'success',
            message: res.msg
          });
          data.fullName = value
        })
      }).catch(() => { });
    },
    deleteTag(data) {
      // if (data.ChildNodes.length) {
      //   this.$message({
      //     type: 'error',
      //     message: '此记录被关联引用,不允许被删除!',
      //     duration: 1000
      //   });
      //   return
      // }
      this.$confirm('删除标签后该标签下的所有用户将失去该标签属性,是否继续?', '提示', {
        type: 'warning'
      }).then(() => {
        DeleteTag(data.id).then(res => {
          this.$message({
            type: 'success',
            message: res.msg
          });
          this.getTreeView()
        })
      }).catch(() => { });
    },
    addBatchBlack(index, openid) {
      this.$confirm('加入黑名单后，你不会再收到该用户的消息，且用户无法接收公众号发出的消息，无法参与留言和赞赏，是否继续?', '提示', {
        type: 'warning'
      }).then(() => {
        AddBatchBlack(openid).then(res => {
          this.$message({
            type: 'success',
            message: res.msg
          });
        })
      }).catch(() => { });
    },
    deleteBatchUnBlack(index, openid) {
      this.$confirm('您确定要移出黑名单，是否继续?', '提示', {
        type: 'warning'
      }).then(() => {
        DeleteBatchUnBlack(openid).then(res => {
          this.$message({
            type: 'success',
            message: res.msg
          });
          this.list.splice(index, 1)
        })
      }).catch(() => { });
    },
    // 新增 / 修改
    addOrUpdateHandle(id) {
      this.formVisible = true
      this.$nextTick(() => {
        this.$refs.JNPFForm.init(this.MPUserList, this.tagId, this.tagText, id)
      })
    },
    handleNodeClick(data) {
      if (this.tagId == data.id) return
      this.tagId = data.id
      this.id = this.tagId
      this.keyword = ''
      if (this.activeTab == '1') {
        this.initData()
      } else {
        this.activeTab = '1'
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.JNPF-common-layout-center {
  .JNPF-common-layout-main {
    padding: 0;
  }
}
>>> .el-tabs {
  height: calc(100% - 51px);
  .el-tabs__content {
    height: calc(100% - 40px);
    display: flex;
    flex-direction: column;
  }
}
</style>