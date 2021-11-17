<template>
  <div class="UploadFile-container">
    <el-upload :action="define.comUploadUrl+'/'+type" :headers="uploadHeaders"
      :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove"
      :on-success="handleSuccess" :file-list="fileList" :accept="accept">
      <el-button size="small" icon="el-icon-upload">选择文件</el-button>
    </el-upload>
  </div>
</template>

<script>
import { getDownloadUrl } from '@/api/common'
export default {
  name: 'UploadFileSingle',
  props: {
    value: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'workFlow'
    },
    accept: {
      type: String,
      default: '*'
    }
  },
  data() {
    return {
      fileList: [],
      uploadHeaders: { Authorization: this.$store.getters.token }
    }
  },
  watch: {
    value(val) { if (!val) this.fileList = [] }
  },
  methods: {
    handlePreview(file) {
      // 点击下载文件
      // if (!file.fileId) return
      // getDownloadUrl(this.type, file.fileId).then(res => {
      //   window.location.href = this.define.comUrl + res.data.url
      // })
    },
    handleRemove(file, fileList) {
      this.fileList = fileList
      this.$emit('input', '')
    },
    handleSuccess(res, file, fileList) {
      if (res.code == 200) {
        this.fileList = fileList.slice(-1)
        this.$emit('input', res.data.name)
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