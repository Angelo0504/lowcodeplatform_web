<template>
  <el-dialog :visible.sync="visible" fullscreen lock-scroll class="JNPF-full-dialog"
    :show-close="false" :modal="false">
    <div class="JNPF-full-dialog-header">
      <div class="header-title">
        <img src="@/assets/images/jnpf.png" class="header-logo" />
        <p class="header-txt"> · 代码预览</p>
      </div>
      <div class="options">
        <el-button @click="closeDialog()">{{$t('common.cancelButton')}}</el-button>
      </div>
    </div>
    <div class="JNPF-common-layout main" v-loading="loading"
      :element-loading-text="$t('common.loadingText')">
      <div class="JNPF-common-layout-left">
        <el-tree :data="treeData" :props="defaultProps" default-expand-all highlight-current
          ref="treeBox" :expand-on-click-node="false" @node-click="handleNodeClick"
          class="JNPF-common-el-tree" node-key="fileName">
          <span class="custom-tree-node" slot-scope="{ node }">
            <span class="text">{{node.label}}</span>
          </span>
        </el-tree>
      </div>
      <div class="JNPF-common-layout-center">
        <div class="JNPF-common-layout-main">
          <JNPFCodeEditor v-model="currentContent" :options="options" ref="CodeEditor" />
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { CodePreview } from '@/api/onlineDev/visualDev'
import JNPFCodeEditor from '@/components/JNPFEditor/monaco'
export default {
  components: { JNPFCodeEditor },
  data() {
    return {
      loading: false,
      visible: false,
      dataForm: {
        module: 'system',
        description: '',
        subClassName: '',
        className: ''
      },
      defaultProps: {
        children: 'children',
        label: 'fileName'
      },
      treeData: [],
      options: {
        language: 'java'
      },
      currentName: '',
      currentContent: ''
    }
  },
  methods: {
    init(tables, id) {
      if (!tables || !id) {
        this.closeDialog()
        return
      }
      let tablesList = JSON.parse(tables)
      this.visible = true
      this.loading = true
      this.$nextTick(() => {
        let subClassName = []
        for (let i = 0; i < tablesList.length; i++) {
          let e = tablesList[i]
          if (e.typeId == '1') {
            this.dataForm.className = e.table
            this.dataForm.description = e.table
          } else {
            subClassName.push(e.table)
          }
        }
        this.dataForm.subClassName = subClassName.join()
        CodePreview(id, this.dataForm).then(res => {
          this.treeData = res.data.list
          this.currentName = this.treeData[0].children[0].fileName
          this.currentContent = this.treeData[0].children[0].fileContent
          this.$nextTick(() => {
            this.$refs.treeBox.setCurrentKey(this.currentName);
            this.$refs.CodeEditor.changeEditor({
              value: this.currentContent,
              options: this.options
            })
          });
          this.loading = false
        }).catch(() => {
          this.closeDialog()
          this.loading = false
        })
      })
    },
    closeDialog() {
      this.visible = false
      this.$emit('close')
    },
    handleNodeClick(data) {
      if (this.currentName == data.fileName) return
      this.options.language = data.fileType === 'vue' ? 'html' : 'java'
      this.currentName = data.fileName
      this.currentContent = data.fileContent
      this.$refs.CodeEditor.changeEditor({
        value: this.currentContent,
        options: this.options
      })
    },
  }
}
</script>
<style lang="scss" scoped>
>>> .main {
  padding: 10px;
  .JNPF-common-layout-main {
    padding: 0;
  }
}
</style>