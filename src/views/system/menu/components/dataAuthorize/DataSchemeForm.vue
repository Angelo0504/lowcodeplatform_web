<template>
  <el-dialog :title="!dataForm.id ? '新建方案' : '编辑方案'" :close-on-click-modal="false"
    :close-on-press-escape="false" :visible.sync="visible" lock-scroll
    class="JNPF-dialog JNPF-dialog_center" width="630px">
    <el-form ref="dataForm" :model="dataForm" :rules="dataRule" v-loading="formLoading">
      <el-form-item prop="fullName">
        <el-input v-model="dataForm.fullName" placeholder="请输入方案名称" />
      </el-form-item>
      <el-form-item v-for="(item, index) in condition" :key="index">
        <el-row :gutter="5">
          <el-col :span="7" class="mb-10">
            <el-select v-model="item.logic" placeholder="请选择">
              <el-option v-for="item in logicOptions" :key="item.value" :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="5" class="mb-10">
            <el-button icon="el-icon-plus" @click="addItem(index)">添加条件</el-button>
          </el-col>
          <el-col :span="12" class="mb-10" style="text-align:right">
            <el-button type="danger" icon="el-icon-close" @click="delGroup(index)">删除分组</el-button>
          </el-col>
          <el-col :span="24" v-for="(subItem, i) in item.groups" :key="index + i" class="mb-10">
            <el-row :gutter="5">
              <el-col :span="7">
                <el-select v-model="subItem.id" placeholder="选择字段" clearable
                  @change="changeField($event,subItem)">
                  <el-option v-for="item in fieldOptions" :key="item.id" :label="item.fullName"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="7">
                <el-select v-model="subItem.op" placeholder="选择符号" clearable>
                  <el-option v-for="item in subItem.opOptions" :key="item.value" :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="8">
                <el-input v-model="subItem.value" placeholder="输入字段值"
                  :readonly="subItem.readonly" />
              </el-col>
              <el-col :span="2" style="text-align:right">
                <el-button type="danger" icon="el-icon-close" @click="delItem(index,i)"
                  style="width:100%" />
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-button @click="addGroup">添加分组</el-button>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">{{$t("common.cancelButton")}}</el-button>
      <el-button type="primary" :loading="btnLoading" @click="dataFormSubmit()">
        {{ $t("common.confirmButton")}}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {
  createDataScheme,
  updateDataScheme,
  getDataSchemeInfo,
  getDataAuthorizeList,
} from "@/api/system/dataAuthorize"
import { deepClone } from '@/utils'

