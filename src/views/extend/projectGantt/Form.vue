<template>
  <div>
    <el-dialog :title="!dataForm.id ? '新建项目' : '编辑项目'" :close-on-click-modal="false"
      :visible.sync="visible" class="JNPF-dialog JNPF-dialog_center" lock-scroll width="600px">
      <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="100px">
        <el-form-item label="项目名称" prop="fullName" maxlength="50">
          <el-input v-model="dataForm.fullName" placeholder="项目名称" />
        </el-form-item>
        <el-form-item label="项目编码" prop="enCode" maxlength="50">
          <el-input v-model="dataForm.enCode" placeholder="项目编码" />
        </el-form-item>
        <el-form-item label="参与人员" prop="managerIds">
          <JNPF-TreeSelect :options="treeData" v-model="dataForm.managerIds" placeholder="参与人员"
            multiple clearable lastLevel lastLevelKey='type' lastLevelValue='user'>
          </JNPF-TreeSelect>
        </el-form-item>
        <el-form-item label="开始日期" prop="startTime">
          <el-date-picker v-model="dataForm.startTime" type="date" placeholder="选择日期"
            value-format="timestamp" :editable="false">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束日期" prop="endTime">
          <el-date-picker v-model="dataForm.endTime" type="date" placeholder="选择日期"
            value-format="timestamp" :editable="false">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="项目工期" prop="timeLimit">
          <el-input-number v-model="dataForm.timeLimit" :step="1" :min="0"
            controls-position="right">
          </el-input-number>&nbsp;&nbsp;天
        </el-form-item>
        <el-form-item label="完成进度" prop="schedule">
          <el-input-number v-model="dataForm.schedule" :step="1" :min="0" :max="100"
            controls-position="right">
          </el-input-number>&nbsp;&nbsp;%
        </el-form-item>
        <el-form-item label="状态" prop="state">
          <el-select v-model="dataForm.state" placeholder="请选择">
            <el-option :key="1" label="进行中" :value="1"></el-option>
            <el-option :key="2" label="已暂停" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="项目描述" prop="description">
          <el-input v-model="dataForm.description" placeholder="项目描述" type="textarea" :rows="4" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false">{{$t('common.cancelButton')}}</el-button>
        <el-button type="primary" @click="dataFormSubmit()" :loading="btnLoading">
          {{$t('common.confirmButton')}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { ProjectGanttInfo, Create, Update } from '@/api/extend/projectGantt'
export default {
  data() {
    var checkStartTime = (rule, value, callback) => {
      if (!this.dataForm.endTime) {
        callback()
      } else {
        if (this.dataForm.endTime < value) {
          callback(new Error('开始日期应该小于结束日期'));
        } else {
          this.$refs.dataForm.validateField('endTime');
          callback()
        }
      }
    }
    var checkEndTime = (rule, value, callback) => {
      if (!this.dataForm.startTime) {
        callback()
      } else {
        if (this.dataForm.startTime > value) {
          callback(new Error('结束日期应该大于开始日期'));
        } else {
          callback()
        }
      }
    }
    return {
      visible: false,
      dataForm: {
        id: '',
        // parentId: '0',
        // type: 1,
        fullName: '',
        enCode: '',
        managerIds: '',
        startTime: '',
        endTime: '',
        timeLimit: 0,
        schedule: 0,
        state: 1,
        description: ''
      },
      dataRule: {
        fullName: [
          { required: true, message: '项目名称不能为空', trigger: 'blur' }
        ],
        enCode: [
          { required: true, message: '项目编码不能为空', trigger: 'blur' },
          { pattern: /^\w+$/, message: '请输入正确的项目编码', trigger: 'blur' }
        ],
        managerIds: [
          { required: true, message: '参与人员不能为空', trigger: 'click' }
        ],
        startTime: [
          { required: true, message: '开始日期不能为空', trigger: 'change' },
          { validator: checkStartTime, trigger: 'change' }
        ],
        endTime: [
          { required: true, message: '结束日期不能为空', trigger: 'change' },
          { validator: checkEndTime, trigger: 'change' }
        ],
        timeLimit: [
          { required: true, message: '项目工期不能为空', trigger: 'blur' }
        ],
        schedule: [
          { required: true, message: '完成进度不能为空', trigger: 'blur' }
        ],
      },
      treeData: [],
      props: {
        value: 'id',
        label: 'fullName',
        children: 'children',
        disabled: this.checkDisabled
      },
      btnLoading: false,
    }
  },
  methods: {
    init(id) {
      this.dataForm.id = id || ''
      this.dataForm.managerIds = ''
      this.visible = true
      this.$nextTick(async () => {
        this.$refs['dataForm'].resetFields()
        this.treeData = await this.$store.dispatch('base/getUserTree')
        if (this.dataForm.id) {
          ProjectGanttInfo(this.dataForm.id).then(res => {
            this.dataForm = res.data
          })
        }
      })
    },
    dataFormSubmit() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.btnLoading = true
          const formMethod = this.dataForm.id ? Update : Create
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
    checkDisabled(data, node) {
      let tree = node.data
      if (tree.type == 'user') {
        return false
      } else {
        let boo = true
        function findUser(tree) {
          outer: for (let i = 0; i < tree.length; i++) {
            if (tree[i].type == 'user') {
              boo = false
              break outer
            }
            if (tree[i].children && tree[i].children.length) {
              findUser(tree[i].children)
            }
          }
        }
        findUser(tree)
        return boo
      }
    }
  }
}
</script>