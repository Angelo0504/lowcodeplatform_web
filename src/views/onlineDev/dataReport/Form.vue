<template>
  <el-dialog
    :visible.sync="visible"
    fullscreen
    lock-scroll
    :show-close="false"
    :modal="false"
    class="JNPF-full-dialog jnpf-datav"
  >
    <iframe
      :src="src"
      ref="iframe"
      width="100%"
      height="100%"
      frameborder="0"
      class="frame"
    />
  </el-dialog>
</template>

<script>
  import { getToken } from '@/utils/auth'
  export default {
    data() {
      return {
        id: '',
        visible: false,
        btnLoading: false,
        src: ''
      }
    },
    mounted() {
      window.addEventListener('message', this.handleMessage)
    },
    methods: {
      init(id) {
        this.id = id || ''
        this.visible = true
        this.$nextTick(() => {
          const token = getToken()
          if(id){
            this.src = `${this.define.report}/index.html?id=${id}&token=${token}`
          } else {
            this.src = `${this.define.report}/index.html?token=${token}`
          }
        })
      },
      async handleMessage(e) {
        const data = e.data
        if(data === 'closeDialog') {
          this.visible = false
          this.src = ''
          this.$emit('refreshDataList')
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
.jnpf-datav {
  >>> .el-dialog__header {
    display: none;
  }
  >>> .el-dialog__body {
    padding: 0;
    position: relative;
    height: calc(100vh);
    flex: 1;
    overflow: hidden;
    .frame {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
    }
  }
}
</style>
