<template>
  <div class="app-container Profile-container">
    <el-tabs tab-position="left" style="height:100%" v-model="activeTab" class="profile-tabs">
      <el-tab-pane label="个人资料" name="user">
        <UserInfo ref="user" :user='user' v-if="visible.user" />
      </el-tab-pane>
      <el-tab-pane label="修改密码" name="password">
        <Password ref="password" v-if="visible.password" />
      </el-tab-pane>
      <el-tab-pane disabled name="line"></el-tab-pane>
      <el-tab-pane label="我的下属" name="subordinate">
        <div class="JNPF-common-title mb-20">
          <h2 class="bold">我的下属</h2>
        </div>
        <el-row :gutter="12">
          <el-col :span="6" v-for="(item,i) in subordinateIds" :key="i" class="subordinate-item">
            <el-card shadow="hover">
              <el-avatar :size="40" :src="define.comUrl+ item.avatar"></el-avatar>
              <div class="text">
                <p>{{item.userName}}</p>
                <p>{{item.department}}</p>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="系统权限" name="authorize" class="el-tab-pane-authorize">
        <Authorize ref="authorize" v-if="visible.authorize" />
      </el-tab-pane>
      <el-tab-pane label="系统日志" name="sysLog">
        <SysLog ref="sysLog" v-if="visible.sysLog" />
      </el-tab-pane>
    </el-tabs>
    <div class="head">
      <el-upload class="avatar-uploader" :action="define.comUploadUrl+'/userAvatar'"
        :headers="uploadHeaders" :on-success="handleSuccess" :show-file-list="false"
        accept="image/*">
        <div class="avatar-box">
          <img :src="define.comUrl+ user.avatar" class="avatar" ref="avatar" v-if="user.avatar">
          <div class="avatar-hover">更换头像</div>
        </div>
      </el-upload>
      <span class="username">{{user.realName}}</span>
    </div>
  </div>
</template>

<script>
import { UserSettingInfo, getSubordinate, UpdateAvatar, UpdateLanguage } from '@/api/permission/userSetting'
import { mapGetters } from 'vuex'
import UserInfo from './components/UserInfo'
import Password from './components/Password'
import Authorize from './components/Authorize'
import SysLog from './components/SysLog'

export default {
  name: 'profile',
  components: { UserInfo, Password, Authorize, SysLog },
  data() {
    return {
      user: {},
      subordinateIds: [],
      activeTab: '',
      visible: {
        user: true,
        password: false,
        theme: false,
        authorize: false,
        sysLog: false,
      },
      uploadHeaders: { Authorization: this.$store.getters.token }
    }
  },
  watch: {
    activeTab(val) {
      for (let key of Object.keys(this.visible)) {
        this.visible[key] = false
      }
      this.visible[val] = true
      if (val === 'subordinate') this.getSubordinate()
    }
  },

  created() {
    this.getInfo()
  },
  methods: {
    getInfo() {
      UserSettingInfo().then(res => {
        this.user = res.data
        this.activeTab = 'user'
      })
    },
    getSubordinate() {
      getSubordinate().then(res => {
        this.subordinateIds = res.data
      })
    },
    handleSuccess(res, file) {
      if (res.code == 200) {
        this.updateAvatar(res.data)
      } else {
        this.$message({
          message: '上传失败',
          type: 'error',
          duration: 1000,
        })
      }
    },
    updateAvatar(data) {
      UpdateAvatar(data.name).then(res => {
        this.user.avatar = data.url
        this.$store.commit('user/SET_USERINFO_HEADICON', data.url)
        this.$message({
          message: res.msg,
          type: 'success',
          duration: 1000,
        })
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.Profile-container {
  position: relative;
  padding-top: 10px;
  .profile-tabs {
    >>> .el-tabs__nav-scroll {
      padding-top: 70px;
    }
    >>> .el-tabs__item {
      text-align: left !important;
    }
    >>> .el-tabs__content {
      height: 100%;
      .el-tab-pane {
        height: 100%;
        overflow: auto;
        overflow-x: hidden;

        &.el-tab-pane-authorize {
          overflow: hidden;
        }
      }
    }
    >>> #tab-line {
      height: 20px;
      width: 160px;
      &::after {
        position: absolute;
        width: 100%;
        height: 1px;
        background: #ddd;
        content: '';
        display: block;
        overflow: hidden;
        top: 10px;
        left: 0;
      }
    }
  }
  .head {
    position: absolute;
    left: 10px;
    top: 10px;
    height: 70px;
    width: 160px;
    padding-top: 10px;
    >>> .avatar-uploader {
      display: inline-block;
      vertical-align: top;
      .avatar-hover {
        position: absolute;
        left: 0;
        top: 0;
        font-size: 12px;
        display: none;
        overflow: hidden;
        width: 50px;
        height: 50px;
        text-align: center;
        border-radius: 50%;
        line-height: 50px;
        color: #fff;
        cursor: pointer;
        background: rgba(0, 0, 0, 0.5);
      }
      &:hover {
        & .avatar-hover {
          display: block;
        }
      }
    }
    .avatar-box {
      position: relative;
    }
    .avatar {
      display: inline-block;
      width: 50px;
      height: 50px;
      overflow: hidden;
      border-radius: 50%;
      vertical-align: top;
      margin-right: 10px;
    }
    .username {
      line-height: 50px;
      font-size: 12px;
    }
  }
  >>> .el-card__body {
    display: flex;
    padding: 10px 20px;
    align-items: center;
    .el-avatar {
      margin-right: 14px;
    }

    .text {
      font-size: 12px;
      p {
        line-height: 20px;
      }
    }
  }
  >>> .el-select,
  >>> .el-date-editor {
    width: 100%;
  }
  .subordinate-item {
    margin-bottom: 10px;
  }
}
</style>