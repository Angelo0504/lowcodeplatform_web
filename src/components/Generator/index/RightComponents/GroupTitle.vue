<template>
  <el-row>
    <el-form-item label="控件栅格">
      <el-slider v-model="activeData.__config__.span" :max="24" :min="6" show-stops :step="2"
        show-tooltip />
    </el-form-item>
    <el-form-item label="标题">
      <el-input v-model="activeData.content" placeholder="请输入标题" />
    </el-form-item>
    <el-form-item label="对齐方式">
      <el-radio-group v-model="activeData['content-position']">
        <el-radio-button label="left">左对齐</el-radio-button>
        <el-radio-button label="center">居中对齐</el-radio-button>
        <el-radio-button label="right">右对齐</el-radio-button>
      </el-radio-group>
    </el-form-item>
  </el-row>
</template>
<script>
export default {
  props: ['activeData']
}
</script>