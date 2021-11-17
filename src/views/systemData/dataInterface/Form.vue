<template>
  <transition name="el-zoom-in-center">
    <div class="JNPF-preview-main form-main">
      <div class="JNPF-common-page-header">
        <el-page-header @back="goBack" content="" />
        <el-steps :active="active" finish-status="success" simple class="steps">
          <el-step title="基本信息"></el-step>
          <el-step title="数据配置"></el-step>
        </el-steps>
        <div class="options">
          <el-button :disabled="active <= 0" @click="handlePrevStep">{{$t('common.prev')}}
          </el-button>
          <el-button :disabled="active >= 1" @click="handleNextStep">{{$t('common.next')}}
          </el-button>
          <el-button type="primary" :loading="btnLoading" :disabled="active < 1"
            @click="dataFormSubmit()">{{$t('common.confirmButton')}}</el-button>
          <el-button @click="goBack">{{$t('common.cancelButton')}}</el-button>
        </div>
      </div>
      <el-form ref="dataForm" :model="dataForm" :rules="dataRule" v-loading="formLoading"
        label-width="90px">
        <el-row>
          <el-col :span="14" :offset="5" class="baseInfo mt-20" v-if="active === 0">
            <el-form-item label="名称" prop="fullName" maxlength="50">
              <el-input v-model="dataForm.fullName" placeholder="输入名称" />
            </el-form-item>
            <el-form-item label="编码" prop="enCode" maxlength="50">
              <el-input v-model="dataForm.enCode" placeholder="输入编码" />
            </el-form-item>
            <el-form-item label="分类" prop="categoryId">
              <JNPF-TreeSelect v-model="dataForm.categoryId" :options="selectData"
                placeholder="选择分类" clearable />
            </el-form-item>
            <el-form-item label="类型" prop="dataType">
              <el-radio-group v-model="dataForm.dataType">
                <el-radio :label="2">静态数据</el-radio>
                <el-radio :label="1">SQL数据</el-radio>
                <el-radio :label="3">Api数据</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="排序" prop="sortCode">
              <el-input-number :min="0" :max="9999" v-model="dataForm.sortCode" />
            </el-form-item>
            <el-form-item label="状态" prop="enabledMark">
              <el-switch v-model="dataForm.enabledMark" :active-value="1" :inactive-value="0" />
            </el-form-item>
            <el-form-item label="说明" prop="description">
              <el-input v-model="dataForm.description" type="textarea" :rows="6" />
            </el-form-item>
          </el-col>
          <el-col class="mt-20 config" v-if="active === 1 && dataForm.dataType === 1">
            <div class="tableData">
              <el-select v-model="dataForm.dbLinkId" filterable placeholder="选择数据库"
                style="width: 100%" @change="handleSelectTable">
                <el-option-group v-for="group in dbOptions" :key="group.label" :label="group.label">
                  <el-option v-for="item in group.children" :key="item.id" :label="item.fullName"
                    :value="item.id" />
                </el-option-group>
              </el-select>
              <div class="box">
                <el-tree :data="treeData" node-key="index" v-loading="treeLoading"
                  :element-loading-text="$t('common.loadingText')" :props="defaultProps"
                  @node-click="handleNodeClick" />
              </div>
            </div>
            <div class="detail">
              <el-tabs v-model="activeName">
                <el-tab-pane label="查询SQL" name="query">
                  <el-form-item label-width="0" prop="query">
                    <div class="sql-box">
                      <SQLEditor v-model="dataForm.query" :options="sqlOptions"
                        ref="SQLEditorRef" />
                    </div>
                  </el-form-item>
                  <div class="tips">
                    <p><span>@user</span>当前用户</p>
                    <p><span>@organize</span>当前用户所在公司</p>
                    <p><span>@department</span>当前用户所在部门</p>
                    <p><span>@postion</span>当前用户所在岗位</p>
                  </div>
                </el-tab-pane>
              </el-tabs>
            </div>
          </el-col>
          <el-col class="staticData" v-if="active === 1 && dataForm.dataType === 2">
            <el-form-item label-width="0" prop="query">
              <div style="background-color: #fff; height: 1px; overflow: hidden"></div>
              <div class="json-box">
                <JSONEditor v-model="dataForm.query" :options="jsonOptions" ref="JSONEditorRef" />
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="14" :offset="5" class="mt-20 baseInfo"
            v-if="active === 1 && dataForm.dataType === 3">
            <el-form-item label="接口路径" prop="path" maxlength="50">
              <el-input v-model="dataForm.path" placeholder="输入接口路径" />
            </el-form-item>
            <el-form-item v-for="(item, index) in dataForm.requestParameters" :key="item.index"
              :label="'接口参数' + (index+1)" required>
              <el-row class="parameBox">
                <el-col :span="7" style="margin-right: 10px">
                  <el-form-item :prop="'requestParameters.' + index + '.field'" :rules="{
                      required: true, message: '参数名称不能为空', trigger: 'blur'
                    }">
                    <el-input v-model="item.field" placeholder="参数名称" />
                  </el-form-item>
                </el-col>
                <el-col :span="7" style="margin-right: 10px">
                  <el-form-item :prop="'requestParameters.' + index + '.value'" :rules="{
                      required: true, message: '参数值不能为空', trigger: 'blur'
                    }">
                    <el-input v-model="item.value" placeholder="参数值" />
                  </el-form-item>
                </el-col>
                <el-col :span="2">
                  <el-button @click.prevent="removeParame(item)">删除</el-button>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="addParame" class="el-icon-plus">添加参数</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </transition>
