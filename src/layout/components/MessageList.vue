<template>
  <div>
    <el-drawer title="站内消息" :visible.sync="drawer" direction="rtl" size="280px"
      class="JNPF-messageList JNPF-common-drawer" :before-close="handleClose">
      <div class="tool">
        <el-link :underline="false" @click.native="readAll">全部已读</el-link>
        <el-link :underline="false" @click.native="gotoCenter">消息中心</el-link>
      </div>
      <div class="JNPF-messageList-box" v-loading="loading && listQuery.currentPage==1"
        ref="messageListBody">
        <div v-if="list.length">
          <div v-for="(item,i) in list" :key="i" class="JNPF-messageList-item"
            @click="readInfo(item)" :title="item.title">
            <el-badge is-dot :hidden="item.isRead=='1'" type="warning">
              <i class="el-icon-chat-dot-square JNPF-messageList-item-icon"></i>
            </el-badge>
            <div class="JNPF-messageList-txt">
              <p class="title">{{item.title}}</p>
              <p class="name">
                <span>{{item.creatorUser}}</span>
                <span class="time">{{item.lastModifyTime| toDateText()}}</span>
              </p>
            </div>
          </div>
        </div>
        <p class="noData-txt" v-else>{{$t('common.noData')}}</p>
      </div>
    </el-drawer>
    <el-dialog title="查看消息" :close-on-click-modal="false" :visible.sync="visible"
      class="JNPF-dialog JNPF-dialog_center" lock-scroll width="80%">
      <div class="notice-wapper" v-loading="loading">
        <h1 class="title">{{info.title}}</h1>
        <div class="info">
          <span>{{info.lastModifyTime|toDate()}}</span><span>{{info.creatorUser}}</span>
        </div>
        <div class="main" v-html="info.bodyText"></div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false">{{$t('common.cancelButton')}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getMessageList, ReadInfo, MessageAllRead } from '@/api/system/message'
export default {
  name: 'messageList',
  data() {
    return {
      drawer: false,
      listQuery: {
        currentPage: 1,
        pageSize: 20,
        sort: 'desc',
        keyword: '',
        type: ''
      },
      list: [],
      activeItem: {},
      loading: true,
      visible: false,
      finish: false,
      info: {}
    }
  },
  methods: {
    init() {
      this.finish = false
      this.drawer = true
      this.listQuery.currentPage = 1
      this.list = []
      this.getList()
      this.$nextTick(() => {
        this.bindScroll()
      })
    },
    getList() {
      this.loading = true
      getMessageList(this.listQuery).then(res => {
        if (res.data.list.length < this.listQuery.pageSize) {
          this.finish = true
        }
        this.list = [...this.list, ...res.data.list]
        this.loading = false
      })
    },
    bindScroll() {
      let _this = this,
        vBody = _this.$refs.messageListBody;
      vBody.addEventListener("scroll", function () {
        if (vBody.scrollHeight - vBody.clientHeight - vBody.scrollTop <= 200 && !_this.loading && !_this.finish) {
          _this.listQuery.currentPage += 1
          _this.getList()
        }
      });
    },
    readInfo(item) {
      ReadInfo(item.id).then(res => {
        this.info = res.data
        if (item.isRead == '0') {
          item.isRead = '1'
          this.$emit('read')
        }
        if (item.type == 1) {
          this.visible = true
        } else {
          let body = this.info.bodyText ? JSON.parse(this.info.bodyText) : {}
          let url = 'flowLaunch'
          if (body.type == 2) url = 'flowTodo'
          if (body.type == 3) url = 'flowCirculate'
          this.drawer = false
          this.$router.push(`/workFlow/${url}`)
        }
      })
    },
    gotoCenter() {
      this.drawer = false
      this.$router.push('/messageRecord')
    },
    readAll() {
      this.$confirm('您确定全部为已读状态, 是否继续?', '提示', {
        type: 'warning'
      }).then(() => {
        MessageAllRead().then(res => {
          this.$message({
            message: res.msg,
            type: 'success',
            duration: 1500,
            onClose: () => {
              this.$emit('read', true)
              for (let i = 0; i < this.list.length; i++) {
                this.$set(this.list[i], 'isRead', '1')
              }
            }
          })
        })
      }).catch(() => { });
    },
    handleClose(done) {
      let vBody = this.$refs.messageListBody;
      vBody.removeEventListener("scroll", function () { });
      done();
    }
  }
}
</script>

<style lang="scss" scoped>
.JNPF-messageList {
  .JNPF-messageList-title {
    display: flex;
    align-items: center;
    padding-right: 20px;
    .title {
      font-size: 18px;
      margin-right: 10px;
    }
    .icon-menu {
      font-size: 18px;
      color: #9fafbe;
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
      height: 32px;
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
      border-top: 1px solid #f5f7f9;
      >>> .el-loading-mask {
        top: 100px;
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
      &:hover {
        background-color: #f5f7f9;
      }

      .JNPF-messageList-item-icon {
        background-color: #1890ff;
        width: 36px;
        height: 36px;
        display: inline-block;
        font-size: 22px;
        color: #fff;
        line-height: 36px;
        border-radius: 50%;
        text-align: center;
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
.JNPF-dialog {
  >>> .el-dialog__body {
    min-height: 500px;
    padding: 0 20px !important;
  }
  .notice-wapper {
    .title {
      font-size: 18px;
      font-weight: normal;
      text-align: center;
    }
    .info {
      line-height: 35px;
      border-bottom: 1px solid #dcdfe6;
      text-align: center;
      span {
        padding: 0 10px;
      }
    }
    .main {
      padding: 20px 10px 0 10px;
      line-height: 1.5;
      * {
        line-height: 1.5;
      }
    }
  }
}
</style>