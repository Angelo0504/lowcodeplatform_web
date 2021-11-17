<template>
  <div class="functional-logo-container">
    <router-link class="sidebar-logo-link" to="/">
      <img src="@/assets/images/jnpf1.png" class="sidebar-logo" />
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'SidebarLogo'
}
</script>

<style lang="scss" scoped>
.functional-logo-container {
  width: 210px;
  height: 60px;
  line-height: 60px;
  background: #fff;
  text-align: center;
  overflow: hidden;
  flex-shrink: 0;
  .sidebar-logo-link {
    height: 100%;
    width: 100%;

    .sidebar-logo {
      height: 100%;
      width: 100%;
    }
  }
}
</style>