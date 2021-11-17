<template>
  <transition name="el-zoom-in-center">
    <div class="JNPF-preview-main flow-form-main nohead">
      <div class="btns">
        <el-button type="primary" @click="dataFormSubmit('submit')">提交审核
        </el-button>
        <el-button type="warning" @click="dataFormSubmit('save')" :loading="btnLoading">保存草稿
        </el-button>
        <el-button @click="goBack()">{{$t('common.cancelButton')}}</el-button>
      </div>
      <el-tabs class="JNPF-el_tabs" v-model="activeTab">
        <el-tab-pane label="表单信息">
          <component :is="currentView" @close="goBack" ref="form" @setLoad="setLoad" />
        </el-tab-pane>
        <el-tab-pane label="流程信息">
          <Process :conf="flowTemplateJson" v-if="flowTemplateJson.nodeId" />
        </el-tab-pane>
      </el-tabs>
    </div>
  </transition>
</template>

<script>
import { FlowEngineInfo } from '@/api/workFlow/FlowEngine'
import Process from '@/components/Process/Preview'
export default {
  components: { Process },
  data() {
    return {
      currentView: '',
      setting: {},
      flowTemplateJson: {},
      activeTab: '0',
      btnLoading: false
    }
  },
  methods: {
    goBack(isRefresh) {
      this.$emit('close', isRefresh)
    },
    init(data) {
      this.activeTab = '0'
      if (data.formType == 1) {
        this.currentView = (resolve) => require([`@/views/workFlow/workFlowForm/${data.enCode}`], resolve)
      } else {
        this.currentView = (resolve) => require([`@/views/workFlow/workFlowForm/dynamicForm`], resolve)
      }
      this.setting = data
      this.getInfo(data)
    },
    getInfo(data) {
      FlowEngineInfo(data.flowId).then(res => {
        data.freeApprover = res.data.freeApprover || 0
        data.formConf = res.data.formData
        this.flowTemplateJson = res.data.flowTemplateJson ? JSON.parse(res.data.flowTemplateJson) : null
        this.flowTemplateJson.state = 'state-curr'
        data.formOperates = []
        if (this.flowTemplateJson && this.flowTemplateJson.properties && this.flowTemplateJson.properties.formOperates) {
          data.formOperates = this.flowTemplateJson.properties.formOperates || []
        }
        setTimeout(() => {
          this.$nextTick(() => {
            this.$refs.form && this.$refs.form.init(data)
          })
        }, 100)
      })
    },
    dataFormSubmit(eventType) {
      this.$refs.form && this.$refs.form.dataFormSubmit(eventType)
    },
    setLoad(val) {
      this.btnLoading = !!val
    }
  }
}
</script>