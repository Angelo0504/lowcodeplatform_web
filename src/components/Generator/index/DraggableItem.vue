<script>
import draggable from 'vuedraggable'
import render from '@/components/Generator/render/render'
import { dyOptionsList } from '@/components/Generator/generator/comConfig'
import { getDictionaryDataSelector } from '@/api/systemData/dictionary'
import { previewDataInterface } from '@/api/systemData/dataInterface'

let activeData = {}
const components = {
  itemBtns(h, element, index, parent) {
    const { copyItem, deleteItem } = this.$listeners
    return [
      <span class="drawing-item-copy" title="复制" onClick={event => {
        copyItem(element, parent); event.stopPropagation()
      }}>
        <i class="el-icon-copy-document" />
      </span>,
      <span class="drawing-item-delete" title="删除" onClick={event => {
        deleteItem(index, parent); event.stopPropagation()
      }}>
        <i class="el-icon-delete" />
      </span>
    ]
  }
}
const layouts = {
  colFormItem(h, element, index, parent) {
    const { activeItem } = this.$listeners
    const config = element.__config__
    let className = this.activeId === config.formId ? 'drawing-item active-from-item' : 'drawing-item'
    if (this.formConf.unFocusedComponentBorder) className += ' unfocus-bordered'
    let labelWidth = config.labelWidth ? `${config.labelWidth}px` : null
    if (config.showLabel === false) labelWidth = '0'
    return (
      <el-col span={config.span} class={className}
        nativeOnClick={event => { activeItem(element); event.stopPropagation() }}>
        <el-form-item label-width={labelWidth}
          label={config.showLabel ? config.label : ''} required={config.required}>
          <render key={config.renderKey} conf={element} onInput={event => {
            this.$set(config, 'defaultValue', event)
          }} />
        </el-form-item>
        {components.itemBtns.apply(this, arguments)}
      </el-col>
    )
  },
  rowFormItem(h, element, index, parent) {
    const { activeItem } = this.$listeners
    const { put, end } = this.$attrs
    const className = this.activeId === element.__config__.formId
      ? 'drawing-row-item active-from-item'
      : 'drawing-row-item'
    let child = renderChildren.apply(this, arguments)
    const group = { name: 'componentsGroup', put: (...arg) => put(...arg, element) }
    const onEnd = (...arg) => end(...arg, activeData, element)
    if (element.__config__.jnpfKey === 'row') {
      if (element.type === 'flex') {
        child = <el-row type={element.type} justify={element.justify} align={element.align}>
          {child}
        </el-row>
      }
      let tip = ''
      if (!element.__config__.children.length) {
        tip = <div class="table-tip">请将组件拖到此区域(可拖多个组件)</div>
      }
      return (
        <el-col span={element.__config__.span}>
          <el-row gutter={element.__config__.gutter} class={className}
            nativeOnClick={event => { activeItem(element); event.stopPropagation() }}>
            <span class="component-name">{element.__config__.componentName}</span>
            {tip}
            <draggable list={element.__config__.children} animation={340} group={group} class="drag-wrapper">
              {child}
            </draggable>
            {components.itemBtns.apply(this, arguments)}
          </el-row>
        </el-col>
      )
    }
    if (element.__config__.jnpfKey === 'table') {
      let tip = ''
      if (!element.__config__.children.length) {
        tip = <div class="table-tip">请将组件拖到此区域(可拖多个组件)</div>
      }
      return (
        <el-col span={element.__config__.span}>
          <el-row gutter={element.__config__.gutter} class={className}
            nativeOnClick={event => { activeItem(element); event.stopPropagation() }}>
            <span class="component-name">{element.__config__.label}</span>
            {tip}
            <el-form label-position="top">
              <draggable list={element.__config__.children} animation={340} group={group} class="drag-wrapper table-wrapper table-wrapper-web" onEnd={onEnd} clone={cloneComponent}>
                {child}
              </draggable>
            </el-form>
            {components.itemBtns.apply(this, arguments)}
          </el-row>
        </el-col>
      )
    }
    if (element.__config__.jnpfKey === 'card') {
      let tip = ''
      if (!element.__config__.children.length) {
        tip = <div class="table-tip">请将组件拖到此区域(可拖多个组件)</div>
      }
      return (
        <el-col span={element.__config__.span}>
          <el-row gutter={element.__config__.gutter} class={className}
            nativeOnClick={event => { activeItem(element); event.stopPropagation() }}>
            <el-card shadow={element.shadow}>
              <el-col>
                <el-row gutter={element.__config__.gutter} class={className}
                  nativeOnClick={event => { activeItem(element); event.stopPropagation() }}>
                  {tip}
                  <draggable list={element.__config__.children} animation={340} group={group} class="drag-wrapper">
                    {child}
                  </draggable>
                </el-row>
              </el-col>
            </el-card>
            {components.itemBtns.apply(this, arguments)}
          </el-row>
        </el-col>
      )
    }
  }
}
function cloneComponent(origin) {
  activeData = origin
}

function renderChildren(h, element, index, parent) {
  const config = element.__config__
  if (!Array.isArray(config.children)) return null
  return config.children.map((el, i) => {
    const layout = layouts[el.__config__.layout]
    if (layout) {
      return layout.call(this, h, el, i, config.children)
    }
    return layoutIsNotFound.call(this)
  })
}

function layoutIsNotFound() {
  throw new Error(`没有与${this.element.__config__.layout}匹配的layout`)
}

function buildOptions(element) {
  const config = element.__config__
  if (dyOptionsList.indexOf(config.jnpfKey) > -1) {
    let isTreeSelect = config.jnpfKey === 'treeSelect' || config.jnpfKey === 'cascader'
    if (config.dataType === 'dictionary') {
      if (!config.dictionaryType) return
      getDictionaryDataSelector(config.dictionaryType).then(res => {
        isTreeSelect ? element.options = res.data.list : element.__slot__.options = res.data.list
      })
    }
    if (config.dataType === 'dynamic') {
      if (!config.propsUrl) return
      previewDataInterface(config.propsUrl).then(res => {
        isTreeSelect ? element.options = res.data : element.__slot__.options = res.data
      })
    }
  }
  if (config.children && Array.isArray(config.children)) {
    for (let i = 0; i < config.children.length; i++) {
      buildOptions(config.children[i])
    }
  }
}

export default {
  components: {
    render,
    draggable
  },
  props: [
    'element',
    'index',
    'drawingList',
    'activeId',
    'formConf'
  ],
  render(h) {
    // buildOptions(this.element)
    const layout = layouts[this.element.__config__.layout]

    if (layout) {
      return layout.call(this, h, this.element, this.index, this.drawingList)
    }
    return layoutIsNotFound.call(this)
  }
}
</script>
<style lang="scss" scoped>
.table-tip {
  width: 100%;
  color: #999;
  text-align: center;
  position: absolute;
  top: 40px;
}
</style>