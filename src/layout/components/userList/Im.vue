<template>
  <div class="im-container" v-if="visible">
    <div class="header">
      <el-avatar :size="30" :src="define.comUrl + info.headIcon" />
      <span class="name">{{info.realName}}/{{info.account}}</span>
      <el-link icon="el-icon-close" :underline="false" @click="visible=false"></el-link>
    </div>
    <div class="main">
      <div class="chatBox">
        <div class="chatList" ref="chatList">
          <div class="chatList-item" v-for="(item,index) in list" :key="index"
            :class="{'chatList-item--mine': item.userId==userInfo.userId}">
            <div class="chatList-user" v-if="item.userId ==userInfo.userId">
              <img :src="define.comUrl+ userInfo.headIcon" />
              <cite><i>{{item.dateTime}}</i>我</cite>
            </div>
            <div class="chatList-user" v-else>
              <img :src="define.comUrl + info.headIcon" />
              <cite>{{info.realName}}<i>{{item.dateTime}}</i></cite>
            </div>
            <div class="chatList-text">
              <div class="chatList-arrow"></div>
              <p v-if="item.messageType=='text'" v-html="item.message" class="chatList__msg--text">
              </p>
              <img :src="define.comUrl +'/api/file/Image/IM/' + item.message.path" alt=""
                class="chatList__msg--img" v-if="item.messageType=='image' && item.message.path"
                @click="handleEvent('image',define.comUrl+'/api/file/Image/IM/' + item.message.path)">
              <audio class="chatList__msg--audio" controls :src="define.comUrl + item.message.path"
                v-if="item.messageType=='voice' && item.message.path"
                @click="handleEvent('voice',define.comUrl + item.message.path)"></audio>
              <video :src="item.message" controls class="chatList__msg--video"
                v-if="item.messageType=='video'" @click="handleEvent('video',item.message)"></video>
            </div>
          </div>
        </div>
        <div class="toolBox">
          <div class="toolBox-left">
            <el-popover placement="top-start" trigger="click" ref="popover"
              v-model="popoverVisible">
              <div class="emjioBox">
                <ul class="emjio">
                  <li v-for="(item,i) in this.emojiList" :key="i" @click="selectEmit(item)">
                    <img :src="item.url | urlFilter()" />
                  </li>
                </ul>
              </div>
              <el-link icon="ym-custom ym-custom-emoticon-neutral" :underline="false" title="发送表情"
                slot="reference">
              </el-link>
            </el-popover>
            <el-upload :show-file-list="false" action='' :limit="1" class="uploadImg-btn"
              :auto-upload="false" :on-change="getFile" ref="upload" accept="image/*">
              <el-link icon="ym-custom ym-custom-image" :underline="false" title="发送图片">
              </el-link>
            </el-upload>
          </div>
          <div class="toolBox-right">
            <el-link icon="icon-ym icon-ym-generator-time" :underline="false" @click="openHistory">
              聊天记录
            </el-link>
          </div>
        </div>
        <div class="writeBox">
          <el-input type="textarea" :rows="3" placeholder="点击这里，直接输入消息咨询"
            v-model.trim="messageContent" @keyup.enter.native="sendMessage" />
          <div class="btns">
            <el-button type="primary" @click="sendMessage()">发 送</el-button>
          </div>
        </div>
      </div>
      <div class="historyBox" v-if="showHistory">
        <el-input v-model="keyword" placeholder="搜索：请输入关键词" class="JNPF-common-head-input" clearable
          @change="searchHistory">
          <i slot="suffix" class="el-input__icon el-icon-search" @click="searchHistory()" />
        </el-input>
        <div class="historyList-box" ref="historyListBox">
          <div class="chatList historyList">
            <div class="chatList-item" v-for="(item,index) in historyList" :key="index">
              <div class="chatList-user" v-if="item.userId ==userInfo.userId">
                <img :src="define.comUrl+userInfo.headIcon" />
                <cite>我<i>{{item.dateTime}}</i></cite>
              </div>
              <div class="chatList-user" v-else>
                <img :src="define.comUrl + info.headIcon" />
                <cite>{{info.realName}}<i>{{item.dateTime}}</i></cite>
              </div>
              <div class="chatList-text">
                <div class="chatList-arrow"></div>
                <span v-if="item.messageType=='text'" v-html="item.message"></span>
                <img :src="define.comUrl +'/api/file/Image/IM/'+ item.message.path" alt=""
                  class="chatList__msg--img" v-if="item.messageType=='image' && item.message.path"
                  @click="handleEvent('image',define.comUrl +'/api/file/Image/IM/'+ item.message.path)">
                <audio class="chatList__msg--audio" controls
                  :src="define.comUrl + item.message.path"
                  v-if="item.messageType=='voice' && item.message.path"
                  @click="handleEvent('voice',define.comUrl + item.message.path)"></audio>
                <video :src="item.message" controls class="chatList__msg--video"
                  v-if="item.messageType=='video'"
                  @click="handleEvent('video',item.message)"></video>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog :visible.sync="show" width="40%" :before-close="handleClose"
      class="JNPF-dialog JNPF-dialog_center" lock-scroll style="z-index:3000">
      <img :src="imgSrc" v-if="imgSrc" style="width:100%;object-fit: cover;" />
      <video :src="videoSrc" v-if="videoSrc" style="width:100%;object-fit: cover;"
        controls="controls"></video>
      <audio :src="audioSrc" v-if="audioSrc" style="width:100%;object-fit: cover;"
        controls="controls"></audio>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import emojiParser from 'wechat-emoji-parser'
