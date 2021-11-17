<template>
  <transition name="el-zoom-in-center">
    <div class="JNPF-preview-main">
      <div class="JNPF-common-page-header">
        <el-page-header @back="goBack" :content="!dataForm.table ? '新建表名' : '编辑表名'" />
        <div class="options">
          <el-button type="primary" @click="dataFormSubmit()" :loading="btnLoading">
            {{$t('common.confirmButton')}}</el-button>
          <el-button @click="goBack()">{{$t('common.cancelButton')}}</el-button>
        </div>
      </div>
      <div class="main">
        <el-form :inline="true" :model="dataForm" :rules="dataRule" ref="dataForm" class="mt-20"
          label-width="100px">
          <el-form-item label="表名称" prop="newTable">
            <el-input v-model="dataForm.newTable" placeholder="表名称" maxlength="50"></el-input>
          </el-form-item>
          <el-form-item label="表说明" prop="tableName">
            <el-input v-model="dataForm.tableName" placeholder="表说明"></el-input>
          </el-form-item>
        </el-form>
        <div class="JNPF-common-title" style="padding:0 10px;">
          <h2>字段设置</h2>
          <div class="options">
            <el-dropdown :disabled="!fieldList.length">
              <el-button icon="el-icon-plus" :disabled="!fieldList.length">
                常用字段<i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="addHandle(item)" v-for="item in fieldList"
                  :key="item.id">{{item.field}}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
        <el-table v-loading="listLoading" :data="list" size='mini' ref="dragTable"
          :row-key="row=>row.index" v-if="refreshTable">
          <el-table-column align="center" label="拖动" width="50">
            <template>
              <i class="drag-handler icon-ym icon-ym-darg" style="cursor: move;font-size:20px"
                title='点击拖动' />
            </template>
          </el-table-column>
          <el-table-column type="index" width="50" label="序号" align="center" />
          <el-table-column prop="field" label="列名">
            <template slot-scope="scope">
              <el-input v-model="scope.row.field" placeholder="请输入列名" maxlength="50" />
            </template>
          </el-table-column>
          <el-table-column prop="dataType" label="类型">
            <template slot-scope="scope">
              <el-select v-model="scope.row.dataType" placeholder="请选择">
                <el-option v-for="item in options" :key="item.value" :label="item.label"
                  :value="item.value" />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="dataLength" label="长度">
            <template slot-scope="scope">
              <el-input v-model="scope.row.dataLength" placeholder="请输入长度" />
            </template>
          </el-table-column>
          <el-table-column prop="primaryKey" label="是否主键" width="70" align="center">
            <template slot-scope="scope">
              <el-checkbox v-model="scope.row.primaryKey" @change='changeKey($event,scope.row)'
                :true-label="1" :false-label="0" />
            </template>
          </el-table-column>
          <el-table-column prop="allowNull" label="允许空" width="60" align="center">
            <template slot-scope="scope">
              <el-checkbox :checked="scope.row.allowNull==1"
                @change='scope.row.allowNull==1?scope.row.allowNull=0:scope.row.allowNull=1' />
            </template>
          </el-table-column>
          <el-table-column prop="fieldName" label="说明">
            <template slot-scope="scope">
              <el-input v-model="scope.row.fieldName" placeholder="请输入说明" />
            </template>
          </el-table-column>
          <el-table-column label="操作" width="50">
            <template slot-scope="scope">
              <el-button class="JNPF-table-delBtn" size="mini" type="text"
                @click="handleDel(scope.$index,scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="table-actions" @click="addHandle()">
          <el-button type="text" icon="el-icon-plus">新建字段</el-button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Sortable from 'sortablejs'
