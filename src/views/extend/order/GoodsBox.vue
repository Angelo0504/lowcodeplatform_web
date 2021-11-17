<template>
  <el-dialog title="选择商品" :close-on-click-modal="false" :visible.sync="visible"
    class="JNPF-dialog JNPF-dialog_center" lock-scroll append-to-body width="700px">
    <el-row class="JNPF-common-search-box" :gutter="16">
      <el-form @submit.native.prevent>
        <el-col :span="10">
          <el-form-item label="关键词">
            <el-input v-model="keyword" placeholder="请输入关键词查询" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="init()">{{$t('common.search')}}
            </el-button>
            <el-button icon="el-icon-refresh-right" @click="refresh()">{{$t('common.reset')}}
            </el-button>
          </el-form-item>
        </el-col>
      </el-form>
      <div class="JNPF-common-search-box-right">
        <el-tooltip effect="dark" :content="$t('common.refresh')" placement="top">
          <el-link icon="icon-ym icon-ym-Refresh JNPF-common-head-icon" :underline="false"
            @click="refresh()" />
        </el-tooltip>
      </div>
    </el-row>
    <JNPF-table v-loading="listLoading" :data="list" hasC @selection-change="handleSelectionChange"
      :border="false">
      <el-table-column prop="text" label="商品名称" width="200" />
      <el-table-column prop="code" label="商品编码" />
      <el-table-column prop="specifications" label="规格型号" />
      <el-table-column prop="unit" label="单位" />
      <el-table-column prop="price" label="售价" />
    </JNPF-table>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">{{$t('common.cancelButton')}}</el-button>
      <el-button type="primary" @click="select()">{{$t('common.confirmButton')}}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { GoodsList } from '@/api/extend/order'
export default {
  data() {
    return {
      visible: false,
      listLoading: true,
      keyword: '',
      list: [],
      total: 0,
      checked: []
    }
  },
  methods: {
    init() {
      this.visible = true
      this.listLoading = true
      let query = { keyword: this.keyword }
      GoodsList(query).then(res => {
        this.list = res.data.list
        this.listLoading = false
      })
    },
    refresh() {
      this.keyword = ''
      this.init()
    },
    select() {
      if (!this.checked.length) return
      this.visible = false
      this.$emit('refreshDataList', this.checked)
    },
    handleSelectionChange(val) {
      this.checked = val
    }
  }
}
</script>
<style lang="scss" scoped>
>>> .el-dialog__body {
  height: 70vh;
  padding: 0 0 10px !important;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .JNPF-common-search-box {
    margin-bottom: 0;
    .JNPF-common-search-box-right {
      padding: 10px 10px 0 0;
    }
  }
}
</style>