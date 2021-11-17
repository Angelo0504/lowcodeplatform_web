<template>
  <div class="columnDesign-container">
    <div class="main-board">
      <div class="search-box">
        <h4 class="cap">查询条件</h4>
        <el-table :data="columnData.searchList" class="JNPF-common-table" ref="dragTableSearch"
          :row-key="row=>row.__vModel__">
          <el-table-column align="center" label="拖动" width="50">
            <template>
              <i class="drag-handler icon-ym icon-ym-darg" style="cursor: move;font-size:20px"
                title='点击拖动' />
            </template>
          </el-table-column>
          <el-table-column prop="__config__.label" label="列名" />
          <el-table-column prop="__vModel__" label="字段" />
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
          <el-table-column prop="align" label="对齐">
            <template slot-scope="scope">
              <el-select v-model="scope.row.align" placeholder="请选择">
                <el-option v-for="item in alignOptions" :key="item" :label="item" :value="item">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="width" label="宽度">
            <template slot-scope="scope">
              <el-input v-model.number="scope.row.width" type="number" placeholder="宽度" />
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <el-scrollbar class="right-board">
      <el-tabs v-model="currentTab" class="top-tabs">
        <el-tab-pane label="查询字段" name="search" />
        <el-tab-pane label="列表字段" name="field" />
        <el-tab-pane label="列表属性" name="column" />
      </el-tabs>
      <div class="field-box">
        <div class="searchList" v-show="currentTab==='search'">
          <el-table :data="searchOptions" class="JNPF-common-table"
            @selection-change="searchSelectionChange" ref="searchTable">
            <el-table-column prop="__config__.label" label="查询条件" />
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
            <el-divider>列表布局</el-divider>
            <div class="typeList">
              <div class="item" v-for="(item, index) in typeList" :key="index"
                @click="columnData.type=item.value">
                <div class="item-img" :class="{'checked':columnData.type==item.value}">
                  <img :src="item.url" alt="">
                  <div class="icon-checked" v-if="columnData.type==item.value">
                    <i class="el-icon-check"></i>
                  </div>
                </div>
                <p class="item-name">{{item.name}}</p>
              </div>
            </div>
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
            <template v-if="columnData.type !==3">
              <el-divider>分页设置</el-divider>
              <el-form-item label="列表分页">
                <el-switch v-model="columnData.hasPage"></el-switch>
              </el-form-item>
              <el-form-item label="分页条数">
                <el-radio-group v-model="columnData.pageSize">
                  <el-radio-button :label="20">20条</el-radio-button>
                  <el-radio-button :label="50">50条</el-radio-button>
                  <el-radio-button :label="100">100条</el-radio-button>
                </el-radio-group>
              </el-form-item>
            </template>
            <template v-if="columnData.type==2">
              <el-divider>左侧设置</el-divider>
              <el-form-item label="左侧标题">
                <el-input v-model="columnData.treeTitle" placeholder="树形标题"></el-input>
              </el-form-item>
              <el-form-item label="数据来源">
                <el-select v-model="columnData.treeDataSource" placeholder="请选择数据来源">
                  <el-option label="数据字典" value="dictionary"></el-option>
                  <!-- <el-option label="数据列表" value="api"></el-option> -->
                </el-select>
              </el-form-item>
              <template v-if="columnData.treeDataSource==='dictionary'">
                <el-form-item label="数据字典">
                  <DicSelect v-model="columnData.treeDictionary" placeholder="请选择数据字典" />
                </el-form-item>
                <el-form-item label="关联字段">
                  <el-select v-model="columnData.treeDbTableFieldRelation" placeholder="请选择关联字段">
                    <el-option :label="item.__config__.label" :value="item.__vModel__"
                      v-for="(item, index) in list" :key="index"></el-option>
                  </el-select>
                </el-form-item>
              </template>
              <template v-if="columnData.treeDataSource==='api'">
                <el-form-item label="数据选择">
                  <el-select v-model="columnData.treeDbTable" placeholder="请选择数据选择">
                    <el-option label="数据字典" value="dictionary"></el-option>
                    <el-option label="数据列表" value="api"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="主键字段">
                  <el-select v-model="columnData.treeDbTableField" placeholder="请选择主键字段">
                    <el-option label="数据字典" value="dictionary"></el-option>
                    <el-option label="数据列表" value="api"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="主键字段">
                  <el-select v-model="columnData.treeDbTableFieldParentId" placeholder="请选择主键字段">
                    <el-option label="数据字典" value="dictionary"></el-option>
                    <el-option label="数据列表" value="api"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="父级字段">
                  <el-select v-model="columnData.treeDbTableFieldParentId" placeholder="请选择父级字段">
                    <el-option label="数据字典" value="dictionary"></el-option>
                    <el-option label="数据列表" value="api"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="显示字段">
                  <el-select v-model="columnData.treeDbTableFieldShow" placeholder="请选择显示字段">
                    <el-option label="数据字典" value="dictionary"></el-option>
                    <el-option label="数据列表" value="api"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="关联字段">
                  <el-select v-model="columnData.treeDbTableFieldRelation" placeholder="请选择关联字段">
                    <el-option label="数据字典" value="dictionary"></el-option>
                    <el-option label="数据列表" value="api"></el-option>
                  </el-select>
                </el-form-item>
              </template>
            </template>
            <template v-if="columnData.type==3">
              <el-divider>分组设置</el-divider>
              <el-form-item label="分组字段">
                <el-select v-model="columnData.groupField" placeholder="请选择分组字段">
                  <el-option :label="item.__config__.label" :value="item.__vModel__"
                    v-for="(item, i) in list" :key="i"></el-option>
                </el-select>
              </el-form-item>
            </template>
            <el-divider>按钮配置</el-divider>
            <el-checkbox-group v-model="btnsList" class="btnsList" size="medium">
              <el-checkbox :label="item.value" border v-for="item in btnsOption" :key="item.value">
                <i :class="item.icon"></i>
                <el-input v-model="item.label" size="mini"></el-input>
              </el-checkbox>
            </el-checkbox-group>
            <el-checkbox-group v-model="columnBtnsList" class="btnsList" size="medium">
              <el-checkbox :label="item.value" border v-for="item in columnBtnsOption"
                :key="item.value">
                <i :class="item.icon"></i>
                <el-input v-model="item.label" size="mini"></el-input>
              </el-checkbox>
            </el-checkbox-group>
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
  type: 1, //列表类型
  defaultSidx: '', // 默认排序字段
  sort: 'desc',   // 排序类型
  hasPage: true,  // 列表分页
  pageSize: 20,  // 分页条数
  treeTitle: '左侧标题', // 树形标题
  treeDataSource: 'dictionary',  // 树形数据来源
  treeDictionary: '',//数据字典
  treeDbTableFieldRelation: '',  // 关联字段
  treeDbTable: '',  // 数据选择
  treeDbTableField: '',  // 主键字段
  treeDbTableFieldParentId: '',  // 父级字段
  treeDbTableFieldShow: '',  // 显示字段
  groupField: '',  // 分组字段
  btnsList: [
    { value: 'add', icon: 'el-icon-plus', label: '新增' }
  ],  // 按钮
  columnBtnsList: [
    { value: 'edit', icon: 'el-icon-edit', label: '编辑' },
    { value: 'remove', icon: 'el-icon-delete', label: '删除' }
  ] // 列按钮
}
export default {
  name: 'columnDesign',
  props: {
    conf: {
      type: Object,
      default: () => { }
    },
    modelType: ''
  },
  data() {
    return {
      currentTab: 'column',
      alignOptions: ['left', 'center', 'right'],
      list: [],
      searchList: [],
      columnList: [],
      columnData: JSON.parse(JSON.stringify(defaultColumnData)),
      btnsOption: [
        { value: 'add', icon: 'el-icon-plus', label: '新增' },
        { value: 'download', icon: 'el-icon-download', label: '导出' },
      ],
      columnBtnsOption: [
        { value: 'edit', icon: 'el-icon-edit', label: '编辑' },
        { value: 'remove', icon: 'el-icon-delete', label: '删除' },
        { value: 'detail', icon: 'el-icon-tickets', label: '详情' }
      ],
      columnOptions: [],
      searchOptions: [],
      btnsList: [],
      columnBtnsList: [],
      typeList: [
        { url: require('@/assets/images/generator/columnType1.png'), value: 1, name: '普通表格' },
        { url: require('@/assets/images/generator/columnType2.png'), value: 2, name: '左侧树形+普通表格' },
        { url: require('@/assets/images/generator/columnType3.png'), value: 3, name: '分组表格' },
      ]
    }
  },
  watch: {
    btnsList(val) {
      let list = []
      outer: for (let i = 0; i < this.btnsOption.length; i++) {
        inter: for (let ii = 0; ii < val.length; ii++) {
          if (val[ii] === this.btnsOption[i].value) {
            list.push(this.btnsOption[i])
            break inter;
          }
        }
      }
      this.columnData.btnsList = list
    },
    columnBtnsList(val) {
      let list = []
      outer: for (let i = 0; i < this.columnBtnsOption.length; i++) {
        inter: for (let ii = 0; ii < val.length; ii++) {
          if (val[ii] === this.columnBtnsOption[i].value) {
            list.push(this.columnBtnsOption[i])
            break inter;
          }
        }
      }
      this.columnData.columnBtnsList = list
    },
  },
  created() {
    if (this.modelType == 4) {
      this.columnBtnsOption = this.columnBtnsOption.filter(o => o.value != 'detail')
      this.typeList = this.typeList.filter(o => o.value != 3)
    }
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
    let columnOptions = list.filter(o => noColumnShowList.indexOf(o.__config__.jnpfKey) < 0)
    let searchOptions = list.filter(o => noSearchList.indexOf(o.__config__.jnpfKey) < 0)
    this.columnOptions = columnOptions.map(o => ({
      label: o.__config__.label,
      prop: o.__vModel__,
      align: 'left',
      width: null
    }));
    this.searchOptions = searchOptions.map(o => ({ ...o, value: '' }));
    if (typeof this.conf === 'object' && this.conf !== null) {
      this.columnData = Object.assign({}, defaultColumnData, this.conf)
    }
    this.setValue(this.columnData.btnsList, this.btnsOption, 'value')
    this.setValue(this.columnData.columnBtnsList, this.columnBtnsOption, 'value')
    this.btnsList = this.columnData.btnsList.map(o => o.value)
    this.columnBtnsList = this.columnData.columnBtnsList.map(o => o.value)
  },
  mounted() {
    this.setSort()
    this.$nextTick(() => {
      this.setValue(this.columnData.columnList, this.columnOptions)
      this.columnData.columnList.forEach(row => {
        this.$refs.columnTable.toggleRowSelection(row, true);
      })
      this.setValue(this.columnData.searchList, this.searchOptions, "__vModel__")
      this.columnData.searchList.forEach(row => {
        this.$refs.searchTable.toggleRowSelection(row, true);
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
        if (!this.columnData.columnList.length) reject({ msg: '列表字段不允许为空', target: 2 })
        if (this.columnData.type == 2) {
          if (!this.columnData.treeDictionary) reject({ msg: '请选择数据字典', target: 2 })
          if (!this.columnData.treeDbTableFieldRelation) reject({ msg: '请选择关联字段', target: 2 })
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