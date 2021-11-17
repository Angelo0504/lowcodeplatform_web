<template>
  <div class="app-container TableTree-container">
    <JNPF-table v-loading="listLoading" :data="industryTypeList" row-key="id"
      :tree-props="{children: 'children', hasChildren: ''}" default-expand-all>
      <el-table-column prop="fullName" label="名称" />
      <el-table-column prop="id" label="编码" />
    </JNPF-table>
  </div>
</template>

<script>
export default {
  name: 'extend-tableDemo-tableTree',
  data() {
    return {
      keyword: '',
      list: [],
      listLoading: true,
      industryTypeList: []
    }
  },
  created() {
    this.getDictionaryData()
  },
  methods: {
    getDictionaryData() {
      this.$store.dispatch('base/getDictionaryData', { sort: 'IndustryType' }).then((res) => {
        this.industryTypeList = res
        this.initData()
      })
    },
    initData() {
      this.listLoading = true
      this.list = this.industryTypeList
      this.listLoading = false
    },
    search() {
      console.log(this.keyword);
    }
  }
}
</script>
<style lang="scss" scoped>
.TableTree-container {
  padding: 0;
}
</style>