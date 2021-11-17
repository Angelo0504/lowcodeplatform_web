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
    <el-form-item label="关联流程">
      <JNPF-TreeSelect :options="treeData" v-model="activeData.flowId" placeholder="请选择关联关联流程"
        lastLevel clearable />
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
import { FlowEngineSelector } from '@/api/workFlow/FlowEngine'
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
    'activeData.flowId': function (val) {
      this.$emit('relationChange', this.activeData.__vModel__)
    }
  },
  created() {
    this.getFlowEngineSelector()
  },
  methods: {
    getFlowEngineSelector() {
      FlowEngineSelector(2).then(res => {
        this.treeData = res.data.list
      })
    }
  }
}
</script>