</template>

<script>
import {
  getDataInterfaceTypeSelector,
  getDataInterfaceInfo,
  createDataInterface,
  updateDataInterface,
} from '@/api/systemData/dataInterface'
import { getDataSourceListAll } from '@/api/systemData/dataSource'
import { DataModelList } from '@/api/systemData/dataModel'
import { deepClone } from '@/utils'
import SQLEditor from '@/components/JNPFEditor/monaco'
import JSONEditor from '@/components/JNPFEditor/monaco'
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
  components: {
    SQLEditor,
    JSONEditor
  },
  data() {
    return {
      active: 0,
      treeLoading: false,
      formLoading: false,
      btnLoading: false,
      selectData: [],
      sqlOptions: {
        language: 'sql'
      },
      jsonOptions: {
        language: 'json'
      },
      dataForm: {
        fullName: '',
        enCode: '',
        categoryId: '',
        dbLinkId: '0',
        dataType: 2,
        requestMethod: 'get',
        responseType: 'json',
        sortCode: 0,
        enabledMark: 0,
        description: '',
        requestParameters: [],
        query: ''
      },
      dbOptions: [],
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'table'
      },
      activeName: 'query',
      dataRule: {
        fullName: [
          {
            required: true,
            message: '名称不能为空',
            trigger: 'blur'
          }
        ],
        enCode: [
          {
            required: true,
            message: '编码不能为空',
            trigger: 'blur'
          }
        ],
        categoryId: [
          {
            required: true,
            message: '请选择分类',
            trigger: 'blur'
          }
        ],
        path: [
          {
            required: true,
            message: '请填写接口路径',
            trigger: 'blur'
          }
        ],
        query: [
          {
            required: true,
            message: '请输入SQL查询语句或静态数据',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    goBack() {
      this.$emit('close')
    },
    init(id) {
      this.dataForm = {
        fullName: '',
        enCode: '',
        categoryId: '',
        dbLinkId: '0',
        dataType: 2,
        requestMethod: 'get',
        responseType: 'json',
        sortCode: 0,
        enabledMark: 0,
        description: '',
        requestParameters: [],
        query: ''
      }
      this.active = 0
      this.dataForm.id = id || ''
      this.formLoading = true
      this.dbOptions = deepClone(defaultOptions)
      this.$nextTick(() => {

        this.$refs['dataForm'].resetFields()
        // 获取分类
        getDataInterfaceTypeSelector().then(res => {
          this.selectData = res.data.list
        })
        // 获取数据库
        getDataSourceListAll().then(res => {
          for (let i = 0; i < res.data.list.length; i++) {
            const element = res.data.list[i];
            if (element.dbType === 'SqlServer') {
              this.dbOptions[1].children.push(element)
            } else if (element.dbType === 'MySql') {
              this.dbOptions[2].children.push(element)
            } else if (element.dbType === 'Oracle') {
              this.dbOptions[3].children.push(element)
            }
          }
          this.dbOptions = this.dbOptions.filter(o => o.children.length)
          this.getTableList(this.dataForm.dbLinkId)
          if (this.dataForm.id) {
            this.getFormData()
          }
          this.formLoading = false
        })
      })

    },
    getFormData() {
      getDataInterfaceInfo(this.dataForm.id).then(res => {
        this.dataForm = res.data
        this.dataForm.query = res.data.query
        // Api 回显处理
        if (res.data.requestParameters) this.dataForm.requestParameters = JSON.parse(res.data.requestParameters)
      })
    },
    handleSelectTable(val) {
      this.dataForm.dbLinkId = val
      this.getTableList(val);
    },
    getTableList(id) {
      this.treeLoading = true
      DataModelList(id).then(res => {
        this.treeData = res.data.list
        this.treeLoading = false
      })
    },
    handleNodeClick(data) {
      console.log(data.table)
    },
    handlePrevStep() {
      this.active -= 1
    },
    handleNextStep() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          if (this.active < 1) {
            this.active += 1
            // SQL数据
            if (this.dataForm.dataType === 1) {
              this.$refs.SQLEditorRef && this.$refs.SQLEditorRef.changeEditor({
                value: this.dataForm.query,
                options: this.sqlOptions
              })
            }

            // 静态数据
            if (this.dataForm.dataType === 2) {
              this.$refs.JSONEditorRef && this.$refs.JSONEditorRef.changeEditor({
                value: this.dataForm.query,
                options: this.jsonOptions
              })
            }
          }
        }
      })
    },
    removeParame(item) {
      let index = this.dataForm.requestParameters.indexOf(item)
      if (index !== -1) {
        this.dataForm.requestParameters.splice(index, 1)
      }
    },
    addParame() {
      this.dataForm.requestParameters.push({
        field: '',
        value: ''
      })
    },
    dataFormSubmit() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          this.btnLoading = true
          const parame = JSON.stringify(this.dataForm.requestParameters)
          const formData = {
            ...this.dataForm,
            requestParameters: parame
          }
          const formMethod = this.dataForm.id ? updateDataInterface : createDataInterface
          formMethod(formData).then(res => {
            this.$message({
              message: res.msg,
              type: 'success',
              duration: 1500,
              onClose: () => {
                this.btnLoading = false
                this.$emit('close', true)
              }
            })
          }).catch(() => {
            this.btnLoading = false
          })
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.form-main {
  .el-tabs__header {
    padding: 0;
  }
  .parameBox {
    .el-form-item--mini.el-form-item,
    .el-form-item--small.el-form-item {
      margin-bottom: 0;
    }
  }

  .config {
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    .tableData {
      flex: 0 0 220px;
      margin-right: 15px;
      .box {
        margin-top: 8px;
        border-radius: 4px;
        height: calc(100vh - 280px);
        border: 1px solid #dcdfe6;
        overflow: auto;
        overflow-x: hidden;
        >>> .el-tree-node__content > .el-tree-node__expand-icon {
          padding: 0;
        }
      }
    }

    .detail {
      flex: 1;
      .sql-box {
        border: 1px solid #dcdfe6;
        height: calc(100vh - 430px);
        overflow: auto;
      }
      .tips {
        padding: 8px 16px;
        background-color: #ecf8ff;
        border-radius: 4px;
        border-left: 5px solid #50bfff;
        margin: 20px 0;
        p {
          line-height: 24px;
          color: #5e6d82;
          span {
            display: inline-block;
            padding-right: 10px;
          }
        }
      }
    }
  }
  .staticData {
    flex: 1;
    .json-box {
      height: calc(100vh - 200px);
    }
  }
}
</style>
