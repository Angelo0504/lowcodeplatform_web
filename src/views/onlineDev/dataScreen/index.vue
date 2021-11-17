<template>
  <div class="JNPF-common-layout">
    <div class="JNPF-common-layout-center">
      <el-row class="JNPF-common-search-box" :gutter="16">
        <el-form @submit.native.prevent>
          <el-col :span="6">
            <el-form-item label="大屏分类">
              <JNPF-TreeSelect v-model="params.categoryId" :options="treeData" :props="defaultProps"
                placeholder="选择分类" clearable style="width: 100%" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="关键词">
              <el-input v-model="params.keyword" placeholder="请输入关键词查询" clearable />
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
        <div class="data-list">
          <el-row :gutter="16">
            <el-col :sm="12" :md="8" :lg="6" :xl="4" v-has="'btn_add'">
              <div class="add" @click="handleAddEdit()">
                <div class="border">
                  <div>
                    <i class="el-icon-plus" />
                    <p>新建大屏</p>
                  </div>
                </div>
              </div>
            </el-col>
            <el-col :sm="12" :md="8" :lg="6" :xl="4" v-for="item in listData" :key="item.id">
              <div class="item">
                <div class="imgBox">
                  <img :src="define.comUrl + '/api/visualdev/DataScreen/Images/screenShot/' + item.screenShot" />
                </div>
                <h3 class="title">
                  <span class="txt">
                    <el-tooltip effect="dark" :content="item.fullName" placement="bottom">
                      <span>{{item.fullName}}</span>
                    </el-tooltip>
                  </span>
                  <span>
                    <el-switch v-model="item.enabledMark" :active-value="1" :inactive-value="0"
                      @click.native="handleUpdateState(item)" disabled class="table-switch" />
                  </span>
                </h3>
                <div class="info">
                  <el-link :underline="false" icon="el-icon-edit-outline"
                    @click="handleAddEdit(item.id)" v-has="'btn_edit'">编辑</el-link>
                  <el-link :underline="false" icon="el-icon-delete" @click="handleDel(item.id)"
                    v-has="'btn_remove'">删除</el-link>
                  <el-link :underline="false" icon="el-icon-copy-document"
                    @click="handleCopy(item.id)" v-has="'btn_copy'">复制</el-link>
                  <el-link :underline="false" icon="el-icon-view" @click="handleView(item.id)"
                    v-has="'btn_preview'">预览</el-link>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
        <pagination :total="total" :page.sync="params.currentPage" :limit.sync="params.pageSize"
          @pagination="initData" />
      </div>
    </div>
    <Form v-if="formVisible" ref="Form" @refreshDataList="initData" />
  </div>
</template>
<script>
import {
  getDataVList,
  delDataV,
  copyDataV,
  updateDataVState
} from '@/api/onlineDev/dataV'
import Form from './Form'
import { getToken } from '@/utils/auth'

export default {
  name: 'onlineDev-dataScreen',
  components: { Form },
  data() {
    return {
      value: true,
      defaultProps: {
        value: 'id',
        children: 'children',
        label: 'fullName'
      },
      params: {
        keyword: '',
        currentPage: 1,
        pageSize: 20,
        categoryId: ''
      },
      total: 0,
      treeLoading: false,
      btnLoading: false,
      treeData: [],
      listData: [],
      formVisible: false
    }
  },
  created() {
    this.initData()
  },
  methods: {
    initData() {
      this.treeLoading = true
      // 获取大屏分类
      this.$store.dispatch('base/getDictionaryData', { sort: 'dataVType' }).then(res => {
        this.treeData = res
        this.$nextTick(() => {
          this.treeLoading = false
          this.getList()
        })
      }).catch(() => {
        this.treeLoading = false
      })
    },
    getList() {
      const loading = this.$loading({
        target: '.data-list',
        lock: true,
        text: '数据加载中',
        fullscreen: false,
        spinner: 'el-icon-loading'
      })
      this.btnLoading = true
      getDataVList(this.params).then(res => {
        this.listData = res.data.list
        this.total = res.data.pagination.total
        loading.close()
        this.btnLoading = false
      }).catch(() => {
        loading.close()
        this.btnLoading = false
      })
    },
    handleUpdateState(item) {
      if (!this.jnpf.hasBtnP('btn_edit')) return this.$message.warning(this.$t('common.noPerTip'))
      const txt = item.enabledMark ? '禁用' : '开启'
      this.$confirm(`您确定要${txt}当前大屏吗, 是否继续?`, '提示', {
        type: 'warning'
      }).then(() => {
        updateDataVState(item.id).then(res => {
          this.$message({
            type: 'success',
            message: res.msg,
            duration: 1000,
            onClose: () => {
              item.enabledMark = item.enabledMark ? 0 : 1
            }
          })
        })
      }).catch(() => { })
    },
    handleAddEdit(id) {
      this.formVisible = true
      this.$nextTick(() => {
        this.$refs.Form.init(id)
      })
    },
    handleView(id) {
      const token = getToken()
      const viewUrl = `${this.define.dataV}/view/${id}?token=${token}`
      window.open(viewUrl, '_blank')
    },
    handleCopy(id) {
      copyDataV(id).then(res => {
        this.$message({
          type: 'success',
          message: res.msg,
          duration: 1500,
          onClose: () => {
            this.getList()
          }
        })
      })
    },
    handleDel(id) {
      this.$confirm(this.$t('common.delTip'), this.$t('common.tipTitle'), {
        type: 'warning'
      }).then(() => {
        delDataV(id).then(res => {
          this.$message({
            type: 'success',
            message: res.msg,
            duration: 1500,
            onClose: () => {
              this.getList()
            }
          })
        })
      }).catch(() => { })
    },
    search() {
      this.params.currentPage = 1
      this.params.pageSize = 20
      this.params.sort = 'desc'
      this.getList()
    },
    reset() {
      this.params.keyword = ''
      this.search()
    }
  }
}
</script>
<style lang="scss" scoped>
.data-list {
  padding: 0 6px 0 6px;
  margin-top: 20px;
  height: calc(100% - 56px);
  overflow: auto;
  overflow-x: hidden;
  .el-row {
    margin: 0 5px !important;
  }
  .add {
    width: 100%;
    height: 246px;
    border-radius: 4px;
    box-shadow: 0 3px 6px 0 #cfcfcf;
    color: #606266;
    padding: 16px;
    margin-bottom: 15px;
    cursor: pointer;
    .border {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      width: 100%;
      border: 1px dashed #dcdfe6;
    }
    i {
      display: block;
      text-align: center;
      font-size: 40px;
      padding-bottom: 10px;
    }
  }
  .item {
    width: 100%;
    height: 246px;
    margin-bottom: 16px;
    overflow: hidden;
    border: 1px solid #f5f7fa;
    border-radius: 4px;
    box-shadow: 0px 3px 6px 0px #cfcfcf;
    color: #606266;
    .imgBox {
      height: 156px;
      overflow: hidden;
      img {
        width: 100%;
        height: 156px;
        overflow: hidden;
      }
    }
    h3.title {
      height: 40px;
      line-height: 40px;
      font-weight: normal;
      font-size: 14px;
      padding: 0 10px;
      display: flex;
      justify-content: space-between;
      .txt {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .info {
      background-color: #f5f7fa;
      height: 50px;
      line-height: 50px;
      padding: 0 15px;
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      span {
        cursor: pointer;
        &:hover {
        }
      }
      i {
        padding-right: 6px;
        font-size: 13px;
      }
    }
    &:hover {
      // border: 1px solid #CFCFCF;
    }
  }
}
</style>