import emojiList from 'static/emoji.json';
export default {
  name: 'im',
  computed: {
    ...mapGetters(['userInfo']),
  },
  filters: {
    urlFilter(url) {
      return require(`static/emoji/${url}`)
    }
  },
  data() {
    return {
      key: '',
      info: {},
      visible: false,
      keyword: '',
      showHistory: false,
      show: false,
      imgSrc: '',
      videoSrc: '',
      audioSrc: '',
      messageContent: '',
      emojiList: emojiList,
      list: [],
      historyList: [],
      historyDefaultList: [],
      currentPage: 1,
      pageSize: 50,
      finish: false,
      ajaxing: false,
      popoverVisible: false,
    }
  },
  watch: {
    showHistory(val) {
      if (!val) {
        // this.$refs.historyListBox && this.$refs.historyListBox.removeEventListener('scroll');
      }
    }
  },
  mounted() { },
  methods: {
    init(item) {
      this.visible = true
      this.showHistory = false
      this.info = item
      this.socket = this.$store.getters.socket
    },
    scroll(num) {
      setTimeout(() => {
        this.$nextTick(() => {
          let ele = this.$refs.chatList
          if (ele.scrollHeight > ele.clientHeight) {
            //设置滚动条到最底部
            ele.scrollTop = ele.scrollHeight;
          }
        })
      }, num || 0);
    },
    colseIM() {
      this.showHistory = false
      this.visible = false
    },
    //处理事件
    handleEvent(type, src) {
      if (type === 'image') {
        this.imgSrc = src;
        this.show = true;
      } else if (type === 'video') {
        this.videoSrc = src;
        this.show = true;
      } else if (type === 'voice') {
        this.audioSrc = src;
        this.show = true;
      } else if (type === 'file') {
        window.open(src)
      }
    },
    handleClose(done) {
      this.imgSrc = undefined;
      this.videoSrc = undefined;
      this.audioSrc = undefined;
      done();
    },
    getList(data) {
      let list = []
      for (let i = 0; i < data.list.length; i++) {
        const item = data.list[i];
        if (item.contentType === "text") {
          item.content = this.replaceEmoji(item.content)
        } else if (item.contentType === "image") {
          item.content = JSON.parse(item.content)
        } else {
          item.content = JSON.parse(item.content)
        }
        list.push({
          userId: item.sendUserId,
          messageType: item.contentType,
          message: item.content,
          dateTime: this.jnpf.toDate(item.sendTime)
        })
      }
      if (!this.showHistory) {
        this.list = list
        this.$nextTick(() => {
          this.scroll(500)
        })
      } else {
        this.historyList = [...this.historyList, ...list]
        this.currentPage += 1
        this.finish = list.length < data.pagination.pageSize
      }
      this.ajaxing = false
    },
    addItem(item) {
      if (item.messageType === "text") {
        item.message = this.replaceEmoji(item.message)
      } else if (item.messageType === "image") {
        // item.message = JSON.parse(item.message)
      }
      this.list.push(item)
      this.scroll()
      if (this.showHistory) {
        this.historyList.push(item)
      }
    },
    searchHistory() {
      this.currentPage = 1
      this.pageSize = 50
      this.finish = false
      this.historyList = []
      this.sendList()
      this.$nextTick(() => {
        let ele = this.$refs.historyListBox
        ele.scrollTop = 0;
      })
    },
    sendMessage() {
      if (!this.messageContent) {
        return
      }
      let socket = this.socket
      let sendMessage = {
        method: "SendMessage",
        toUserId: this.info.id,
        messageType: "text",
        messageContent: this.messageContent,
        token: this.$store.getters.token,
      }
      socket.send(JSON.stringify(sendMessage));
      this.messageContent = ''
    },
    openHistory() {
      this.showHistory = !this.showHistory
      if (this.showHistory) {
        this.historyList = []
        this.currentPage = 1
        this.pageSize = 50
        this.finish = false
        this.sendList()
        this.$nextTick(() => {
          this.bindScroll();
        })
      }
    },
    bindScroll() {
      let _this = this,
        ele = _this.$refs.historyListBox;
      if (!ele) return
      ele.addEventListener("scroll", function () {
        if (_this.finish || _this.ajaxing) return
        if (ele.scrollTop >= ele.scrollHeight - ele.clientHeight - 100) _this.sendList()
      });
    },
    sendList() {
      this.ajaxing = true
      let socket = this.socket
      let messageList = {
        method: "MessageList",
        toUserId: this.info.id,
        formUserId: this.userInfo.userId,
        token: this.$store.getters.token,
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        sord: "asc",
        keyword: this.keyword
      }
      socket.send(JSON.stringify(messageList));
    },
    // 发送图片
    getFile(file) {
      let isRightSize = file.size < 1024 * 1024 * 5
      if (!isRightSize) return this.$message.error(`图片大小不能超过5M`)
      this.getBase64(file.raw).then(res => {
        let data = res
        this.getImgSize(data.e).then(res => {
          let messageContent = {
            base64: data.base64,
            width: res.width,
            height: res.height
          }
          let sendMessage = {
            method: "SendMessage",
            toUserId: this.info.id,
            messageType: "image",
            messageContent,
            token: this.$store.getters.token,
          }
          this.socket.send(JSON.stringify(sendMessage))
          this.$refs.upload.clearFiles()
          this.$nextTick(() => {
            this.scroll(500)
          })
        })
      })
    },
    getBase64(file) {
      let _this = this
      return new Promise(function (resolve, reject) {
        let reader = new FileReader()
        let msg = { base64: '', e: null }
        reader.readAsDataURL(file)
        reader.onload = function (event) {
          msg.base64 = reader.result.replace(/data:image\/.*;base64,/, '')
          msg.e = event
        }
        reader.onerror = function (error) {
          reject(error)
        }
        reader.onloadend = function () {
          resolve(msg)
        }
      })
    },
    getImgSize(event) {
      return new Promise(function (resolve, reject) {
        let size = { width: 0, height: 0 }
        const txt = event.target.result
        const img = document.createElement("img")
        img.src = txt
        img.onload = function () {
          size.width = img.width
          size.height = img.height
          resolve(size)
        }
        img.onerror = function (error) {
          reject(error)
        }
      })
    },
    replaceEmoji(str) {	//替换表情符号为图片
      let replacedStr = str.replace(/\[([^(\]|\[)]*)\]/g, (item, index) => {
        let obj = ''
        for (let i = 0; i < this.emojiList.length; i++) {
          let row = this.emojiList[i];
          if (row.alt == item) {
            let url = require(`static/emoji/${row.url}`)
            obj = `<img src="${url}" class="chatList-text-emoji" />`
            break
          }
        }
        return obj
      });
      str = replacedStr;
      return str
    },
    // 选择表情
    selectEmit(item) {
      this.messageContent += item.alt;
      this.popoverVisible = false
    }
  },
  beforeDestroy() {
    // this.$refs.historyListBox  && this.$refs.historyListBox.removeEventListener('scroll');
  }
}
</script>

