<template>
  <div class="UploadFile-container">
    <el-upload :action="define.comUploadUrl+'/'+type" :headers="uploadHeaders"
      :on-success="handleSuccess" :multiple="limit !==1" :file-list="fileList" accept="image/*"
      :before-upload="beforeUpload" :on-exceed="handleExceed" :disabled="disabled"
      list-type="picture-card" :limit='limit'>
      <i class="el-icon-plus"></i>
      <div slot="tip" class="el-upload__tip" v-show="showTip">只能上传不超过 {{fileSize}}{{sizeUnit}}
        的{{accept}}文件</div>
      <div slot="file" slot-scope="{file}">
        <img class="el-upload-list__item-thumbnail" :src="define.comUrl+file.url" alt="">
        <span class="el-upload-list__item-actions">
          <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
            <i class="el-icon-zoom-in"></i>
          </span>
          <!-- <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleDownload(file)">
            <i class="el-icon-download"></i>
          </span> -->
          <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
            <i class="el-icon-delete"></i>
          </span>
        </span>
      </div>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible" append-to-body width="600px"
      class="JNPF-dialog JNPF-dialog_center enlarge-dialog">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
const units = {
  KB: 1024,
  MB: 1024 * 1024,
  GB: 1024 * 1024 * 1024
}
import { getDownloadUrl } from '@/api/common'
export default {
  name: 'UploadFile',
  props: {
    value: {
      type: Array,
      default: () => []
    },
    type: {
      type: String,
      default: 'annexpic'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    showTip: {
      type: Boolean,
      default: false
    },
    limit: {
      type: Number,
      default: 9
    },
    accept: {
      type: String,
      default: 'image/*'
    },
    sizeUnit: {
      type: String,
      default: 'MB'
    },
    fileSize: {
      default: 2
    },
  },
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      fileList: this.value,
      uploadHeaders: { Authorization: this.$store.getters.token }
    }
  },
  watch: {
    value(val) {
      this.fileList = val
    }
  },
  created() { },
  methods: {
    handlePreview(file) {
    },
    beforeUpload(file) {
      const unitNum = units[this.sizeUnit];
      if (!this.fileSize) return true
      let isRightSize = file.size / unitNum < this.fileSize
      if (!isRightSize) {
        this.$message.error(`文件大小超过 ${this.fileSize}${this.sizeUnit}`)
      }
      return isRightSize;
    },
    handleSuccess(res, file, fileList) {
      if (res.code == 200) {
        this.fileList.push({
          name: file.name,
          fileId: res.data.name,
          url: res.data.url
        })
        this.$emit('input', this.fileList)
      } else {
        this.fileList = fileList.filter(o => o.uid != file.uid)
        this.$message({ message: res.msg, type: 'error', duration: 1500 })
      }
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制最多可以上传 ${this.limit}张图片`);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = this.define.comUrl + file.url;
      this.dialogVisible = true;
    },
    handleRemove(file) {
      this.fileList = this.fileList.filter(o => o.fileId !== file.fileId);
      this.$emit("input", this.fileList);
    },
    handleDownload(file) {
    }
  }
}
</script>
<style lang="scss" scoped>
>>> .el-upload-list--picture-card .el-upload-list__item {
  width: 120px;
  height: 120px;
}
>>> .el-upload--picture-card {
  width: 120px;
  height: 120px;
  line-height: 120px;
}
</style>