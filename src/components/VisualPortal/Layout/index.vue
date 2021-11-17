<template>
  <el-scrollbar class="layout-area">
    <template v-if="layout.length">
      <grid-layout :layout.sync="layout" :row-height="40" :is-draggable="false"
        :is-resizable="false">
        <grid-item v-for="item in layout" :x="item.x" :y="item.y" :w="item.w" :h="item.h"
          :i="item.i" :key="item.i" static>
          <Todo v-if="item.jnpfKey==='todo'" :title="item.title" />
          <CommonFunc v-if="item.jnpfKey==='commonFunc'" :title="item.title" :list="item.list" />
          <TodoList v-if="item.jnpfKey==='todoList'" :title="item.title" />
          <HNotice v-if="item.jnpfKey==='notice'" :title="item.title" />
          <HEmail v-if="item.jnpfKey==='email'" :title="item.title" />
          <DataBoard v-if="item.jnpfKey==='dataBoard'" :title="item.title" :list="item.list" />
          <HBarChart v-if="item.jnpfKey==='barChart'" :title="item.title" :option=" item.option" />
          <HAnnularChart v-if="item.jnpfKey==='annularChart'" :title="item.title"
            :option=" item.option" />
          <HAreaChart v-if="item.jnpfKey==='areaChart'" :title="item.title"
            :option=" item.option" />
          <HLineChart v-if="item.jnpfKey==='lineChart'" :title="item.title"
            :option=" item.option" />
          <HPieChart v-if="item.jnpfKey==='pieChart'" :title="item.title" :option=" item.option" />
          <HRadarChart v-if="item.jnpfKey==='radarChart'" :title="item.title"
            :option=" item.option" />
          <div class="mask" v-if="mask"></div>
        </grid-item>
      </grid-layout>
    </template>
    <div class="portal-layout-nodata" v-else>
      <img src="@/assets/images/dashboard-nodata.png" alt="" class="layout-nodata-img">
      <p class="layout-nodata-txt">暂无数据</p>
    </div>
  </el-scrollbar>
</template>

<script>
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
import VueGridLayout from 'vue-grid-layout'
export default {
  props: {
    layout: { type: Array, default: () => [] },
    mask: { type: Boolean, default: false },
  },
  components: {
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem,
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
}
</script>
<style lang="scss" scoped>
.layout-area {
  height: 100%;
  overflow: hidden;
  >>> .el-scrollbar__wrap {
    margin-bottom: 0 !important;
    overflow-x: auto;
  }
  >>> .el-scrollbar__bar.is-horizontal > div {
    display: none;
  }
  >>> .el-card {
    width: 100%;
    height: 100%;
    .el-card__body {
      padding: 0;
    }
  }
  .vue-grid-item {
    position: relative;
    .mask {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
    }
  }
}
</style>