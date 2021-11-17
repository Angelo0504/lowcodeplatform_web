<template>
  <el-input v-model="innerValue" readonly placeholder="用于展示计算结果" />
</template>
<script>
import { mergeNumberOfExps, validExp, toRPN, calcRPN, debounce } from '../../utils'
export default {
  model: {
    prop: 'value',
    event: 'input'
  },
  props: [
    "value",
    "formData",
    "expression",
    "rowIndex" // 计算公式放在表格中时， 需要获取在表格中的行位置
  ],
  name: 'calculate',
  data() {
    return {
      innerValue: this.value,
      RPN_EXP: toRPN(mergeNumberOfExps(this.expression))
    }
  },
  computed: {
    rootFormData() {
      return this.formData || this.getFormData()
    },
  },
  methods: {
    getFormData() {
      var root = this.$parent
      while (root) {
        if ('vmFormData' in root) {
          return root.vmFormData
        }
        root = root.$parent
      }
    },
    /**
     * 获取指定组件的值
     */
    getFormVal(vModel) {
      try {
        if (vModel.indexOf('.') > -1) {
          let [tabelVModel, cmpVModel] = vModel.split('.')
          if (typeof this.rowIndex === 'number') {
            return this.rootFormData[tabelVModel][this.rowIndex][cmpVModel] || 0
          } else {
            return this.rootFormData[tabelVModel].reduce((sum, c) => (c[cmpVModel] || 0) + sum, 0)
          }
        }
        return this.rootFormData[vModel] || 0
      } catch (error) {
        console.warn('计算公式出错, 可能包含无效的组件值', error)
        return 0
      }
    },
    /**
     * 计算表达式
     */
    execRPN() {
      const temp = this.RPN_EXP.map(t => typeof t === 'object' ? this.getFormVal(t.__vModel__) : t)
      this.innerValue = calcRPN(temp)
      this.$emit('input', this.innerValue)
    }
  },
  watch: {
    formData: {
      handler: function (val) {
        if (!val) return
        if (!this.computeExps) { // formData更新可能比较频繁
          this.computeExps = debounce(this.execRPN, 500)
        }
        this.computeExps()
      },
      deep: true,
      immediate: true
    }
  }
}
</script>