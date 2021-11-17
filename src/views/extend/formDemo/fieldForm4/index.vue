<template>
  <div class="CommonForm-container app-container nohead">
    <div class="dataForm">
      <el-alert title="文本域、HTML编辑器" type="warning" :closable="false" />
      <el-col :span="16" class="mt-10">
        <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="110px">
          <el-form-item label="文本域">
            <el-input v-model="dataForm.Ttextarea" placeholder="文本域" type="textarea" :rows="3" />
          </el-form-item>
          <el-form-item label="HTML编辑器">
            <JNPF-Quill v-model="dataForm.ModifyOpinion" />
          </el-form-item>
        </el-form>
      </el-col>
    </div>

  </div>
</template>

<script>
export default {
  name: 'extend-formDemo-fieldForm4',
  data() {
    return {
      dataForm: {
        Ttextarea: '',
        ModifyOpinion: '',
      },
      dataRule: {}
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