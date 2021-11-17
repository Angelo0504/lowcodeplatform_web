<template>
  <el-dialog :visible.sync="visible" fullscreen lock-scroll class="JNPF-full-dialog"
    :show-close="false" :modal="false">
    <div class="JNPF-full-dialog-header">
      <div class="header-title">
        <img src="@/assets/images/jnpf.png" class="header-logo" />
        <p class="header-txt"> · 在线开发</p>
      </div>
      <el-steps :active="activeStep" finish-status="success" simple class="steps">
        <el-step title="基础设置" @click.native="stepChick(0)"></el-step>
        <el-step title="表单设计" @click.native="stepChick(1)"></el-step>
        <el-step title="列表设计" @click.native="stepChick(2)"></el-step>
      </el-steps>
      <div class="options">
        <el-button @click="prve" :disabled="activeStep<=0">{{$t('common.prev')}}</el-button>
        <el-button @click="next" :disabled="activeStep>=2">{{$t('common.next')}}</el-button>
        <el-button type="primary" @click="dataFormSubmit()" :disabled="activeStep!=2"
          :loading="btnLoading">{{$t('common.confirmButton')}}</el-button>
        <el-button @click="closeDialog()">{{$t('common.cancelButton')}}</el-button>
      </div>
    </div>
    <div class="main">
      <el-row type="flex" justify="center" align="middle" v-if="!activeStep" class="basic-box">
        <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="10" class="basicForm">
          <el-form :model="dataForm" :rules="dataRule" ref="dataForm" label-width="80px"
            @submit.native.prevent label-position="right">
            <el-form-item label="功能名称" prop="fullName">
              <el-input v-model="dataForm.fullName" placeholder="功能名称" maxlength="100">
              </el-input>
            </el-form-item>
            <el-form-item label="功能编码" prop="enCode">
              <el-input v-model="dataForm.enCode" placeholder="功能编码" maxlength="50">
              </el-input>
            </el-form-item>
            <el-form-item label="功能分类" prop="category">
              <el-select v-model="dataForm.category" placeholder="选择分类">
                <el-option :key="item.id" :label="item.fullName" :value="item.id"
                  v-for="item in categoryList" />
              </el-select>
            </el-form-item>
            <el-form-item label="状态" prop="state">
              <el-switch v-model="dataForm.state" :active-value="1" :inactive-value="0" />
            </el-form-item>
            <el-form-item label="功能说明" prop="description">
              <el-input v-model="dataForm.description" placeholder="功能说明" type="textarea"
                :rows="3" />
            </el-form-item>
          </el-form>
          <div class="JNPF-common-title">
            <h2>绑定数据库表</h2>
          </div>
          <el-table :data="tables" class="JNPF-common-table"
            empty-text="点击“新增”可选择 1 条（单表）或 2 条以上（多表）">
            <el-table-column type="index" label="序号" width="50" align="center" />
            <el-table-column prop="typeId" label="类别" width="65">
              <template slot-scope="scope">
                <el-tag v-if="scope.row.typeId=='1'">主表</el-tag>
                <el-tag type="warning" v-else @click="changeTable(scope.row)" style="cursor:pointer"
                  title="点击设置成主表">子表</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="tableName" label="说明" />
            <el-table-column prop="table" label="表名" />
            <el-table-column prop="tableField" label="外键字段">
              <template slot-scope="scope" v-if="scope.row.typeId !=='1'">
                <el-select v-model="scope.row.tableField" placeholder="请选择">
                  <el-option v-for="item in scope.row.fields" :key="item.field" :label="item.field"
                    :value="item.field">
                  </el-option>
                </el-select>
              </template>
            </el-table-column>
            <!-- <el-table-column prop="relationTable" label="关联主表" /> -->
            <el-table-column prop="relationField" label="关联主键">
              <template slot-scope="scope" v-if="scope.row.typeId !=='1'">
                <el-select v-model="scope.row.relationField" placeholder="请选择">
                  <el-option v-for="item in mainTableFields" :key="item.field" :label="item.field"
                    :value="item.field">
                  </el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" width="50">
              <template slot-scope="scope">
                <el-button size="mini" type="text" class="JNPF-table-delBtn"
                  @click="delItem(scope.row,scope.$index)">删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="table-actions" @click="formVisible = true">
            <el-button type="text" icon="el-icon-plus">新增一行</el-button>
          </div>
        </el-col>
      </el-row>
      <template v-if="activeStep==1">
        <Generator ref="generator" :conf="formData" @drawingListChange="onDrawingListChange"
          :modelType="dataForm.type" />
      </template>
      <template v-if="activeStep==2">
        <columnDesign ref="columnDesign" :conf="columnData" />
      </template>
    </div>
    <TableForm :visible.sync="formVisible" ref="tableForm" @closeForm="colseForm" />
  </el-dialog>
</template>

