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
      <el-input :value="setDefaultValue(activeData.__config__.defaultValue)" placeholder="请输入默认值"
        @input="onDefaultValueInput" />
    </el-form-item>
    <el-form-item label="前缀">
      <el-input v-model="activeData.__slot__.prepend" placeholder="请输入前缀" />
    </el-form-item>
    <el-form-item label="后缀">
      <el-input v-model="activeData.__slot__.append" placeholder="请输入后缀" />
    </el-form-item>
    <el-form-item label="前图标">
      <el-input v-model="activeData['prefix-icon']" placeholder="请输入前图标名称">
        <el-button slot="append" @click="openIconsDialog('prefix-icon')">
          选择
        </el-button>
      </el-input>
    </el-form-item>
    <el-form-item label="后图标">
      <el-input v-model="activeData['suffix-icon']" placeholder="请输入后图标名称">
        <el-button slot="append" @click="openIconsDialog('suffix-icon')">
          选择
        </el-button>
      </el-input>
    </el-form-item>
    <el-form-item label="最多输入">
      <el-input v-model="activeData.maxlength" placeholder="请输入字符长度" type="number">
        <template slot="append">个字符</template>
      </el-input>
    </el-form-item>
    <!-- <el-form-item label="显示标签">
      <el-switch v-model="activeData.__config__.showLabel" />
    </el-form-item> -->
    <!-- <el-form-item label="输入统计">
      <el-switch v-model="activeData['show-word-limit']" />
    </el-form-item> -->
    <!-- <el-form-item label="能否清空">
      <el-switch v-model="activeData.clearable" />
    </el-form-item> -->
    <el-row>
      <el-col :span="12">
        <el-form-item label="是否只读">
          <el-switch v-model="activeData.readonly" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="是否禁用">
          <el-switch v-model="activeData.disabled" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item label="是否必填">
      <el-switch v-model="activeData.__config__.required" />
    </el-form-item>
    <!-- <el-divider>校验</el-divider>
    <el-form-item label="是否必填">
      <el-switch v-model="activeData.__config__.required" />
    </el-form-item> -->
    <!-- <div v-for="(item, index) in activeData.__config__.regList" :key="index" class="reg-item">
      <span class="close-btn" @click="activeData.__config__.regList.splice(index, 1)">
        <i class="el-icon-close" />
      </span>
      <el-form-item label="表达式">
        <el-input v-model="item.pattern" placeholder="请输入正则" />
      </el-form-item>
      <el-form-item label="错误提示" style="margin-bottom:0">
        <el-input v-model="item.message" placeholder="请输入错误提示" />
      </el-form-item>
    </div>
    <div style="margin-left: 20px">
      <el-button icon="el-icon-circle-plus-outline" type="text" @click="addReg">
        添加规则
      </el-button>
    </div> -->
    <iconBox :visible.sync="iconsVisible" :current="activeData[currentIconModel]"
      @choiceIcon="setIcon" />
  </el-row>
</template>
<script>
import iconBox from '@/components/JNPF-iconBox'
import comMinix from './minix';
export default {
  props: ['activeData'],
  mixins: [comMinix],
  components: { iconBox },
  data() {
    return {
      iconsVisible: false,
      currentIconModel: null
    }
  },
  created() { },
  methods: {
    openIconsDialog(model) {
      this.iconsVisible = true
      this.currentIconModel = model
    },
    setIcon(val) {
      this.activeData[this.currentIconModel] = val
    }
  }
}
</script>