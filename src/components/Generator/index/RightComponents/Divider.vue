<template>
  <el-row>
    <el-form-item label="控件栅格">
      <el-slider v-model="activeData.__config__.span" :max="24" :min="6" show-stops :step="2"
        show-tooltip />
    </el-form-item>
    <el-form-item label="展示文本">
      <el-input :value="activeData.__slot__.default" @input="onDefaultValueInput"
        placeholder="显示在分割线上的文字" />
    </el-form-item>
    <el-form-item label="文本位置">
      <el-radio-group v-model="activeData['content-position']">
        <el-radio-button label="left">左边</el-radio-button>
        <el-radio-button label="center">中间</el-radio-button>
        <el-radio-button label="right">右边</el-radio-button>
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
  methods: {
    // 按钮
    onDefaultValueInput(str) {
      this.$set(
        this.activeData.__slot__,
        'default',
        str
      )
    },
  }
}
</script>