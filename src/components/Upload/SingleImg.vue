<template>
  <div class="SingleImg-container">
    <el-upload class="avatar-uploader" :action="define.comUploadUrl+'/'+type"
      :show-file-list="false" :on-success="handleSuccess" :headers="uploadHeaders" accept="image/*">
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script>
import { getDownloadUrl } from '@/api/common'
export default {
  name: 'SingleImg',
  props: {
    value: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'workFlow'
    },
  },
  data() {
    return {
      imageUrl: '',
      uploadHeaders: { Authorization: this.$store.getters.token }
    }
  },
  watch: {
    value(val) { if (!val) this.imageUrl = '' }
  },
  methods: {
    handleSuccess(res, file) {
      if (res.code == 200) {
        this.imageUrl = URL.createObjectURL(file.raw);
        this.$emit('input', res.data.name)
      } else {
        this.$message({ message: res.msg, type: 'error', duration: 1500 })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.avatar-uploader >>> .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 150px;
  height: 150px;
  line-height: 150px;
  text-align: center;
}
.avatar {
  width: 150px;
  height: 150px;
  display: block;
}
</style>