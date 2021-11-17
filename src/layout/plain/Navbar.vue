<template>
  <div class="navbar" :class="slideClass">
    <!-- <span class="navbar-platform">快速开发平台</span> -->
    <NavbarRight />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import NavbarRight from '../components/NavbarRight'

export default {
  components: { NavbarRight },
  computed: {
    ...mapState({
      slideClass: state => state.settings.slideClass,
    })
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 60px;
  overflow: hidden;
  position: relative;
  border-bottom: 1px solid #dcdfe6;
  box-sizing: border-box;
}
</style>