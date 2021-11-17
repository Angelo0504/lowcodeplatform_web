<template>
  <div class="jnpf-table-box" :class="[config.__config__.type]">
    <div class="JNPF-common-title" v-if="config.__config__.showTitle && config.__config__.label">
      <h2>{{config.__config__.label}}</h2>
    </div>
    <el-table :data="tableFormData" class="JNPF-common-table" @cell-click="focusInput"
      v-bind="config.tableConf || {}" :show-summary="config['show-summary']"
      :summary-method="getTableSummaries" size="mini">
      <el-table-column width="50" align="center" label="序号">
        <!-- 序号 -->
        <template slot-scope="scope">
          <div class="row-action">
            <span class="index" :class="{'btn-disabled':disabled}"> {{scope.$index + 1}}</span>
            <i class="el-icon-delete delete-btn" @click="removeRow(scope.$index)"></i>
          </div>
        </template>
      </el-table-column>
      <!-- 组件列 -->
      <el-table-column v-for="(head, cindex) in tableData" :key="head.__config__.formId"
        :min-width="head['min-width']" :prop="head.__vModel__" :width="head.__config__.columnWidth">
        <template slot="header">
          <span style="color: #f56c6c;" v-if="head.__config__.required">*</span>
          {{head.__config__['label']}}
        </template>
        <template slot-scope="scope">
          <!-- 单选框组 多选框组 都替换成下拉 并添加options -->
          <template v-if="['select', 'checkbox','radio'].includes(head.__config__.jnpfKey)">
            <el-select v-model="tableFormData[scope.$index][cindex].value"
              v-bind="getConfById(head.__config__.formId)" :rowIndex="scope.$index"
              @change="onFormDataChange(scope.$index, cindex, 'el-select')">
              <el-option v-for="(opt,oindex) in head.__slot__.options" :key="oindex"
                :label="opt[head.__config__.props.label]" :value="opt[head.__config__.props.value]">
              </el-option>
            </el-select>
          </template>
          <!-- 单行输入 -->
          <template v-else-if="head.__config__.jnpfKey==='comInput'">
            <el-input v-model="tableFormData[scope.$index][cindex].value"
              v-bind="getConfById(head.__config__.formId)" :rowIndex="scope.$index"
              @change="onFormDataChange(scope.$index, cindex, 'el-input')">
              <template v-if="head.__slot__">
                <template slot="prepend" v-if="head.__slot__.prepend">
                  {{head.__slot__.prepend}}
                </template>
                <template slot="append" v-if="head.__slot__.append">
                  {{head.__slot__.append}}
                </template>
              </template>
            </el-input>
          </template>
          <!-- 其他 -->
          <component v-else :is="head.__config__.tag" :rowIndex="scope.$index"
            v-model="tableFormData[scope.$index][cindex].value"
            v-bind="getConfById(head.__config__.formId)" :formData="formData"
            @change="onFormDataChange(scope.$index, cindex, head.__config__.tag)">
          </component>
          <div class="error-tip" v-show="!tableFormData[scope.$index][cindex].valid">
            不能为空
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="table-actions" @click="addRow" v-if="!disabled">
      <el-button type="text" icon="el-icon-plus"> {{ config.actionText }}</el-button>
    </div>
  </div>
