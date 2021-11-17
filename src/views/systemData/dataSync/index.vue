<template>
  <div class="DbCopy-container app-container nohead  JNPF-flex-main">
    <el-alert title="温馨提示：数据同步是由A数据库同步到B数据库，必须确保数据库表结构一致否则会同步失败。" type="warning" :closable="false"
      show-icon class="mb-20">
    </el-alert>
    <el-form ref="dataForm" :model="dataForm" label-width="140px" :rules="dataRule"
      @submit.native.prevent class="mt-10">
      <el-form-item label="数据库连接 From" prop="dbConnectionFrom">
        <el-select v-model="dataForm.dbConnectionFrom" placeholder="请选择连接">
          <el-option-group v-for="group in options" :key="group.label" :label="group.label">
            <el-option v-for="item in group.children" :key="item.id" :label="item.fullName"
              :value="item.id" />
          </el-option-group>
        </el-select>
      </el-form-item>
      <el-form-item label="数据库连接 To" prop="dbConnectionTo">
        <el-select v-model="dataForm.dbConnectionTo" placeholder="请选择连接">
          <el-option-group v-for="group in options" :key="group.label" :label="group.label">
            <el-option v-for="item in group.children" :key="item.id" :label="item.fullName"
              :value="item.id" />
          </el-option-group>
        </el-select>
        <el-button type="primary" @click="check">验证连接</el-button>
      </el-form-item>
    </el-form>
    <div class="JNPF-common-title">
      <h2>数据库表</h2>
    </div>
    <JNPF-table v-loading="listLoading" :data="list">
      <el-table-column prop="table" label="表名" show-overflow-tooltip />
      <el-table-column prop="size" label="大小" />
      <el-table-column prop="sum" label="总数" />
      <el-table-column prop="result" label="结果" />
      <el-table-column label="操作" fixed="right" width="100">
        <template slot-scope="scope">
          <el-button size="mini" type="text" @click="copy(scope.row)"
            :loading="scope.row.btnLoading" v-has="'btn_Execute'">数据同步
          </el-button>
        </template>
      </el-table-column>
    </JNPF-table>
  </div>
</template>

<script>
import { getDataSourceListAll, Execute } from '@/api/systemData/dataSource'
import { DataModelList } from '@/api/systemData/dataModel'
export default {
  name: 'systemData-dataSync',
  data() {
    return {
      key: '',
      dataForm: {
        dbConnectionFrom: '',
        dbConnectionTo: ''
      },
      options: [{
        label: 'SqlServer',
        children: []
      }, {
        label: 'MySql',
        children: []
      }, {
        label: 'Oracle',
        children: []
      }],
      dataRule: {
        dbConnectionFrom: [
          { required: true, message: '数据库连接 From不能为空', trigger: 'blur' }
        ],
        dbConnectionTo: [
          { required: true, message: '数据库连接 To不能为空', trigger: 'blur' }
        ]
      },
      list: [],
      listLoading: false
    }
  },
  created() {
    this.initData()
  },
  methods: {
    initData() {
      getDataSourceListAll().then(res => {
        for (let i = 0; i < res.data.list.length; i++) {
          const element = res.data.list[i];
          if (element.dbType == 'SqlServer') {
            this.options[0].children.push(element)
          } else if (element.dbType == 'MySql') {
            this.options[1].children.push(element)
          } else if (element.dbType == 'Oracle') {
            this.options[2].children.push(element)
          }
        }
        this.options = this.options.filter(o => o.children.length)
      })
    },
    check() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          if (this.dataForm.dbConnectionFrom === this.dataForm.dbConnectionTo) {
            this.$message({
              message: '不能已数据库连接 From 相同',
              type: 'error',
              duration: 1000,
            })
            return
          }
          this.listLoading = true
          DataModelList(this.dataForm.dbConnectionFrom).then((res) => {
            this.list = res.data.list
            for (let i = 0; i < this.list.length; i++) {
              const e = this.list[i];
              this.$set(this.list[i], 'result', '')
              this.$set(this.list[i], 'btnLoading', false)
            }
            this.listLoading = false
          })
        }
      })
    },
    copy(row) {
      row.btnLoading = true
      row.result = ''
      let data = {
        dbConnectionFrom: this.dataForm.dbConnectionFrom,
        dbConnectionTo: this.dataForm.dbConnectionTo,
        dbTable: row.table
      }
      Execute(data).then((res) => {
        row.result = res.msg
        row.btnLoading = false
      }).catch(() => {
        row.btnLoading = false
      })
    }
  }
}
</script>
