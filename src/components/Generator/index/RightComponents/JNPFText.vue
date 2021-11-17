<template>
  <el-row>
    <!-- <el-form-item label="字段名">
      <el-input v-model="activeData.__vModel__" placeholder="请输入字段名" readonly />
    </el-form-item> -->
    <el-form-item label="控件栅格">
      <el-slider v-model="activeData.__config__.span" :max="24" :min="6" show-stops :step="2"
        show-tooltip />
    </el-form-item>
    <el-form-item label="文本内容">
      <el-input v-model="activeData.__config__.defaultValue" placeholder="请输入文本内容" />
    </el-form-item>
    <!-- <el-form-item label="显示标签">
      <el-switch v-model="activeData.__config__.showLabel" />
    </el-form-item> -->
    <el-form-item label="行高">
      <el-input-number v-model="activeData.textStyle['line-height']" :min="12"
        placeholder="请输入行高" /> px
    </el-form-item>
    <el-form-item label="字体大小">
      <el-input-number v-model="activeData.textStyle['font-size']" :min="12"
        placeholder="请输入字体大小" /> px
    </el-form-item>
    <el-form-item label="对齐方式">
      <el-radio-group v-model="activeData.textStyle['text-align']">
        <el-radio-button label="left">左对齐</el-radio-button>
        <el-radio-button label="center">居中对齐</el-radio-button>
        <el-radio-button label="right">右对齐</el-radio-button>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="字体颜色">
      <el-color-picker v-model="activeData.textStyle['color']"></el-color-picker>
    </el-form-item>
    <el-form-item label="是否加粗">
      <el-switch v-model="activeData.textStyle['font-weight']" active-value="bold"
        inactive-value="normal" />
    </el-form-item>
    <el-form-item label="是否斜体">
      <el-switch v-model="activeData.textStyle['font-style']" active-value="italic"
        inactive-value="normal" />
    </el-form-item>
    <el-form-item label="下划线样式">
      <el-radio-group v-model="activeData.textStyle['text-decoration']">
        <el-radio-button label="none">无样式</el-radio-button>
        <el-radio-button label="underline">下划线</el-radio-button>
        <el-radio-button label="line-through">删除线</el-radio-button>
      </el-radio-group>
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