<template>
  <component :is="layoutType" />
</template>

<script>
import { mapState, mapGetters } from "vuex";
import classic from './classic/index.vue'
import functional from './functional/index.vue'
import plain from './plain/index.vue'

export default {
  name: 'Layout',
  components: { classic, functional, plain },
  computed: {
    ...mapState({
      layoutType: state => state.settings.layoutType
    }),
    ...mapGetters(['userInfo'])
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (vm.userInfo.prevLogin == 1 && from.path == '/login') {
        //右下角提示上次登录信息
        vm.openNotify()
      }
    })
  },
  methods: {
    openNotify() {
      this.$notify({
        title: '上次登录信息',
        dangerouslyUseHTMLString: true,
        duration: 2000,
        position: 'bottom-right',
        message: `<div style='padding: 10px 0 0 ;'>
        <p>时间： ${this.jnpf.toDate(this.userInfo.prevLoginTime)} </p>
        <p>地点： ${this.userInfo.prevLoginIPAddressName || ''} </p>
        <p>IP： ${this.userInfo.prevLoginIPAddress || ''}  </p></div>
        `
      });
    }
  }
}
</script>