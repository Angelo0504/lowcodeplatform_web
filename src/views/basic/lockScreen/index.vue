<template>
  <div class="lock-container">
    <div class="lock-form">
      <img :src="define.comUrl+ userInfo.headIcon" class="lock-screen-img">
      <p class="mb-20 mt-10">{{userInfo.userName}}/{{userInfo.userAccount}}</p>
      <el-input placeholder="请输入登录密码" show-password v-model="password">
        <!-- @keyup.enter.native="handleLogin" -->
        <el-button slot="append" @click="handleLogin" icon="ace-icon el-icon-unlock"
          :loading="loading">
        </el-button>
      </el-input>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'lockScreen',
  data() {
    return {
      password: '',
      loading: false
    }
  },
  created() {
    var _this = this
    document.onkeydown = function (e) {
      var key = window.event.keyCode
      if (key === 13) {
        _this.handleLogin()
      }
    }
  },
  mounted() { },
  computed: {
    ...mapGetters(['userInfo']),
  },
  destroyed() {
    document.onkeydown = function (e) {
      var key = window.event.keyCode
      if (key === 13) {

      }
    }
  },
  methods: {
    handleLogout() {
      this.$confirm('您确定要退出应用程序吗?', '提示', {
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('user/logout').then(() => {
          this.$router.push({ path: '/login' })
        })
      }).catch(() => {
        return false
      })
    },
    handleLogin() {
      this.loading = true
      if (!this.password) {
        this.$message({
          message: '请输入解锁密码',
          type: 'error'
        })
        this.loading = false
        return
      }
      this.$store
        .dispatch('user/unlock', {
          password: this.password,
          account: this.userInfo.userAccount
        })
        .then(() => {
          this.$router.go(-1);
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
.lock-container {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background: #e6e9f0;

  .lock-form {
    width: 250px;
    text-align: center;
    margin-top: -16%;
    .lock-screen-img {
      width: 150px;
      height: 150px;
      // margin-top: 50%;
      border-radius: 10%;
    }
  }
}
</style>