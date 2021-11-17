<template>
  <el-container class="JNPF-Portal">
    <el-aside width="250px" class="left-box">
      <el-scrollbar class="aside-scrollbar">
        <div class="components-list">
          <div v-for="(item, listIndex) in leftComponents" :key="listIndex" class="components-part">
            <div class="components-title">{{ item.title }}</div>
            <div class="list">
              <div v-for="(element, index) in item.list" :key="index" class="components-item"
                @click="addComponent(element)">
                <div class="components-body">
                  <i :class="element.icon" />
                  {{ element.label }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-scrollbar>
    </el-aside>
    <el-main class="center-box">
      <div class="action-bar">
        <el-button icon="el-icon-video-play" type="text" @click="preview" size="medium">
          预览</el-button>
        <el-button class="delete-btn" icon="el-icon-delete" type="text" @click="empty"
          size="medium">清空</el-button>
      </div>
      <el-scrollbar class="layout-area">
        <grid-layout :layout.sync="layout" :row-height="40">
          <grid-item v-for="item in layout" :x="item.x" :y="item.y" :w="item.w" :h="item.h"
            :i="item.i" :key="item.i" :maxH="item.maxH" :minH="item.minH" :minW="item.minW"
            :maxW="item.maxW" :class="{'active-item': item.i===activeId}" @resized="resizedEvent"
            @click.native="handleClick(item)">
            <Todo v-if="item.jnpfKey==='todo'" :title="item.title" />
            <CommonFunc v-if="item.jnpfKey==='commonFunc'" :title="item.title" :list="item.list" />
            <TodoList v-if="item.jnpfKey==='todoList'" :title="item.title" />
            <HNotice v-if="item.jnpfKey==='notice'" :title="item.title" />
            <HEmail v-if="item.jnpfKey==='email'" :title="item.title" />
            <DataBoard v-if="item.jnpfKey==='dataBoard'" :title="item.title" :list="item.list" />
            <HBarChart v-if="item.jnpfKey==='barChart'" :title="item.title" :option=" item.option"
              :ref="'eChart'+item.i" />
            <HAnnularChart v-if="item.jnpfKey==='annularChart'" :title="item.title"
              :option=" item.option" :ref="'eChart'+item.i" />
            <HAreaChart v-if="item.jnpfKey==='areaChart'" :title="item.title" :option=" item.option"
              :ref="'eChart'+item.i" />
            <HLineChart v-if="item.jnpfKey==='lineChart'" :title="item.title" :option=" item.option"
              :ref="'eChart'+item.i" />
            <HPieChart v-if="item.jnpfKey==='pieChart'" :title="item.title" :option=" item.option"
              :ref="'eChart'+item.i" />
            <HRadarChart v-if="item.jnpfKey==='radarChart'" :title="item.title"
              :option=" item.option" :ref="'eChart'+item.i" />
            <div class="mask"></div>
            <span title="复制" class="drawing-item-copy" @click="addComponent(item)">
              <i class="el-icon-copy-document"></i></span>
            <span title="删除" class="drawing-item-delete" @click.stop="handleRemoveItem(item.i)">
              <i class="el-icon-delete"></i></span>
          </grid-item>
        </grid-layout>
        <div v-show="!layout.length" class="empty-info">
          <img src="@/assets/images/emptyPortal.png" alt="" class="empty-img">
        </div>
      </el-scrollbar>
    </el-main>
    <right-panel :active-data="activeData" />
    <Preview :visible.sync="previewVisible" :layout="layout" />
  </el-container>
</template>
<script>
import VueGridLayout from 'vue-grid-layout'
import { deepClone } from '@/utils'
import { basicComponents, chartComponents } from './config'
import Preview from './Preview'
import RightPanel from './RightPanel'
import {
  Todo,
  CommonFunc,
  TodoList,
  HNotice,
  HEmail,
  DataBoard,
  HBarChart,
  HAnnularChart,
  HAreaChart,
  HLineChart,
  HPieChart,
  HRadarChart
} from "@/components/VisualPortal"
const defaultConf = {
  layouyId: 100,
  layout: []
}

export default {
  name: 'JNPF-PortalDesigner',
  props: ['conf'],
  components: {
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem,
    Preview,
    RightPanel,
    Todo,
    CommonFunc,
    TodoList,
    HNotice,
    HEmail,
    DataBoard,
    HBarChart,
    HAnnularChart,
    HAreaChart,
    HLineChart,
    HPieChart,
    HRadarChart
  },
  data() {
    return {
      leftComponents: [
        { title: '基础控件', list: basicComponents },
        { title: '图表控件', list: chartComponents }
      ],
      layout: [],
      activeId: null,
      activeData: null,
      previewVisible: false,
      config: {}
    }
  },
  watch: {
    layout: {
      handler(val) {
        if (val.length === 0) this.config.layouyId = 100
      },
      deep: true
    }
  },
  mounted() {
    if (typeof this.conf === 'object' && this.conf !== null) {
      this.config = this.conf
    } else {
      this.config = deepClone(defaultConf)
      this.config.layouyId = 100
    }
    this.layout = this.config.layout || []
  },
  methods: {
    getData() {
      return new Promise((resolve, reject) => {
        this.config.layout = this.layout
        resolve({ formData: this.config, target: 1 })
      })
    },
    addComponent(item) {
      let clone = deepClone(item)
      let x = 0, y = 0, i = this.config.layouyId
      if (this.layout.length) {
        let lastItem = this.layout[this.layout.length - 1]
        y = lastItem.y + lastItem.h
      }
      let row = { ...clone, i, x, y }
      this.layout.push(row)
      this.activeId = this.config.layouyId
      this.activeData = row
      this.config.layouyId++
    },
    handleRemoveItem(i) {
      this.layout = this.layout.filter(item => item.i !== i);
      this.activeId = null
      this.activeData = {}
    },
    empty() {
      this.$confirm('确定要清空所有吗？', '提示', { type: 'warning' }).then(() => {
        this.layout = []
        this.config.layouyId = 100
        this.activeId = null
        this.activeData = {}
      }).catch(() => { })
    },
    preview() {
      this.previewVisible = true
    },
    handleClick(item) {
      this.activeId = item.i
      this.activeData = item
    },
    resizedEvent(i) {
      this.$refs['eChart' + i] && this.$refs['eChart' + i][0] && this.$refs['eChart' + i][0].chart && this.$refs['eChart' + i][0].chart.resize()
    }
  }
}
</script>
<style lang="scss" scoped>
$lighterBlue: #409eff;
.JNPF-Portal {
  height: 100%;
  .el-aside,
  >>> .el-aside {
    padding: 0;
    margin: 0;
    .cap-wrapper {
      position: relative;
      height: 42px;
      border-bottom: 1px solid #dcdfe6;
      box-sizing: border-box;
      line-height: 41px;
      padding-left: 10px;
      font-size: 16px;
    }
    .aside-scrollbar {
      height: calc(100% - 42px);
      overflow: hidden;

      .el-scrollbar__wrap {
        overflow-x: auto;
      }
    }
  }
  .left-box {
    background-color: #ebeef5;
    border-radius: 4px;
    overflow: hidden;
    .components-list {
      box-sizing: border-box;
      height: 100%;
      .components-title {
        font-size: 14px;
        color: #043254;
        line-height: 30px;
        margin-bottom: 10px;
        font-weight: bold;
      }
      .components-part {
        background: #fff;
        border-radius: 4px;
        padding: 10px 10px 0;
        margin-bottom: 10px;
        overflow: hidden;
        .list {
          margin-right: -10px;
        }

        &:last-child {
          margin-bottom: 0;
        }
      }
      .components-item {
        display: inline-block;
        width: 110px;
        margin: 0 10px 10px 0;
        .components-body {
          padding-left: 8px;
          background: #f3f9ff;
          font-size: 12px;
          cursor: move;
          border: 1px dashed #f3f9ff;
          border-radius: 3px;
          color: #043254;
          line-height: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          i {
            color: #043254;
            line-height: 16px;
            height: 16px;
            margin-right: 4px;
          }
        }
      }
    }
  }
  .el-main {
    height: 100%;
    padding: 0;
    overflow: hidden;
    .action-bar {
      position: relative;
      height: 42px;
      text-align: right;
      padding: 0 15px;
      box-sizing: border-box;
      border-radius: 4px;
      background: #fff;
      margin: 0 10px;
      border: none;

      .delete-btn {
        color: #f56c6c !important;
      }
    }
    .empty-info {
      position: absolute;
      top: calc(50% - 250px);
      left: calc(50% - 250px);

      .empty-img {
        width: 500px;
        height: 500px;
      }
    }
    >>> .vue-grid-item.vue-grid-placeholder {
      background: $lighterBlue;
    }
    .layout-area {
      height: calc(100% - 42px);
      >>> .el-scrollbar__wrap {
        margin-bottom: 0 !important;
        overflow-x: auto;
      }
      .vue-grid-item {
        position: relative;
        height: 100%;
        border: 1px dashed #e2e0e0;
        &.active-item {
          border: 1px solid $lighterBlue;
          .drawing-item-copy,
          .drawing-item-delete {
            display: block;
          }
        }
        >>> .vue-resizable-handle {
          z-index: 20;
        }
        .mask {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
        }
        .drawing-item-copy,
        .drawing-item-delete {
          display: none;
          position: absolute;
          top: -10px;
          width: 22px;
          height: 22px;
          line-height: 22px;
          text-align: center;
          border-radius: 50%;
          font-size: 12px;
          border: 1px solid;
          cursor: pointer;
          z-index: 20;
        }

        .drawing-item-copy {
          right: 56px;
          border-color: $lighterBlue;
          color: $lighterBlue;
          background: #fff;

          &:hover {
            background: $lighterBlue;
            color: #fff;
          }
        }

        .drawing-item-delete {
          right: 20px;
          border-color: #f56c6c;
          color: #f56c6c;
          background: #fff;

          &:hover {
            background: #f56c6c;
            color: #fff;
          }
        }
        &:hover {
          .drawing-item-copy,
          .drawing-item-delete {
            display: block;
          }
        }
        >>> .el-card {
          width: 100%;
          height: 100%;
          .el-card__body {
            padding: 0;
          }
        }
      }
    }
  }
}
</style>