<style lang="scss" scoped>
.im-container {
  position: fixed;
  right: 290px;
  bottom: 10px;
  z-index: 3000;
  background: #e6e9f0;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 0 6px 1px rgba(0, 0, 0, 0.1) !important;
  * {
    box-sizing: border-box;
  }
  .header {
    background: #fff;
    height: 50px;
    border-bottom: 1px solid #dcdfe6;
    padding: 0 10px;
    font-size: 0;
    color: #475059;
    .el-avatar {
      margin-top: 10px;
      vertical-align: top;
      margin-right: 10px;
      &.offLine {
        filter: grayscale(1);
      }
    }
    span {
      line-height: 49px;
      font-size: 16px;
      color: #475059;
    }
    .el-link {
      float: right;
      >>> .el-icon-close {
        font-size: 20px;
        margin-top: 15px;
      }
    }
  }
  .main {
    display: flex;
    .chatBox {
      width: 600px;
      height: 480px;
      .chatList {
        height: 335px;
        overflow: auto;
        overflow-x: hidden;
        padding: 5px 15px 5px;
        background: #fff;
      }
      .toolBox {
        height: 35px;
        display: flex;
        justify-content: space-between;
        padding: 0 10px;
        align-items: center;
        font-size: 0;
        i {
          line-height: 35px;
          font-size: 20px;
          margin-right: 10px;
          color: #6b7a99;
          cursor: pointer;
        }
        .toolBox-left {
          >>> .el-link {
            line-height: 35px;
            i {
              font-size: 20px;
              margin-right: 10px;
            }
          }
          .uploadImg-btn {
            display: inline-block;
          }
        }
        .toolBox-right {
          color: #6b7a99;
          line-height: 35px;
          font-size: 14px;
          >>> .el-link {
            line-height: 35px;
            i {
              font-size: 18px;
              margin-right: 5px;
            }
          }
        }
      }
      .writeBox {
        background: #fff;
        height: 110px;
        >>> .el-textarea {
          .el-textarea__inner {
            border: none;
            resize: none;
          }
        }
        .btns {
          padding-right: 10px;
          text-align: right;
        }
      }
    }
    .historyBox {
      width: 350px;
      height: 480px;
      margin-left: 10px;
      background: #fff;
      .el-input {
        >>> .el-input__inner {
          border-radius: 0;
          border-right: none;
          border-left: none;
          border-top: none;
        }
        .el-input__icon {
          cursor: pointer;

          &:hover {
            color: #46a6ff;
          }
        }
      }
      .historyList-box {
        height: 448px;
        overflow: auto;
        overflow-x: hidden;
        padding: 5px;
        border-bottom-right-radius: 4px;
        .chatList-item .chatList-text {
          max-width: 94%;
        }
        .chatList__msg--audio {
          width: 230px;
        }
      }
    }
  }
  .chatList-item {
    position: relative;
    font-size: 0;
    margin-bottom: 10px;
    padding-left: 60px;
    min-height: 68px;
    text-align: left;
    .chatList-user,
    .chatList-text {
      display: inline-block;
      /* @css { * }display: inline;
    @css { * }zoom: 1; */
      vertical-align: top;
      font-size: 14px;
    }
    .chatList-user {
      position: absolute;
      cursor: pointer;
      left: 3px;
    }

    .chatList-user img {
      width: 40px;
      height: 40px;
      border-radius: 100%;
      &.offLine {
        filter: grayscale(1);
      }
    }

    .chatList-user cite {
      position: absolute;
      left: 60px;
      top: -2px;
      /* width: 500px; */
      line-height: 24px;
      font-size: 12px;
      white-space: nowrap;
      color: #999;
      text-align: left;
      font-style: normal;
    }

    .chatList-user cite i {
      padding-left: 15px;
      font-style: normal;
    }

    .chatList-text {
      max-width: 75%;
      position: relative;
      line-height: 22px;
      margin-top: 25px;
      padding: 8px 15px;
      background-color: #f3f3f3;
      border-radius: 3px;
      border: 1px solid #f0f0f0;
      color: #000;
      word-break: break-all;
    }
    .chatList__msg--text {
      line-height: 24px;
      >>> img {
        vertical-align: top;
        width: 24px;
        height: 24px;
        display: inline-block;
      }
    }

    .chatList-arrow {
      top: 6px;
      left: -8px;
      position: absolute;
      display: block;
      width: 0;
      height: 0;
      border-color: transparent;
      border-style: solid;
      border-width: 8px;
      border-left-width: 0;
      border-right-color: #ebeef5;
    }

    .chatList-arrow::after {
      content: ' ';
      top: -7px;
      left: 1px;
      position: absolute;
      display: block;
      width: 0;
      height: 0;
      border-color: transparent;
      border-style: solid;
      border-width: 7px;
      border-left-width: 0;
      border-right-color: #ebeef5;
    }

    &.chatList-item--mine .chatList-text .chatList-arrow {
      left: auto;
      right: -5px;
      border-color: transparent;
      border-style: solid;
      border-width: 8px;
      border-right-width: 0;
      border-left-color: #409eff;
    }

    &.chatList-item--mine .chatList-text .chatList-arrow::after {
      left: auto;
      right: -2px;
      border-color: transparent;
      border-style: solid;
      border-width: 7px;
      border-right-width: 0;
      border-left-color: #409eff;
    }

    &.chatList-item--mine {
      text-align: right;
      padding-left: 0;
      padding-right: 60px;
    }

    &.chatList-item--mine .chatList-user {
      left: auto;
      right: 3px;
    }

    &.chatList-item--mine .chatList-user cite {
      left: auto;
      right: 60px;
      text-align: right;
    }
    &.chatList-item--mine .chatList-user cite i {
      padding-left: 0;
      padding-right: 15px;
    }
    &.chatList-item--mine .chatList-text {
      margin-left: 0;
      text-align: left;
      background-color: #409eff;
      color: #fff;
    }
    .chatList__msg--img,
    .chatList__msg--video,
    .chatList__msg--file {
      position: relative;
      max-width: 100%;
      min-width: 200px;
      width: 100%;
      margin: 10px 0;
      overflow: hidden;
      border-radius: 5px;
      cursor: pointer;
      display: block;
    }
  }
}

.emjioBox {
  background: #fff;
  height: 150px;
  width: 300px;
  overflow: auto;
  text-align: left;
}
.emjioBox .emjio {
  padding: 0;
}
.emjioBox li {
  display: inline-block;
  width: 28px;
  height: 28px;
  line-height: 28px;
  text-align: center;
  cursor: pointer;
}
</style>
<style lang="scss">
.el-popover {
  z-index: 30000 !important;
}
</style>