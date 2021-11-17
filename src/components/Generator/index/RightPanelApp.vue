<template>
  <div class="right-board">
    <el-tabs v-model="currentTab" class="center-tabs">
      <el-tab-pane label="组件属性" name="field" />
      <el-tab-pane label="表单属性" name="form" />
    </el-tabs>
    <div class="field-box">
      <el-scrollbar class="right-scrollbar">
        <!-- 组件属性 -->
        <el-form v-show="currentTab === 'field' && showField" size="small" label-width="90px"
          labelPosition="left">
          <template v-if="activeData.__config__">
            <template v-if="$store.getters.hasTable">
              <template v-if="activeData.__config__.jnpfKey === 'table'">
                <el-form-item v-if="activeData.__vModel__ !== undefined" label="字段名">
                  <el-input v-model="activeData.__vModel__" placeholder="请输入字段名（v-model）"
                    disabled />
                </el-form-item>
              </template>
              <template v-else>
                <template v-if="!activeData.__config__.isSubTable">
                  <el-form-item v-if="activeData.__vModel__ !== undefined" label="字段名">
                    <el-select v-model="activeData.__vModel__" placeholder="请选择字段名（v-model）"
                      clearable @change="fieldChange">
                      <el-option v-for="item in formItemList" :key="item.field" :value="item.field"
                        :label="item.fieldName?item.field+'('+item.fieldName+')':item.field">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </template>
                <template v-if="activeData.__config__.isSubTable && subTable.length">
                  <el-form-item v-if="activeData.__vModel__ !== undefined" label="字段名">
                    <el-select v-model="activeData.__vModel__" placeholder="请选择字段名（v-model）"
                      clearable @change="fieldChange1">
                      <el-option
                        v-for="item in getSubTalebFiled(activeData.__config__.relationTable)"
                        :key="item.field" :value="item.field"
                        :label="item.fieldName?item.field+'('+item.fieldName+')':item.field">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </template>
              </template>
            </template>
            <template v-else>
              <el-form-item v-if="activeData.__vModel__ !== undefined" label="字段名">
                <el-input v-model="activeData.__vModel__" placeholder="请输入字段名（v-model）" disabled />
              </el-form-item>
            </template>
            <el-form-item label="标题名"
              v-if="activeData.__config__.label !== undefined && !['JNPFText','card','groupTitle'].includes(activeData.__config__.jnpfKey)">
              <el-input v-model="activeData.__config__.label" placeholder="请输入标题名" />
            </el-form-item>
            <el-form-item v-if="activeData.placeholder !== undefined" label="占位提示">
              <el-input v-model="activeData.placeholder" placeholder="请输入占位提示" />
            </el-form-item>
            <el-form-item label="最多输入" v-if="activeData.maxlength !== undefined">
              <el-input v-model="activeData.maxlength" placeholder="请输入字符长度" type="number">
                <template slot="append">个字符</template>
              </el-input>
            </el-form-item>
            <template v-if="activeData.__config__.jnpfKey === 'comInput'">
              <el-form-item v-if="activeData.type !== undefined" label="类型">
                <el-select v-model="activeData.type" placeholder="请选择类型">
                  <el-option label="文本输入键盘" value="text"></el-option>
                  <el-option label="数字输入键盘" value="number"></el-option>
                  <el-option label="身份证输入键盘" value="idcard"></el-option>
                  <el-option label="带小数点的数字键盘" value="digit"></el-option>
                </el-select>
              </el-form-item>
            </template>
            <template
              v-if="activeData.__config__.jnpfKey === 'numInput' ||activeData.__config__.jnpfKey === 'slider'">
              <el-form-item label="最小值">
                <el-input-number v-model="activeData.min" placeholder="最小值" />
              </el-form-item>
              <el-form-item label="最大值">
                <el-input-number v-model="activeData.max" placeholder="最大值" />
              </el-form-item>
              <el-form-item label="步长">
                <el-input-number v-model="activeData.step" placeholder="步数" :min="1" />
              </el-form-item>
            </template>
            <template
              v-if="['radio', 'checkbox', 'select'].indexOf(activeData.__config__.jnpfKey) > -1">
              <el-form-item label="" label-width="40px">
                <el-radio-group v-model="activeData.__config__.dataType" size="small"
                  style="text-align:center" @change="dataTypeChange">
                  <el-radio-button label="static">静态数据</el-radio-button>
                  <el-radio-button label="dictionary">数据字典</el-radio-button>
                  <el-radio-button label="dynamic">远端数据</el-radio-button>
                </el-radio-group>
              </el-form-item>
              <template v-if="activeData.__config__.dataType === 'static'">
                <draggable :list="activeData.__slot__.options" :animation="340" group="selectItem"
                  handle=".option-drag">
                  <div v-for="(item, index) in activeData.__slot__.options" :key="index"
                    class="select-item">
                    <div class="select-line-icon option-drag">
                      <i class="el-icon-s-operation" />
                    </div>
                    <el-input v-model="item.fullName" placeholder="选项名" size="small" />
                    <el-input v-model="item.id" placeholder="选项值" size="small" />
                    <div class="close-btn select-line-icon"
                      @click="activeData.__slot__.options.splice(index, 1)">
                      <i class="el-icon-remove-outline" />
                    </div>
                  </div>
                </draggable>
                <div style="margin-left: 20px;">
                  <el-button style="padding-bottom: 0" icon="el-icon-circle-plus-outline"
                    type="text" @click="addSelectItem">
                    添加选项
                  </el-button>
                </div>
              </template>
              <JNPF-TreeSelect :options="treeData" v-model="activeData.__config__.dictionaryType"
                placeholder="选择数据字典" v-if="activeData.__config__.dataType === 'dictionary'"
                lastLevel clearable />
              <template v-if="activeData.__config__.dataType === 'dynamic'">
                <el-form-item label="数据接口">
                  <JNPF-TreeSelect :options="dataInterfaceSelector"
                    v-model="activeData.__config__.propsUrl" placeholder="请选择数据接口" lastLevel
                    lastLevelKey="categoryId" lastLevelValue="1" clearable />
                </el-form-item>
                <el-form-item label="值">
                  <el-input v-model="activeData.__config__.props.value" placeholder="请输入值" />
                </el-form-item>
                <el-form-item label="标签">
                  <el-input v-model="activeData.__config__.props.label" placeholder="请输入标签" />
                </el-form-item>
              </template>
            </template>
            <template
              v-if="activeData.__config__.jnpfKey === 'treeSelect' || activeData.__config__.jnpfKey === 'cascader'">
              <el-form-item label="" label-width="40px">
                <el-radio-group v-model="activeData.__config__.dataType" size="small"
                  style="text-align:center" @change="dataTypeChange">
                  <el-radio-button label="static">静态数据</el-radio-button>
                  <el-radio-button label="dictionary">数据字典</el-radio-button>
                  <el-radio-button label="dynamic">远端数据</el-radio-button>
                </el-radio-group>
              </el-form-item>
              <template v-if="activeData.__config__.dataType === 'static'">
                <!-- 级联选择静态树 -->
                <el-tree draggable :data="activeData.options" node-key="id"
                  :expand-on-click-node="false" :render-content="renderContent" :props="props" />
                <div style="margin-left: 20px;margin-bottom: 20px;">
                  <el-button style="padding-bottom: 0" icon="el-icon-circle-plus-outline"
                    type="text" @click="addTreeItem">添加父级</el-button>
                </div>
              </template>
              <JNPF-TreeSelect :options="treeData" v-model="activeData.__config__.dictionaryType"
                placeholder="选择数据字典" v-if="activeData.__config__.dataType === 'dictionary'"
                lastLevel clearable />
              <template v-if="activeData.__config__.dataType === 'dynamic'">
                <el-form-item label="数据接口">
                  <JNPF-TreeSelect :options="dataInterfaceSelector"
                    v-model="activeData.__config__.propsUrl" placeholder="请选择数据接口" lastLevel
                    lastLevelKey="categoryId" lastLevelValue="1" clearable />
                </el-form-item>
                <el-form-item label="标签键名">
                  <el-input v-model="activeData.props.props.label" placeholder="请输入标签键名" />
                </el-form-item>
                <el-form-item label="值键名">
                  <el-input v-model="activeData.props.props.value" placeholder="请输入值键名" />
                </el-form-item>
                <el-form-item label="子级键名">
                  <el-input v-model="activeData.props.props.children" placeholder="请输入子级键名" />
                </el-form-item>
              </template>
            </template>
            <template v-if="activeData.__config__.jnpfKey === 'JNPFText'">
              <el-form-item label="文本内容">
                <el-input v-model="activeData.__config__.defaultValue" placeholder="请输入文本内容" />
              </el-form-item>
              <el-form-item label="行高">
                <el-input-number v-model="activeData.textStyle['line-height']" :min="12"
                  placeholder="请输入行高" /> rpx
              </el-form-item>
              <el-form-item label="字体大小">
                <el-input-number v-model="activeData.textStyle['font-size']" :min="12"
                  placeholder="请输入字体大小" /> rpx
              </el-form-item>
              <el-form-item label="对齐方式">
                <el-radio-group v-model="activeData.textStyle['text-align']">
                  <el-radio-button label="left">左对齐</el-radio-button>
                  <el-radio-button label="center">居中对齐</el-radio-button>
                  <el-radio-button label="right">右对齐</el-radio-button>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="字体颜色">
                <el-color-picker v-model="activeData.textStyle['color']"></el-color-picker>
              </el-form-item>
              <el-form-item label="是否加粗">
                <el-switch v-model="activeData.textStyle['font-weight']" active-value="bold"
                  inactive-value="normal" />
              </el-form-item>
              <el-form-item label="是否斜体">
                <el-switch v-model="activeData.textStyle['font-style']" active-value="italic"
                  inactive-value="normal" />
              </el-form-item>
              <el-form-item label="下划线样式">
                <el-radio-group v-model="activeData.textStyle['text-decoration']">
                  <el-radio-button label="none">无样式</el-radio-button>
                  <el-radio-button label="underline">下划线</el-radio-button>
                  <el-radio-button label="line-through">删除线</el-radio-button>
                </el-radio-group>
              </el-form-item>
            </template>
            <template v-if="activeData.__config__.jnpfKey === 'table'">
              <el-form-item label="关联子表" v-if="$store.getters.hasTable">
                <el-select v-model="activeData.__config__.tableName" placeholder="请选择关联子表" clearable
                  @change="onTableNameChange">
                  <el-option v-for="item in subTable" :key="item.table" :label="item.table"
                    :value="item.table">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item v-if="activeData.actionText !== undefined" label="动作文字">
                <el-input v-model="activeData.actionText" placeholder="请输入动作文字" />
              </el-form-item>
            </template>
            <template v-if="activeData.__config__.jnpfKey === 'groupTitle'">
              <el-form-item label="标题">
                <el-input v-model="activeData.content" placeholder="请输入标题" />
              </el-form-item>
              <el-form-item label="对齐方式">
                <el-radio-group v-model="activeData['content-position']">
                  <el-radio-button label="left">左对齐</el-radio-button>
                  <el-radio-button label="center">居中对齐</el-radio-button>
                  <el-radio-button label="right">右对齐</el-radio-button>
                </el-radio-group>
              </el-form-item>
            </template>
            <el-form-item v-if="activeData.__config__.rule !== undefined" label="选择规则">
              <BillRule v-model="activeData.__config__.rule" placeholder="选择规则" />
            </el-form-item>
            <el-form-item v-if="activeData.__config__.noShow !== undefined" label="是否隐藏">
              <el-switch v-model="activeData.__config__.noShow" />
            </el-form-item>
            <el-form-item v-if="activeData.allowHalf !== undefined" label="允许半星">
              <el-switch v-model="activeData.allowHalf" />
            </el-form-item>
            <el-form-item v-if="activeData.readonly !== undefined" label="是否只读">
              <el-switch v-model="activeData.readonly" />
            </el-form-item>
            <el-form-item v-if="activeData.disabled !== undefined" label="是否禁用">
              <el-switch v-model="activeData.disabled" />
            </el-form-item>
            <el-form-item v-if="activeData.__config__.required !== undefined" label="是否必填">
              <el-switch v-model="activeData.__config__.required" />
            </el-form-item>
          </template>
        </el-form>
        <!-- 表单属性 -->
        <el-form v-show="currentTab === 'form'" size="small" label-width="100px"
          labelPosition="left">
          <el-form-item label="标签对齐">
            <el-radio-group v-model="formConf.labelPosition">
              <el-radio-button label="left">左对齐</el-radio-button>
              <el-radio-button label="right">右对齐</el-radio-button>
              <el-radio-button label="top">顶部对齐</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="标题宽度">
            <el-input v-model.number="formConf.labelWidth" type="number" placeholder="请输入标题宽度" />
          </el-form-item>
          <el-form-item label="取消按钮文本">
            <el-input v-model="formConf.cancelButtonText" placeholder="默认为‘取 消’" />
          </el-form-item>
          <el-form-item label="确定按钮文本">
            <el-input v-model="formConf.confirmButtonText" placeholder="默认为‘保 存’" />
          </el-form-item>
        </el-form>
      </el-scrollbar>
    </div>
    <treeNode-dialog :visible.sync="dialogVisible" title="添加选项" @commit="addNode" />
  </div>
