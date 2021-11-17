<template>
  <div>
    <el-input v-model="value" placeholder="用于展示关联流程表单的属性，且数据不会保存" readonly v-if="!isDetail" />
    <p v-else>{{value}}</p>
  </div>
</template>

<script>
export default {
  name: 'relationFormAttr',
  props: ["showField", "relationField", 'isDetail'],
  data() {
    return {
      value: ''
    }
  },
  computed: {
    relationData() {
      return this.$store.state.generator.relationData
    }
  },
  watch: {
    relationData: {
      handler(val) {
        if (!this.showField || !this.relationField) return
        let obj = val[this.relationField] || {}
        this.value = obj[this.showField] ? obj[this.showField] : ''
      },
      deep: true
    }
  }
}
</script>