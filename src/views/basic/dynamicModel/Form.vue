<template>
  <div>
    <template v-if="formData.popupType==='general'">
      <el-dialog :title="!dataForm.id ? '新建' : '编辑'" :close-on-click-modal="false"
        :visible.sync="visible" class="JNPF-dialog JNPF-dialog_center" lock-scroll
        :width="formData.generalWidth">
        <parser :form-conf="formData" @submit="sumbitForm" :key="key" ref="dynamicForm"
          v-if="!loading" />
        <span slot="footer" class="dialog-footer">
          <el-button @click="visible = false">{{formData.cancelButtonText||'取 消'}}</el-button>
          <el-button type="primary" @click="dataFormSubmit()" :loading="btnLoading">
            {{formData.confirmButtonText||'确 定'}}</el-button>
        </span>
      </el-dialog>
    </template>
    <template v-if="formData.popupType==='fullScreen'">
      <transition name="el-zoom-in-center">
        <div class="JNPF-preview-main">
          <div class="JNPF-common-page-header">
            <el-page-header @back="goBack" :content="!dataForm.id ? '新建' : '编辑'" />
            <div class="options">
              <el-button type="primary" @click="dataFormSubmit()" :loading="btnLoading">
                {{formData.confirmButtonText||'确 定'}}</el-button>
              <el-button @click="goBack">{{formData.cancelButtonText||'取 消'}}</el-button>
            </div>
          </div>
          <div class="dynamic-form-main" :style="{margin: '0 auto',width:formData.fullScreenWidth}">
            <parser :form-conf="formData" @submit="sumbitForm" :key="key" ref="dynamicForm"
              v-if="!loading" />
          </div>
        </div>
      </transition>
    </template>
  </div>
</template>

<script>
import { createModel, updateModel, getModelInfo } from '@/api/onlineDev/visualDev'
import Parser from '@/components/Generator/parser/Parser'
import { deepClone } from '@/utils'
export default {
  components: { Parser },
  data() {
    return {
      visible: false,
      dataForm: {
        id: '',
        data: ''
      },
      modelId: '',
      formData: {},
      formValue: {},
      key: +new Date(),
      btnLoading: false,
      loading: true
    }
  },
  methods: {
    goBack() {
      this.$emit('refreshDataList')
    },
    init(formData, modelId, id) {
      this.formData = deepClone(formData)
      this.modelId = modelId
      this.dataForm.id = id || ''
      this.loading = true
      this.$nextTick(() => {
        if (this.dataForm.id) {
          getModelInfo(modelId, this.dataForm.id).then(res => {
            this.dataForm = res.data
            if (!this.dataForm.data) return
            this.formValue = JSON.parse(this.dataForm.data)
            this.fillFormData(this.formData, this.formValue)
            this.$nextTick(() => {
              this.visible = true
              this.loading = false
            })
          })
        } else {
          this.formValue = {}
          this.visible = true
          this.loading = false
        }
        this.key = +new Date()
      })
    },
    fillFormData(form, data) {
      const loop = list => {
        for (let i = 0; i < list.length; i++) {
          let item = list[i]
          if (item.__vModel__) {
            const val = data[item.__vModel__]
            if (val) item.__config__.defaultValue = val
          }
          if (item.__config__ && item.__config__.jnpfKey !== 'table' && item.__config__.children && Array.isArray(item.__config__.children)) {
            loop(item.__config__.children)
          }
        }
      }
      loop(form.fields)
    },
    sumbitForm(data) {
      if (!data) return
      this.btnLoading = true
      this.dataForm.data = JSON.stringify(data)
      const formMethod = this.dataForm.id ? updateModel : createModel
      formMethod(this.modelId, this.dataForm).then(res => {
        this.$message({
          message: res.msg,
          type: 'success',
          duration: 1500,
          onClose: () => {
            this.visible = false
            this.btnLoading = false
            this.$emit('refreshDataList', true)
          }
        })
      }).catch(() => { this.btnLoading = false })
    },
    dataFormSubmit() {
      this.$refs.dynamicForm && this.$refs.dynamicForm.submitForm()
    }
  }
}
</script>