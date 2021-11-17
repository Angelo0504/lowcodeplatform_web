<template>
  <el-dialog title="导入数据" :close-on-click-modal="false" :visible.sync="visible"
    class="JNPF-dialog JNPF-dialog_center" lock-scroll width="600px">
    <el-row>
      <el-col :span="12" class="grid-content">
        <p>下载导入模板，填写数据</p>
        <img src="../../../assets/images/xsl1.png" alt="">
        <p>
          <el-button type="primary" round @click="downLoad()">下载导入模板</el-button>
        </p>
      </el-col>
      <el-col :span="12" class="grid-content">
        <p>上传填写好的文件</p>
        <img src="../../../assets/images/xsl1.png" alt="">
        <p>
          <el-upload
            :action="define.comUrl+'/api/VisualDevelopment/Model/'+ modelId +'/Actions/Uploader'"
            :headers="{ Authorization: $store.getters.token}" :on-success="handleSuccess"
            :show-file-list="false" accept=".xls,.xlsx" :before-upload="beforeUpload">
            <el-button type="primary" round :loading="btnLoading">上传文件</el-button>
            <!-- <div slot="tip" class="el-upload__tip">只能上传xls/xlsx文件，且不超过500kb</div> -->
          </el-upload>
        </p>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { getTemplate, importModel } from '@/api/onlineDev/visualDev'
export default {
  data() {
    return {
      visible: false,
      btnLoading: false,
      modelId: ''
    }
  },
  methods: {
    init(modelId) {
      if (!modelId) return
      this.visible = true
      this.modelId = modelId
    },
    // 下载模板
    downLoad() {
      getTemplate(this.modelId).then(res => {
        if (res.data.url) window.location.href = this.define.comUrl + res.data.url
      })
    },
    beforeUpload() { this.btnLoading = true },
    handleSuccess(res, file) {
      this.btnLoading = false
      if (res.code == 200) {
        this.$message({
          message: '导入成功',
          type: 'success',
          duration: 1000,
          onClose: () => {
            this.visible = false
            this.$emit('refreshDataList')
          }
        })
      } else {
        this.$message({ message: '导入失败', type: 'error', duration: 1000 })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
::v-deep .el-dialog__body {
  padding: 40px 30px !important;
}

.grid-content {
  &:first-child {
    border-right: 1px solid #dcdfe6;
  }

  text-align: center;

  p {
    text-align: center;
  }

  img {
    width: 128px;
    margin: 10px 0;
  }
}
</style>