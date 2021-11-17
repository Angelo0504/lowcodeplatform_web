<template>
  <el-row :gutter="formConf.gutter"
    :class="formConf.formStyle?formConf.formStyle+' word-from-detail':''">
    <el-form :size="formConf.size" :label-position="formConf.labelPosition"
      :label-width="`${formConf.labelWidth}px`" :ref="formConf.formRef">
      <Item v-for="(item, index) in formConf.fields" :key="index" :item="item" v-bind="$props"
        v-on="$listeners" />
    </el-form>
  </el-row>
</template>
<script>

import Item from './Item'
export default {
  components: { Item },
  props: {
    formConf: {
      type: Object,
      required: true
    },
    relationData: {
      type: Object,
      default: () => { }
    },
    loading: {
      type: Boolean,
      default: false
    }
  }
}
</script>