</template>

<script>
import { isArray } from "util"
import { isNumberStr } from "@/components/Generator/utils"
import draggable from "vuedraggable"
import { getDictionaryTypeSelector, getDictionaryDataSelector } from "@/api/systemData/dictionary"
import { getDataInterfaceSelector, previewDataInterface } from "@/api/systemData/dataInterface"
import { saveFormConf, getDrawingList } from "@/components/Generator/utils/db"
import TreeNodeDialog from "./RightComponents/TreeSelect/TreeNodeDialog"

export default {
  components: { draggable, TreeNodeDialog },
  props: ["showField", "activeData", "formConf"],
  data() {
    return {
      currentTab: "field",
      currentNode: null,
      dialogVisible: false,
      iconsVisible: false,
      currentIconModel: null,
      treeData: [],
      dataInterfaceSelector: [],
      justifyOptions: [
        {
          label: "start",
          value: "start"
        },
        {
          label: "end",
          value: "end"
        },
        {
          label: "center",
          value: "center"
        },
        {
          label: "space-around",
          value: "space-around"
        },
        {
          label: "space-between",
          value: "space-between"
        }
      ],
      props: {
        value: "id",
        label: "fullName",
        children: "children"
      },
      layoutTreeProps: {
        label(data, node) {
          const config = data.__config__
          return data.componentName || `${config.label}: ${data.__vModel__}`
        }
      }
    }
  },
  computed: {
    activeTag() {
      return this.activeData.__config__.tag
    },
    formItemList() {
      return this.$store.state.generator.formItemList
    },
    subTable() {
      return this.$store.state.generator.subTable || []
    }
  },
  watch: {
    formConf: {
      handler(val) {
        // saveFormConf(val)
      },
      deep: true
    }
  },
  created() {
    this.getDictionaryType()
    this.getDataInterfaceSelector()
  },
  methods: {
    addReg() {
      this.activeData.__config__.regList.push({
        pattern: "",
        message: ""
      })
    },
    setDefaultValue(val) {
      if (Array.isArray(val)) {
        return val.join(",")
      }
      // if (['string', 'number'].indexOf(typeof val) > -1) {
      //   return val
      // }
      if (typeof val === "boolean") {
        return `${val}`
      }
      return val
    },
    onDefaultValueInput(str) {
      if (isArray(this.activeData.__config__.defaultValue)) {
        // 数组
        this.$set(
          this.activeData.__config__,
          "defaultValue",
          str.split(",").map(val => (isNumberStr(val) ? +val : val))
        )
      } else if (["true", "false"].indexOf(str) > -1) {
        // 布尔
        this.$set(this.activeData.__config__, "defaultValue", JSON.parse(str))
      } else {
        // 字符串和数字
        this.$set(
          this.activeData.__config__,
          "defaultValue",
          isNumberStr(str) ? +str : str
        )
      }
    },
    getSubTalebFiled(key) {
      let item = {}
      let list = this.subTable.filter(o => o.table === key)
      if (list.length) {
        item = list[0]
      }
      let arr = []
      if (item && item.fields) arr = item.fields
      return arr
    },
    fieldChange1(val) {
      if (!val) return
      let options = this.getSubTalebFiled(this.activeData.__config__.relationTable)
      let item = options.filter(o => o.field == val)[0]
      if (!item || !item.fieldName) return
      this.activeData.__config__.label = item.fieldName
    },
    fieldChange(val) {
      if (!val) return
      const drawingList = getDrawingList()
      let boo = false
      const loop = list => {
        for (let i = 0; i < list.length; i++) {
          const e = list[i]
          const config = e.__config__
          if (e.__vModel__ === val) {
            boo = true
            break
          }
          if (config && config.jnpfKey != 'table' && config.children && Array.isArray(config.children)) {
            loop(config.children)
          }
        }
      }
      loop(drawingList)
      if (boo) {
        this.$message.warning(`字段【${val}】已存在,请重新选!`)
        this.activeData.__vModel__ = ''
        return
      }
      let item = this.formItemList.filter(o => o.field == val)[0]
      if (!item || !item.fieldName) return
      this.activeData.__config__.label = item.fieldName
    },
    spanChange(val) {
      this.formConf.span = val
    },
    onTableNameChange(tableName) {
      for (let i = 0; i < this.activeData.__config__.children.length; i++) {
        this.$set(
          this.activeData.__config__.children[i].__config__,
          "relationTable",
          tableName
        )
        this.$set(this.activeData.__config__.children[i], "__vModel__", "")
      }
    },
    getDictionaryType() {
      getDictionaryTypeSelector().then(res => {
        this.treeData = res.data.list
      })
    },
    getDataInterfaceSelector() {
      getDataInterfaceSelector().then(res => {
        this.dataInterfaceSelector = res.data
      })
    },
    addSelectItem() {
      this.activeData.__slot__.options.push({ fullName: "", id: "" })
    },
    dataTypeChange(val) {
      if (val === "static") {
        this.activeData.__config__.dictionaryType = ""
        this.activeData.__config__.propsUrl = ""
      }
      if (val === "dynamic") {
        this.activeData.__config__.dictionaryType = ""
      }
      if (val === "dictionary") {
        this.activeData.__config__.propsUrl = ""
      }
      if (this.activeData.__config__.jnpfKey === 'treeSelect' || this.activeData.__config__.jnpfKey === 'cascader') {
        this.activeData.props.props.value = 'id'
        this.activeData.props.props.label = 'fullName'
        this.activeData.props.props.children = 'children'
      } else {
        this.activeData.__config__.props.value = 'id'
        this.activeData.__config__.props.label = 'fullName'
      }
    },
    renderContent(h, { node, data, store }) {
      return (
        <div class="custom-tree-node">
          <span class="text">{node.label}</span>
          <span class="node-operation">
            <i on-click={() => this.append(data)}
              class="el-icon-plus"
              title="添加" />
            <i on-click={() => this.remove(node, data)}
              class="el-icon-delete"
              title="删除" />
          </span>
        </div>
      )
    },
    addTreeItem() {
      this.dialogVisible = true
      this.currentNode = this.activeData.options
    },
    addNode(data) {
      this.currentNode.push(data)
    },
    append(data) {
      if (!data.children) {
        this.$set(data, "children", [])
      }
      this.dialogVisible = true
      this.currentNode = data.children
    },
    remove(node, data) {
      this.activeData.__config__.defaultValue = [] // 避免删除时报错
      const { parent } = node
      const children = parent.data.children || parent.data
      const index = children.findIndex(d => d.id === data.id)
      children.splice(index, 1)
    }
  }
}
</script>

