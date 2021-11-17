<template>
  <div class="right-board">
    <el-tabs v-model="currentTab" class="center-tabs">
      <el-tab-pane label="组件属性" name="field" />
      <el-tab-pane label="表单属性" name="form" />
    </el-tabs>
    <div class="field-box">
      <el-scrollbar class="right-scrollbar">
        <!-- 组件属性 -->
        <el-form v-show="currentTab==='field' && showField" size="small" label-width="90px"
          labelPosition="left">
          <template v-if="activeData.__config__">
            <template v-if="$store.getters.hasTable">
              <template v-if="activeData.__config__.jnpfKey==='table'">
                <el-form-item v-if="activeData.__vModel__!==undefined" label="字段名">
                  <el-input v-model="activeData.__vModel__" placeholder="请输入字段名（v-model）"
                    disabled />
                </el-form-item>
              </template>
              <template v-else>
                <template v-if="!activeData.__config__.isSubTable">
                  <el-form-item v-if="activeData.__vModel__!==undefined" label="字段名">
                    <el-select v-model="activeData.__vModel__" placeholder="请选择字段名（v-model）"
                      clearable @change="fieldChange">
                      <el-option v-for="item in formItemList" :key="item.field" :value="item.field"
                        :label="item.fieldName?item.field+'('+item.fieldName+')':item.field">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </template>
                <template v-if="activeData.__config__.isSubTable && subTable.length">
                  <el-form-item v-if="activeData.__vModel__!==undefined" label="字段名">
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
              <el-form-item v-if="activeData.__vModel__!==undefined" label="字段名">
                <el-input v-model="activeData.__vModel__" placeholder="请输入字段名（v-model）" disabled />
              </el-form-item>
            </template>
            <JNPFComInput v-if="activeData.__config__.jnpfKey==='comInput'"
              :active-data="activeData" />
            <JNPF-textarea v-if="activeData.__config__.jnpfKey==='textarea'"
              :active-data="activeData" />
            <JNPFText v-if="activeData.__config__.jnpfKey==='JNPFText'" :active-data="activeData" />
            <JNPFNumInput v-if="activeData.__config__.jnpfKey==='numInput'"
              :active-data="activeData" />
            <JNPFAmount v-if="activeData.__config__.jnpfKey==='JNPFAmount'"
              :active-data="activeData" />
            <JNPFPsdInput v-if="activeData.__config__.jnpfKey==='PsdInput'"
              :active-data="activeData" />
            <JNPFRadio v-if="activeData.__config__.jnpfKey==='radio'" :active-data="activeData" />
            <JNPFCheckbox v-if="activeData.__config__.jnpfKey==='checkbox'"
              :active-data="activeData" />
            <JNPFSelect v-if="activeData.__config__.jnpfKey==='select'" :active-data="activeData" />
            <JNPFCascader v-if="activeData.__config__.jnpfKey==='cascader'"
              :active-data="activeData" />
            <JNPFTime v-if="activeData.__config__.jnpfKey==='time'" :active-data="activeData" />
            <JNPFTimeRange v-if="activeData.__config__.jnpfKey==='timeRange'"
              :active-data="activeData" />
            <JNPFDate v-if="activeData.__config__.jnpfKey==='date'" :active-data="activeData" />
            <JNPFDateRange v-if="activeData.__config__.jnpfKey==='dateRange'"
              :active-data="activeData" />
            <JNPFColorPicker v-if="activeData.__config__.jnpfKey==='colorPicker'"
              :active-data="activeData" />
            <JNPFRate v-if="activeData.__config__.jnpfKey==='rate'" :active-data="activeData" />
            <JNPFSwitch v-if="activeData.__config__.jnpfKey==='switch'" :active-data="activeData" />
            <JNPFSlider v-if="activeData.__config__.jnpfKey==='slider'" :active-data="activeData" />
            <JNPFDivider v-if="activeData.__config__.jnpfKey==='divider'"
              :active-data="activeData" />
            <JNPFUploadFz v-if="activeData.__config__.jnpfKey==='uploadFz'"
              :active-data="activeData" />
            <JNPFUploadImg v-if="activeData.__config__.jnpfKey==='uploadImg'"
              :active-data="activeData" />
            <JNPFComRight v-if="isCommon" :active-data="activeData" />
            <JNPFAddress v-if="activeData.__config__.jnpfKey==='address'"
              :active-data="activeData" />
            <TreeSelect v-if="activeData.__config__.jnpfKey==='treeSelect'"
              :active-data="activeData" />
            <GroupTitle v-if="activeData.__config__.jnpfKey==='groupTitle'"
              :active-data="activeData" />
            <RelationForm v-if="activeData.__config__.jnpfKey==='relationForm'"
              :active-data="activeData" v-on="$listeners" />
            <RelationFormAttr v-if="activeData.__config__.jnpfKey==='relationFormAttr'"
              :active-data="activeData" ref="relationFormAttr" />
            <RelationFlow v-if="activeData.__config__.jnpfKey==='relationFlow'"
              :active-data="activeData" v-on="$listeners" />
            <RelationFlowAttr v-if="activeData.__config__.jnpfKey==='relationFlowAttr'"
              :active-data="activeData" ref="relationFlowAttr" />
            <JNPFCalculate v-if="activeData.__config__.jnpfKey==='calculate'"
              :active-data="activeData" ref="calculate" />
            <template v-if="isSystem">
              <el-form-item label="标题名">
                <el-input v-model="activeData.__config__.label" placeholder="请输入标题名" />
              </el-form-item>
              <el-form-item label="控件栅格">
                <el-slider v-model="activeData.__config__.span" :max="24" :min="6" show-stops
                  :step="2" show-tooltip />
              </el-form-item>
              <el-form-item label="标题宽度">
                <el-input v-model.number="activeData.__config__.labelWidth" type="number"
                  placeholder="请输入标题宽度" />
              </el-form-item>
              <el-form-item label="是否隐藏" v-if="activeData.__config__.jnpfKey !=='billRule'">
                <el-switch v-model="activeData.__config__.noShow" />
              </el-form-item>
              <el-form-item label="选择规则" v-if="activeData.__config__.jnpfKey==='billRule'">
                <BillRule v-model="activeData.__config__.rule" placeholder="选择规则" />
              </el-form-item>
            </template>
            <template v-if="activeData.__config__.jnpfKey==='table'">
              <el-form-item label="关联子表" v-if="$store.getters.hasTable">
                <el-select v-model="activeData.__config__.tableName" placeholder="请选择关联子表" clearable
                  @change="onTableNameChange">
                  <el-option v-for="item in subTable" :key="item.table" :label="item.table"
                    :value="item.table">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="标题名">
                <el-input v-model="activeData.__config__.label" placeholder="请输入标题名" />
              </el-form-item>
              <el-form-item label="显示标题">
                <el-switch v-model="activeData.__config__.showTitle" />
              </el-form-item>
              <el-form-item v-if="activeData.actionText !== undefined" label="动作文字">
                <el-input v-model="activeData.actionText" placeholder="请输入动作文字" />
              </el-form-item>
            </template>
            <template v-if="activeData.__config__.jnpfKey==='card'">
              <el-form-item label="控件栅格" label-width="76px">
                <el-slider v-model="activeData.__config__.span" :max="24" :min="6" show-stops
                  :step="2" show-tooltip />
              </el-form-item>
              <el-form-item label="显示阴影" label-width="76px">
                <el-radio-group v-model="activeData.shadow" size="small">
                  <el-radio-button label="always">一直显示</el-radio-button>
                  <el-radio-button label="hover">移入显示</el-radio-button>
                  <el-radio-button label="never">永不显示</el-radio-button>
                </el-radio-group>
              </el-form-item>
            </template>
            <!-- row 布局 -->
            <template v-if="activeData.__config__.jnpfKey==='row'">
              <el-form-item v-if="activeData.__config__.componentName!==undefined" label="组件名">
                {{ activeData.__config__.componentName }}
              </el-form-item>
              <el-form-item label="控件栅格">
                <el-slider v-model="activeData.__config__.span" :max="24" :min="6" show-stops
                  :step="2" show-tooltip />
              </el-form-item>
            </template>
            <el-form-item
              v-if="activeData.__config__.layout==='rowFormItem'&&activeData.gutter!==undefined"
              label="栅格间隔">
              <el-input-number v-model="activeData.gutter" :min="0" placeholder="栅格间隔" />
            </el-form-item>
          </template>
        </el-form>
        <!-- 表单属性 -->
        <el-form v-show="currentTab === 'form'" size="small" label-width="100px"
          labelPosition="left">
          <el-form-item label="表单尺寸">
            <el-radio-group v-model="formConf.size">
              <el-radio-button label="medium">中等</el-radio-button>
              <el-radio-button label="small">较小</el-radio-button>
              <el-radio-button label="mini">迷你</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="标签对齐">
            <el-radio-group v-model="formConf.labelPosition">
              <el-radio-button label="left">左对齐</el-radio-button>
              <el-radio-button label="right">右对齐</el-radio-button>
              <el-radio-button label="top" :disabled="formConf.formStyle==='word-form'">顶部对齐
              </el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="标题宽度">
            <el-input v-model.number="formConf.labelWidth" type="number" placeholder="请输入标题宽度" />
          </el-form-item>
          <el-form-item label="栅格间隔">
            <el-input-number v-model="formConf.gutter" :min="0" placeholder="栅格间隔" />
          </el-form-item>
          <el-form-item label="弹窗类型" v-if="modelType != 3 && modelType!=6">
            <el-select v-model="formConf.popupType" placeholder="请选择">
              <el-option label="普通弹窗" value="general"></el-option>
              <el-option label="全屏弹窗" value="fullScreen"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="表单样式" v-if="modelType != 3">
            <el-select v-model="formConf.formStyle" placeholder="请选择">
              <el-option label="默认风格" value=""></el-option>
              <el-option label="公文风格" value="word-form"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="表单宽度"
            v-if="formConf.popupType==='general' && modelType != 3 && modelType!=6">
            <el-select v-model="formConf.generalWidth" placeholder="请选择">
              <el-option v-for="item in generalWidthOptions" :label="item" :value="item"
                :key="item" />
            </el-select>
          </el-form-item>
          <el-form-item label="表单宽度"
            v-if="formConf.popupType==='fullScreen' || modelType == 3 || modelType ==6">
            <el-select v-model="formConf.fullScreenWidth" placeholder="请选择">
              <el-option v-for="item in fullScreenWidthOptions" :label="item" :value="item"
                :key="item" />
            </el-select>
          </el-form-item>
          <el-form-item label="取消按钮文本" v-if="modelType != 3 && modelType!=6">
            <el-input v-model="formConf.cancelButtonText" placeholder="默认为‘取 消’" />
          </el-form-item>
          <el-form-item label="确定按钮文本" v-if="modelType != 3 && modelType!=6">
            <el-input v-model="formConf.confirmButtonText" placeholder="默认为‘确 定’" />
          </el-form-item>
        </el-form>
      </el-scrollbar>
    </div>

  </div>