export default {
  data() {
    return {
      visible: false,
      formLoading: false,
      btnLoading: false,
      logicOptions: [
        {
          value: "and",
          label: "and",
        },
        {
          value: "or",
          label: "or",
        },
      ],
      fieldOptions: [],
      opOptions: [{
        value: 'Equal',
        label: '等于'
      }, {
        value: 'NotEqual',
        label: '不等于'
      }, {
        value: 'GreaterThan',
        label: '大于'
      }, {
        value: 'GreaterThanOrEqual',
        label: '大于等于'
      }, {
        value: 'LessThan',
        label: '小于'
      }, {
        value: 'LessThanOrEqual',
        label: '小于等于'
      }],
      dataForm: {
        id: "",
        moduleId: "",
        fullName: "",
        conditionJson: "",
        conditionText: ""
      },
      condition: [],
      dataRule: {
        fullName: [
          { required: true, message: "方案名称不能为空", trigger: "blur" }
        ]
      }
    }
  },
  methods: {
    init(moduleId, id) {
      this.dataForm.id = id || ""
      this.dataForm.moduleId = moduleId
      this.dataForm.fullName = ""
      this.dataForm.conditionJson = ""
      this.dataForm.conditionText = ""
      this.condition = [{
        logic: "and",
        groups: [{
          id: "",
          field: "",
          type: "",
          op: "",
          value: "",
          opOptions: []
        }]
      }]
      this.visible = true
      this.$nextTick(() => {
        this.formLoading = true
        getDataAuthorizeList(this.dataForm.moduleId).then(res => {
          this.fieldOptions = res.data.list
          if (this.dataForm.id) {
            getDataSchemeInfo(this.dataForm.id).then(res => {
              this.dataForm = res.data
              if (res.data.conditionJson) this.condition = JSON.parse(res.data.conditionJson)
              for (let i = 0; i < this.condition.length; i++) {
                let groups = this.condition[i].groups
                for (let j = 0; j < groups.length; j++) {
                  let e = groups[j]
                  let item = this.fieldOptions.filter(o => o.id === groups[j].id)[0]
                  e.opOptions = this.getOptions(item)
                  if (item.conditionText !== 'text') {
                    e.readonly = true
                  } else {
                    e.readonly = false
                  }
                }
              }
              this.formLoading = false
            })
          } else {
            this.formLoading = false
          }
        })
      })
    },
    changeField(val, item) {
      if (!val) {
        item.id = ''
        item.field = ''
        item.type = ''
        item.op = ''
        item.value = ''
        item.opOptions = []
        item.readonly = false
      } else {
        item.op = ''
        item.value = ''
        item.readonly = false
        let fieldItem = this.fieldOptions.filter(o => o.id === val)[0]
        item.type = fieldItem.type
        item.field = fieldItem.enCode
        item.opOptions = this.getOptions(fieldItem)
        item.field = fieldItem.enCode
        if (fieldItem.conditionText !== 'text') {
          item.readonly = true
          item.value = fieldItem.conditionText
        }
      }
    },
    getOptions(fieldItem) {
      let opOptions = []
      let options = fieldItem.conditionSymbol ? fieldItem.conditionSymbol.split(',') : []
      outer: for (let i = 0; i < options.length; i++) {
        inner: for (let j = 0; j < this.opOptions.length; j++) {
          if (options[i] === this.opOptions[j].value) {
            opOptions.push(this.opOptions[j])
            break inner
          }
        }
      }
      return opOptions
    },
    addItem(index) {
      this.condition[index].groups.push({
        id: "",
        field: "",
        type: "",
        op: "",
        value: "",
        opOptions: []
      })
    },
    delItem(index, childIndex) {
      this.condition[index].groups.splice(childIndex, 1)
    },
    delGroup(index) {
      this.condition.splice(index, 1)
    },
    addGroup() {
      this.condition.push({
        logic: "and",
        groups: [{
          id: "",
          field: "",
          type: "",
          op: "",
          value: "",
          opOptions: []
        }]
      })
    },
    getOpText(val) {
      if (!val) return val
      let list = this.opOptions.filter(o => o.value == val)
      if (!list.length) return val
      return list[0].label || val
    },
    getFieldText(val) {
      if (!val) return val
      let list = this.fieldOptions.filter(o => o.id == val)
      if (!list.length) return val
      return list[0].fullName || val
    },
    dataFormSubmit() {
      this.$refs["dataForm"].validate((valid) => {
        if (valid) {
          this.btnLoading = true
          let conditionText = "",
            conditionValid = true,
            condition = deepClone(this.condition)
          outer: for (let i = 0; i < condition.length; i++) {
            let e = condition[i]
            let text = ''
            if (i > 0) text += e.logic === "and" ? "而且" : "或者"
            text += '【'
            for (let j = 0; j < e.groups.length; j++) {
              let ee = e.groups[j]
              if (!ee.field || !ee.id || !ee.op || !ee.value) {
                this.$message.warning("过滤条件检查出格式错误")
                conditionValid = false
                break outer
              }
              delete ee.readonly
              delete ee.opOptions
              text += `${j == 0 ? '' : ' and '}{${this.getFieldText(ee.id)}} {${this.getOpText(ee.op)}} {${ee.value}}`
            }
            text += '】'
            conditionText += text
          }
          if (!conditionValid) return this.btnLoading = false
          this.dataForm.conditionText = conditionText
          this.dataForm.conditionJson = JSON.stringify(condition)
          const formMethod = this.dataForm.id ? updateDataScheme : createDataScheme
          formMethod(this.dataForm).then(res => {
            this.$message({
              message: res.msg,
              type: "success",
              duration: 1500,
              onClose: () => {
                this.visible = false
                this.btnLoading = false
                this.$emit("refreshDataList")
              },
            });
          }).catch(() => {
            this.btnLoading = false
          })
        }
      })
    }
  }
}
</script>