<template>
  <el-tooltip :content="$t('common.columnSettings')" placement="top">
    <el-popover width="200" popper-class="columnSetting-popover">
      <el-link icon="icon-ym icon-ym-options JNPF-common-head-icon" :underline="false"
        slot="reference" />
      <JNPF-table :data="data" class="columnTable" :hasNO="false" size="mini" ref="columnTable"
        @selection-change="columnSelectionChange" @row-click="handleRowClick">
        <el-table-column prop="label" label="列表字段" />
        <el-table-column type="selection" width="50" align="center" />
      </JNPF-table>
    </el-popover>
  </el-tooltip>
</template>

<script>
export default {
  name: 'ColumnSettings',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: Array,
    data: {
      type: Array,
      default: () => []
    }
  },
  mounted() {
    this.$refs.columnTable.$refs.JNPFTable.toggleAllSelection()
  },
  methods: {
    handleRowClick(row) {
      this.$refs.columnTable.$refs.JNPFTable.toggleRowSelection(row)
    },
    columnSelectionChange(val) {
      this.$emit('change', val)
    }
  }
}
</script>
<style lang="scss">
.columnSetting-popover {
  padding: 0 !important;
}
</style>