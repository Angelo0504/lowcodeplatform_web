<template>
  <el-row>
    <el-form-item label="标题名">
      <el-input v-model="activeData.__config__.label" placeholder="请输入标题名" />
    </el-form-item>
    <el-form-item label="控件栅格">
      <el-slider v-model="activeData.__config__.span" :max="24" :min="6" show-stops :step="2"
        show-tooltip />
    </el-form-item>
    <el-form-item label="标题宽度">
      <el-input v-model.number="activeData.__config__.labelWidth" type="number"
        placeholder="请输入标题宽度" />
    </el-form-item>
    <el-form-item label="关联流程">
      <el-select v-model="activeData.relationField" placeholder="请选择关联流程" clearable>
        <el-option v-for="item in options" :key="item.__vModel__" :label="item.__config__.label"
          :value="item.__vModel__" />
      </el-select>
    </el-form-item>
    <el-form-item label="关联字段">
      <el-select v-model="activeData.showField" placeholder="请选择关联字段"
        @visible-change="visibleChange" clearable>
        <el-option v-for="item in fieldOptions" :key="item.vmodel" :label="item.label"
          :value="item.vmodel" />
      </el-select>
    </el-form-item>
  </el-row>
</template>
<script>
import { getFormDataFields } from '@/api/workFlow/FlowEngine'
import comMinix from './minix'
import { getDrawingList } from '@/components/Generator/utils/db'
export default {
  props: ['activeData'],
  mixins: [comMinix],
  data() {
    return {
      options: [],
      fieldOptions: [],
    }
  },
  watch: {
    'activeData.relationField': function (val) {
      this.activeData.showField = ''
      if (!val) {
        this.fieldOptions = []
        return
      }
      this.getFieldOptions()
    }
  },
  methods: {
    getOptions() {
      const drawingList = getDrawingList() || []
      let list = []
      const loop = (data, parent) => {
        if (!data) return
        if (data.__config__ && data.__config__.children && Array.isArray(data.__config__.children)) {
          loop(data.__config__.children, data)
        }
        if (Array.isArray(data)) data.forEach(d => loop(d, parent))
        if (data.__config__ && data.__config__.jnpfKey) {
          if (data.__config__.jnpfKey === 'relationFlow' && data.__vModel__) {
            list.push(data)
          }
        }
      }
      loop(drawingList)
      this.options = list
      this.getFieldOptions()
    },
    getFieldOptions() {
      if (!this.activeData.relationField || !this.options.length) return
      let item = this.options.filter(o => o.__vModel__ === this.activeData.relationField)[0]
      if (!item.flowId) return
      getFormDataFields(item.flowId).then(res => {
        this.fieldOptions = res.data.list
      })
    },
    visibleChange(val) {
      if (!val) return
      if (!this.activeData.relationField) this.$message.warning('请先选择关联流程')
    }
  }
}
</script>