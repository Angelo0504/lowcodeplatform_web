<template>
  <div class="billRule-container">
    <el-select v-model="innerValue" filterable :placeholder="placeholder" clearable
      :disabled="disabled" v-on="$listeners">
      <el-option v-for="item in options" :key="item.enCode" :label="item.fullName"
        :value="item.enCode">
      </el-option>
    </el-select>
  </div>
</template>

<script>
import { getBillRuleSelector } from '@/api/system/billRule'
export default {
  name: 'billRule',
  props: ["value", "disabled", "placeholder"],
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
  methods: {
    getData() {
      getBillRuleSelector().then(res => {
        this.options = res.data.list
      })
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