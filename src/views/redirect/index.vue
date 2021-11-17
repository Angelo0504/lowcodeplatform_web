<script>
export default {
  created() {
    const { params, query } = this.$route
    let { path } = params
    path = path ? path : ''

    this.$router.replace({ path: '/' + path, query })
  },
  render: function (h) {
    return h() // avoid warning message
  }
}
</script>
