<template>
  <el-drawer title="常用字段管理" :visible.sync="drawer" :wrapperClosable="false" size="700px"
    class="JNPF-common-drawer">
    <div class="JNPF-flex-main">
      <div class="JNPF-common-head">
        <topOpts @add="addOrUpdateHandle()"></topOpts>
        <div class="JNPF-common-head-right">
          <el-tooltip effect="dark" :content="$t('common.refresh')" placement="top">
            <el-link icon="icon-ym icon-ym-Refresh
              JNPF-common-head-icon" :underline="false" @click="initData()" />
          </el-tooltip>
        </div>
      </div>
      <JNPF-table v-loading="listLoading" :data="list">
        <el-table-column prop="field" label="列名" />
        <el-table-column prop="fieldName" label="说明" width="110px" />
        <el-table-column prop="dataType" label="类型" width="80px">
          <template slot-scope="scope">
            {{ scope.row.dataType | getTypeText(options) }}
          </template>
        </el-table-column>
        <el-table-column prop="dataLength" label="长度" width="60px" />
        <el-table-column prop="allowNull" label="允许空" width="60px" align="center">
          <template slot-scope="scope">
            <el-checkbox :value='scope.row.allowNull===1' />
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <tableOpts @edit="addOrUpdateHandle(scope.row.id)"
              @del="handleDel(scope.row.id,scope.$index)">
            </tableOpts>
          </template>
        </el-table-column>
      </JNPF-table>
      <Form v-if="formVisible" ref="Form" @refreshDataList="initData" />
    </div>
  </el-drawer>
</template>
<script>
import { getList, Delete } from '@/api/systemData/commonFields'
import Form from './Form'

export default {
  components: { Form },
  data() {
    return {
      drawer: false,
      listLoading: false,
      formVisible: false,
      list: [],
      options: [
        { label: '字符串', value: 'varchar' },
        { label: '整型', value: 'int' },
        { label: '日期时间', value: 'datetime' },
        { label: '浮点', value: 'decimal' },
        { label: '长整型', value: 'bigint' },
        { label: '文本', value: 'text' }
      ]
    }
  },
  filters: {
    getTypeText(type, options) {
      let item = options.filter(o => o.value == type)[0]
      return item && item.label ? item.label : ''
    }
  },
  methods: {
    init() {
      this.drawer = true
      this.$nextTick(() => {
        this.initData()
      })
    },
    initData() {
      this.list = []
      this.listLoading = true
      getList().then(res => {
        this.list = res.data.list
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
    },
    addOrUpdateHandle(id) {
      this.formVisible = true
      this.$nextTick(() => {
        this.$refs.Form.init(id)
      })
    },
    handleDel(id, index) {
      Delete(id).then(res => {
        this.$message({
          type: 'success',
          message: res.msg,
          duration: 1000,
          onClose: () => {
            this.list.splice(index, 1);
          }
        })
      })
    }
  }
}
</script>