</template>

<script>
import { isArray, log } from 'util'
import { isNumberStr } from '@/components/Generator/utils'
import { saveFormConf, getDrawingList } from '@/components/Generator/utils/db'
import JNPFComInput from './RightComponents/ComInput'
import JNPFTextarea from './RightComponents/Textarea'
import JNPFText from './RightComponents/JNPFText'
import JNPFNumInput from './RightComponents/NumInput'
import JNPFAmount from './RightComponents/JNPFAmount'
import JNPFPsdInput from './RightComponents/PsdInput'
import JNPFRadio from './RightComponents/Radio'
import JNPFCheckbox from './RightComponents/Checkbox'
import JNPFSelect from './RightComponents/Select'
import JNPFCascader from './RightComponents/Cascader/index'
import JNPFTime from './RightComponents/Time'
import JNPFTimeRange from './RightComponents/TimeRange'
import JNPFDate from './RightComponents/Date'
import JNPFDateRange from './RightComponents/DateRange'
import JNPFColorPicker from './RightComponents/ColorPicker'
import JNPFRate from './RightComponents/Rate'
import JNPFSwitch from './RightComponents/Switch'
import JNPFSlider from './RightComponents/Slider'
import JNPFDivider from './RightComponents/Divider'
import JNPFUploadFz from './RightComponents/UploadFz'
import JNPFUploadImg from './RightComponents/UploadImg'
import JNPFComRight from './RightComponents/ComRight'
import JNPFAddress from './RightComponents/Address'
import TreeSelect from './RightComponents/TreeSelect'
import GroupTitle from './RightComponents/GroupTitle'
import RelationForm from './RightComponents/RelationForm'
import RelationFormAttr from './RightComponents/RelationFormAttr'
import RelationFlow from './RightComponents/RelationFlow'
import RelationFlowAttr from './RightComponents/RelationFlowAttr'
import JNPFCalculate from './RightComponents/Calculate'

