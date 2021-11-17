<template>
  <el-card shadow="never" class="commonFunc-box">
    <div slot="header" class="portal-common-title">
      <span>{{title}}</span>
    </div>
    <div class="commonFunc-box-body">
      <router-link class="item" :to="'/'+item.urlAddress" v-for="(item,i) in menuList" :key="i">
        <i :class="item.icon" :style="{color:item.iconBackgroundColor||'#1890FF'}"></i>
        <p class="name">{{item.fullName}}</p>
      </router-link>
    </div>
  </el-card>
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
        this.menuList = val.filter(o => o.id)
      },
      deep: true
    }
  }
}
</script>
<style lang="scss" scoped>
.commonFunc-box {
  >>> .el-card__body {
    width: 100%;
    height: calc(100% - 55px);
  }
  .commonFunc-box-body {
    padding: 0 30px;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .item {
      display: block;
      text-align: center;
      i {
        display: inline-block;
        height: 40px;
        font-size: 40px;
        margin-bottom: 10px;
      }
      .name {
        font-size: 14px;
        line-height: 20px;
      }
    }
  }
}
</style>