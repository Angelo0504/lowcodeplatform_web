<template>
  <el-row>
    <!-- <el-form-item label="字段名">
      <el-input v-model="activeData.__vModel__" placeholder="请输入字段名" readonly />
    </el-form-item> -->
    <el-form-item label="标题名">
      <el-input v-model="activeData.__config__.label" placeholder="请输入标题名" />
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
    <el-form-item label="默认值">
      <el-color-picker v-model="activeData.__config__.defaultValue"
        :color-format="activeData['color-format']" :key="renderKey" :show-alpha="showAlpha">
      </el-color-picker>
    </el-form-item>
    <!-- <el-form-item label="显示标签">
      <el-switch v-model="activeData.__config__.showLabel" />
    </el-form-item> -->
    <el-form-item label="颜色格式">
      <el-select v-model="activeData['color-format']" placeholder="请选择颜色格式"
        :style="{ width: '100%' }" clearable @change="colorFormatChange">
        <el-option v-for="(item, index) in colorFormatOptions" :key="index" :label="item.label"
          :value="item.value" />
      </el-select>
    </el-form-item>
    <el-form-item label="组件尺寸">
      <el-radio-group v-model="activeData.size">
        <el-radio-button label="medium">中等</el-radio-button>
        <el-radio-button label="small">较小 </el-radio-button>
        <el-radio-button label="mini">迷你</el-radio-button>
      </el-radio-group>
    </el-form-item>
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
    return {
      colorFormatOptions: [
        {
          label: 'hex',
          value: 'hex'
        },
        {
          label: 'rgb',
          value: 'rgb'
        },
        {
          label: 'rgba',
          value: 'rgba'
        },
        {
          label: 'hsv',
          value: 'hsv'
        },
        {
          label: 'hsl',
          value: 'hsl'
        }
      ],
      renderKey: +new Date(),
      showAlpha: false
    }
  },
  created() { },
  methods: {
    colorFormatChange(val) {
      this.activeData.__config__.defaultValue = null
      this.activeData['show-alpha'] = val.indexOf('a') > -1
      this.activeData.__config__.renderKey = +new Date() // 更新renderKey,重新渲染该组件
      this.showAlpha = val.indexOf('a') > -1
      this.renderKey = +new Date()
    }
  }
}
</script>