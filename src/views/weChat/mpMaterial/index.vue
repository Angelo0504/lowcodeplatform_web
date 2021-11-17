<template>
  <div class="app-container MPMaterial-container JNPF-flex-main">
    <div class="JNPF-common-head">
      <topOpts @add="addOrUpdateHandle()" addText="上传素材"></topOpts>
      <div class="JNPF-common-head-right">
        <el-tooltip effect="dark" :content="$t('common.refresh')" placement="top">
          <el-link icon="icon-ym icon-ym-Refresh JNPF-common-head-icon" :underline="false"
            @click="reset()" />
        </el-tooltip>
        <screenfull />
      </div>
    </div>
    <el-tabs type="border-card" v-model="activeTab">
      <el-tab-pane label="图片" name="2">
        <JNPF-table v-loading="listLoading" :data="list">
          <el-table-column prop="uploadUser" label="上传用户" width="120" sortable />
          <el-table-column prop="enabledMark" label="状态" width="120" sortable>
            <template slot-scope="scope">
              <el-tag type="success" v-if="!scope.row.enabledMark">成功</el-tag>
              <el-tag type="danger" v-else>失败</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="上传时间" prop="uploadDate" width="120" sortable
            :formatter="jnpf.tableDateFormat" />
          <el-table-column label="图片" prop="fileJson" sortable>
            <template slot-scope="scope">
              <JNPFenlarge :img="define.comUrl+scope.row.returnUrl" />
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right" width="50">
            <template slot-scope="scope">
              <el-button size="mini" type="text" class="JNPF-table-delBtn"
                @click="handleDel(scope.$index,scope.row.mediaId)" v-has="'btn_remove'">删除
              </el-button>
            </template>
          </el-table-column>
        </JNPF-table>
        <pagination :total="total" :page.sync="listQuery.currentPage"
          :limit.sync="listQuery.pageSize" @pagination="initData" />
      </el-tab-pane>
      <el-tab-pane label="语音" name="3">
        <JNPF-table v-loading="listLoading" :data="list">
          <el-table-column prop="uploadUser" label="上传用户" width="120" sortable />
          <el-table-column prop="enabledMark" label="状态" width="120" sortable>
            <template slot-scope="scope">
              <el-tag type="success" v-if="!scope.row.enabledMark">成功</el-tag>
              <el-tag type="danger" v-else>失败</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="上传时间" prop="uploadDate" width="120" sortable
            :formatter="jnpf.tableDateFormat" />
          <el-table-column label="语音" prop="fileJson" sortable />
          <el-table-column label="操作" fixed="right" width="50">
            <template slot-scope="scope">
              <el-button size="mini" type="text" class="JNPF-table-delBtn"
                @click="handleDel(scope.$index,scope.row.mediaId)" v-has="'btn_remove'">
                删除</el-button>
            </template>
          </el-table-column>
        </JNPF-table>
        <pagination :total="total" :page.sync="listQuery.currentPage"
          :limit.sync="listQuery.pageSize" @pagination="initData" />
      </el-tab-pane>
      <el-tab-pane label="视频" name="4">
        <JNPF-table v-loading="listLoading" :data="list">
          <el-table-column label="标题" prop="title" width="150" sortable />
          <el-table-column prop="uploadUser" label="上传用户" width="120" sortable />
          <el-table-column prop="enabledMark" label="状态" width="120" sortable>
            <template slot-scope="scope">
              <el-tag type="success" v-if="!scope.row.enabledMark">成功</el-tag>
              <el-tag type="danger" v-else>失败</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="上传时间" prop="uploadDate" width="120" sortable
            :formatter="jnpf.tableDateFormat" />
          <el-table-column label="描述" prop="introduction" width="150" sortable />
          <el-table-column label="视频" prop="fileJson" sortable />
          <el-table-column label="操作" fixed="right" width="50">
            <template slot-scope="scope">
              <el-button size="mini" type="text" class="JNPF-table-delBtn"
                @click="handleDel(scope.$index,scope.row.mediaId)">删除</el-button>
            </template>
          </el-table-column>
        </JNPF-table>
        <pagination :total="total" :page.sync="listQuery.currentPage"
          :limit.sync="listQuery.pageSize" @pagination="initData" />
      </el-tab-pane>
      <el-tab-pane label="图文" name="5">
        <JNPF-table v-loading="listLoading" :data="list">
          <el-table-column label="标题" prop="title" width="150" sortable v-if="jnpf.hasP('title')">
          </el-table-column>
          <el-table-column prop="author" label="作者" width="120" sortable
            v-if="jnpf.hasP('author')" />
          <el-table-column prop="uploadUser" label="上传用户" width="120" sortable
            v-if="jnpf.hasP('uploadUser')" />
          <el-table-column prop="enabledMark" label="状态" width="120" sortable
            v-if="jnpf.hasP('enabledMark')">
            <template slot-scope="scope">
              <el-tag type="success" v-if="!scope.row.enabledMark">成功</el-tag>
              <el-tag type="danger" v-else>失败</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="上传时间" prop="uploadDate" width="120" sortable
            :formatter="jnpf.tableDateFormat" v-if="jnpf.hasP('uploadDate')" />
          <el-table-column label="描述" prop="digest" width="150" sortable
            v-if="jnpf.hasP('digest')" />
          <el-table-column label="原文链接" prop="contentSourceUrl" width="150" sortable
            v-if="jnpf.hasP('contentSourceUrl')" />
          <el-table-column label="封面" prop="fileJson" sortable width="150"
            v-if="jnpf.hasP('fileJson')">
            <template slot-scope="scope">
              <JNPFenlarge :img="define.comUrl+scope.row.returnUrl" />
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right" width="50">
            <template slot-scope="scope">
              <el-button size="mini" type="text" class="JNPF-table-delBtn"
                @click="handleDel(scope.$index,scope.row.mediaId)">删除</el-button>
            </template>
          </el-table-column>
        </JNPF-table>
        <pagination :total="total" :page.sync="listQuery.currentPage"
          :limit.sync="listQuery.pageSize" @pagination="initData" />
      </el-tab-pane>
    </el-tabs>
    <Form v-show="formVisible" ref="Form" @close="formVisible=false" @refresh="refresh" />
  </div>