<script>
import { getVisualDevInfo, Update, Create } from '@/api/onlineDev/visualDev'
import { DataModelFieldList } from '@/api/systemData/dataModel'
import Generator from '@/components/Generator/index/Home'
import ColumnDesign from '@/components/ColumnDesign/index'
import TableForm from '@/views/generator/TableForm'
export default {
  components: { Generator, ColumnDesign, TableForm },
  data() {
    return {
      visible: false,
      activeStep: 0,
      dataForm: {
        id: '',
        fullName: '',
        enCode: '',
        type: 1,
        state: 1,
        category: '',
        description: "",
        tables: ''
      },
      dataRule: {
        fullName: [
          { required: true, message: '功能名称不能为空', trigger: 'blur' },
        ],
        enCode: [
          { required: true, message: '功能编码不能为空', trigger: 'blur' },
          { validator: this.formValidate('enCode'), trigger: 'blur' },
        ],
        category: [
          { required: true, message: '功能分类不能为空', trigger: 'change' },
        ],
        state: [
          { required: true, message: '状态不能为空', trigger: 'blur' },
        ],
      },
      tables: [],
      formVisible: false,
      btnLoading: false,
      formData: null,
      columnData: null,
      categoryList: [],
      mainTableFields: [],
      relationTable: ""
    }
  },
  methods: {
    init(categoryList, id, type) {
      this.categoryList = categoryList
      this.activeStep = 0
      this.tables = []
      this.dataForm.id = id || ''
      this.visible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        if (this.dataForm.id) {
          getVisualDevInfo(this.dataForm.id).then(res => {
            this.dataForm = res.data
            this.formData = JSON.parse(this.dataForm.formData)
            this.columnData = JSON.parse(this.dataForm.columnData)
            this.tables = this.dataForm.tables && JSON.parse(this.dataForm.tables) || []
            if (!this.tables.length) return
            let mainTable = this.tables.filter(o => o.typeId == '1')[0]
            this.mainTableFields = mainTable.fields
            this.relationTable = mainTable.table
          })
        } else {
          this.dataForm.type = type
        }
      })
    },
    dataFormSubmit() {
      this.$refs['columnDesign'].getData().then(res => {
        this.btnLoading = true
        this.columnData = res.columnData
        this.dataForm.formData = JSON.stringify(this.formData)
        this.dataForm.columnData = JSON.stringify(this.columnData)
        this.dataForm.tables = JSON.stringify(this.tables)
        const formMethod = this.dataForm.id ? Update : Create
        formMethod(this.dataForm).then((res) => {
          this.$message({
            message: res.msg,
            type: 'success',
            duration: 1500,
            onClose: () => {
              this.closeDialog(true)
            }
          })
        }).catch(() => { this.btnLoading = false })
      }).catch(err => {
        err.msg && this.$message.warning(err.msg)
      })
    },
    closeDialog(isRefresh) {
      this.visible = false
      this.$emit('close', isRefresh)
    },
    prve() {
      this.activeStep -= 1
    },
    next() {
      if (this.activeStep < 1) {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            if (!this.tables.length) {
              this.$store.commit('generator/SET_TABLE', false)
            } else {
              if (!this.exist()) return
              let subTable = this.tables.filter(o => o.typeId == '0')
              this.$store.commit('generator/UPDATE_SUB_TABLE', subTable)
              this.$store.commit('generator/SET_TABLE', true)
              this.$store.commit('generator/UPDATE_FORMITEM_LIST', this.mainTableFields)
            }
            this.activeStep += 1
          }
        })
      } else {
        this.$refs['generator'].getData().then(res => {
          this.formData = res.formData
          this.activeStep += 1
        }).catch(err => {
          err.msg && this.$message.warning(err.msg)
        })
      }
    },
    stepChick(key) {
      if (this.activeStep <= key) return
      this.activeStep = key
    },
    onDrawingListChange() {
      this.columnData = null
    },
    async colseForm(data) {
      let list = []
      let checkList = []
      if (!this.tables.length) {
        for (let i = 0; i < data.length; i++) {
          const e = data[i];
          let relationTable = data[0].table
          let typeId = i == 0 ? "1" : "0"
          let res = await DataModelFieldList('0', e.table)
          let fields = res.data.list.map(o => ({ field: o.field, fieldName: o.fieldName, dataType: o.dataType }))
          let item = {
            relationField: "", relationTable: i == 0 ? '' : relationTable, table: e.table, tableName: e.tableName, tableField: '', typeId, fields
          }
          checkList.push(item)
        }
        this.relationTable = checkList[0].table
        this.mainTableFields = checkList[0].fields
        this.tables = checkList
      } else {
        for (let i = 0; i < data.length; i++) {
          const e = data[i];
          let boo = this.tables.some(o => o.table == e.table)
          if (!boo) {
            let res = await DataModelFieldList('0', e.table)
            let fields = res.data.list.map(o => ({ field: o.field, fieldName: o.fieldName, dataType: o.dataType }))
            let item = {
              relationField: "", relationTable: this.relationTable, table: e.table, tableName: e.tableName, tableField: '', typeId: "0", fields
            }
            checkList.push(item)
          }
        }
        this.tables = [...this.tables, ...checkList]
      }
    },
    delItem(row, index) {
      this.tables.splice(index, 1);
      if (row.typeId == '1' && this.tables.length) {
        this.tables[0].typeId = '1'
        this.tables[0].relationTable = ''
        this.mainTableFields = this.tables[0].fields
        this.relationTable = this.tables[0].table
      }
    },
    changeTable(row) {
      this.relationTable = row.table
      this.mainTableFields = row.fields
      for (let i = 0; i < this.tables.length; i++) {
        this.$set(this.tables[i], "typeId", this.tables[i].table === row.table ? '1' : '0')
        this.$set(this.tables[i], "relationTable", this.tables[i].table === row.table ? '' : this.relationTable)
        this.$set(this.tables[i], "relationField", "")
        this.$set(this.tables[i], "tableField", "")
      }
    },
    exist() {
      let isOk = true;
      for (let i = 0; i < this.tables.length; i++) {
        const e = this.tables[i];
        if (e.typeId == '0') {
          if (!e.tableField) {
            this.$message({
              showClose: true,
              message: `表${e.table}外键字段不能为空`,
              type: 'warning',
              duration: 1000
            });
            isOk = false
            break
          }
        }
        if (e.typeId == '0') {
          if (!e.relationField) {
            this.$message({
              showClose: true,
              message: `表${e.table}关联主键不能为空`,
              type: 'warning',
              duration: 1000
            });
            isOk = false
            break
          }
        }
      }
      return isOk;
    }
  }
}
</script>