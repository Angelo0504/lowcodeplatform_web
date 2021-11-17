<template>
  <div class="columnDesign-container">
    <div class="main-board">
      <div class="sort-box">
        <h4 class="cap">排序查询</h4>
        <el-table :data="columnData.sortList" class="JNPF-common-table" ref="dragTableSort"
          :row-key="row=>row.prop">
          <el-table-column align="center" label="拖动" width="50">
            <template>
              <i class="drag-handler icon-ym icon-ym-darg" style="cursor: move;font-size:20px"
                title='点击拖动' />
            </template>
          </el-table-column>
          <el-table-column prop="label" label="列名" />
          <el-table-column prop="prop" label="字段" />
        </el-table>
      </div>
      <el-divider></el-divider>
      <div class="search-box">
        <h4 class="cap">查询条件</h4>
        <el-table :data="columnData.searchList" class="JNPF-common-table" ref="dragTableSearch"
          :row-key="row=>row.prop">
          <el-table-column align="center" label="拖动" width="50">
            <template>
              <i class="drag-handler icon-ym icon-ym-darg" style="cursor: move;font-size:20px"
                title='点击拖动' />
            </template>
          </el-table-column>
          <el-table-column prop="label" label="列名" />
          <el-table-column prop="prop" label="字段" />
        </el-table>
      </div>
      <el-divider></el-divider>
      <div class="column-box">
        <h4 class="cap">列表字段</h4>
        <el-table :data="columnData.columnList" class="JNPF-common-table" ref="dragTable"
          :row-key="row=>row.prop">
          <el-table-column align="center" label="拖动" width="50">
            <template>
              <i class="drag-handler icon-ym icon-ym-darg" style="cursor: move;font-size:20px"
                title='点击拖动' />
            </template>
          </el-table-column>
          <el-table-column prop="label" label="列名" />
          <el-table-column prop="prop" label="字段" />
        </el-table>
      </div>
    </div>
    <el-scrollbar class="right-board">
      <el-tabs v-model="currentTab" class="top-tabs top-tabs_app">
        <el-tab-pane label="排序字段" name="sort" />
        <el-tab-pane label="查询字段" name="search" />
        <el-tab-pane label="列表字段" name="field" />
        <el-tab-pane label="列表属性" name="column" />
      </el-tabs>
      <div class="field-box">
        <div v-show="currentTab==='sort'">
          <el-table :data="sortOptions" class="JNPF-common-table"
            @selection-change="sortSelectionChange" ref="sortTable">
            <el-table-column prop="label" label="排序字段" />
            <el-table-column type="selection" width="55" align="center" />
          </el-table>
        </div>
        <div v-show="currentTab==='search'">
          <el-table :data="searchOptions" class="JNPF-common-table"
            @selection-change="searchSelectionChange" ref="searchTable">
            <el-table-column prop="label" label="查询字段" />
            <el-table-column type="selection" width="55" align="center" />
          </el-table>
        </div>
        <div class="columnList" v-show="currentTab==='field'">
          <el-table :data="columnOptions" class="JNPF-common-table"
            @selection-change="columnSelectionChange" ref="columnTable">
            <el-table-column prop="label" label="列表字段" />
            <el-table-column type="selection" width="55" align="center" />
          </el-table>
        </div>
        <div class="setting-box" v-show="currentTab==='column'">
          <el-form :model="columnData" label-width="80px">
            <el-divider class="typeLine">排序设置</el-divider>
            <el-form-item label="排序字段">
              <el-select v-model="columnData.defaultSidx" placeholder="请选择排序字段">
                <el-option :label="item.__config__.label" :value="item.__vModel__"
                  v-for="(item, i) in list" :key="i"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="排序类型">
              <el-select v-model="columnData.sort" placeholder="请选择排序类型">
                <el-option label="正序" value="asc"></el-option>
                <el-option label="倒序" value="desc"></el-option>
              </el-select>
            </el-form-item>
            <el-divider>分页设置</el-divider>
            <el-form-item label="列表分页">
              <el-switch v-model="columnData.hasPage"></el-switch>
            </el-form-item>
            <el-form-item label="排序类型">
              <el-radio-group v-model="columnData.pageSize">
                <el-radio-button :label="30">30条</el-radio-button>
                <el-radio-button :label="50">50条</el-radio-button>
                <el-radio-button :label="100">100条</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>
