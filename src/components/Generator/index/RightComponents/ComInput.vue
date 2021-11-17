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
    <el-form-item label="是否只读">
      <el-switch v-model="activeData.readonly" />
    </el-form-item>
    <el-form-item label="是否禁用">
      <el-switch v-model="activeData.disabled" />
    </el-form-item>
    <el-divider>校验</el-divider>
    <el-form-item label="是否必填">
      <el-switch v-model="activeData.__config__.required" />
    </el-form-item>
    <div v-for="(item, index) in activeData.__config__.regList" :key="index" class="reg-item">
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
    <div class="mt-10">
      <el-dropdown>
        <el-button type="primary">添加常用校验<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="addHandle(item)" v-for="(item,i) in ruleList" :key="i">
            {{item.label}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-button type="primary" @click="addReg">
        自定义规则
      </el-button>
    </div>
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
      currentIconModel: null,
      ruleList: [
        {
          pattern: '/^\\d+$/',
          message: '请输入正确的数字',
          label: '数字'
        },
        {
          pattern: '/^[1-9]\\d*\\.\\d*|0\\.\\d*[1-9]\\d*|0?\\.0+|0$/',
          message: '请输入正确的金额',
          label: '金额'
        },
        {
          pattern: '/^0\\d{2,3}-?\\d{7,8}$/',
          message: '请输入正确的电话号码',
          label: '电话'
        },
        {
          pattern: '/^1[3456789]\\d{9}$/',
          message: '请输入正确的手机号码',
          label: '手机'
        },
        {
          pattern: '/^1[3456789]\\d{9}$|^0\\d{2,3}-?\\d{7,8}$/',
          message: '请输入正确的联系方式',
          label: '电话/手机'
        },
        {
          pattern: '/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/',
          message: '请输入正确的邮箱',
          label: '邮箱'
        },
        {
          pattern: '/^[1-9]\\d{5}(18|19|([23]\\d))\\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\\d{3}[0-9Xx]$/',
          message: '请输入正确的身份证号码',
          label: '身份证'
        },
      ]
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
    },
    addHandle(row) {
      this.activeData.__config__.regList.push({
        pattern: row.pattern,
        message: row.message
      })
    }
  }
}
</script>