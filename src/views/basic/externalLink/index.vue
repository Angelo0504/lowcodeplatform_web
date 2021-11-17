<template>
  <div class="ExternalLink-container app-container">
    <iframe id="ExternalLink" name="ExternalLink" width="100%" height="100%" frameborder="0"
      scrolling="yes" :src="url"></iframe>
  </div>
</template>

<script>
export default {
  name: 'externalLink',
  data() {
    return {
      url: ''
    }
  },
  created() {
    this.url = this.$route.meta.urlAddress || ''
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.ExternalLink-container {
  padding: 0;
}
</style>