<template>
  <el-row>
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
    <el-form-item label="计算公式">
      <div @click="expDialogVisible = true" class="pane-calc-preview">
        <template v-if="activeData.expression.length">
          <span v-for="(item, index) in activeData.expression" :key="index" :class="{'calc-btn': typeof item !== 'string',
                'error': typeof item !== 'string' && item.label === '无效的值'}">
            {{typeof item !== 'string' ? item.label : item}}
          </span>
        </template>
        <span v-else class="placeholder-text">编辑计算公式</span>
      </div>
    </el-form-item>
    <el-dialog title="编辑计算公式" custom-class="calc-dialog" :visible.sync="expDialogVisible"
      width="600px" class="JNPF-dialog JNPF-dialog_center" @open="onOpen" append-to-body>
      <div class="calc-box">
        <div class="calc-preview" :class="{error: !expValid}">
          计算公式 =
          <span v-for="(item, index) in expressionTemp" :key="index" :class="{'calc-btn': typeof item !== 'string',
            'error': typeof item !== 'string' && item.label === '无效的值'}">
            {{typeof item !== 'string' ? item.label : item}}
          </span>
          <div class="preview-actions">
            <el-tooltip content="删除">
              <i class="el-icon-price-tag" style="transform: rotate(-90deg);"
                @click="expressionTemp.pop()"></i>
            </el-tooltip>
            <el-tooltip content="清空">
              <i class="el-icon-delete" @click="expressionTemp = []"></i>
            </el-tooltip>
          </div>
        </div>
        <div class="calc-tip">
          编辑计算公式可用来完成审批单内数据的自动结算，例如：采购单内设置计算公式“合计=单价×数量”，发起人填写单价、数量后，组件将自动计算出合计金额，免手动计算</div>
        <div>
          <span>计算对象：</span>
          <span v-for="item in calculateCmps" :key="item.__vModel__"
            @click="expressionTemp.push(item)" class="calc-btn">
            {{item.label}}
          </span>
        </div>
        <div style="margin: 10px 0;">
          <span>计算符号：</span>
          <span v-for="item in ['+', '-', '×', '÷', '(', ')']" class="calc-btn" :key="item"
            @click="expressionTemp.push(item)">{{item}}</span>
        </div>
        <div style="margin: 10px 0;">
          <span style="float: left;">数字键盘：</span>
          <div style="width: 110px;line-height: 2.5;overflow: hidden;">
            <span :key="item" class="calc-btn"
              v-for="item in ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.']"
              @click="expressionTemp.push(item)">{{item}}</span>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="expDialogVisible = false;expressionTemp = []">取 消</el-button>
        <el-button type="primary" @click="checkExpression">确 定</el-button>
      </span>
    </el-dialog>
  </el-row>
</template>
<script>
import comMinix from './minix';
import { mergeNumberOfExps, validExp } from '@/components/Generator/utils'
import { getDrawingList } from '@/components/Generator/utils/db'
import { deepClone } from '@/utils'
export default {
  props: ['activeData'],
  mixins: [comMinix],
  data() {
    return {
      expressionTemp: [],
      expDialogVisible: false,
      expValid: true,
    }
  },
  computed: {
    calculateCmps() {
      const drawingList = getDrawingList() || []
      const calcList = []
      const loop = (data, parent) => {
        if (!data) return
        if (data.__config__ && data.__config__.children && Array.isArray(data.__config__.children)) {
          loop(data.__config__.children, data)
        }
        if (Array.isArray(data)) data.forEach(d => loop(d, parent))
        if (data.__config__ && data.__config__.jnpfKey) {
          if (['numInput', 'calculate'].includes(data.__config__.jnpfKey)) {
            const isTableChild = parent && parent.__config__ && parent.__config__.jnpfKey === 'table'
            calcList.push({
              __vModel__: isTableChild ? parent.__vModel__ + '.' + data.__vModel__ : data.__vModel__,
              label: isTableChild ? parent.__config__.label + '.' + data.__config__.label : data.__config__.label
            })
          }
        }
      }
      loop(drawingList)
      return calcList
    }
  },
  created() { },
  methods: {
    reloadExpressionTemp() {
      const isValid = d => {
        const target = this.calculateCmps.find(cmp => cmp.__vModel__ === d.__vModel__ && cmp.__vModel__ === d.__vModel__)
        return target ? true : false
      }
      this.expressionTemp = this.activeData.expression.map(t => {
        return typeof t === 'string' || isValid(t) ? t : { __vModel__: t.__vModel__, label: '无效的值' }
      })
      this.activeData.expression = this.expressionTemp
    },
    onOpen() {
      this.expressionTemp = deepClone(this.activeData.expression)
      this.expValid = true
    },
    checkExpression() {
      if (!this.expressionTemp.length) {
        this.activeData.expression = this.expressionTemp // calcRPN(toRPN(formatExp))
        this.expDialogVisible = false
        return
      }
      let formatExp = mergeNumberOfExps(this.expressionTemp)
      const temp = formatExp.map(t => typeof t === 'object' ? 1 : t)
      let boo = this.expressionTemp.some(o => o.label === '无效的值')
      if (boo) return this.$message.error(`编辑的公式含有无效的值，无法计算`)
      this.expValid = validExp(temp, false)
      if (this.expValid) {
        this.activeData.expression = this.expressionTemp // calcRPN(toRPN(formatExp))
        this.expDialogVisible = false
      } else {
        this.$message.error(`编辑的公式不符合计算法则，无法计算`)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.pane-calc-preview {
  padding: 0 15px;
  cursor: pointer;
  min-height: 32px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  font-size: 13px;
  .placeholder-text {
    color: #c0c4cc;
  }
}
.calc-btn {
  padding: 4px 8px;
  margin: 0 6px;
  background: #dcdfe6;
  cursor: pointer;
  &.error {
    background: #f56c6c;
    color: white;
  }
  &:hover {
    background: #f5f5f5;
  }
}
.calc-dialog {
  >>> .el-dialog__body {
    padding-top: 0;
  }
  .calc-box {
    font-size: 12px;
    line-height: 2;
    .calc-tip {
      margin: 10px 0;
      font-size: 12px;
      color: #aaa;
    }

    .calc-preview {
      border: 1px solid #dcdfe6;
      border-radius: 4px;
      min-height: 60px;
      padding: 4px 10px;
      position: relative;

      &.error {
        border: 1px solid red;
      }

      .preview-actions {
        position: absolute;
        bottom: 0;
        right: 0;
        > i {
          font-size: 14px;
          margin-right: 8px;
          cursor: pointer;
          &:hover {
            color: red;
          }
        }
      }
    }
  }
}
</style>