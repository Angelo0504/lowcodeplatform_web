<template>
  <el-dialog :title="!dataForm.id ? '新建按钮' : '编辑按钮'" :close-on-click-modal="false"
    :close-on-press-escape="false" :visible.sync="visible" lock-scroll
    class="JNPF-dialog JNPF-dialog_center" width="600px">
    <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="80px"
      v-loading="formLoading" class="menuForm">
      <el-form-item label="上级" prop="parentId">
        <JNPF-TreeSelect v-model="dataForm.parentId" :options="treeData" placeholder="选择上级菜单" />
      </el-form-item>
      <el-form-item label="名称" prop="fullName">
        <el-input v-model="dataForm.fullName" placeholder="输入名称" />
      </el-form-item>
      <el-form-item label="编码" prop="enCode">
        <el-input v-model="dataForm.enCode" placeholder="输入编码" />
      </el-form-item>
      <!-- <el-form-item label="图标" prop="icon">
        <el-input v-model="dataForm.icon" placeholder="请选择图标" readonly :suffix-icon="dataForm.icon">
          <el-button slot="append" @click="openIconBox">选择</el-button>
        </el-input>
      </el-form-item> -->
      <el-form-item label="排序" prop="sortCode">
        <el-input-number :min="0" :max="9999" v-model="dataForm.sortCode" />
      </el-form-item>
      <el-form-item label="状态" prop="enabledMark">
        <el-switch v-model="dataForm.enabledMark" :active-value="1" :inactive-value="0" />
      </el-form-item>
      <el-form-item label="说明" prop="description">
        <el-input v-model="dataForm.description" type="textarea" :rows="6" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">{{$t('common.cancelButton')}}</el-button>
      <el-button type="primary" :loading="btnLoading" @click="dataFormSubmit()">
        {{$t('common.confirmButton')}}</el-button>
    </span>
    <icon-box :visible.sync="iconBoxVisible" ref="iconBox" :current="dataForm.icon"
      @choiceIcon="choiceIcon" />
  </el-dialog>
</template>

<script>
import {
  getButtonAuthorizeSelector,
  createButton,
  updateButton,
  getButtonInfo
} from '@/api/system/buttonAuthorize'
import iconBox from '@/components/JNPF-iconBox'

export default {
  components: { iconBox },
  data() {
    return {
      visible: false,
      formLoading: false,
      btnLoading: false,
      treeData: [],
      moduleId: '',
      dataForm: {
        id: '',
        parentId: '',
        fullName: '',
        enCode: '',
        sortCode: 0,
        icon: '',
        enabledMark: 1,
        description: ''
      },
      iconBoxVisible: false,
      dataRule: {
        parentId: [
          { required: true, message: '上级不能为空', trigger: 'input' }
        ],
        fullName: [
          { required: true, message: '按钮名称不能为空', trigger: 'blur' }
        ],
        enCode: [
          { required: true, message: '按钮编码不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    init(moduleId, id) {
      this.dataForm.id = id || ''
      this.dataForm.moduleId = moduleId
      this.visible = true
      this.formLoading = true
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        // 获取上级按钮
        getButtonAuthorizeSelector(this.dataForm.moduleId).then(res => {
          let topItem = {
            fullName: "顶级节点",
            hasChildren: true,
            id: "-1",
            children: res.data.list
          }
          this.treeData = [topItem]
        })

        // 获取按钮数据
        if (this.dataForm.id) {
          getButtonInfo(this.dataForm.id).then(res => {
            this.dataForm = res.data
          })
        }
        this.formLoading = false
      })
    },
    dataFormSubmit() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.btnLoading = true
          const formMethod = this.dataForm.id ? updateButton : createButton
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
          }).catch(() => {
            this.btnLoading = false
          })
        }
      })
    },
    openIconBox() {
      this.iconBoxVisible = true
    },
    choiceIcon(value) {
      this.dataForm.icon = value
    }
  }
}
</script>
