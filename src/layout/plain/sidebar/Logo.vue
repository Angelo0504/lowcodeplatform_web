<template>
  <div class="sidebar-logo-container">
    <router-link class="sidebar-logo-link" to="/">
      <img src="@/assets/images/jnpf.png" class="sidebar-logo" />
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'SidebarLogo'
}
</script>

<style lang="scss" scoped>
.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 60px;
  line-height: 60px;
  background: #031e39;
  text-align: center;
  overflow: hidden;
  border-bottom: 1px solid #031e39;
  .sidebar-logo-link {
    height: 100%;
    width: 100%;

    .sidebar-logo {
      height: 60px;
      width: auto;
    }
  }
}
</style>