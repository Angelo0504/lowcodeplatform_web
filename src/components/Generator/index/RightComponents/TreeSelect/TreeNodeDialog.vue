<template>
  <div>
    <el-dialog v-bind="$attrs" :close-on-click-modal="false" :modal-append-to-body="false"
      v-on="$listeners" @open="onOpen" @close="onClose" width="600px"
      class="JNPF-dialog JNPF-dialog_center">
      <el-row :gutter="0">
        <el-form ref="elForm" :model="formData" :rules="rules" size="small" label-width="100px">
          <el-col :span="24">
            <el-form-item label="选项名" prop="fullName">
              <el-input v-model="formData.fullName" placeholder="请输入选项名" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="选项值" prop="id">
              <el-input v-model="formData.id" placeholder="请输入选项值" clearable>
              </el-input>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <div slot="footer">
        <el-button type="primary" @click="handelConfirm">确定</el-button>
        <el-button @click="close">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formData: {
        fullName: '',
        id: ''
      },
      rules: {
        fullName: [{ required: true, message: '请输入选项名', trigger: 'blur' }],
        id: [{ required: true, message: '请输入选项值', trigger: 'blur' }]
      },
    }
  },
  methods: {
    onOpen() {
      this.formData = { fullName: '', id: '' }
    },
    onClose() { },
    close() {
      this.$emit('update:visible', false)
    },
    handelConfirm() {
      this.$refs.elForm.validate(valid => {
        if (!valid) return
        this.$emit('commit', this.formData)
        this.close()
      })
    }
  }
}
</script>