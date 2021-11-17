<template>
  <transition name="el-zoom-in-center">
    <div class="JNPF-preview-main map-wrap">
      <div class="JNPF-common-page-header">
        <el-page-header @back="goBack" :content="!dataForm.id ? '新建地图' : '编辑地图'" />
        <div class="options">
          <el-button type="primary" :loading="btnLoading" @click="dataFormSubmit()">
            {{$t('common.confirmButton')}}</el-button>
          <el-button @click="goBack">{{$t('common.cancelButton')}}</el-button>
        </div>
      </div>
      <el-form ref="dataForm" :model="dataForm" :rules="dataRule" v-loading="formLoading"
        :element-loading-text="$t('common.loadingText')" label-width="80px">
        <el-form-item label="地图名称" prop="fullName">
          <el-input v-model="dataForm.fullName" placeholder="请输入地图名称" />
        </el-form-item>
        <el-form-item label="地图编码" prop="enCode">
          <el-input v-model="dataForm.enCode" placeholder="请输入地图编码" />
        </el-form-item>
        <el-form-item label="排序" prop="sortCode">
          <el-input-number :min="0" :max="9999" v-model="dataForm.sortCode" />
        </el-form-item>
        <el-form-item label="状态" prop="enabledMark">
          <el-switch v-model="dataForm.enabledMark" :active-value="1" :inactive-value="0" />
        </el-form-item>
        <el-form-item label="地图数据" prop="data">
          <el-input type="textarea" :rows="16" v-model="dataForm.data" />
        </el-form-item>
      </el-form>
    </div>
  </transition>
</template>

<script>
import {
  createMap,
  updateMap,
  getMapInfo
} from '@/api/onlineDev/map'

export default {
  data() {
    return {
      visible: false,
      formLoading: false,
      btnLoading: false,
      dataForm: {
        id: '',
        fullName: '',
        enCode: '',
        enabledMark: 1,
        sortCode: 0,
        data: ''
      },
      dataRule: {
        fullName: [
          {
            required: true,
            message: '地图名称不能为空',
            trigger: 'blur'
          }
        ],
        enCode: [
          {
            required: true,
            message: '地图编码不能为空',
            trigger: 'blur'
          }
        ],
        data: [
          {
            required: true,
            message: '地图数据不能为空',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    init(id) {
      this.dataForm.id = id || ''
      this.visible = true

      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        if (this.dataForm.id) {
          this.formLoading = true
          getMapInfo(this.dataForm.id).then(res => {
            this.dataForm = res.data
            this.dataForm.data = JSON.stringify(JSON.parse(this.dataForm.data), null, 4)
            this.formLoading = false
          }).catch(() => {
            this.formLoading = false
          })
        }
      })
    },
    goBack() {
      this.$emit('close')
    },
    dataFormSubmit() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.btnLoading = true
          const formMethod = this.dataForm.id ? updateMap : createMap
          formMethod(this.dataForm).then(res => {
            this.$message({
              message: res.msg,
              type: 'success',
              duration: 1500,
              onClose: () => {
                this.visible = false
                this.btnLoading = false
                this.$emit('close', true)
              }
            })
          }).catch(() => {
            this.btnLoading = false
          })
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.map-wrap {
  >>> .el-form {
    padding: 50px 100px;
  }
}
</style>
