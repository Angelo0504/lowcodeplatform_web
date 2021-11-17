<template>
  <div class="fieldFrom">
    <div class="JNPF-common-title" style="border:none">
      <h2>表单地址</h2>
    </div>
    <el-input :value="`workFlow/workFlowForm/${enCode}/index.vue`" disabled />
    <div class="JNPF-common-title">
      <h2>字段设置</h2>
    </div>
    <el-table :data="drawingList" size='mini'>
      <el-table-column type="index" width="50" label="序号" align="center" />
      <el-table-column prop="filedName" label="名称">
        <template slot-scope="scope">
          <el-input v-model="scope.row.filedName" placeholder="输入名称"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="filedId" label="字段">
        <template slot-scope="scope">
          <el-input v-model="scope.row.filedId" placeholder="输入字段"></el-input>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="required" label="必填" width="50">
        <template slot-scope="scope">
          <el-checkbox :checked="scope.row.required"
            @change='scope.row.required?scope.row.required=false:scope.row.required=true' />
        </template>
      </el-table-column> -->
      <el-table-column label="操作" width="50">
        <template slot-scope="scope">
          <el-button size="mini" type="text" class="JNPF-table-delBtn"
            @click="handleDel(scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="table-actions" @click="addHandle()">
      <el-button type="text" icon="el-icon-plus">新增字段</el-button>
    </div>
  </div>
</template>

<script>
import { deepClone } from '@/utils'
import { saveDrawingList } from '@/components/Generator/utils/db'
import { debounce } from 'throttle-debounce'
export default {
  props: ['conf', 'enCode'],
  data() {
    return {
      drawingList: [],
      saveDrawingListDebounce: debounce(340, saveDrawingList),
      isDrawingListChange: true
    }
  },
  watch: {
    conf(val) { },
    drawingList: {
      handler(val) {
        let list = val.map(o => ({
          __config__: {
            label: o.filedName,
            required: o.required || false
          },
          __vModel__: o.filedId
        }))
        this.saveDrawingListDebounce(list)
        if (!this.isDrawingListChange) {
          this.isDrawingListChange = true
          return
        }
        this.$emit('drawingListChange')
      },
      deep: true
    },
  },
  created() {
    if (typeof this.conf === 'object' && this.conf !== null) {
      this.isDrawingListChange = false
      this.drawingList = deepClone(this.conf)
    }
  },
  methods: {
    /**
      * 供父组件使用 获取表单JSON
    */
    getData() {
      return new Promise((resolve, reject) => {
        if (!this.exist()) return
        if (!this.drawingList.length) {
          reject({ msg: '表单列表不允许为空', target: 1 })
          return
        }
        resolve({ formData: this.drawingList, target: 1 })
      })
    },
    // 验证
    exist() {
      let isOk = true;
      //  遍历数组，判断非空
      for (let i = 0; i < this.drawingList.length; i++) {
        const e = this.drawingList[i];
        if (!e.filedName) {
          this.$message({
            showClose: true,
            message: '名称不能为空',
            type: 'error',
            duration: 1000
          });
          isOk = false
          break
        }
        let num = this.drawingList.filter(o => o.filedName == e.filedName)
        if (num.length > 1) {
          this.$message({
            showClose: true,
            message: `名称'${e.filedName}'已重复`,
            type: 'error',
            duration: 1000
          });
          isOk = false
          break
        }
        if (!e.filedId) {
          this.$message({
            showClose: true,
            message: '字段不能为空',
            type: 'error',
            duration: 1000
          });
          isOk = false
          break
        }
        let idnum = this.drawingList.filter(o => o.filedId == e.filedId)
        if (idnum.length > 1) {
          this.$message({
            showClose: true,
            message: `字段'${e.filedId}'已重复`,
            type: 'error',
            duration: 1000
          });
          isOk = false
          break
        }
      }
      return isOk;
    },
    handleDel(index, row) {
      this.drawingList.splice(index, 1);
    },
    addHandle() {
      let item = { filedName: "", filedId: "", required: false }
      this.drawingList.push(item)
    }
  }
}
</script>