<template>
  <el-card shadow="never" class="todo-box">
    <div slot="header" class="portal-common-title">
      <span>{{title}}</span>
    </div>
    <div class="todo-box-body">
      <router-link class="item" to="/workFlow/flowTodo">
        <i class="icon-ym icon-ym-flowTodo"></i>
        <div class="text">
          <p class="num">{{toBeReviewed}}</p>
          <p class="name">待我审核</p>
        </div>
      </router-link>
      <router-link class="item" to="/workFlow/entrust">
        <i class="icon-ym icon-ym-flowEntrust"></i>
        <div class="text">
          <p class="num">{{entrust}}</p>
          <p class="name">流程委托</p>
        </div>
      </router-link>
      <router-link class="item" to="/workFlow/flowDone">
        <i class="icon-ym icon-ym-flowDone"></i>
        <div class="text">
          <p class="num">{{flowDone}}</p>
          <p class="name">已办事宜</p>
        </div>
      </router-link>
    </div>
  </el-card>
</template>
<script>
import { getFlowTodoCount } from '@/api/home'
export default {
  props: {
    title: { type: String, default: '' }
  },
  data() {
    return {
      entrust: 0,
      flowDone: 0,
      toBeReviewed: 0
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      getFlowTodoCount().then(res => {
        this.entrust = res.data.entrust || 0
        this.flowDone = res.data.flowDone || 0
        this.toBeReviewed = res.data.toBeReviewed || 0
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.todo-box {
  >>> .el-card__body {
    width: 100%;
    height: calc(100% - 55px);
  }
  .todo-box-body {
    padding: 0 30px;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .item {
      height: 56px;
      display: block;
      i {
        width: 56px;
        height: 56px;
        margin-right: 14px;
        border-radius: 50%;
        color: #fff;
        display: inline-block;
        vertical-align: top;
        text-align: center;
        line-height: 56px;
        font-size: 30px;
        &.icon-ym-flowTodo {
          background: #f68900;
        }
        &.icon-ym-flowEntrust {
          background: #1890ff;
        }
        &.icon-ym-flowDone {
          background: #7b1ae1;
        }
      }
      .text {
        display: inline-block;
        height: 56px;
        .num {
          font-size: 20px;
          line-height: 36px;
        }
        .name {
          font-size: 14px;
          color: #666;
        }
      }
    }
  }
}
</style>