<template>
  <el-row>
    <!-- <el-form-item label="字段名">
      <el-input v-model="activeData.__vModel__" placeholder="请输入字段名" readonly />
    </el-form-item> -->
    <el-form-item label="标题名">
      <el-input v-model="activeData.__config__.label" placeholder="请输入标题名" />
    </el-form-item>
    <el-form-item label="占位提示" v-if="activeData.__config__.jnpfKey !=='editor'">
      <el-input v-model="activeData.placeholder" placeholder="请输入占位提示" />
    </el-form-item>
    <template v-if="!activeData.__config__.isSubTable">
      <el-form-item label="控件栅格">
        <el-slider v-model="activeData.__config__.span" :max="24" :min="6" show-stops :step="2"
          show-tooltip />
      </el-form-item>
      <el-form-item label="标题宽度">
        <el-input v-model.number="activeData.__config__.labelWidth" type="number"
          placeholder="请输入标题宽度" />
      </el-form-item>
    </template>
    <el-form-item label="控件宽度" v-if="activeData.__config__.isSubTable">
      <el-input-number v-model="activeData.__config__.columnWidth" placeholder="控件宽度" :min="0"
        :precision="0" /> px
    </el-form-item>
    <!-- <el-form-item label="组件宽度">
      <el-input v-model="activeData.style.width" placeholder="请输入组件宽度" clearable />
    </el-form-item> -->
    <el-form-item label="默认值">
      <com-select v-model="activeData.__config__.defaultValue" placeholder="选择默认值"
        v-if="activeData.__config__.jnpfKey==='comSelect'" :multiple="activeData.multiple" />
      <dep-select v-model="activeData.__config__.defaultValue" placeholder="选择默认值"
        v-if="activeData.__config__.jnpfKey==='depSelect'" :multiple="activeData.multiple" />
      <pos-select v-model="activeData.__config__.defaultValue" placeholder="选择默认值"
        v-if="activeData.__config__.jnpfKey==='posSelect'" :multiple="activeData.multiple" />
      <user-select v-model="activeData.__config__.defaultValue" placeholder="选择默认值"
        v-if="activeData.__config__.jnpfKey==='userSelect'" :multiple="activeData.multiple" />
      <dic-select v-model="activeData.__config__.defaultValue" placeholder="选择默认值"
        v-if="activeData.__config__.jnpfKey==='dicSelect'" />
      <BillRule v-model="activeData.__config__.defaultValue" placeholder="选择默认值"
        v-if="activeData.__config__.jnpfKey==='billRule'" />
      <el-input :value="setDefaultValue(activeData.__config__.defaultValue)" placeholder="请输入默认值"
        @input="onDefaultValueInput" v-if="activeData.__config__.jnpfKey==='editor'" />
    </el-form-item>
    <!-- <el-form-item label="显示标签">
      <el-switch v-model="activeData.__config__.showLabel" />
    </el-form-item> -->
    <el-form-item label="是否多选" v-if="needMultiple">
      <el-switch v-model="activeData.multiple" @change="multipleChange" />
    </el-form-item>
    <el-form-item label="是否禁用" v-if="activeData.__config__.jnpfKey !=='editor'">
      <el-switch v-model="activeData.disabled" />
    </el-form-item>
    <el-form-item label="是否必填">
      <el-switch v-model="activeData.__config__.required" />
    </el-form-item>
  </el-row>
</template>
<script>
import comMinix from './minix';
export default {
  props: ['activeData'],
  mixins: [comMinix],
  data() {
    return {}
  },
  computed: {
    needMultiple() {
      return ['posSelect', 'userSelect', 'comSelect', 'depSelect'].indexOf(this.activeData.__config__.jnpfKey) > -1
    },
  },
  created() { },
  methods: {
    multipleChange(val) {
      this.$set(this.activeData.__config__, 'defaultValue', '')
    }
  }
}
</script>