<style lang="scss" scoped>
.right-board {
  width: 340px;
  position: absolute;
  right: 0;
  top: 0;
  padding-top: 3px;
  height: 100%;
  background: #fff;
  border-radius: 4px;
  .field-box {
    position: relative;
    height: calc(100% - 42px);
    box-sizing: border-box;
    overflow: hidden;
  }
  .el-scrollbar {
    height: 100%;
  }
}

.select-item {
  display: flex;
  border: 1px dashed #fff;
  box-sizing: border-box;
  & .close-btn {
    cursor: pointer;
    color: #f56c6c;
  }
  & .el-input + .el-input {
    margin-left: 4px;
  }
}
.select-item + .select-item {
  margin-top: 4px;
}
.select-item.sortable-chosen {
  border: 1px dashed #409eff;
}
.select-line-icon {
  line-height: 32px;
  font-size: 22px;
  padding: 0 4px;
  color: #777;
}
.option-drag {
  cursor: move;
}
.time-range {
  .el-date-editor {
    width: 227px;
  }
  ::v-deep .el-icon-time {
    display: none;
  }
}
.document-link {
  position: absolute;
  display: block;
  width: 26px;
  height: 26px;
  top: 0;
  left: 0;
  cursor: pointer;
  background: #409eff;
  z-index: 1;
  border-radius: 0 0 6px 0;
  text-align: center;
  line-height: 26px;
  color: #fff;
  font-size: 18px;
}
.node-label {
  font-size: 14px;
}
.node-icon {
  color: #bebfc3;
}
.right-scrollbar {
  .el-form {
    >>> .el-date-editor,
    >>> .el-cascader,
    >>> .el-select {
      width: 100%;
    }
  }
}
.custom-tree-node {
  width: 100%;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  .node-operation {
    float: right;
  }
  i[class*='el-icon'] + i[class*='el-icon'] {
    margin-left: 6px;
  }
  .el-icon-plus {
    color: #409eff;
  }
  .el-icon-delete {
    color: #157a0c;
  }
}
</style>