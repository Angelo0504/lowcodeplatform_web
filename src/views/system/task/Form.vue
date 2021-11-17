<template>
  <transition name="el-zoom-in-center">
    <div class="JNPF-preview-main flow-form-main">
      <div class="JNPF-common-page-header">
        <el-page-header @back="goBack" content="" />
        <el-steps :active="activeStep" finish-status="success" simple class="steps">
          <el-step title="基础信息" @click.native="stepChick(0)"></el-step>
          <el-step title="任务配置" @click.native="stepChick(1)"></el-step>
        </el-steps>
        <div class="options">
          <el-button @click="prve" :disabled="activeStep<=0">{{$t('common.prev')}}</el-button>
          <el-button @click="next" :disabled="activeStep>=1">{{$t('common.next')}}</el-button>
          <el-button type="primary" @click="dataFormSubmit()" :disabled="activeStep!=1"
            :loading="btnLoading">{{$t('common.confirmButton')}}</el-button>
          <el-button @click="goBack()">{{$t('common.cancelButton')}}</el-button>
        </div>
      </div>
      <el-row>
        <el-col :span="14" :offset="5">
          <el-form :model="dataForm" :rules="dataRule" ref="dataForm" class="mt-20"
            label-width="100px" @submit.native.prevent>
            <template v-if="!activeStep">
              <el-col :span="24">
                <el-form-item label="任务名称" prop="fullName">
                  <el-input v-model="dataForm.fullName" placeholder="任务名称" maxlength="100">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="任务编码" prop="enCode">
                  <el-input v-model="dataForm.enCode" placeholder="任务编码"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="开始时间" prop="executeContent.start">
                  <el-radio-group v-model="dataForm.executeContent.start">
                    <!-- @change="() => dataForm.executeContent.startTime=null" -->
                    <el-radio label="1">立即执行</el-radio>
                    <el-radio label="2">设置开始时间</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="24" v-if="dataForm.executeContent.start=='2'">
                <el-form-item label="开始时间" prop="executeContent.startTime">
                  <el-date-picker v-model="dataForm.executeContent.startTime" type="datetime"
                    value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择开始时间">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="执行频率" prop="executeContent.frequency">
                  <el-radio-group v-model="dataForm.executeContent.frequency">
                    <el-radio label="1">执行一次</el-radio>
                    <el-radio label="2">重复执行</el-radio>
                    <el-radio label="3">调度明细</el-radio>
                    <el-radio label="4">调度任务</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <template v-if="dataForm.executeContent.frequency=='2'">
                <el-col :span="12">
                  <el-form-item label="秒" prop="executeContent.seconds">
                    <el-input v-model.number="dataForm.executeContent.seconds" placeholder="不写默认*">
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="分" prop="executeContent.minute">
                    <el-input v-model.number="dataForm.executeContent.minute" placeholder="不写默认*">
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="小时" prop="executeContent.hours">
                    <el-input v-model.number="dataForm.executeContent.hours" placeholder="不写默认*">
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="月" prop="executeContent.month">
                    <el-input v-model.number="dataForm.executeContent.month" placeholder="不写默认*">
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="选择" prop="executeContent.type">
                    <el-radio-group v-model="dataForm.executeContent.type">
                      <!-- @change="() => dataForm.executeContent.day=null;dataForm.executeContent.week=null" -->
                      <el-radio label="1">天</el-radio>
                      <el-radio label="2">周</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
                <el-col :span="12" v-if="dataForm.executeContent.type=='1'">
                  <el-form-item label="日" prop="executeContent.day">
                    <el-input v-model.number="dataForm.executeContent.day" placeholder="不写默认*">
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12" v-if="dataForm.executeContent.type=='2'">
                  <el-form-item label="周" prop="executeContent.week">
                    <el-input v-model.number="dataForm.executeContent.week" placeholder="不写默认*">
                    </el-input>
                  </el-form-item>
                </el-col>
              </template>
              <el-col :span="24" v-if="dataForm.executeContent.frequency=='3'">
                <el-form-item>
                  <el-button icon="el-icon-plus" @click="addorEditFrequency()">新增调度明细
                  </el-button>
                  <template v-for="(item,i) in dataForm.executeContent.frequencyList">
                    <el-input
                      :value="'每' + item.month + '月的每天' + item.hours + '时' + item.minute + '分执行'"
                      class="mt-10" :key="i" v-if="item.type=='1'" readonly>
                      <el-button type="primary" slot="append" @click="addorEditFrequency(item)">编辑
                      </el-button>
                      <el-button type="danger" slot="append" @click="delFrequency(i)">删除</el-button>
                    </el-input>
                    <el-input
                      :value="'每' + item.month + '月的每周' + item.week + '天' + item.hours + '时' + item.minute + '分执行'"
                      class="mt-10" :key="i" v-if="item.type=='2'" readonly>
                      <el-button type="primary" slot="append" @click="addorEditFrequency(item)">编辑
                      </el-button>
                      <el-button type="danger" slot="append" @click="delFrequency(i)">删除</el-button>
                    </el-input>
                    <el-input
                      :value="'每' + item.month + '月的每月' + item.day + '号' + item.hours + '时' + item.minute + '分执行'"
                      class="mt-10" :key="i" v-if="item.type=='3'" readonly>
                      <el-button type="primary" slot="append" @click="addorEditFrequency(item)">编辑
                      </el-button>
                      <el-button type="danger" slot="append" @click="delFrequency(i)">删除</el-button>
                    </el-input>
                  </template>
                </el-form-item>
              </el-col>
              <el-col :span="24" v-if="dataForm.executeContent.frequency=='4'">
                <el-form-item label="调度任务" prop="executeContent.cron">
                  <el-select v-model="dataForm.executeContent.cron" placeholder="请选择表达式">
                    <el-option v-for="item in cronOptions" :key="item.value" :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="结束时间" prop="executeContent.end">
                  <el-radio-group v-model="dataForm.executeContent.end">
                    <!-- @change="() => dataForm.executeContent.endTime=null" -->
                    <el-radio label="1">无限制</el-radio>
                    <el-radio label="2">设置结束时间</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="24" v-if="dataForm.executeContent.end=='2'">
                <el-form-item label="结束时间" prop="executeContent.endTime">
                  <el-date-picker v-model="dataForm.executeContent.endTime" type="datetime"
                    value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择结束时间">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="任务重启" prop="executeContent.restart">
                  <el-checkbox v-model="dataForm.executeContent.restart">任务中断按以下频率重新启动</el-checkbox>
                </el-form-item>
              </el-col>
              <template v-if="dataForm.executeContent.restart">
                <el-col :span="24">
                  <el-form-item label="间隔时间" prop="executeContent.restartFrequency">
                    <el-input v-model.number="dataForm.executeContent.restartFrequency"
                      placeholder="间隔时间">
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="重启次数" prop="executeContent.restartTime">
                    <el-input v-model.number="dataForm.executeContent.restartTime"
                      placeholder="重启次数">
                    </el-input>
                  </el-form-item>
                </el-col>
              </template>
            </template>
            <template v-else>
              <el-col :span="24">
                <el-form-item label="任务类型" prop="executeType">
                  <el-radio-group v-model="dataForm.executeType">
                    <el-radio label="1">请求接口</el-radio>
                    <el-radio label="2">存储过程</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <template v-if="dataForm.executeType=='1'">
                <el-col :span="24">
                  <el-form-item label="请求类型" prop="executeContent.interfaceType">
                    <el-radio-group v-model="dataForm.executeContent.interfaceType">
                      <el-radio label="GET">Get</el-radio>
                      <el-radio label="POST">Post</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="请求路径" prop="executeContent.interfaceUrl">
                    <el-input v-model="dataForm.executeContent.interfaceUrl" placeholder="请求路径">
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="请求参数" prop="executeContent.parameter">
                    <el-button icon="el-icon-plus" @click="addParameter()">新增参数
                    </el-button>
                    <el-row v-for="(item,i) in dataForm.executeContent.parameter" :key="i"
                      class="mt-10">
                      <el-col :span="10">
                        <el-input v-model="item.key" placeholder="请求参数名称"></el-input>
                      </el-col>
                      <el-col :span="10" :offset="1">
                        <el-input v-model="item.value" placeholder="请求参数值"></el-input>
                      </el-col>
                      <el-col :span="2" :offset="1">
                        <el-button type="danger" icon="el-icon-close" @click="delParameter(i)">
                        </el-button>
                      </el-col>
                    </el-row>
                  </el-form-item>
                </el-col>
              </template>
              <template v-if="dataForm.executeType=='2'">
                <el-col :span="24">
                  <el-form-item label="数据连接" prop="executeContent.database">
                    <el-select v-model="dataForm.executeContent.database" placeholder="请选择数据库">
                      <el-option-group v-for="group in dbOptions" :key="group.label"
                        :label="group.label">
                        <el-option v-for="item in group.children" :key="item.id"
                          :label="item.fullName" :value="item.id" />
                      </el-option-group>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="存储名称" prop="executeContent.stored">
                    <el-input v-model="dataForm.executeContent.stored" placeholder="存储名称">
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="请求参数" prop="executeContent.storedParameter">
                    <el-button icon="el-icon-plus" @click="addStoredParameter()">新增参数
                    </el-button>
                    <el-row v-for="(item,i) in dataForm.executeContent.storedParameter" :key="i"
                      class="mt-10">
                      <el-col :span="10">
                        <el-input v-model="item.key" placeholder="请求参数名称"></el-input>
                      </el-col>
                      <el-col :span="10" :offset="1">
                        <el-input v-model="item.value" placeholder="请求参数值"></el-input>
                      </el-col>
                      <el-col :span="2" :offset="1">
                        <el-button type="danger" icon="el-icon-close"
                          @click="delStoredParameter(i)">
                        </el-button>
                      </el-col>
                    </el-row>
                  </el-form-item>
                </el-col>
              </template>
              <el-col :span="24">
                <el-form-item label="功能描述" prop="description">
                  <el-input v-model="dataForm.description" placeholder="功能描述" type="textarea"
                    :rows="3" />
                </el-form-item>
              </el-col>
            </template>
          </el-form>
        </el-col>
      </el-row>
      <frequencyForm v-if="formVisible" ref="frequencyForm" @refreshList="addList" />
    </div>
  </transition>
