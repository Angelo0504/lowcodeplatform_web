<template>
  <el-dialog :title="!isEdit ? '新增明细频率' : '修改明细频率'" :close-on-click-modal="false"
    :visible.sync="visible" class="JNPF-dialog JNPF-dialog_center" lock-scroll append-to-body
    width="600px">
    <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="100px"
      @submit.native.prevent>
      <el-form-item label="执行小时" prop="hours">
        <el-input v-model.number="dataForm.hours" placeholder="执行小时">
        </el-input>
      </el-form-item>
      <el-form-item label="执行分钟" prop="minute">
        <el-input v-model.number="dataForm.minute" placeholder="执行分钟">
        </el-input>
      </el-form-item>
      <el-form-item label="执行日" prop="type">
        <el-select v-model="dataForm.type" placeholder="请选择" @change="typeChange">
          <el-option label="每日" value="1"></el-option>
          <el-option label="每周" value="2"></el-option>
          <el-option label="每月" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="每周" prop="week" v-if="dataForm.type=='2'">
        <el-select v-model="dataForm.week" multiple placeholder="请选择">
          <el-option v-for="item in weekOptions" :key="item.id" :label="item.text" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="每月" prop="day" v-if="dataForm.type=='3'">
        <el-select v-model="dataForm.day" multiple placeholder="请选择">
          <el-option v-for="item in dayOptions" :key="item.id" :label="item.text" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="执行月" prop="month">
        <el-select v-model="dataForm.month" multiple placeholder="请选择">
          <el-option v-for="item in monthOptions" :key="item.id" :label="item.text"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">{{$t('common.cancelButton')}}</el-button>
      <el-button type="primary" @click="dataFormSubmit()">{{$t('common.confirmButton')}}</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      dataForm: {
        minute: '',
        hours: '',
        month: [],
        type: '1',
        day: [],
        week: []
      },
      dataRule: {
        hours: [
          { required: true, message: '执行小时不能为空', trigger: 'blur' },
          { pattern: /^(2[0-3]|[0-1]?\d)$/, message: '请输入0-23的有效正整数', type: 'number' }
        ],
        minute: [
          { required: true, message: '执行分钟不能为空', trigger: 'blur' },
          { pattern: /^(?:[1-5]?\d)$/, message: '请输入0-59的有效正整数', type: 'number' }
        ],
        week: [
          { type: 'array', required: true, message: '每周不能为空', trigger: 'change' }
        ],
        day: [
          { type: 'array', required: true, message: '每月不能为空', trigger: 'change' }
        ],
        month: [
          { type: 'array', required: true, message: '每月不能为空', trigger: 'change' }
        ],
      },
      formVisible: false,
      isEdit: false,
      weekOptions: [{ id: "1", text: "周一" }, { id: "2", text: "周二" }, { id: "3", text: "周三" }, { id: "4", text: "周四" }, { id: "5", text: "周五" }, { id: "6", text: "周六" }, { id: "7", text: "周日" }],
      monthOptions: [{ id: "1", text: "一月" }, { id: "2", text: "二月" }, { id: "3", text: "三月" }, { id: "4", text: "四月" }, { id: "5", text: "五月" }, { id: "6", text: "六月" }, { id: "7", text: "七月" }, { id: "8", text: "八月" }, { id: "9", text: "九月" }, { id: "10", text: "十月" }, { id: "11", text: "十一月" }, { id: "12", text: "十二月" }],
      dayOptions: [{ id: "1", text: "1号" }, { id: "2", text: "2号" }, { id: "3", text: "3号" }, { id: "4", text: "4号" }, { id: "5", text: "5号" }, { id: "6", text: "6号" }, { id: "7", text: "7号" }, { id: "8", text: "8号" }, { id: "9", text: "9号" }, { id: "10", text: "10号" }, { id: "11", text: "11号" }, { id: "12", text: "12号" }, { id: "13", text: "13号" }, { id: "14", text: "14号" }, { id: "15", text: "15号" }, { id: "16", text: "16号" }, { id: "17", text: "17号" }, { id: "18", text: "18号" }, { id: "19", text: "19号" }, { id: "20", text: "20号" }, { id: "21", text: "21号" }, { id: "22", text: "22号" }, { id: "23", text: "23号" }, { id: "24", text: "24号" }, { id: "25", text: "25号" }, { id: "26", text: "26号" }, { id: "27", text: "27号" }, { id: "28", text: "28号" }, { id: "29", text: "29号" }, { id: "30", text: "30号" }, { id: "31", text: "31号" }],
    }
  },
  methods: {
    init(item) {
      this.visible = true
      this.isEdit = item ? true : false
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        if (item) {
          this.dataForm = {
            minute: item.minute,
            hours: item.hours,
            month: item.month.split(','),
            type: item.type,
            day: item.day.split(','),
            week: item.week.split(',')
          }
        }
      })
    },
    dataFormSubmit() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          let item = {
            minute: this.dataForm.minute,
            hours: this.dataForm.hours,
            month: this.dataForm.month.sort(this.compare).join(','),
            type: this.dataForm.type,
            day: this.dataForm.day.sort(this.compare).join(','),
            week: this.dataForm.week.sort(this.compare).join(',')
          }
          this.visible = false
          this.$emit('refreshList', item)
        }
      })
    },
    typeChange() {
      this.dataForm.day = []
      this.dataForm.week = []
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    compare(val1, val2) {
      return val1 - val2;
    }
  }
}
</script>