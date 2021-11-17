<template>
  <el-row>
    <!-- <el-form-item label="字段名">
      <el-input v-model="activeData.__vModel__" placeholder="请输入字段名" readonly />
    </el-form-item> -->
    <el-form-item label="标题名">
      <el-input v-model="activeData.__config__.label" placeholder="请输入标题名" />
    </el-form-item>
    <el-form-item label="控件栅格">
      <el-slider v-model="activeData.__config__.span" :max="24" :min="6" show-stops :step="2"
        show-tooltip />
    </el-form-item>
    <el-form-item label="标题宽度">
      <el-input v-model.number="activeData.__config__.labelWidth" type="number"
        placeholder="请输入标题宽度" />
    </el-form-item>
    <el-form-item label="默认值">
      <el-checkbox-group v-model="activeData.__config__.defaultValue" :min="activeData.min"
        :max="activeData.max">
        <el-checkbox :label="item[activeData.__config__.props.value]"
          v-for="(item,i) in activeData.__slot__.options" :key="i">
          {{item[activeData.__config__.props.label]}}</el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item label="至少应选">
      <el-input-number :value="activeData.min" :min="0" placeholder="至少应选"
        @input="$set(activeData, 'min', $event?$event:undefined)" />
    </el-form-item>
    <el-form-item label="最多可选">
      <el-input-number :value="activeData.max" :min="0" placeholder="最多可选"
        @input="$set(activeData, 'max', $event?$event:undefined)" />
    </el-form-item>
    <el-divider>选项</el-divider>
    <el-form-item label="" label-width="40px">
      <el-radio-group v-model="activeData.__config__.dataType" size="small"
        style="text-align:center" @change="dataTypeChange">
        <el-radio-button label="static">静态数据</el-radio-button>
        <el-radio-button label="dictionary">数据字典</el-radio-button>
        <el-radio-button label="dynamic">远端数据</el-radio-button>
      </el-radio-group>
    </el-form-item>
    <template v-if="activeData.__config__.dataType==='static'">
      <draggable :list="activeData.__slot__.options" :animation="340" group="selectItem"
        handle=".option-drag">
        <div v-for="(item, index) in activeData.__slot__.options" :key="index" class="select-item">
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
      <div style="margin-left: 29px;">
        <el-button style="padding-bottom: 0" icon="el-icon-circle-plus-outline" type="text"
          @click="addSelectItem">
          添加选项
        </el-button>
      </div>
    </template>
    <JNPF-TreeSelect :options="treeData" v-model="activeData.__config__.dictionaryType"
      placeholder="选择数据字典" lastLevel v-if="activeData.__config__.dataType==='dictionary'" clearable>
    </JNPF-TreeSelect>
    <template v-if="activeData.__config__.dataType === 'dynamic'">
      <el-form-item label="数据接口">
        <JNPF-TreeSelect :options="dataInterfaceSelector" v-model="activeData.__config__.propsUrl"
          placeholder="请选择数据接口" lastLevel lastLevelKey='categoryId' lastLevelValue='1'
          @getValue="propsUrlChange" clearable>
        </JNPF-TreeSelect>
      </el-form-item>
      <el-form-item label="值">
        <el-input v-model="activeData.__config__.props.value" placeholder="请输入值" />
      </el-form-item>
      <el-form-item label="标签">
        <el-input v-model="activeData.__config__.props.label" placeholder="请输入标签" />
      </el-form-item>
    </template>
    <el-divider />
    <!-- <el-form-item label="显示标签">
      <el-switch v-model="activeData.__config__.showLabel" />
    </el-form-item> -->
    <el-form-item label="选项样式">
      <el-radio-group v-model="activeData.__config__.optionType">
        <el-radio-button label="default">
          默认
        </el-radio-button>
        <el-radio-button label="button">
          按钮
        </el-radio-button>
      </el-radio-group>
    </el-form-item>
    <el-form-item v-if=" activeData.__config__.optionType === 'default'" label="是否带边框">
      <el-switch v-model="activeData.__config__.border" />
    </el-form-item>
    <el-form-item v-if="activeData.__config__.optionType === 'button' ||
                activeData.__config__.border" label="组件尺寸">
      <el-radio-group v-model="activeData.size">
        <el-radio-button label="medium">
          中等
        </el-radio-button>
        <el-radio-button label="small">
          较小
        </el-radio-button>
        <el-radio-button label="mini">
          迷你
        </el-radio-button>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="是否禁用">
      <el-switch v-model="activeData.disabled" />
    </el-form-item>
    <el-form-item label="是否必填">
      <el-switch v-model="activeData.__config__.required" />
    </el-form-item>
  </el-row>
</template>
<script>
import comMinix from './minix';
import draggable from 'vuedraggable'
import { getDictionaryTypeSelector, getDictionaryDataSelector } from '@/api/systemData/dictionary'
import { getDataInterfaceSelector, previewDataInterface } from '@/api/systemData/dataInterface'
export default {
  props: ['activeData'],
  mixins: [comMinix],
  components: { draggable },
  data() {
    return {
      treeData: [],
      dataInterfaceSelector: []
    }
  },
  created() {
    this.getDictionaryType()
    this.getDataInterfaceSelector()
  },
  watch: {
    'activeData.__config__.dictionaryType': function (val) {
      if (!val) {
        this.activeData.__slot__.options = []
        return
      }
      getDictionaryDataSelector(val).then(res => {
        this.activeData.__slot__.options = res.data.list
      })
    }
  },
  methods: {
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
      this.activeData.__slot__.options.push({
        fullName: '',
        id: ''
      })
    },
    dataTypeChange(val) {
      this.activeData.__config__.defaultValue = []
      this.activeData.__slot__.options = []
      this.activeData.__config__.props.value = 'id'
      this.activeData.__config__.props.label = 'fullName'
      if (val === 'static') {
        this.activeData.__config__.dictionaryType = ''
        this.activeData.__config__.propsUrl = ''
      }
      if (val === 'dynamic') {
        this.activeData.__config__.dictionaryType = ''
      }
      if (val === 'dictionary') {
        this.activeData.__config__.propsUrl = ''
      }
    },
    dictionaryTypeChange() {
      this.activeData.__config__.defaultValue = []
    },
    propsUrlChange(val) {
      if (!val) {
        this.activeData.__slot__.options = []
        return
      }
      this.activeData.__config__.defaultValue = []
      previewDataInterface(val).then(res => {
        this.activeData.__slot__.options = res.data
      }).catch(res => {
        this.activeData.__config__.propsUrl = ''
        this.activeData.__slot__.options = []
      })
    }
  }
}
</script>
<style lang="scss">
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
</style>