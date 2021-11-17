<template>
  <transition name="el-zoom-in-center">
    <div class="JNPF-preview-main">
      <iframe width="100%" height="100%" :src="url" frameborder="0"></iframe>
    </div>
  </transition>
</template>

<script>
import { getToken } from '@/utils/auth'
export default {
  data() {
    return {
      url: ''
    }
  },
  mounted() {
    window.addEventListener('message', this.handleMessage)
  },
  methods: {
    init(id) {
      this.id = id || ''
      this.$nextTick(() => {
        const token = getToken()
        this.url = `${this.define.report}/preview.html?id=${id}&token=${token}&page=1`
      })
    },
    async handleMessage(e) {
      const data = e.data
      if(data === 'closeDialog') {
        this.url = ''
        this.$emit('close')
      }
    }
  }
}
</script>
