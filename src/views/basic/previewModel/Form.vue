<template>
  <div>
    <template v-if="formData.popupType==='general'">
      <el-dialog :title="!dataForm.id ? '新建' : isDetail? '详情':'编辑'" :close-on-click-modal="false"
        :visible.sync="visible" class="JNPF-dialog JNPF-dialog_center" lock-scroll width="600px">
        <parser :form-conf="formData" :key="key" ref="dynamicForm" v-if="!loading" />
        <span slot="footer" class="dialog-footer">
          <el-button @click="visible = false">{{formData.cancelButtonText||'取 消'}}</el-button>
          <el-button type="primary" @click="handleComfirm">{{formData.confirmButtonText||'确 定'}}
          </el-button>
        </span>
      </el-dialog>
    </template>
    <template v-else>
      <transition name="el-zoom-in-center">
        <div class="JNPF-preview-main">
          <div class="JNPF-common-page-header">
            <el-page-header @back="goBack" :content="!dataForm.id ? '新建' : isDetail? '详情':'编辑'" />
            <div class="options">
              <el-button type="primary" @click="handleComfirm">{{formData.confirmButtonText||'确 定'}}
              </el-button>
              <el-button @click="goBack">{{formData.cancelButtonText||'取 消'}}</el-button>
            </div>
          </div>
          <div class="dynamic-form-main">
            <parser :form-conf="formData" :key="key" ref="dynamicForm" v-if="!loading" />
          </div>
        </div>
      </transition>
    </template>
  </div>
</template>

<script>
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
      loading: true
    }
  },
  methods: {
    goBack() {
      this.$emit('refreshDataList')
    },
    handleComfirm() {
      this.$message({ message: '功能预览不支持数据保存', type: 'warning' })
    },
    init(formData) {
      this.formData = deepClone(formData)
      this.visible = true
      this.loading = true
      this.$nextTick(() => {
        this.key = +new Date()
        this.loading = false
      })
    }
  }
}
</script>