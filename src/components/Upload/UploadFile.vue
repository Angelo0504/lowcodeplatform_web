<template>
  <div class="UploadFile-container">
    <el-upload :action="define.comUploadUrl+'/'+type" :headers="uploadHeaders"
      :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove"
      :on-success="handleSuccess" :multiple="limit !==1" :file-list="fileList" :accept="accept"
      :disabled="disabled">
      <el-button size="small" icon="el-icon-upload" :disabled="disabled">选择文件</el-button>
    </el-upload>
  </div>
</template>

<script>
import { getDownloadUrl } from '@/api/common'
export default {
  name: 'UploadFile',
  props: {
    value: {
      type: Array,
      default: () => {
        return []
      }
    },
    type: {
      type: String,
      default: 'workFlow'
    },
    limit: {
      type: Number,
      default: 0
    },
    accept: {
      type: String,
      default: '*'
    },
    disabled: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      fileList: [],
      uploadHeaders: { Authorization: this.$store.getters.token }
    }
  },
  watch: {
    value(val) { this.fileList = val }
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
    handleRemove(file, fileList) {
      this.fileList = fileList
      this.$emit('input', this.fileList)
    },
    handleSuccess(res, file, fileList) {
      if (res.code == 200) {
        // file.fileId = res.data.name
        file.fileName = file.name
        if (this.limit == 1) {
          // 只保留一个
          this.fileList = fileList.slice(-1)
        } else {
          this.fileList = fileList
        }
        this.$emit('input', this.fileList)
      } else {
        this.fileList = fileList.filter(o => o.uid != file.uid)
        this.$message({ message: res.msg, type: 'error', duration: 1500 })
      }
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`).catch(() => { });
    }
  }
}
</script>