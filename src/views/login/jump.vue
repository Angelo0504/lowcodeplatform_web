<template>
  <div class="box" v-loading="loading" element-loading-text="页面加载中"></div>
</template>

<script>
export default {
  name: 'jump',
  data() {
    return {
      id: '',
      loading: true
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      const account = this.$route.query.account
      const password = window.atob(this.$route.query.password)
      const data = {
        account,
        password
      }
      this.$store.dispatch('user/login', data)
        .then(() => {
          this.$router.push({
            path: '/home'
          })
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },
  }
}
</script>

<style lang="scss" scoped>
.box{
  width: 100%;
  height: 100%;
}
</style>