</template>

<script>
import { MPMaterialList, DeleteForeverMedia } from '@/api/weChat/MPMaterial'
import Form from './Form'
import JNPFenlarge from "@/components/JNPF-enlarge";

export default {
  name: 'weChat-mpMaterial',
  components: { Form, JNPFenlarge },
  data() {
    return {
      formVisible: false,
      total: 0,
      listLoading: true,
      listQuery: {
        currentPage: 1,
        pageSize: 20,
        sort: 'desc',
        sidx: ""
      },
      list: [],
      activeTab: '2'
    }
  },
  watch: {
    activeTab(val) {
      this.reset()
    }
  },
  created() {
    this.initData()
  },
  methods: {
    reset() {
      this.list = []
      this.listQuery = {
        currentPage: 1,
        pageSize: 20,
        sort: 'desc'
      }
      this.initData()
    },
    initData() {
      this.listLoading = true
      MPMaterialList(this.activeTab, this.listQuery).then(res => {
        this.list = res.data.list
        this.total = res.data.pagination.total
        this.listLoading = false
      })
    },
    handleDel(index, id) {
      this.$confirm('您确定要删除此素材, 是否继续?', '提示', {
        type: 'warning'
      }).then(() => {
        DeleteForeverMedia(id).then(res => {
          this.list.splice(index, 1);
          this.$message({
            type: 'success',
            message: res.msg
          });
        })
      }).catch(() => { });
    },
    addOrUpdateHandle() {
      this.formVisible = true
      this.$nextTick(() => {
        this.$refs.Form.init()
      })
    },
    refresh() {
      this.formVisible = false
      this.reset()
    }
  }
}
</script>
<style lang="scss" scoped>
.MPMaterial-container {
  padding: 0;
  .JNPF-common-head {
    padding: 14px 10px;
  }
  >>> .el-tabs {
    height: calc(100% - 64px);
    .el-tabs__content {
      height: calc(100% - 40px);
      .el-tab-pane {
        height: 100%;
        display: flex;
        flex-direction: column;
      }
    }
  }
}
</style>