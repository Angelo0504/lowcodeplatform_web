<template>
  <el-row>
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
    <el-form-item label="关联功能">
      <JNPF-TreeSelect :options="treeData" v-model="activeData.modelId" placeholder="请选择关联功能"
        lastLevel clearable />
    </el-form-item>
    <el-form-item label="显示字段">
      <el-select v-model="activeData.relationField" placeholder="请选择显示字段"
        @visible-change="visibleChange" clearable>
        <el-option v-for="item in fieldOptions" :key="item.vmodel" :label="item.label"
          :value="item.vmodel" />
      </el-select>
    </el-form-item>
    <el-form-item label="能否清空">
      <el-switch v-model="activeData.clearable" />
    </el-form-item>
    <el-form-item label="能否搜索">
      <el-switch v-model="activeData.filterable" />
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
import { getFeatureSelector, getFormDataFields } from '@/api/onlineDev/visualDev'
import comMinix from './minix'
export default {
  props: ['activeData'],
  mixins: [comMinix],
  data() {
    return {
      treeData: [],
      fieldOptions: []
    }
  },
  watch: {
    'activeData.modelId': function (val) {
      this.activeData.relationField = ''
      this.$emit('relationChange', this.activeData.__vModel__)
      if (!val) {
        this.fieldOptions = []
        return
      }
      this.getFieldOptions()
    }
  },
  created() {
    this.getFeatureSelector()
    this.getFieldOptions()
  },
  methods: {
    getFeatureSelector() {
      getFeatureSelector({ type: 1 }).then(res => {
        this.treeData = res.data.list
      })
    },
    getFieldOptions() {
      if (!this.activeData.modelId) return
      getFormDataFields(this.activeData.modelId).then(res => {
        this.fieldOptions = res.data.list
      })
    },
    visibleChange(val) {
      if (!val) return
      if (!this.activeData.modelId) this.$message.warning('请先选择关联功能')
    }
  }
}
</script>