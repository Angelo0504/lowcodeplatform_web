<template>
  <transition name="el-zoom-in-center">
    <div class="JNPF-preview-main">
      <div class="JNPF-common-page-header">
        <el-page-header @back="goBack" content="新建流程" />
        <div class="options">
          <el-button @click="goBack()">{{$t('common.cancelButton')}}</el-button>
        </div>
      </div>
      <div class="main">
        <div class="flowList">
          <div class="item" v-for="(item,i) in categoryList" :key="i">
            <p class="cap">{{item.fullName}}【{{item.count}}】</p>
            <div class="iconList">
              <div class="iconbox" v-for="(child,i) in item.children" :key="i" @click="jump(child)">
                <div class="box-icon" :style="{backgroundColor:child.iconBackground||'#008cff'}">
                  <i :class="child.icon"></i>
                </div>
                <p class="box-title">{{child.fullName}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      categoryList: []
    }
  },
  methods: {
    goBack() {
      this.$emit('close')
    },
    init(categoryList) {
      this.categoryList = categoryList.filter(o => o.children.length)
    },
    jump(item) {
      if (!item.enCode) {
        this.$message({
          type: 'error',
          message: '流程不存在'
        });
        return
      }
      this.$emit('chioceFlow', item)
    }
  }
}
</script>
<style lang="scss" scoped>
.main {
  padding: 10px 0 0;
  color: #606266;
  .flowList {
    margin: 16px;
    .cap {
      font-size: 14px;
      margin-bottom: 6px;
    }
    .item {
      &::after {
        content: '';
        display: block;
        clear: both;
      }
    }
    .iconbox {
      cursor: pointer;
      width: 90px;
      height: 90px;
      overflow: hidden;
      float: left;
      margin: 10px;
      margin-left: 0px;
      margin-bottom: 20px;
      &:hover {
        opacity: 0.8;
        .iconbox:hover .box-icon {
          box-shadow: 0 0 6px 1px rgba(0, 0, 0, 0.1);
        }
      }
      .box-icon {
        width: 50px;
        height: 50px;
        border-radius: 12px;
        text-align: center;
        margin: 0 auto;
        margin-top: 10px;
        margin-bottom: 10px;
        background-color: #ccc;
        i {
          text-align: center;
          font-size: 38px;
          color: #fff;
          line-height: 50px;
        }
      }
      .box-title {
        text-align: center;
        font-size: 12px;
      }
    }
  }
}
</style>