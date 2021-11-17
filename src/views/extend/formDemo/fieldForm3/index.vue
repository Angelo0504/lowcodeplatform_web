<template>
  <div class="CommonForm-container app-container nohead">
    <div class="dataForm">
      <el-alert title="单附件上传、图片上传组件" type="warning" :closable="false" />
      <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="110px" class="mt-10">
        <el-form-item label="上传附件">
          <el-upload class="upload-demo" :action="define.comUploadUrl+'/workFlow'"
            :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove"
            multiple :limit="3" :on-exceed="handleExceed" :file-list="fileList">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="图片上传">
          <el-upload :action="define.comUploadUrl+'/workFlow'" list-type="picture-card"
            :on-preview="handlePictureCardPreview" :on-remove="handleRemove" accept="image/*">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>

      </el-form>
    </div>

  </div>
</template>

<script>
export default {
  name: 'extend-formDemo-fieldForm3',
  data() {
    return {
      dataForm: {},
      dataRule: {},
      dialogImageUrl: '',
      dialogVisible: false,
      fileList: [{ name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }, { name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }]
    }
  },
  methods: {
    init() {
      this.$refs['dataForm'].resetFields()
    },
    dataFormSubmit() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          // this.$message({
          //   message: '验证成功',
          //   type: 'success',
          //   duration: 1500,
          // })
        }
      })
    },
    handleRemove(file, fileList) {
      // console.log(file, fileList);
    },
    handlePreview(file) {
      // console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`).catch(() => { });
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  }
}
</script>
<style lang="scss" scoped>
.CommonForm-container {
  .JNPF-common-head {
    height: 50px;
    border-bottom: 1px solid #ddd;
    margin-bottom: 10px;
  }
  .dataForm {
    flex: 1;
    overflow: auto;
    .el-input {
      width: 300px;
    }
    .tip {
      margin-left: 10px;
      color: darkgray;
    }
  }
}
</style>