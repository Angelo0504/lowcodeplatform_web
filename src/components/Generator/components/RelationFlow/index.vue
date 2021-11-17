<template>
  <el-select v-model="innerValue" v-bind="$attrs" v-on="$listeners" @change="onChange"
    class="relationFlow-select">
    <el-option v-for="item in options" :key="item.id" :label="item.fullName" :value="item.id" />
  </el-select>
</template>

<script>
import { FieldDataSelect, getFlowTaskData } from '@/api/workFlow/FlowEngine'
export default {
  name: 'relationFlow',
  props: ["value", "flowId", "field"],
  model: {
    prop: 'value',
    event: 'change'
  },
  data() {
    return {
      options: [],
      innerValue: this.value
    }
  },
  created() {
    if (!this.flowId) return
    FieldDataSelect(this.flowId).then(res => {
      this.options = res.data.list
    })
    this.onChange(this.innerValue)
  },
  watch: {
    innerValue(val) {
      val && this.$emit('change', val)
    },
    value(val) {
      this.innerValue = val
    }
  },
  methods: {
    onChange(val) {
      if (!this.field || !this.flowId) return
      let relationData = this.$store.state.generator.relationData
      if (val) {
        getFlowTaskData(this.flowId, val).then(res => {
          if (!res.data) return
          this.$set(relationData, this.field, res.data)
          this.$store.commit('generator/UPDATE_RELATION_DATA', relationData)
        })
      } else {
        this.$set(relationData, this.field, {})
        this.$store.commit('generator/UPDATE_RELATION_DATA', relationData)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.relationFlow-select {
  width: 100%;
}
</style>