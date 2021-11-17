<template>
  <el-dialog title="批量新增字段" :close-on-click-modal="false" :close-on-press-escape="false"
    :visible.sync="visible" lock-scroll class="JNPF-dialog JNPF-dialog_center" width="600px">
    <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="80px"
      label-position="top" v-loading="formLoading">
      <!--      <el-form-item label="绑定表格" prop="bindTable">-->
      <!--        <el-input v-model="dataForm.bindTable" placeholder="输入绑定表格" />-->
      <!--      </el-form-item>-->
      <!--      <el-form-item label="表格描述" prop="bindTableName">-->
      <!--        <el-input v-model="dataForm.bindTableName" placeholder="绑定表格描述" />-->
      <!--      </el-form-item>-->
      <el-form-item label="字段Json" prop="columnJson">
        <div class="formCodeEditor">
          <JNPFCodeEditor :options="options" v-model="content" />
        </div>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">{{$t('common.cancelButton')}}</el-button>
      <el-button type="primary" :loading="btnLoading" @click="dataFormSubmit()">
        {{$t('common.confirmButton')}}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { batchCreateColumn } from '@/api/system/columnAuthorize'
import JNPFCodeEditor from '@/components/JNPFEditor/monaco'

export default {
  components: { JNPFCodeEditor },
  data() {
    return {
      options: {
        readOnly: false,
        language: 'json'
      },
      visible: false,
      formLoading: false,
      btnLoading: false,
      content: '',
      dataForm: {
        moduleId: '',
        bindTable: '',
        bindTableName: '',
        columnJson: []
      },
      dataRule: {}
    }
  },
  methods: {
    init(moduleId) {
      this.dataForm.moduleId = moduleId
      this.visible = true
      this.formLoading = true
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        this.formLoading = false
      })
    },
    dataFormSubmit() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const rtnData = this.content
          const fixedRtnData = rtnData.replace(/("\w+":)(?=[},])/g, '$1null')
          const jsonData = JSON.parse(fixedRtnData)
          this.dataForm.columnJson = jsonData
          this.btnLoading = true
          batchCreateColumn(this.dataForm).then(res => {
            this.$message({
              message: res.msg,
              type: 'success',
              duration: 1500,
              onClose: () => {
                this.visible = false
                this.btnLoading = false
                this.content = ''
                this.$emit('refreshDataList')
              }
            })
          }).catch(() => { this.btnLoading = false })
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.formCodeEditor {
  width: 100%;
  height: 260px;
  margin: 0;
  padding: 0;
  border: 1px solid #c0c4cc;
  overflow: hidden;
}
</style>