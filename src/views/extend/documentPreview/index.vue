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
        <JNPF-table v-loading="listLoading" :data="list">
          <el-table-column label="文件名称">
            <template slot-scope="scope">
              <el-link @click="readInfo(scope.row.fileId,scope.row.fileName)"
                style="font-size:12px">
                {{ scope.row.fileName }}
              </el-link>
            </template>
          </el-table-column>
          <el-table-column prop="fileType" label="文件类型" width="130" />
          <el-table-column prop="fileSize" label="文件大小" width="130" />
          <el-table-column prop="fileTime" label="最后执行时间" :formatter="jnpf.tableDateFormat"
            width="130" />
        </JNPF-table>
      </div>
    </div>
    <Detail v-show="detailVisible" ref="detail" @close="detailVisible=false" />
  </div>
</template>

<script>
import { DocumentPreviewList } from '@/api/extend/documentPreview'
import Detail from './Detail'
export default {
  components: { Detail },
  name: 'extend-documentPreview',
  data() {
    return {
      detailVisible: false,
      keyword: '',
      list: [],
      listLoading: true,
      formVisible: false
    }
  },
  created() {
    this.initData()
  },
  methods: {
    initData() {
      this.listLoading = true
      let query = { keyword: this.keyword }
      DocumentPreviewList(query).then(res => {
        this.list = res.data
        this.listLoading = false
      })
    },
    readInfo(id, name) {
      this.detailVisible = true
      this.$nextTick(() => {
        this.$refs.detail.init(id, name)
      })
    },
    reset() {
      this.keyword = ''
      this.initData()
    }
  }
}
</script>
<style lang="scss" scoped>
</style>