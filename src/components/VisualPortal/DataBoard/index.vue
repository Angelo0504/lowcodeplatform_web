<template>
  <el-row :gutter="10" class="dataBoard">
    <el-col :span="6" class="dataBoard-item" v-for="(item,i) in menuList" :key="i">
      <el-card shadow="never">
        <div class="dataBoard-body">
          <i :class="item.icon+' dataBoard-body-item dataBoard-body-item'+(i+1)"></i>
          <div class="text">
            <p class="num">{{item.num}}</p>
            <p class="name">{{item.fullName}}</p>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>
<script>
export default {
  props: {
    title: { type: String, default: '' },
    list: { type: Array, default: () => [] }
  },
  data() {
    return {
      menuList: []
    }
  },
  created() {
    this.menuList = this.list
  },
  watch: {
    list: {
      handler(val) {
        this.menuList = val
      },
      deep: true
    }
  }
}
</script>
<style lang="scss" scoped>
.dataBoard {
  height: 100%;
  overflow: hidden;
  .dataBoard-item {
    height: 100%;
  }
  >>> .el-card {
    width: 100%;
    height: 100%;
    .el-card__body {
      padding: 0;
      height: 100%;
    }
  }
  .dataBoard-body {
    padding-left: 30px;
    height: 100%;
    display: flex;
    align-items: center;
    .dataBoard-body-item {
      width: 66px;
      height: 66px;
      margin-right: 16px;
      border-radius: 50%;
      text-align: center;
      line-height: 66px;
      font-size: 36px;
      flex-shrink: 0;
      &.dataBoard-body-item1 {
        background: #f2ebfb;
        color: #7b1ae1;
      }
      &.dataBoard-body-item2 {
        background: #edf8fe;
        color: #4ab8ff;
      }
      &.dataBoard-body-item3 {
        background: #fff7e4;
        color: #ff8b58;
      }
      &.dataBoard-body-item4 {
        background: #fff2f5;
        color: #fc5b87;
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
</style>