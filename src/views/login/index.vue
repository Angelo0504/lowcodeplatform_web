<template>
  <div class="login-container">
    <div class="login-version">
      <p class="login-version-text">{{$t('login.version')}} {{define.version}}</p>
    </div>
    <div class="login-content">
      <img class="login-img" src="../../assets/images/login_content_img.png" alt="">
      <div class="login-form">
        <img class="login-logo" src="../../assets/images/login_logo.png" alt="">
        <div class="login-tab">
          <a class="item" :class="{'active': active==1}" @click="active=1">{{$t('login.title')}}</a>
          <a class="item" :class="{'active': active==2}"
            @click="active=2">{{$t('login.scanTitle')}}</a>
        </div>
        <el-form v-show="active==1" ref="loginForm" :model="loginForm" :rules="loginRules"
          autocomplete="on" label-position="left">
          <el-form-item prop="account">
            <el-input ref="account" v-model="loginForm.account" :placeholder="$t('login.username')"
              name="account" type="text" tabindex="1" autocomplete="on" prefix-icon="el-icon-user"
              size="large"></el-input>
          </el-form-item>
          <el-form-item class="rule-tip">{{$t('login.rule')}}</el-form-item>
          <el-tooltip v-model="capsTooltip" :content="$t('login.upper')" placement="right" manual>
            <el-form-item prop="password">
              <el-input ref="password" v-model="loginForm.password" show-password
                :placeholder="$t('login.password')" name="password" tabindex="2" autocomplete="on"
                @keyup.native="checkCapslock" @blur="capsTooltip = false" prefix-icon="el-icon-lock"
                size="large"></el-input>
              <!-- @keyup.enter.native="handleLogin" -->
            </el-form-item>
          </el-tooltip>
          <el-button :loading="loading" type="primary" class="login-btn" size="large"
            @click.native.prevent="handleLogin">{{ $t('login.logIn') }}</el-button>
          <!-- <div class="foot">
            <span class="register">立即注册</span>
            <span class="forget">忘记密码</span>
          </div> -->
        </el-form>
        <div v-show="active==2" class="login-form-QRCode">
          <img class="qrcode-img" src="../../assets/images/login_qr.png">
          <p class="qrcode-tip">{{ $t('login.scanTip') }}</p>
        </div>
      </div>
    </div>
    <!-- <div class="login-foot">Copyright 引迈信息技术有限公司, All Rights Reserved. 沪ICP备17044791号-1
      助力企业和团队快速实现目标</div> -->
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        account: '',
        password: ''
      },
      loginRules: {
        account: [
          { required: true, trigger: 'blur', message: this.$t('login.accountTip') }
        ],
        password: [
          { required: true, trigger: 'blur', message: this.$t('login.passwordTip') }
        ]
      },
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {},
      active: 1
    }
  },
  computed: {
    loginLoading() {
      return this.$store.state.user.loginLoading
    }
  },
  watch: {
    loginLoading(val) {
      if (!val) this.loading = false
    },
    $route: {
      handler: function (route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  created() {
    const _this = this
    document.onkeydown = function (e) {
      const { keyCode } = e
      if (keyCode === 13) {
        _this.handleLogin()
      }
    }
  },
  mounted() {
    // if (this.loginForm.account === '') {
    //   this.$refs.account.focus()
    // } else if (this.loginForm.password === '') {
    //   this.$refs.password.focus()
    // }
    this.$store.commit('user/SET_LOGIN_LOADING', false)
  },
  destroyed() {
    document.onkeydown = function (e) {
      const { keyCode } = e
      if (keyCode === 13) { }
    }
  },
  methods: {
    checkCapslock(e) {
      const { key } = e
      this.capsTooltip = key && key.length === 1 && key >= 'A' && key <= 'Z'
    },
    handleLogin() {
      if (this.loading) return
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.commit('user/SET_LOGIN_LOADING', true)
          this.$store
            .dispatch('user/login', this.loginForm)
            .then(() => {
              this.$router.push({
                path: this.redirect || '/home',
                query: this.otherQuery
              })
            })
            .catch(() => {
              this.$store.commit('user/SET_LOGIN_LOADING', false)
            })
        } else {
          return false
        }
      })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
  }
}
</script>

<style lang="scss" scoped>
$bg: #fff;
$cursor: #fff;

.login-container {
  width: 100%;
  overflow: hidden;
  height: 100%;
  background: url('../../assets/images/login_bg.png') no-repeat;
  background-position: 0 0;
  background-size: 57% 100%;
  background-color: $bg;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-version {
    position: fixed;
    right: 0px;
    top: 0px;
    width: 94px;
    height: 94px;
    background: url('../../assets/images/login_version.png') no-repeat center;
    background-size: 100%;
    .login-version-text {
      width: 94px;
      height: 94px;
      line-height: 52px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      transform: rotate(45deg);
    }
  }
  .login-content {
    width: 1060px;
    height: 500px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    .login-img {
      width: 500px;
      height: 500px;
    }
  }
  .login-form {
    width: 420px;
    padding-top: 30px;
    .login-logo {
      width: 320px;
      height: 40px;
      margin-bottom: 55px;
    }
    .login-tab {
      height: 32px;
      margin-bottom: 30px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 50px;
      .item {
        position: relative;
        line-height: 32px;
        font-size: 16px;
        color: #334d65;
        &::after {
          display: block;
          content: '';
          overflow: hidden;
          width: 28px;
          height: 2px;
          position: absolute;
          left: 0;
          bottom: 0;
          background-color: transparent;
          border-radius: 1px;
        }
        &.active {
          &::after {
            background-color: #1890ff;
          }
        }
      }
    }
    .rule-tip {
      color: #a0acb7;
      font-size: 12px;
      line-height: 12px;
      text-align: left;
      >>> .el-form-item__content {
        line-height: 12px;
      }
    }
    .el-form {
      input:-webkit-autofill {
        box-shadow: 0 0 0px 1000px #fff inset !important;
        -webkit-text-fill-color: #606266 !important;
      }
      input::-webkit-input-placeholder {
        color: #a0acb7;
      }
      .login-btn {
        width: 100%;
        font-size: 16px;
        margin-bottom: 20px;
        margin-top: 40px;
      }
      .foot {
        width: 100%;
        display: flex;
        justify-content: space-between;
        font-size: 12px;
        color: #188ae2;
        .register,
        .forget {
          cursor: pointer;
        }
      }
    }
    .login-form-QRCode {
      width: 420px;
      text-align: center;
      .qrcode-img {
        position: relative;
        margin-bottom: 16px;
        width: 240px;
        height: 240px;
      }
      .qrcode-tip {
        color: #334d65;
        line-height: 22px;
        font-size: 16px;
      }
    }
  }
  .login-foot {
    position: absolute;
    width: 1060px;
    color: #999;
    font-size: 12px;
    position: fixed;
    bottom: 20px;
    left: 31%;
    text-align: left;
    margin-left: 110px;
  }
}
</style>