<template>
  <div class="enlarge-main">
    <img :src="img" class="enlarge-img" @click="dialogVisible = true" title="点击查看放大" />
    <el-dialog :visible.sync="dialogVisible" append-to-body width="600px"
      class="JNPF-dialog JNPF-dialog_center enlarge-dialog">
      <img width="100%" :src="img" alt />
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ["img"],
  data() {
    return {
      dialogVisible: false
    }
  }
}
</script>

<style lang="scss" scoped>
.enlarge-main {
  cursor: pointer;
  display: inline-block;
  width: 120px;
  height: 120px;
  overflow: hidden;
  margin: 0 8px 8px 0;
  border: 1px solid #c0ccda;
  border-radius: 6px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  .enlarge-img {
    width: 120px;
    height: 120px;
    object-fit: contain;
  }
}
</style>