</template>
<script>
import { dyOptionsList } from '@/components/Generator/generator/comConfig'
import { getDictionaryDataSelector } from '@/api/systemData/dictionary'
import { previewDataInterface } from '@/api/systemData/dataInterface'
export default {
  name: "input-table",
  props: {
    config: {
      type: Object,
      default: () => { }
    },
    value: {
      type: Array,
      default: () => ([])
    },
    formData: Object,
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      tableFormData: [],
      tableData: [],
      isAddRow: true // list类型下 添加行数据 number类型组件会进行校验 产生不需要的结果 在这里进行添加行数据判断 hack
    };
  },
  created() {
    this.tableData = this.config.__config__.children
    this.buildOptions()
    if (this.value && this.value.length) {
      this.value.forEach(t => this.addRow(t))
    } else {
      this.addRow()
    }
  },
  methods: {
    buildOptions() {
      this.tableData.forEach(cur => {
        const config = cur.__config__
        if (dyOptionsList.indexOf(config.jnpfKey) > -1) {
          let isTreeSelect = config.jnpfKey === 'treeSelect' || config.jnpfKey === 'cascader'
          if (config.dataType === 'dictionary') {
            if (!config.dictionaryType) return
            getDictionaryDataSelector(config.dictionaryType).then(res => {
              isTreeSelect ? cur.options = res.data.list : cur.__slot__.options = res.data.list
            })
          }
          if (config.dataType === 'dynamic') {
            if (!config.propsUrl) return
            previewDataInterface(config.propsUrl).then(res => {
              isTreeSelect ? cur.options = res.data : cur.__slot__.options = res.data
            })
          }
        }
      })
    },
    clearAddRowFlag() {
      this.$nextTick(() => {
        this.isAddRow = false
      })
    },
    /**
     * @event cell-click Table 单元格点击事件
     * 点击单元格 聚焦单元格中的input
     */
    focusInput(row, column, cell, event) {
      const child = cell.querySelector('.cell').firstElementChild
      const input = child && child.querySelector('input')
      input && input.focus()
    },
    onFormDataChange(rowIndex, colIndex, tag) {
      if (this.isAddRow) return
      const data = this.tableFormData[rowIndex][colIndex]
      data.required && (data.valid = this.checkData(data))
      if (['JNPF-Amount', 'el-input-number'].includes(tag)) { // 金额变动 更新数据 触发计算公式更新
        const newVal = this.tableFormData.map(row => row.reduce((p, c) => (p[c.__vModel__] = c.value, p), {}))
        this.$emit('input', newVal)
      }
    },
    /**
     * 校验单个表单数据
     * @param {CmpConfig} 组件配置对象
     */
    checkData({ tag, value }) {
      if ([null, undefined, ''].includes(value)) return false
      // if (tag === 'org-select') return this.checkOrgData(value)
      if (Array.isArray(value)) return value.length > 0
      return true
    },
    /**
     * 对组织机构部门控数据单独校验
     */
    checkOrgData(data) {
      const isArray = Array.isArray
      if (typeof data !== 'object' || isArray(data)) return false
      let count = 0
      for (let key in data) {
        count += isArray(data[key]) ? data[key].length : 0
      }
      return count > 0
    },
    /**
     * 校验表格数据必填项
     */
    submit() {
      let res = true
      const checkCol = col => col.required && !this.checkData(col) && (res = col.valid = false)
      this.tableFormData.forEach(row => row.forEach(checkCol))
      // console.log(this.tableFormData);
      return res ? this.tableFormData.map(row => row.reduce((p, c) => (p[c.__vModel__] = c.value, p), {})) : false
    },
    /**
     * 根据formid获取完整组件配置
     */
    getConfById(formId) {
      let item = this.tableData.find(t => t.__config__.formId === formId)
      let newObj = {}
      for (const key in item) {
        if (key != '__config__' && key != '__slot__' && key != '__vModel__') {
          newObj[key] = item[key]
        }
        if (key === 'props') {
          newObj[key] = item[key][key]
        }
        if (key === 'disabled') {
          newObj[key] = this.disabled || item[key][key]
        }
      }
      return newObj
    },
    /**
     * 获取默认行数据
     */
    getEmptyRow(val) {
      return this.tableData.map((t) => {
        let res = {
          tag: t.__config__.tag,
          formId: t.__config__.formId,
          value: val && val[t.__vModel__] || t.__config__.defaultValue,
          options: t.__slot__ && t.__slot__.options && t.__slot__.options || [], // 下拉 单选 多选
          valid: true,
          __vModel__: t.__vModel__,
          required: t.__config__.required
        }
        // if (t.tag === 'el-upload') this.$set(res, 'value', t.defaultValue)
        return res
      })
    },
    removeRow(index) {
      this.tableFormData.splice(index, 1)
    },
    addRow(val) {
      this.isAddRow = true
      if (!Array.isArray(this.tableFormData)) {
        this.tableFormData = []
      }
      this.tableFormData.push(this.getEmptyRow(val))
      this.clearAddRowFlag()
    },
    getCmpValOfRow(row, key) {
      // 获取数字相关组件的输入值
      const isNumCmp = tag => ['fc-amount', 'el-input-number', 'el-slider'].includes(tag)
      const target = row.find(t => t.vModel === key)
      if (!target) return NaN
      if (isNumCmp(target.tag)) return target.value || 0
      return NaN
    },
    /**
     * 对表格进行合计 目前只支持数字，金额，滑块
     */
    getTableSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      if (this.tableData.length + 1 !== columns.length) return []  // 防止多次加载
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计'
          return
        }
        const sumVal = data.reduce((sum, d) => sum + this.getCmpValOfRow(d, column.property), 0)
        sums[index] = Number.isNaN(sumVal) ? '' : sumVal
      });
      return sums;
    },
    reset() {
      this.tableData.map((t) => {
        let index = this.tableFormData[0].findIndex(c => c.vModel === t.vModel)
        if (index === -1) return
        for (let i = 0; i < this.tableFormData.length; i++) {
          this.tableFormData[i][index].value = t.defaultValue
        }
      })
    }
  }
};
</script>
<style lang="scss" scoped>
.jnpf-table-box {
  margin-bottom: 0px;
  .row-action {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 23px;

    .el-icon-delete {
      position: absolute;
      opacity: 0;
      z-index: -1;
      transform: translate(-50%, -50%);
      cursor: pointer;
      line-height: 3px;
      margin-left: 10px;
    }
  }
  .actions {
    text-align: center;
    border: 1px solid #ebeef5;
    border-top: none;
    .list-summary {
      line-height: 24px;
      overflow: hidden;
      border: 1px solid #e5e5e5;
      border-top: none;
    }
  }

  &.list {
    .list-row {
      padding: 18px 0 10px;
      text-align: left;
      border-bottom: 1px solid #e5e5e5;
      position: relative;
      &:hover .delete-btn {
        display: block;
      }
      .delete-btn {
        position: absolute;
        right: 10px;
        top: 20px;
        z-index: 999;
        cursor: pointer;
        display: none;
        &:hover {
          color: #000;
        }
      }
      .row-item {
        margin-bottom: 18px;
        position: relative;
        &.error {
          .error-tip {
            top: 74%;
            z-index: 1;
          }
          >>> .el-input__inner {
            border-color: #f56c6c;
          }
        }
        > div {
          &:first-child {
            text-align: right;
            vertical-align: middle;
            float: left;
            font-size: 14px;
            color: #606266;
            line-height: 32px;
            padding: 0 12px 0 0;
            box-sizing: border-box;
          }
        }
      }
    }
    .error-tip {
      font-size: 12px;
      padding-left: 6px;
      color: #f56c6c;
      position: absolute;
      left: 100px;
      top: 0;
      z-index: -1;
      transition: bottom 0.3s;
      min-height: auto;
    }
  }
}

