<template>
  <el-row>
    <!-- <el-form-item label="字段名">
      <el-input v-model="activeData.__vModel__" placeholder="请输入字段名" readonly />
    </el-form-item> -->
    <el-form-item label="标题名">
      <el-input v-model="activeData.__config__.label" placeholder="请输入标题名" />
    </el-form-item>
    <el-form-item label="占位提示">
      <el-input v-model="activeData.placeholder" placeholder="请输入占位提示" />
    </el-form-item>
    <el-form-item label="控件栅格">
      <el-slider v-model="activeData.__config__.span" :max="24" :min="6" show-stops :step="2"
        show-tooltip />
    </el-form-item>
    <el-form-item label="标题宽度">
      <el-input v-model.number="activeData.__config__.labelWidth" type="number"
        placeholder="请输入标题宽度" />
    </el-form-item>
    <!-- <el-form-item label="组件宽度">
      <el-input v-model="activeData.style.width" placeholder="请输入组件宽度" clearable />
    </el-form-item> -->
    <el-form-item label="默认值">
      <el-input-number v-model="activeData.__config__.defaultValue" placeholder="默认值"
        :min="activeData.min" :max="activeData.max" :step="activeData.step"
        :precision="activeData.precision" style="width:100%" />
    </el-form-item>
    <!-- <el-form-item label="最小值">
      <el-input-number v-model="activeData.min" placeholder="最小值" />
    </el-form-item>
    <el-form-item label="最大值">
      <el-input-number v-model="activeData.max" placeholder="最大值" />
    </el-form-item>
    <el-form-item label="步长">
      <el-input-number v-model="activeData.step" placeholder="步数" :min="1" />
    </el-form-item> -->
    <el-form-item label="精度">
      <el-input-number v-model="activeData.precision" :min="0" placeholder="精度" />
    </el-form-item>
    <el-form-item label="按钮位置">
      <el-radio-group v-model="activeData['controls-position']">
        <el-radio-button label="">默认</el-radio-button>
        <el-radio-button label="right">右侧</el-radio-button>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="显示大写">
      <el-switch v-model="activeData.showChinese" />
    </el-form-item>
    <!-- <el-form-item label="严格步数">
      <el-switch v-model="activeData['step-strictly']" />
    </el-form-item> -->
    <!-- <el-form-item label="显示标签">
      <el-switch v-model="activeData.__config__.showLabel" />
    </el-form-item> -->
    <el-form-item label="是否禁用">
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
  created() { },
  methods: {}
}
</script>