const commonRightList = ['comSelect', 'depSelect', 'posSelect', 'userSelect', 'dicSelect', 'editor']
const systemList = ['createUser', 'createTime', 'modifyUser', 'modifyTime', 'currOrganize', 'currDept', 'currPosition', 'billRule']

export default {
  components: {
    JNPFComInput,
    JNPFTextarea,
    JNPFText,
    JNPFNumInput,
    JNPFAmount,
    JNPFPsdInput,
    JNPFRadio,
    JNPFCheckbox,
    JNPFSelect,
    JNPFCascader,
    JNPFTime,
    JNPFTimeRange,
    JNPFDate,
    JNPFDateRange,
    JNPFColorPicker,
    JNPFRate,
    JNPFSwitch,
    JNPFSlider,
    JNPFDivider,
    JNPFUploadFz,
    JNPFUploadImg,
    JNPFComRight,
    JNPFAddress,
    TreeSelect,
    GroupTitle,
    RelationForm,
    RelationFormAttr,
    RelationFlow,
    RelationFlowAttr,
    JNPFCalculate
  },
  props: ['showField', 'activeData', 'formConf', 'modelType'],
  data() {
    return {
      currentTab: 'field',
      currentNode: null,
      dialogVisible: false,
      iconsVisible: false,
      currentIconModel: null,
      justifyOptions: [
        {
          label: 'start',
          value: 'start'
        },
        {
          label: 'end',
          value: 'end'
        },
        {
          label: 'center',
          value: 'center'
        },
        {
          label: 'space-around',
          value: 'space-around'
        },
        {
          label: 'space-between',
          value: 'space-between'
        }
      ],
      generalWidthOptions: ['600px', '800px', '1000px', '40%', '50%', '60%', '70%', '80%'],
      fullScreenWidthOptions: ['800px', '1000px', '1200px', '1400px', '50%', '60%', '70%', '80%', '90%', '100%'],
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
    },
    isCommon() {
      return commonRightList.indexOf(this.activeData.__config__.jnpfKey) > -1
    },
    isSystem() {
      return systemList.indexOf(this.activeData.__config__.jnpfKey) > -1
    },
  },
  watch: {
    formConf: {
      handler(val) {
        // saveFormConf(val)
        if (val.formStyle === 'word-form' && val.labelPosition === 'top') {
          val.labelPosition = 'left'
        }
      },
      deep: true
    },
    activeData(val) {
      if (val.__config__.jnpfKey === 'relationFormAttr') {
        this.$nextTick(() => {
          this.$refs.relationFormAttr && this.$refs.relationFormAttr.getOptions()
        })
      }
      if (val.__config__.jnpfKey === 'relationFlowAttr') {
        this.$nextTick(() => {
          this.$refs.relationFlowAttr && this.$refs.relationFlowAttr.getOptions()
        })
      }
      if (val.__config__.jnpfKey !== 'calculate') {
        this.$nextTick(() => {
          this.$refs.calculate && this.$refs.calculate.reloadExpressionTemp()
        })
      }
    }
  },
  created() {
    // console.log(this.activeData)
  },
  methods: {
    addReg() {
      this.activeData.__config__.regList.push({
        pattern: '',
        message: ''
      })
    },
    setDefaultValue(val) {
      if (Array.isArray(val)) {
        return val.join(',')
      }
      // if (['string', 'number'].indexOf(typeof val) > -1) {
      //   return val
      // }
      if (typeof val === 'boolean') {
        return `${val}`
      }
      return val
    },
    onDefaultValueInput(str) {
      if (isArray(this.activeData.__config__.defaultValue)) {
        // 数组
        this.$set(
          this.activeData.__config__,
          'defaultValue',
          str.split(',').map(val => (isNumberStr(val) ? +val : val))
        )
      } else if (['true', 'false'].indexOf(str) > -1) {
        // 布尔
        this.$set(this.activeData.__config__, 'defaultValue', JSON.parse(str))
      } else {
        // 字符串和数字
        this.$set(
          this.activeData.__config__,
          'defaultValue',
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
        this.$set(this.activeData.__config__.children[i].__config__, 'relationTable', tableName)
        this.$set(this.activeData.__config__.children[i], '__vModel__', '')
      }
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
</style>