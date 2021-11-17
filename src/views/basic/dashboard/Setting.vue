<template>
  <el-drawer title="切换门户" :visible.sync="drawer" direction="rtl" size="260px"
    class="JNPF-common-drawer board">
    <div class="main" v-loading="loading" :element-loading-text="loadingText">
      <div v-if="list.length">
        <div class="item" v-for="(item,i) in list" :key="i">
          <p class="item-title">{{item.fullName}}</p>
          <div class="item-list">
            <div class="item-list-item" v-for="(child,ii) in  item.children" :key="ii"
              @click="selectItem(child.id)" :class="{'active':activeId === child.id}">
              <p>{{child.fullName}}</p>
              <i class="el-icon-success"></i>
            </div>
          </div>
        </div>
      </div>
      <p class="noData-txt" v-else>{{$t('common.noData')}}</p>
    </div>
  </el-drawer>
</template>

<script>

import { getPortalSelector, SetDefault } from '@/api/onlineDev/portal'
export default {
  name: 'Setting',
  data() {
    return {
      drawer: false,
      list: [],
      loading: true,
      loadingText: '数据加载中',
      activeId: ''
    }
  },
  methods: {
    init(id) {
      this.drawer = true
      this.activeId = id
      this.getList()
    },
    getList() {
      this.loading = true
      this.loadingText = '数据加载中'
      getPortalSelector(1).then(res => {
        this.list = res.data.list
        this.loading = false
      }).catch(() => { this.loading = false })
    },
    selectItem(id) {
      this.loading = true
      this.loadingText = '切换门户中'
      if (this.activeId == id) return
      SetDefault(id).then(res => {
        this.activeId = id
        this.$emit('refresh', id)
        this.loading = false
        this.$store.commit('user/SET_USERINFO_PORTALID', id)
        this.$message({ message: res.msg, type: 'success', duration: 1000 })
      }).catch(() => { this.loading = false })
    }
  }
}
</script>
<style lang="scss" scoped>
.board {
  >>> .el-drawer__body {
    overflow: hidden;
  }
  >>> .main {
    padding: 10px 20px;
    height: 100%;
    overflow: auto;
    overflow-x: hidden;
    .item {
      .item-title {
        font-size: 12px;
        line-height: 30px;
        color: #999;
      }
      .item-list {
        font-size: 14px;
        color: #707070;
        .item-list-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 45px;
          cursor: pointer;
          i {
            font-size: 20px;
            color: #bdbdbd;
          }
          &.active i {
            color: #1890ff;
          }
        }
      }
    }
    .noData-txt {
      font-size: 14px;
      color: #909399;
      line-height: 20px;
      text-align: center;
      padding-top: 10px;
    }
  }
}
</style>