import { DataModelInfo, DataModelUpdate, DataModelCreate } from '@/api/systemData/dataModel'
import { getList } from '@/api/systemData/commonFields'
export default {
  data() {
    return {
      dataForm: {
        table: '',
        tableName: '',
        newTable: ''
      },
      dataRule: {
        newTable: [
          { required: true, message: '表名称不能为空', trigger: 'blur' },
          { pattern: /(^_([A-Za-z0-9]_?)*$)|(^[A-Za-z](_?[A-Za-z0-9])*_?$)/, message: '请输入正确的表名称', trigger: ['blur'] },
        ],
        tableName: [
          { required: true, message: '表说明不能为空', trigger: 'blur' }
        ]
      },
      list: [],
      fieldList: [],
      listLoading: false,
      btnLoading: false,
      refreshTable: true,
      sortable: null,
      dataBase: '',
      options: [
        { label: '字符串', value: 'varchar' },
        { label: '整型', value: 'int' },
        { label: '日期时间', value: 'datetime' },
        { label: '浮点', value: 'decimal' },
        { label: '长整型', value: 'bigint' },
        { label: '文本', value: 'text' }
      ]
    }
  },
  methods: {
    goBack() {
      this.$emit('close')
    },
    getFieldList() {
      getList().then(res => { this.fieldList = res.data.list })
    },
    init(dataBase, table) {
      this.$refs['dataForm'].resetFields()
      this.dataForm.table = table || ''
      this.dataBase = dataBase
      this.listLoading = true
      this.getFieldList()
      this.$nextTick(() => {
        if (this.dataForm.table) {
          DataModelInfo(dataBase, this.dataForm.table).then(res => {
            this.dataForm = res.data.tableInfo
            this.$set(this.dataForm, 'newTable', this.dataForm.table)
            this.list = res.data.tableFieldList.map((o, i) => ({ index: i, ...o }))
            this.listLoading = false
          })
        } else {
          this.dataForm.newTable = table || ''
          this.listLoading = false
          this.list = []
        }
      })
      this.$nextTick(() => {
        this.setSort()
      })
    },
    setSort() {
      const el = this.$refs.dragTable.$el.querySelectorAll('.el-table__body-wrapper > table > tbody')[0]
      this.sortable = Sortable.create(el, {
        ghostClass: 'sortable-ghost', // Class name for the drop placeholder,
        setData: function (dataTransfer) {
          // to avoid Firefox bug
          // Detail see : https://github.com/RubaXa/Sortable/issues/1012
          dataTransfer.setData('Text', '')
        },
        onEnd: evt => {
          const targetRow = this.list.splice(evt.oldIndex, 1)[0]
          this.list.splice(evt.newIndex, 0, targetRow)
        },
        handle: '.drag-handler',
      })
    },
    dataFormSubmit() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          if (!this.list.length) {
            this.$message({
              message: '请至少添加一个字段',
              type: 'error',
              duration: 1000
            })
            return
          }
          if (!this.exist()) return
          let boo = this.list.some(o => o.primaryKey === 1)
          if (!boo) {
            this.$message({
              message: '请选择一个字段作为主键',
              type: 'error',
              duration: 1000
            })
            return
          }
          this.btnLoading = true
          let query = {
            tableFieldList: this.list,
            tableInfo: this.dataForm
          }
          const formMethod = this.dataForm.table ? DataModelUpdate : DataModelCreate
          formMethod(this.dataBase, query).then((res) => {
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
    exist() {
      let isOk = true;
      //  遍历数组，判断非空
      for (let i = 0; i < this.list.length; i++) {
        const e = this.list[i];
        if (!e.field) {
          this.$message({
            showClose: true,
            message: `第${i + 1}行列名不能为空`,
            type: 'error',
            duration: 1000
          });
          isOk = false
          break
        }
        let reg = /(^_([a-zA-Z0-9]_?)*$)|(^[a-zA-Z](_?[a-zA-Z0-9])*_?$)/
        if (!reg.test(e.field)) {
          this.$message({
            showClose: true,
            message: `第${i + 1}行列名格式错误，请重新输入`,
            type: 'error',
            duration: 1000
          });
          isOk = false
          break
        }
        let num = this.list.filter(o => o.field == e.field)
        if (num.length > 1) {
          this.$message({
            showClose: true,
            message: `第${i + 1}行列名'${e.field}'已重复`,
            type: 'error',
            duration: 1000
          });
          isOk = false
          break
        }
        if (!e.fieldName) {
          this.$message({
            showClose: true,
            message: `第${i + 1}行说明不能为空`,
            type: 'error',
            duration: 1000
          });
          isOk = false
          break
        }
      }
      return isOk;
    },
    changeKey(val, row) {
      if (!val) return
      for (let i = 0; i < this.list.length; i++) {
        if (row.field != this.list[i].field) {
          this.$set(this.list[i], 'primaryKey', 0)
        }
      }
    },
    handleDel(index, row) {
      this.list.splice(index, 1)
    },
    addHandle(row) {
      let index = this.list.length, item = {}
      if (!row) {
        item = {
          field: "", dataType: "varchar", dataLength: 50, allowNull: 1, primaryKey: 0, fieldName: "", index
        }
      } else {
        item = {
          field: row.field,
          dataType: row.dataType,
          dataLength: row.dataLength,
          allowNull: row.allowNull,
          fieldName: row.fieldName,
          index,
          primaryKey: 0
        }
      }
      this.list.push(item)
    }
  }
}
</script>
<style lang="scss" scoped>
.main {
  padding: 0 0 10px;
}
</style>