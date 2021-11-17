<template>
  <div class="comSelect-container">
    <JNPF-TreeSelect :options="treeData" v-model="innerValue" :placeholder="placeholder" clearable
      :disabled="disabled" v-on="$listeners" :multiple="multiple">
    </JNPF-TreeSelect>
  </div>
</template>

<script>
export default {
  name: 'comSelect',
  props: ["value", "disabled", "placeholder", "multiple"],
  model: {
    prop: 'value',
    event: 'input'
  },
  data() {
    return {
      treeData: [],
      innerValue: this.value
    }
  },
  methods: {
    async getData() {
      this.treeData = await this.$store.dispatch('generator/getCompanyTree')
    }
  },
  created() {
    this.getData()
  },
  watch: {
    innerValue(val) {
      val && this.$emit('change', val)
    },
    value(val) {
      this.innerValue = val
    }
  }
}
</script>
<style lang="scss">
.comSelect-container {
  .el-select {
    width: 100%;
  }
}
</style>