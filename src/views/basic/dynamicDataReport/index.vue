<template>
  <div class="DynamicDataReport-container app-container">
    <iframe width="100%" height="100%" :src="url" frameborder="0"></iframe>
  </div>
</template>

<script>
import { getToken } from '@/utils/auth'

export default {
  name: 'dynamicDataReport',
  data() {
    return {
      id: '',
      url: ''
    }
  },
  created() {
    this.id = this.$route.meta.relationId
    const token = getToken()
    if (!this.id) return
    this.$nextTick(() => {
      this.url = `${this.define.report}/preview.html?id=${this.id}&token=${token}&page=1&from=menu`
    })
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>
.DynamicDataReport-container {
  padding: 0;
}
</style>
