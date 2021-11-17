<template>
  <el-dialog :title="!dataForm.id ? '新建连接' : '编辑连接'" :close-on-click-modal="false"
    :visible.sync="visible" class="JNPF-dialog JNPF-dialog_center" lock-scroll width="600px">
    <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="100px">
      <el-form-item label="连接驱动" prop="dbType">
        <el-select v-model="dataForm.dbType" placeholder="请选择" :disabled='!!dataForm.id' clearable
          @change='handleChange'>
          <el-option v-for="item in options" :key="item.value" :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="连接名称" prop="fullName">
        <el-input v-model="dataForm.fullName" placeholder="连接名称" maxlength="50" />
      </el-form-item>
      <el-form-item label="主机地址" prop="host">
        <el-input v-model="dataForm.host" placeholder="主机地址" />
      </el-form-item>
      <el-form-item label="端口" prop="port">
        <el-input v-model.number="dataForm.port" placeholder="端口" />
      </el-form-item>
      <el-form-item label="用户" prop="userName">
        <el-input v-model="dataForm.userName" placeholder="用户" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="dataForm.password" placeholder="密码" />
      </el-form-item>
      <el-form-item label="库名" prop="serviceName">
        <el-input v-model="dataForm.serviceName" placeholder="库名">
          <el-button slot="append" @click="test" :loading="testLoad">测试连接</el-button>
        </el-input>
      </el-form-item>
      <el-form-item label="排序" prop="sortCode">
        <el-input-number :min="0" :max="9999" v-model="dataForm.sortCode" />
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
import { DataSourceInfo, DataSourceUpdate, DataSourceCreate, TestDbConnection } from '@/api/systemData/dataSource'
export default {
  data() {
    return {
      visible: false,
      dataForm: {
        dbType: '',
        id: 0,
        fullName: '',
        host: '',
        port: '',
        userName: '',
        password: '',
        serviceName: '',
        sortCode: 0,
        enabledMark: 1
      },
      dataRule: {
        dbType: [
          { required: true, message: '连接驱动不能为空', trigger: 'change' }
        ],
        fullName: [
          { required: true, message: '应用名称不能为空', trigger: 'blur' }
        ],
        host: [
          { required: true, message: '主机地址不能为空', trigger: 'blur' },
        ],
        port: [
          { required: true, message: '端口不能为空', trigger: 'blur' },
          { pattern: /^([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/, message: '请输入正确的端口号', trigger: 'blur' }
        ],
        userName: [
          { required: true, message: '用户不能为空', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ],
        serviceName: [
          { required: true, message: '库名不能为空', trigger: 'blur' }
        ],
      },
      options: [{
        value: 'SqlServer',
        label: 'SqlServer'
      }, {
        value: 'MySql',
        label: 'MySql'
      }, {
        value: 'Oracle',
        label: 'Oracle'
      }],
      btnLoading: false,
      testLoad: false
    }
  },
  methods: {
    init(id) {
      this.dataForm.id = id || 0
      this.visible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        if (this.dataForm.id) {
          DataSourceInfo(this.dataForm.id).then(res => {
            this.dataForm = res.data
          })
        }
      })
    },
    dataFormSubmit() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.btnLoading = true
          const formMethod = this.dataForm.id ? DataSourceUpdate : DataSourceCreate
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
    handleChange(val) {
      let port = ''
      switch (val) {
        case 'SqlServer':
          port = '1433'
          break;
        case 'MySql':
          port = '3306'
          break;
        case 'Oracle':
          port = '1521'
          break;
        default:
          port = ''
          break;
      }
      this.dataForm.port = port
    },
    test() {
      this.testLoad = true
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          TestDbConnection(this.dataForm).then(res => {
            if (res.code == 200) {
              this.$message({
                message: res.msg,
                type: 'success',
                duration: 1500
              })
            } else {
              this.$message({
                message: res.msg,
                type: 'error',
                duration: 1500
              })
            }
            this.testLoad = false
          }).catch(() => {
            this.testLoad = false
          })
        }
      })
    }
  }
}
</script>
