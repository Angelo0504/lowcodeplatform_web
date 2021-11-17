<template>
  <div>
    <el-drawer title="内部聊天" :visible.sync="drawer" direction="rtl"
      class="JNPF-messageList JNPF-common-drawer" size="280px" :modal="true"
      :wrapperClosable="false" :before-close="handleClose" ref="drawer">
      <el-input v-model="keyword" placeholder="搜索：请输入关键词" clearable @input="initData">
        <!-- @change="initData()" -->
        <i slot="suffix" class="el-input__icon el-icon-search" @click="initData()" />
      </el-input>
      <el-scrollbar class="JNPF-messageList-box" v-loading="loading">
        <div v-if="list.length">
          <div v-for="(item,i) in list" :key="i" class="JNPF-messageList-item"
            @click="readInfo(item)">
            <el-avatar :size="36" :src="define.comUrl+ item.headIcon">
            </el-avatar>
            <div class="JNPF-messageList-txt">
              <p class="title">{{item.realName}}/{{item.account}}</p>
              <p class="name">
                <span>{{item.department}}</span>
              </p>
            </div>
            <el-badge :value="item.unreadNum" :hidden="!item.unreadNum"></el-badge>
          </div>
        </div>
        <p class="noData-txt" v-else>{{$t('common.noData')}}</p>
      </el-scrollbar>
    </el-drawer>
    <Im ref="JNPFIm" append-to-body />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { UserListAll } from '@/api/permission/user'
import Im from './Im'
export default {
  name: 'UserList',
  components: { Im },
  data() {
    return {
      drawer: false,
      list: [],
      defaultList: [],
      activeItem: {},
      loading: false,
      visible: false,
      info: {},
      keyword: ''
    }
  },
  created() { },
  computed: {
    ...mapGetters(['userInfo']),
  },
  methods: {
    initData() {
      if (!this.keyword) {
        this.list = this.defaultList
      } else {
        this.list = this.defaultList.filter(o => o.realName.indexOf(this.keyword) > -1 || o.account.indexOf(this.keyword) > -1 || o.quickQuery.indexOf(this.keyword) > -1)
      }
    },
    handleList(userList, onlineUsers, unreadNums) {
      if (!this.defaultList.length) this.defaultList = userList
      this.updateList(onlineUsers, unreadNums)
    },
    updateList(onlineUsers, unreadNums) {
      if (unreadNums && unreadNums.length) {
        outer: for (let i = 0; i < unreadNums.length; i++) {
          let currUser = unreadNums[i];
          inner: for (let j = 0; j < this.defaultList.length; j++) {
            let user = this.defaultList[j];
            if (user.id == currUser.sendUserId) {
              user.unreadNum = currUser.unreadNum
              break inner
            }
          }
        }
      }
      this.defaultList = this.numSort(this.defaultList)
      if (this.drawer) this.list = this.defaultList
      // if (onlineUsers && onlineUsers.length) {
      //   let delArr = []
      //   outer: for (let i = 0; i < onlineUsers.length; i++) {
      //     let onlineUser = onlineUsers[i];
      //     let length = this.defaultList.length;
      //     inner: for (let j = 0; j < length; j++) {
      //       let user = this.defaultList[j];
      //       if (user.id === onlineUser) {
      //         user.isOnline = true
      //         this.defaultList.splice(j, 1);
      //         delArr.push(user)
      //         length--
      //         j--
      //         break inner
      //       }
      //     }
      //   }
      //   delArr = this.numSort(delArr)
      //   this.defaultList = this.numSort(this.defaultList)
      //   this.defaultList = [...delArr, ...this.defaultList]
      //   if (this.drawer) this.list = this.defaultList
      // }
    },
    updateOffLine(user) {
      let delArr = []
      let length = this.defaultList.length;
      for (let i = 0; i < length; i++) {
        if (this.defaultList[i].id === user) this.defaultList[i].isOnline = false
      }
      this.defaultList = this.numSort(this.defaultList)
      this.defaultList.sort((a, b) => {
        if (a.isOnline && !b.isOnline) {
          return -1
        } else if ((a.isOnline && b.isOnline) || (!a.isOnline && !b.isOnline)) {
          return 0
        } else {
          return 1
        }
      })
      if (this.drawer) this.list = this.defaultList
    },
    numSort(list) {
      list.sort((a, b) => { return b.unreadNum - a.unreadNum })
      return list
    },
    updateUnreadNum(user) {
      let length = this.defaultList.length;
      for (let i = 0; i < length; i++) {
        if (this.defaultList[i].id === user) {
          this.defaultList[i].unreadNum += 1
        }
      }
      this.defaultList = this.numSort(this.defaultList)
      if (this.drawer) this.list = this.defaultList
    },
    isblink() {
      let boo = this.defaultList.some(o => o.unreadNum)
      this.$emit('changeTwinkle', boo)
    },
    init() {
      this.drawer = true
      this.keyword = ''
      this.list = this.defaultList
    },
    readInfo(item) {
      let socket = this.$store.getters.socket
      let updateReadMessage = {
        method: "UpdateReadMessage",
        formUserId: item.id,
        token: this.$store.getters.token
      }
      socket.send(JSON.stringify(updateReadMessage));
      item.unreadNum = 0
      this.isblink()
      this.$refs.JNPFIm.list = []
      //获取消息列表
      var messageList = {
        method: "MessageList",
        toUserId: item.id,
        formUserId: this.userInfo.userId,
        token: this.$store.getters.token,
        currentPage: 1,
        pageSize: 30,
        sord: "desc"
      }
      socket.send(JSON.stringify(messageList));
      this.$refs.JNPFIm.init(item)
    },
    handleClose(done) {
      this.$refs.JNPFIm.colseIM()
      done();
    }
  }
}
</script>

<style lang="scss" scoped>
.JNPF-messageList {
  .el-input {
    >>> .el-input__inner {
      border-radius: 0;
      border-right: none;
      border-left: none;
    }
    .el-input__icon {
      cursor: pointer;
    }
  }
  >>> .el-drawer__header {
    border: none;
  }
  >>> .el-drawer__body {
    overflow: hidden;
    display: flex;
    flex-direction: column;
    position: relative;
    .tool {
      height: 30px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 20px;
      background: #fff;
    }
    .JNPF-messageList-box {
      overflow: auto;
      overflow-x: hidden;
      position: relative;
      flex: 1;
      .el-badge {
        position: absolute;
        right: 12px;
        top: 26px;
      }
      >>> .el-loading-mask {
        top: 100px;
      }
      .el-scrollbar__wrap {
        overflow: auto;
        overflow-x: hidden;
      }
      .noData-txt {
        font-size: 14px;
        color: #909399;
        line-height: 20px;
        text-align: center;
        padding-top: 20px;
      }
    }
    .JNPF-messageList-item {
      position: relative;
      display: block;
      padding: 0 20px;
      background-color: #fff;
      border-bottom: 1px solid #f5f7f9;
      height: 60px;
      display: flex;
      align-items: center;
      cursor: pointer;
      .offLine {
        filter: grayscale(1);
      }
      &:hover {
        background-color: #f5f7f9;
      }
      .JNPF-messageList-txt {
        margin-left: 14px;
        overflow: hidden;
        flex: 1;
        padding-top: 1px;
        .title {
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          font-size: 14px;
          color: #333;
          margin-bottom: 5px;
        }
        .name {
          font-size: 12px;
          color: #999;
          .time {
            float: right;
          }
        }
      }
    }
  }
}
</style>