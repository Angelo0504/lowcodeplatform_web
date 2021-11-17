<template>
  <el-dialog :title="pageTitle" :close-on-click-modal="false" :close-on-press-escape="false"
    :visible.sync="visible" lock-scroll append-to-body
    class="JNPF-dialog JNPF-dialog_center transfer-dialog" width="800px">
    <JNPFTransfer :loading="loading" :treeData="treeData" v-model="dataForm.userIds" type="user"
      ref="JNPFTransfer" />
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">{{$t('common.cancelButton')}}</el-button>
      <el-button type="primary" :loading="btnLoading" @click="dataFormSubmit()">
        {{$t('common.confirmButton')}}</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { getUserSelector } from '@/api/permission/user'
import { getUserRelationList, createUserRelation } from '@/api/permission/userRelation'
import JNPFTransfer from '@/components/JNPF-transfer'

export default {
  components: { JNPFTransfer },
  data() {
    return {
      visible: false,
      loading: false,
      btnLoading: false,
      pageTitle: '',
      dataForm: {
        objectId: '',
        objectType: '',
        userIds: []
      },
      treeData: [],
      selectedData: [],
    }
  },
  methods: {
    init(id, fullName, type) {
      this.visible = true
      this.dataForm.objectId = id
      this.dataForm.objectType = type
      this.loading = true
      this.$nextTick(() => {
        this.$refs.JNPFTransfer && (this.$refs.JNPFTransfer.filterText = '')
        if (type === 'Position') {
          this.pageTitle = this.$t(`position.postMember`) + '- ' + fullName
        } else if (type === 'Role') {
          this.pageTitle = this.$t(`role.roleMember`) + ' - ' + fullName
        }
        getUserSelector().then(res => {
          this.treeData = res.data.list
          getUserRelationList(this.dataForm.objectId).then(res => {
            this.dataForm.userIds = res.data.ids
            this.loading = false
          })
        })
      })
    },
    dataFormSubmit() {
      this.btnLoading = true
      createUserRelation(this.dataForm).then(res => {
        this.$message({
          message: res.msg,
          type: 'success',
          duration: 1500,
          onClose: () => {
            this.visible = false
            this.btnLoading = false
          }
        })
      }).catch(() => {
        this.btnLoading = false
      })
    }
  }
}
</script>