</template>

<script>
import { TimeTaskInfo, TimeTaskUpdate, TimeTaskCreate } from '@/api/system/timeTask'
import { getDataSourceListAll } from '@/api/systemData/dataSource'
import frequencyForm from './FrequencyForm'
import { deepClone } from '@/utils'
const defaultOptions = [{
  label: '',
  children: [{
    fullName: '默认数据库',
    id: '0'
  }]
}, {
  label: 'SqlServer',
  children: []
}, {
  label: 'MySql',
  children: []
}, {
  label: 'Oracle',
  children: []
}]
export default {
  components: { frequencyForm },
  data() {
    var checkStartTime = (rule, value, callback) => {
      if (this.dataForm.executeContent.end == 1) {
        callback();
      } else {
        if (!this.dataForm.executeContent.endTime) {
          callback()
        } else {
          if (this.dataForm.executeContent.endTime <= value) {
            callback(new Error('开始时间应该小于结束时间'));
          } else {
            this.$refs.dataForm.validateField('executeContent.endTime');
            callback()
          }
        }
      }
    }
    var checkEndTime = (rule, value, callback) => {
      if (this.dataForm.executeContent.start == 1) {
        callback();
      } else {
        if (!this.dataForm.executeContent.startTime) {
          callback()
        } else {
          if (this.dataForm.executeContent.startTime >= value) {
            callback(new Error('结束时间应该大于开始时间'));
          } else {
            callback()
          }
        }
      }
    }
    return {
      activeStep: 0,
      dataForm: {
        id: '',
        fullName: '',
        enCode: '',
        executeType: '1',
        description: '',
        executeContent: {
          start: '1',
          startTime: null,
          frequency: '1',
          seconds: '',
          minute: '',
          hours: '',
          month: '',
          type: '1',
          day: '',
          week: '',
          frequencyList: [],
          cron: '',
          end: '1',
          endTime: null,
          restart: false,
          restartFrequency: '',
          restartTime: '',
          interfaceType: 'GET',
          interfaceUrl: '',
          parameter: [],
          stored: '',
          database: '0',
          storedParameter: []
        },
      },
      dataRule: {
        fullName: [
          { required: true, message: '任务名称不能为空', trigger: 'blur' },
        ],
        enCode: [
          { required: true, message: '任务编码不能为空', trigger: 'blur' },
          { validator: this.formValidate('enCode', '任务编码只能输入英文、数字和小数点且小数点不能放在首尾'), trigger: 'blur' },
        ],
        'executeContent.startTime': [
          { required: true, message: '开始时间不能为空', trigger: 'change' },
          { validator: checkStartTime, trigger: 'change' }
        ],
        'executeContent.seconds': [
          { pattern: /^(?:[1-5]?\d)$/, message: '请输入0-59的有效正整数' }
        ],
        'executeContent.minute': [
          { pattern: /^(?:[1-5]?\d)$/, message: '请输入0-59的有效正整数' }
        ],
        'executeContent.hours': [
          { pattern: /^(2[0-3]|[0-1]?\d)$/, message: '请输入0-23的有效正整数' }
        ],
        'executeContent.month': [
          { pattern: /^([1-9]|[1-2]\d|3[0-1])$/, message: '请输入1-31的有效正整数' }
        ],
        'executeContent.day': [
          { pattern: /^([1-9]|[1-2]\d|3[0-1])$/, message: '请输入1-31的有效正整数' }
        ],
        'executeContent.week': [
          { pattern: /^([1-7])$/, message: '请输入1-7的有效正整数' }
        ],
        'executeContent.cron': [
          { required: true, message: '调度任务不能为空', trigger: 'change' }
        ],
        'executeContent.endTime': [
          { required: true, message: '结束时间不能为空', trigger: 'change' },
          { validator: checkEndTime, trigger: 'change' }
        ],
        'executeContent.restartFrequency': [
          { required: true, message: '间隔时间不能为空', trigger: 'blur' },
          { pattern: /^([1-9]|1\d|20)$/, message: '请输入1-20的有效正整数' }
        ],
        'executeContent.restartTime': [
          { required: true, message: '重启次数不能为空', trigger: 'blur' },
          { pattern: /^([1-9]|1\d|20)$/, message: '请输入1-20的有效正整数' }
        ],
        'executeContent.interfaceUrl': [
          { required: true, message: '请求路径不能为空', trigger: 'blur' },
          { type: 'url', message: '请输入正确的请求路径', trigger: 'blur' }
        ],
        'executeContent.stored': [
          { required: true, message: '存储名称不能为空', trigger: 'blur' }
        ]
      },
      list: [],
      listLoading: false,
      formVisible: false,
      btnLoading: false,
      categoryList: [],
      cronOptions: [
        {
          value: '0 15 10 * * ? *',
          label: '每天10:15运行'
        },
        {
          value: '0 * 14 * * ?',
          label: '每天14点到15点之间每分钟运行一次，开始于14:00，结束于14:59'
        },
        {
          value: '0 0 12 * * ?',
          label: '每天12点运行'
        },
        {
          value: '0 0/5 14 * * ?',
          label: '每天14点到15点每5分钟运行一次，开始于14:00，结束于14:55'
        },
        {
          value: '0 0/5 14,18 * * ?',
          label: '每天14点到15点每5分钟运行一次，此外每天18点到19点每5钟也运行一次'
        },
        {
          value: '0 0-5 14 * * ?',
          label: '每天14:00点到14:05，每分钟运行一次'
        },
        {
          value: '0 10,44 14 ? 3 WED',
          label: '3月每周三的14:10分到14:44，每分钟运行一次'
        },
        {
          value: '0 15 10 ? * MON-FRI',
          label: '每周一，二，三，四，五的10:15分运行'
        },
        {
          value: '0 15 10 15 * ?',
          label: '每月15日10:15分运行'
        },
        {
          value: '0 15 10 ? * 6L',
          label: '每月最后一个星期五10:15分运行'
        },
        {
          value: '0 15 10 ? * 6#3',
          label: '每月第三个星期五的10:15分运行'
        },
        {
          value: '0 15 10 L * ?',
          label: '每月最后一天10:15分运行'
        }
      ],
      dbOptions: []
    }
  },
  methods: {
    goBack() {
      this.$emit('close')
    },
    init(id) {
      this.activeStep = 0
      this.dataForm = {
        id: '',
        fullName: '',
        enCode: '',
        executeType: '1',
        description: '',
        executeContent: {
          start: '1',
          startTime: null,
          frequency: '1',
          seconds: '',
          minute: '',
          hours: '',
          month: '',
          type: '1',
          day: '',
          week: '',
          frequencyList: [],
          cron: '',
          end: '1',
          endTime: null,
          restart: false,
          restartFrequency: '',
          restartTime: '',
          interfaceType: 'GET',
          interfaceUrl: '',
          parameter: [],
          stored: '',
          database: '0',
          storedParameter: []
        }
      }
      this.dataForm.id = id || ''
      this.listLoading = true
      this.dbOptions = deepClone(defaultOptions)
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        getDataSourceListAll().then(res => {
          for (let i = 0; i < res.data.list.length; i++) {
            const element = res.data.list[i];
            if (element.dbType == 'SqlServer') {
              this.dbOptions[1].children.push(element)
            } else if (element.dbType == 'MySql') {
              this.dbOptions[2].children.push(element)
            } else if (element.dbType == 'Oracle') {
              this.dbOptions[3].children.push(element)
            }
          }
          this.dbOptions = this.dbOptions.filter(o => o.children.length)
          if (this.dataForm.id) {
            TimeTaskInfo(this.dataForm.id).then(res => {
              this.dataForm.description = res.data.description
              this.dataForm.executeContent = JSON.parse(res.data.executeContent)
              this.dataForm.fullName = res.data.fullName
              this.dataForm.executeType = res.data.executeType
              this.dataForm.enCode = res.data.enCode
              this.dataForm.sortCode = res.data.sortCode
              this.listLoading = false
            })
          } else {
            this.dataForm.enCode = ''
            this.listLoading = false
          }
        })
      })
    },
    dataFormSubmit() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.btnLoading = true
          let executeContent = JSON.stringify(this.dataForm.executeContent)
          let query = { ...this.dataForm, executeContent }
          const formMethod = this.dataForm.id ? TimeTaskUpdate : TimeTaskCreate
          formMethod(query).then((res) => {
            this.$message({
              message: res.msg,
              type: 'success',
              duration: 1500,
              onClose: () => {
                this.visible = false
                this.btnLoading = false
                this.$emit('close', true)
              }
            })
          }).catch(() => { this.btnLoading = false })
        }
      })
    },
    prve() {
      this.activeStep -= 1
    },
    next() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.activeStep += 1
          // this.$refs['dataForm'].clearValidate()
        }
      })
    },
    stepChick(key) {
      if (1 == key) return
      if (this.activeStep == key) return
      this.activeStep = key
    },
    addorEditFrequency(item) {
      this.formVisible = true
      this.$nextTick(() => {
        this.$refs.frequencyForm.init(item)
      })
    },
    addList(item) {
      this.dataForm.executeContent.frequencyList.push(item)
    },
    delFrequency(i) {
      this.dataForm.executeContent.frequencyList.splice(i, 1)
    },
    delParameter(i) {
      this.dataForm.executeContent.parameter.splice(i, 1)
    },
    addParameter() {
      let item = { key: "", value: "" }
      this.dataForm.executeContent.parameter.push(item)
    },
    delStoredParameter(i) {
      this.dataForm.executeContent.storedParameter.splice(i, 1)
    },
    addStoredParameter() {
      let item = { key: "", value: "" }
      this.dataForm.executeContent.storedParameter.push(item)
    }
  }
}
</script>
