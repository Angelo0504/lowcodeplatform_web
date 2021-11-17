<template>
  <div class="UploadFile-container">
    <el-upload :action="define.comUploadUrl+'/'+type" :headers="uploadHeaders"
      :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove"
      :on-success="handleSuccess" :multiple="limit !==1" :file-list.sync="fileList" :accept="accept"
      :before-upload="beforeUpload" :on-exceed="handleExceed" :disabled="disabled">
      <el-button size="small" icon="el-icon-upload" :disabled="disabled">{{buttonText}}</el-button>
      <div slot="tip" class="el-upload__tip" v-show="showTip">
        只能上传不超过{{fileSize}}{{sizeUnit}}的{{accept}}文件
      </div>
    </el-upload>
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
      default: 'annex'
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
      default: ''
    },
    buttonText: {
      type: String,
      default: '选择文件'
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
      // 点击下载文件
      if (!file.fileId) return
      getDownloadUrl(this.type, file.fileId).then(res => {
        if (res.data.url) window.location.href = this.define.comUrl + res.data.url
      })
    },
    beforeUpload(file) {
      const unitNum = units[this.sizeUnit];
      if (!this.fileSize) return true
      let isRightSize = file.size / unitNum < this.fileSize
      if (!isRightSize) {
        this.$message.error(`文件大小超过 ${this.fileSize}${this.sizeUnit}`)
      }
      // let isAccept = new RegExp(this.accept).test(file.type)
      // if (!isAccept) {
      //   this.$message.error(`应该选择${this.accept}类型的文件`)
      // }
      return isRightSize;
    },
    handleRemove(file, fileList) {
      if (file && file.status === "success") {
        this.fileList = fileList
        this.$emit('input', this.fileList)
      }
    },
    handleSuccess(res, file, fileList) {
      if (res.code == 200) {
        // file.fileId = res.data.name
        this.fileList.push({
          name: file.name,
          fileId: res.data.name,
          url: res.data.url
        })
        // fileList = fileList.map(o => ({
        //   name: o.name,
        //   fileId: o.fileId ? o.fileId : (o.response && o.response.data) ? o.response.data.name : '',
        //   url: o.url ? o.url : (o.response && o.response.data) ? o.response.data.url : ''
        // }))
        if (this.limit > 0) {
          this.fileList = this.fileList.slice(-this.limit)
        } else {
          // this.fileList = fileList
        }
        this.$emit('input', this.fileList)
      } else {
        this.fileList = fileList.filter(o => o.uid != file.uid)
        this.$message({ message: res.msg, type: 'error', duration: 1500 })
      }
    },
    beforeRemove(file, fileList) {
      let boo = true;
      if (file && file.status === "success") {
        boo = this.$confirm(`确定移除 ${file.name}？`).catch(() => { });
      }
      return boo;
    },
    handleExceed(files, fileList) {
      // this.$message.warning(`当前限制最多可以上传 ${this.limit}个文件`);
    }
  }
}
</script>