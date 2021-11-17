<template>
  <transition name="el-zoom-in-center">
    <div class="JNPF-preview-main">
      <div class="JNPF-common-page-header">
        <el-page-header @back="goBack" content="查看缓存" />
        <div class="options">
          <el-button @click="goBack()">{{$t('common.cancelButton')}}</el-button>
        </div>
      </div>
      <el-form ref="dataForm" :model="dataForm" label-width="100px" class="main">
        <el-form-item label="STRING" prop="name">
          <el-input v-model="dataForm.name" placeholder="STRING" />
        </el-form-item>
        <el-form-item label="VALUE" prop="value">
          <el-input v-model="dataForm.value" placeholder="VALUE" type="textarea" :rows="30" />
        </el-form-item>
      </el-form>
    </div>
  </transition>
</template>

<script>
import { CacheManageInfo } from '@/api/system/cacheManage'

export default {
  data() {
    return {
      visible: false,
      dataForm: {
        name: '',
        value: '',
      }
    }
  },
  methods: {
    init(id) {
      this.dataForm.name = id || ''
      this.visible = true
      this.$nextTick(() => {
        if (this.dataForm.name) {
          CacheManageInfo(this.dataForm.name).then(res => {
            this.dataForm = res.data
          }).catch(() => {
            this.visible = false
          })
        }
      })
    },
    goBack() {
      this.$emit('close')
    }
  }
}
</script>