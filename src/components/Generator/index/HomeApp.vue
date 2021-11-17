
<template>
  <div class="container">
    <div class="left-board">
      <el-scrollbar class="left-scrollbar">
        <div class="components-list">
          <div v-for="(item, listIndex) in leftComponents" :key="listIndex" class="components-part">
            <div class="components-title">{{ item.title }}</div>
            <draggable class="components-draggable" :list="item.list"
              :group="{ name: 'componentsGroup', pull: 'clone', put: false }"
              :clone="cloneComponent" draggable=".components-item" filter=".disabled" :sort="false"
              @end="onEnd">
              <div v-for="(element, index) in item.list" :key="index" class="components-item"
                :class="{'disabled':element.__config__.dragDisabled}"
                @click="addComponent(element)">
                <div class="components-body">
                  <i :class="element.__config__.tagIcon" />
                  {{ element.__config__.label }}
                </div>
              </div>
            </draggable>
          </div>
        </div>
      </el-scrollbar>
    </div>
    <div class="center-board">
      <div class="action-bar">
        <!-- <el-button icon="el-icon-view" type="text" @click="showJson" size="medium">
          查看json</el-button> -->
        <el-button class="delete-btn" icon="el-icon-delete" type="text" @click="empty"
          size="medium">清空</el-button>
      </div>
      <div id="ipad">
        <div class="outeripad">
          <div class="ipadbody">
            <el-scrollbar class="center-scrollbar">
              <el-row class="center-board-row" :gutter="formConf.gutter">
                <el-form :size="formConf.size" :label-position="formConf.labelPosition"
                  :disabled="formConf.disabled" :label-width="formConf.labelWidth + 'px'">
                  <draggable class="drawing-board" :list="drawingList" :animation="340"
                    group="componentsGroup" @end='onCenterEnd'>
                    <draggable-item v-for="(element, index) in drawingList" :key="element.renderKey"
                      :drawing-list="drawingList" :element="element" :index="index"
                      :active-id="activeId" :form-conf="formConf" @activeItem="activeFormItem"
                      @copyItem="drawingItemCopy" @deleteItem="drawingItemDelete" :put="shouldClone"
                      :end='onTableEnd' />
                  </draggable>
                  <div v-show="!drawingList.length" class="empty-info app-empty-info">
                    <img src="@/assets/images/emptyElement.png" alt="" class="empty-img">
                  </div>
                </el-form>
              </el-row>
            </el-scrollbar>
          </div>
        </div>
      </div>
    </div>
    <right-panel :active-data="activeData" :form-conf="formConf" :show-field="!!drawingList.length"
      @tag-change="tagChange" @relationChange="relationChange" />
    <json-drawer size="550px" :visible.sync="jsonDrawerVisible" :jsonData="formData"
      @refresh="refreshJson" />
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import { debounce } from 'throttle-debounce'
import render from '@/components/Generator/render/render'
import JsonDrawer from './JsonDrawer'
import RightPanel from './RightPanelApp'
import {
  inputComponents, selectComponents, systemComponents, layoutComponents, formConf
} from '@/components/Generator/generator/configApp'
import { noVModelList, noTableAllowList } from '@/components/Generator/generator/comConfig'
import {
  exportDefault, beautifierConf, isNumberStr, titleCase, deepClone
} from '@/components/Generator/utils'
import drawingDefalut from '@/components/Generator/generator/drawingDefalut'
import DraggableItem from './DraggableItemApp'
import {
  getDrawingList, saveDrawingList, getIdGlobal, saveIdGlobal, getFormConf
} from '@/components/Generator/utils/db'

const emptyActiveData = { style: {}, autosize: {} }
let oldActiveId
let tempActiveData
// const drawingListInDB = getDrawingList()
// const formConfInDB = getFormConf()
const idGlobal = getIdGlobal()

