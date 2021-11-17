<template>
  <el-select v-model="innerValue" v-bind="$attrs" v-on="$listeners" @change="onChange"
    class="relationForm-select">
    <el-option v-for="item in options" :key="item.id" :label="item.fullName" :value="item.id" />
  </el-select>
</template>

<script>
import { getFieldDataSelect, getDataChange } from '@/api/onlineDev/visualDev'
export default {
  name: 'relationForm',
  props: ["value", "modelId", "relationField", "field"],
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
    if (!this.modelId || !this.relationField) return
    getFieldDataSelect(this.modelId, { field: this.relationField }).then(res => {
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
      if (!this.field || !this.modelId) return
      let relationData = this.$store.state.generator.relationData
      if (val) {
        getDataChange(this.modelId, val).then(res => {
          if (!res.data || !res.data.data) return
          let data = JSON.parse(res.data.data)
          this.$set(relationData, this.field, data)
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
.relationForm-select {
  width: 100%;
}
</style>