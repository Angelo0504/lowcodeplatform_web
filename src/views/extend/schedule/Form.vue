<template>
  <el-dialog :title="!dataForm.id ? '添加日程' : '编辑日程'" :close-on-click-modal="false"
    :visible.sync="visible" class="JNPF-dialog JNPF-dialog_center" lock-scroll width="600px">
    <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="100px">
      <el-form-item label="起始时间" prop="startTime">
        <el-date-picker v-model="dataForm.startTime" type="datetime" placeholder="选择日期时间"
          :editable="false" :clearable="false" format="yyyy-MM-dd HH:mm" value-format="timestamp">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="结束时间" prop="endTime">
        <el-date-picker v-model="dataForm.endTime" type="datetime" placeholder="选择日期时间"
          :editable="false" :clearable="false" format="yyyy-MM-dd HH:mm" value-format="timestamp">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="记录内容" prop="content">
        <el-input v-model="dataForm.content" placeholder="记录你将要做的一件事..." type="textarea"
          :rows="3" />
      </el-form-item>
      <el-form-item label="提醒设置">
        <el-input-number v-model="dataForm.early" placeholder="默认1小时" controls-position="right" />
      </el-form-item>
      <el-form-item label="提醒方式">
        <el-checkbox v-model="appAlert">APP提醒</el-checkbox>
        <el-checkbox v-model="weChatAlert">微信提醒</el-checkbox>
        <el-checkbox v-model="mailAlert">邮件提醒</el-checkbox>
        <el-checkbox v-model="mobileAlert">短信提醒</el-checkbox>
      </el-form-item>
      <el-form-item label="标签颜色">
        <el-color-picker v-model="dataForm.colour"
          :predefine="['#188ae2', '#35b8e0', '#26bf8c','#f9c851','#ff5b5b', '#5b69bc', '#ff8acc', '#3b3e47','#282828' ]" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="danger" @click="handleDel()" v-if="dataForm.id">删 除</el-button>
      <el-button @click="visible = false">{{$t('common.cancelButton')}}</el-button>
      <el-button type="primary" @click="dataFormSubmit()" :loading="btnLoading">
        {{$t('common.confirmButton')}}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { ScheduleInfo, ScheduleUpdate, ScheduleCreate, ScheduleDelete } from '@/api/extend/schedule'
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('结束时间不能为空'));
      } else {
        if (this.dataForm.startTime >= value) {
          callback(new Error('结束时间应大于起始时间'));
        }
        callback();
      }
    };
    return {
      visible: false,
      btnLoading: false,
      dataForm: {
        id: 0,
        startTime: '',
        endTime: '',
        content: '',
        early: 1,
        appAlert: 0,
        weChatAlert: 0,
        mailAlert: 0,
        mobileAlert: 0,
        colour: '#188ae2'
      },
      appAlert: false,
      weChatAlert: false,
      mailAlert: false,
      mobileAlert: false,
      dataRule: {
        startTime: [
          { required: true, message: '起始时间不能为空', trigger: 'change' }
        ],
        endTime: [
          { required: true, validator: validatePass, trigger: 'change' }
        ],
        content: [
          { required: true, message: '记录内容不能为空', trigger: 'blur' }
        ],
      }
    }
  },
  methods: {
    init(id, startTime) {
      this.dataForm.id = id || 0
      this.visible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        if (this.dataForm.id) {
          ScheduleInfo(this.dataForm.id).then(res => {
            this.dataForm = res.data
            this.appAlert = this.dataForm.appAlert ? true : false
            this.mailAlert = this.dataForm.mailAlert ? true : false
            this.weChatAlert = this.dataForm.weChatAlert ? true : false
            this.mobileAlert = this.dataForm.mobileAlert ? true : false
          })
        } else {
          this.dataForm.startTime = startTime || ''
        }
      })
    },
    dataFormSubmit() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.btnLoading = true
          this.dataForm.appAlert = this.appAlert ? 1 : 0
          this.dataForm.mailAlert = this.mailAlert ? 1 : 0
          this.dataForm.weChatAlert = this.weChatAlert ? 1 : 0
          this.dataForm.mobileAlert = this.mobileAlert ? 1 : 0
          const formMethod = this.dataForm.id ? ScheduleUpdate : ScheduleCreate
          if (!this.dataForm.id) delete (this.dataForm.id)
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
    handleDel() {
      this.$confirm('您确定要删除当前日程吗, 是否继续?', '提示', {
        type: 'warning'
      }).then(() => {
        ScheduleDelete(this.dataForm.id).then(res => {
          this.$message({
            message: res.msg,
            type: 'success',
            duration: 1500,
          })
          this.visible = false
          this.$emit('refreshDataList')
        })
      }).catch(() => { });
    },
  }
}
</script>