.jnpf-table-box.table {
  // 索引和删除按钮切换
  >>> .el-table__row:hover {
    .index {
      display: none;
      &.btn-disabled {
        display: block;
        & + .el-icon-delete {
          opacity: 0;
          z-index: -1;
        }
      }
    }
    .el-icon-delete {
      z-index: 9;
      opacity: 1;
    }
  }
  >>> .el-input-number {
    width: 100%;
    min-width: 120px;
  }
  >>> .el-table__header th {
    line-height: 1;
  }

  >>> .el-table .el-table__body {
    td {
      padding: 2px 0;
      background: #fff !important;
      .error-tip {
        font-size: 12px;
        padding-left: 6px;
        color: #f56c6c;
      }
      .cell {
        position: relative;
      }
    }

    td:not(:first-child) {
      // vertical-align: top;
      &::after,
      &::before {
        content: '';
        width: 10px;
        height: 10px;
        background: white;
        position: absolute;
        border: 2px solid transparent;
        transition: border-color 0.3s;
      }

      &::after {
        border-top: none;
        border-right: none;
        left: 0;
        bottom: 0;
      }

      &::before {
        border-bottom: none;
        border-left: none;
        right: 0;
        top: 0;
      }

      &:hover {
        &::after,
        &::before {
          border-color: red;
        }
      }
    }
  }
}
</style>