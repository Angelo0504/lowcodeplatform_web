<template>
  <el-scrollbar class="dashboard-container">
    <component :is="currentRole" />
  </el-scrollbar>
</template>

<script>
import adminDashboard from './admin'

export default {
  name: 'Dashboard',
  components: { adminDashboard },
  data() {
    return {
      currentRole: 'adminDashboard'
    }
  }
}
</script>
<style lang="scss" scoped>
.dashboard-container {
  height: 100%;
  overflow: hidden;
  border-radius: 4px;
  >>> .el-scrollbar__wrap {
    margin-bottom: 0 !important;
    overflow-x: auto;
  }
  >>> .el-scrollbar__bar.is-horizontal > div {
    display: none;
  }
}
</style>