<script>
import Sortable from 'sortablejs'
import { getDrawingList } from '@/components/Generator/utils/db'
import { deepClone } from '@/utils'
import { noColumnShowList, noSearchList } from '@/components/Generator/generator/comConfig'
const defaultColumnData = {
  searchList: [], // 查询条件
  columnList: [], // 字段列表
  sortList: [], // 排序列表
  // type: 1, //列表类型
  defaultSidx: '', // 默认排序字段
  sort: 'desc',   // 排序类型
  hasPage: true,  // 列表分页
  pageSize: 30,  // 分页条数
}
export default {
  name: 'columnDesign',
  props: {
    conf: {
      type: Object,
      default: () => { }
    },
  },
  data() {
    return {
      currentTab: 'column',
      alignOptions: ['left', 'center', 'right'],
      list: [],
      columnData: JSON.parse(JSON.stringify(defaultColumnData)),
      columnOptions: [],
      searchOptions: [],
      sortOptions: [],
      sortList: []
    }
  },
  created() {
    let list = []
    const loop = (data, parent) => {
      if (!data) return
      if (data.__config__ && data.__config__.jnpfKey !== 'table' && data.__config__.children && Array.isArray(data.__config__.children)) {
        loop(data.__config__.children, data)
      }
      if (Array.isArray(data)) data.forEach(d => loop(d, parent))
      if (data.__config__ && data.__config__.jnpfKey) {
        if (data.__config__.layout === "colFormItem" && data.__vModel__) {
          list.push(data)
        }
      }
    }
    loop(getDrawingList())
    this.list = list
    let options = list.filter(o => noColumnShowList.indexOf(o.__config__.jnpfKey) < 0)
    this.columnOptions = options.map(o => ({
      label: o.__config__.label,
      prop: o.__vModel__
    }));
    this.searchOptions = options.map(o => ({
      label: o.__config__.label,
      prop: o.__vModel__,
      jnpfKey: o.__config__.jnpfKey
    }));
    this.sortOptions = options.map(o => ({
      label: o.__config__.label,
      prop: o.__vModel__
    }));
    if (typeof this.conf === 'object' && this.conf !== null) {
      this.columnData = Object.assign({}, defaultColumnData, this.conf)
    }
  },
  mounted() {
    this.setSort()
    this.$nextTick(() => {
      this.setValue(this.columnData.columnList, this.columnOptions)
      this.columnData.columnList.forEach(row => {
        this.$refs.columnTable.toggleRowSelection(row, true);
      })
      this.setValue(this.columnData.searchList, this.searchOptions)
      this.columnData.searchList.forEach(row => {
        this.$refs.searchTable.toggleRowSelection(row, true);
      })
      this.setValue(this.columnData.sortList, this.sortOptions)
      this.columnData.sortList.forEach(row => {
        this.$refs.sortTable.toggleRowSelection(row, true);
      })
    })
  },
  methods: {
    setValue(replacedData, data, key) {
      key = key ? key : 'prop'
      outer: for (let i = 0; i < replacedData.length; i++) {
        inter: for (let ii = 0; ii < data.length; ii++) {
          if (replacedData[i][key] === data[ii][key]) {
            data[ii] = replacedData[i]
            break inter
          }
        }
      }
    },
    /**
      * 供父组件使用 获取列表JSON
    */
    getData() {
      return new Promise((resolve, reject) => {
        if (!this.columnData.columnList.length) {
          reject({ msg: '列表字段不允许为空', target: 2 })
          return
        }
        resolve({ columnData: this.columnData, target: 2 })
      })
    },
    setSort() {
      const el = this.$refs.dragTable.$el.querySelectorAll('.el-table__body-wrapper > table > tbody')[0]
      this.sortable = Sortable.create(el, {
        ghostClass: 'sortable-ghost', // Class name for the drop placeholder,
        setData: function (dataTransfer) {
          dataTransfer.setData('Text', '')
        },
        onEnd: evt => {
          const targetRow = this.columnData.columnList.splice(evt.oldIndex, 1)[0]
          this.columnData.columnList.splice(evt.newIndex, 0, targetRow)
        },
        handle: '.drag-handler',
      })
      const el1 = this.$refs.dragTableSort.$el.querySelectorAll('.el-table__body-wrapper > table > tbody')[0]
      Sortable.create(el1, {
        ghostClass: 'sortable-ghost', // Class name for the drop placeholder,
        setData: function (dataTransfer) {
          dataTransfer.setData('Text', '')
        },
        onEnd: evt => {
          const targetRow = this.columnData.sortList.splice(evt.oldIndex, 1)[0]
          this.columnData.sortList.splice(evt.newIndex, 0, targetRow)
        },
        handle: '.drag-handler',
      })
      const el2 = this.$refs.dragTableSearch.$el.querySelectorAll('.el-table__body-wrapper > table > tbody')[0]
      Sortable.create(el2, {
        ghostClass: 'sortable-ghost', // Class name for the drop placeholder,
        setData: function (dataTransfer) {
          dataTransfer.setData('Text', '')
        },
        onEnd: evt => {
          const targetRow = this.columnData.searchList.splice(evt.oldIndex, 1)[0]
          this.columnData.searchList.splice(evt.newIndex, 0, targetRow)
        },
        handle: '.drag-handler',
      })
    },
    sortSelectionChange(val) {
      this.$set(this.columnData, 'sortList', val)
    },
    searchSelectionChange(val) {
      this.$set(this.columnData, 'searchList', val)
    },
    columnSelectionChange(val) {
      this.$set(this.columnData, 'columnList', val)
    }
  }
}
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>