export default {
  components: {
    draggable,
    render,
    JsonDrawer,
    RightPanel,
    DraggableItem
  },
  props: ['conf'],
  data() {
    return {
      idGlobal: 100,
      formConf,
      inputComponents,
      selectComponents,
      systemComponents,
      layoutComponents,
      labelWidth: 100,
      drawingList: [],
      drawingData: {},
      activeId: null,
      drawerVisible: false,
      formData: {},
      dialogVisible: false,
      jsonDrawerVisible: false,
      generateConf: null,
      showFileName: false,
      activeData: {},
      saveDrawingListDebounce: debounce(340, saveDrawingList),
      saveIdGlobalDebounce: debounce(340, saveIdGlobal),
      isDrawingListChange: true,
      showTip: true,
      activeItem: {},
      activeTableItem: {},
      leftComponents: [
        {
          title: '基础控件',
          list: inputComponents
        },
        {
          title: '高级控件',
          list: selectComponents
        },
        {
          title: '系统控件',
          list: systemComponents
        },
        {
          title: '布局控件',
          list: layoutComponents
        }
      ]
    }
  },
  computed: {
  },
  watch: {
    // eslint-disable-next-line func-names
    'activeData.__config__.label': function (val, oldVal) {
      // if (
      //   this.activeData.placeholder === undefined
      //   || !this.activeData.__config__.tag
      //   || oldActiveId !== this.activeId
      // ) {
      //   return
      // }
      // this.activeData.placeholder = this.activeData.placeholder.replace(oldVal, '') + val
    },
    activeId: {
      handler(val) {
        oldActiveId = val
      },
      immediate: true
    },
    drawingList: {
      handler(val) {
        this.saveDrawingListDebounce(val)
        if (val.length === 0) this.idGlobal = 100
        if (!this.isDrawingListChange) {
          this.isDrawingListChange = true
          return
        }
        this.$emit('drawingListChange')
      },
      deep: true
    },
    idGlobal: {
      handler(val) {
        this.formConf.idGlobal = val
        // this.saveIdGlobalDebounce(val)
      },
      immediate: true
    }
  },
  created() {
    if (typeof this.conf === 'object' && this.conf !== null) {
      this.isDrawingListChange = false
      this.drawingList = deepClone(this.conf.fields)
      Object.assign(this.formConf, this.conf)
      this.idGlobal = this.formConf.idGlobal
      if (this.drawingList.length) this.activeFormItem(this.drawingList[0])
    } else {
      this.drawingList = []
      this.idGlobal = 100
    }
  },
  mounted() {
    // fix: firefox 下 拖拽 会新打卡一个选项卡
    // https://github.com/JakHuang/form-generator/issues/15
    document.body.ondrop = event => {
      event.preventDefault()
      event.stopPropagation()
    }
  },
  methods: {
    //  供父组件使用 获取表单JSON
    getData() {
      return new Promise((resolve, reject) => {
        if (!this.drawingList.length) {
          reject({ msg: '表单不允许为空', target: 1 })
          return
        }
        const loop = list => {
          for (let i = 0; i < list.length; i++) {
            const e = list[i]
            const config = e.__config__
            if (this.$store.getters.hasTable && config.layout === "colFormItem" && !noVModelList.includes(config.jnpfKey) && !e.__vModel__) {
              reject({ msg: `请选择${config.label}的字段名`, target: 1 })
              break
            }
            if (config.jnpfKey === 'billRule') {
              if (!config.rule) {
                reject({ msg: '单据组件“选择规则”属性为必填项', target: 1 })
                break
              }
            }
            if (config.jnpfKey === 'relationForm') {
              if (!e.modelId) {
                reject({ msg: '关联表单控件“关联功能”属性为必填项', target: 1 })
                break
              }
              if (!e.relationField) {
                reject({ msg: '关联表单控件“显示字段”属性为必填项', target: 1 })
                break
              }
            }
            if (config.jnpfKey === 'relationFlow' && !e.flowId) {
              reject({ msg: '关联流程表单控件“关联流程”属性为必填项', target: 1 })
              break
            }
            if (config.layout === 'rowFormItem' && !config.children.length) {
              reject({ msg: `您的${config.label}控件中没有组件`, target: 1 })
              break
            }
            if (config && config.children && Array.isArray(config.children)) {
              loop(config.children)
            }
          }
        }
        loop(this.drawingList)
        this.AssembleFormData()
        resolve({ formData: this.formData, target: 1 })
      })
    },
    // 阻止表格中嵌套行容器
    shouldClone(to, from, target, event, conf) {
      const targetConf = target._underlying_vm_
      const isRowContainer = conf.__config__.cmpType === 'common' && conf.__config__.rowType === 'layout'
      if (isRowContainer) return true
      if (conf.cmpType === 'custom') return false
      if (conf.__config__.rowType === 'table') {
        if (noTableAllowList.includes(targetConf.__config__.jnpfKey)) {
          // if (this.showTip) {
          //   this.$message.warning(`子表内暂不支持使用该组件`)
          //   this.showTip = false
          // }
          return false
        }
        if (targetConf.__config__.layout === 'rowFormItem') return false
        if (this.$store.getters.hasTable) {
          if (!conf.__config__.tableName) {
            if (this.showTip) {
              this.$message.warning(`子表请先关联数据表`)
              this.showTip = false
            }
            return false
          }
        }
        this.activeItem = targetConf
        this.activeTableItem = conf
      }
      if (conf.__config__.jnpfKey === 'card') {
        if (targetConf.__config__.layout === 'rowFormItem') return false
      }
      return true
    },
    activeFormItem(element) {
      this.activeData = element
      this.activeId = element.__config__.formId
    },
    onEnd(obj) {
      this.showTip = true
      if (obj.from !== obj.to) {
        this.activeData = tempActiveData
        this.activeId = this.idGlobal
      }
      if (obj.to.className.indexOf('table') > -1) {
        this.$set(this.activeItem.__config__, 'isSubTable', true)
        if (this.$store.getters.hasTable) {
          this.$set(this.activeItem.__config__, 'relationTable', this.activeTableItem.__config__.tableName)
          this.activeItem.__vModel__ = ''
        }
      }
    },
    onCenterEnd(obj) {
      this.showTip = true
      if (obj.from == obj.to) return
      if (obj.to.className.indexOf('table') > -1) {
        this.$set(this.activeItem.__config__, 'isSubTable', true)
        if (this.$store.getters.hasTable) {
          this.$set(this.activeItem.__config__, 'relationTable', this.activeTableItem.__config__.tableName)
          this.activeItem.__vModel__ = ''
        }
      }
    },
    onTableEnd(obj) {
      if (obj.from == obj.to) return
      if (obj.to.className.indexOf('table') < 0) {
        this.$set(this.activeItem.__config__, 'isSubTable', false)
        if (this.$store.getters.hasTable) this.activeItem.__vModel__ = ''
      }
    },
    addComponent(item) {
      if (item.__config__.dragDisabled) return
      const clone = this.cloneComponent(item)
      this.drawingList.push(clone)
      this.activeFormItem(clone)
    },
    cloneComponent(origin) {
      const clone = deepClone(origin)
      const config = clone.__config__
      config.span = this.formConf.span // 生成代码时，会根据span做精简判断
      this.createIdAndKey(clone)
      // clone.placeholder !== undefined && (clone.placeholder += config.label)
      tempActiveData = clone
      return tempActiveData
    },
    createIdAndKey(item) {
      const config = item.__config__
      config.formId = ++this.idGlobal
      config.renderKey = +new Date() // 改变renderKey后可以实现强制更新组件
      if (config.layout === 'colFormItem') {
        if (!this.$store.getters.hasTable) {
          // 分割线和按钮不加vModel
          if (noVModelList.indexOf(config.jnpfKey) > -1) return
          item.__vModel__ = `${config.jnpfKey}Field${this.idGlobal}`
        } else {
          if (noVModelList.indexOf(config.jnpfKey) > -1) return
          item.__vModel__ = ""
        }
      } else if (config.layout === 'rowFormItem') {
        if (config.jnpfKey === 'table') {
          item.__vModel__ = `${config.jnpfKey}Field${this.idGlobal}`;
        }
        config.componentName = `row${this.idGlobal}`
        !Array.isArray(config.children) && (config.children = [])
        // delete config.label // rowFormItem无需配置label属性
      }
      if (Array.isArray(config.children)) {
        config.children = config.children.map(childItem => this.createIdAndKey(childItem))
      }
      return item
    },
    AssembleFormData() {
      this.formData = {
        ...this.formConf,
        fields: deepClone(this.drawingList)
      }
    },
    empty() {
      this.$confirm('确定要清空所有组件吗？', '提示', { type: 'warning' }).then(() => {
        this.drawingList = []
        this.idGlobal = 100
      }).catch(() => { })
    },
    drawingItemCopy(item, parent) {
      let clone = deepClone(item)
      clone = this.createIdAndKey(clone)
      parent.push(clone)
      this.activeFormItem(clone)
    },
    drawingItemDelete(index, parent) {
      parent.splice(index, 1)
      this.$nextTick(() => {
        const len = this.drawingList.length
        if (len) {
          this.activeFormItem(this.drawingList[len - 1])
        }
      })
    },
    showJson() {
      this.AssembleFormData()
      this.jsonDrawerVisible = true
    },
    tagChange(newTag) {
      newTag = this.cloneComponent(newTag)
      const config = newTag.__config__
      newTag.__vModel__ = this.activeData.__vModel__
      config.formId = this.activeId
      config.span = this.activeData.__config__.span
      this.activeData.__config__.tag = config.tag
      this.activeData.__config__.tagIcon = config.tagIcon
      this.activeData.__config__.document = config.document
      if (typeof this.activeData.__config__.defaultValue === typeof config.defaultValue) {
        config.defaultValue = this.activeData.__config__.defaultValue
      }
      Object.keys(newTag).forEach(key => {
        if (this.activeData[key] !== undefined) {
          newTag[key] = this.activeData[key]
        }
      })
      this.activeData = newTag
      this.updateDrawingList(newTag, this.drawingList)
    },
    updateDrawingList(newTag, list) {
      const index = list.findIndex(item => item.__config__.formId === this.activeId)
      if (index > -1) {
        list.splice(index, 1, newTag)
      } else {
        list.forEach(item => {
          if (Array.isArray(item.__config__.children)) this.updateDrawingList(newTag, item.__config__.children)
        })
      }
    },
    refreshJson(data) {
      this.drawingList = deepClone(data.fields)
      delete data.fields
      this.formConf = data
    },
    relationChange(vmodel) {
      const loop = list => {
        for (let i = 0; i < list.length; i++) {
          const config = list[i].__config__
          if (list[i].relationField && list[i].relationField === list[i].__vModel__) {
            list[i].showField = ''
          }
          if (config && config.children && Array.isArray(config.children)) {
            loop(config.children)
          }
        }
      }
      loop(this.drawingList)
    }
  }
}
</script>

<style lang='scss'>
@import '../styles/index';
@import '../styles/home';
</style>
<style lang="scss" scoped>
>>> #ipad {
  height: calc(100% - 42px);
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 711px;
  .outeripad {
    background: url('../../../assets/images/iphoneBg.png');
    width: 389px;
    height: 711px;
    padding: 65px 40px;
    .ipadHead {
      background: #f7f8f9;
      text-align: center;
      .ipadHead-img {
        margin: 0 auto;
        height: 20px;
      }
    }

    .ipadbody {
      height: 100%;

      .center-scrollbar {
        height: 100%;
        overflow: hidden;
      }
    }
  }
}
</style>