<template>
  <el-dialog :title="!dataForm.id ? '新建菜单' : '编辑菜单'" :close-on-click-modal="false"
    :visible.sync="visible" class="JNPF-dialog JNPF-dialog_center" lock-scroll width="600px">
    <el-alert title="注意：自定义菜单最多包括3个一级菜单，每个一级菜单最多包含5个二级菜单" type="warning" :closable="false"
      class="mb-10" />
    <el-form ref="dataForm" label-width="100px" :model="dataForm" :rules="dataRule" class="mt-10">
      <el-form-item label="上级菜单" prop="parentId">
        <el-select v-model="dataForm.parentId" placeholder="请选择上级">
          <el-option v-for="item in options" :key="item.id" :label="item.fullName" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="菜单名称" prop="fullName">
        <el-input v-model="dataForm.fullName" placeholder="菜单名称" />
      </el-form-item>
      <el-form-item label="菜单类型" prop="type">
        <el-radio-group v-model="dataForm.type">
          <el-radio label="click">文本</el-radio>
          <el-radio label="view">页面</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="文字内容" v-if="dataForm.type=='click'" prop="content">
        <el-input v-model="dataForm.content" placeholder="输入内容" type="textarea" :rows="3" />
      </el-form-item>
      <el-form-item label="页面地址" v-if="dataForm.type=='view'" prop="url">
        <el-input v-model="dataForm.url" placeholder="页面地址" />
      </el-form-item>
      <el-form-item label="排序">
        <el-input-number v-model="dataForm.sortCode" :min="0" :max="9999" label="排序">
        </el-input-number>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">{{$t('common.cancelButton')}}</el-button>
      <el-button type="primary" @click="dataFormSubmit()" :loading="btnLoading">
        {{$t('common.confirmButton')}}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { MPMenuListAll, getMPMenuInfo, MPMenuUpdate, MPMenuCreate } from '@/api/weChat/MPMenu'
export default {
  data() {
    return {
      visible: false,
      btnLoading: false,
      dataForm: {
        id: '',
        parentId: '',
        fullName: '',
        type: "click",
        content: '',
        url: '',
        sortCode: 0
      },
      dataRule: {
        parentId: [
          { required: true, message: '上级不能为空', trigger: 'change' }
        ],
        fullName: [
          { required: true, message: '名称不能为空', trigger: 'blur' }
        ],
      },
      options: [],
    }
  },
  methods: {
    init(id) {
      this.dataForm.id = id || ''
      this.visible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        let defaultItem = {
          id: '0',
          fullName: '顶级节点'
        }
        MPMenuListAll().then(res => {
          let list = res.data.list.filter(v => v.parentId == "0")
          this.options = [defaultItem, ...list]
        })
        if (this.dataForm.id) {
          getMPMenuInfo(this.dataForm.id).then(res => {
            this.dataForm = res.data
          })
        }
      })
    },
    dataFormSubmit() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.btnLoading = true
          const formMethod = this.dataForm.id ? MPMenuUpdate : MPMenuCreate
          formMethod(this.dataForm).then(res => {
            this.$message({
              message: res.msg,
              type: 'success',
              duration: 1500,
              onClose: () => {
                this.visible = false
                this.btnLoading = false
                this.$emit('refreshDataList')
              }
            })
          }).catch(() => { this.btnLoading = false })
        }
      })
    },
  }
}
</script>