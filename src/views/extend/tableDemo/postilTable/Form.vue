<template>
  <el-dialog title="添加批注" :close-on-click-modal="false" :visible.sync="visible"
    class="JNPF-dialog JNPF-dialog_center" lock-scroll width="600px">
    <el-input v-model="text" placeholder="输入内容" type="textarea" :rows="3" />
    <el-timeline class="timeline">
      <el-timeline-item v-for="(item, index) in activities" :key="index">
        <div class="el-timeline-content">
          <p class="text">{{item.text}}</p>
          <p class="time">
            <span>{{item.userId}} 提交于 {{item.creatorTime}}</span>
            <span class="del" @click="handleDel(index)">
              <i class="el-icon-delete"></i>删除
            </span>
          </p>
        </div>
      </el-timeline-item>
    </el-timeline>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">{{$t('common.cancelButton')}}</el-button>
      <el-button type="primary" @click="dataFormSubmit()">发 送</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getPostil, TableExampleDeletePostil, SendPostil } from '@/api/extend/tableExample'
export default {
  data() {
    return {
      visible: false,
      id: 0,
      text: '',
      activities: []
    }
  },
  methods: {
    init(id) {
      this.id = id || 0
      this.visible = true
      this.$nextTick(() => {
        if (this.id) this.getList()
      })
    },
    getList() {
      getPostil(this.id).then(res => {
        this.activities = res.data.postilJson ? JSON.parse(res.data.postilJson) : []
      })
    },
    handleDel(index) {
      this.$confirm(this.$t('common.delTip'), this.$t('common.tipTitle'), {
        type: 'warning'
      }).then(() => {
        TableExampleDeletePostil(this.id, index).then(res => {
          this.activities.splice(index, 1);
          this.$message({ type: 'success', message: res.msg });
          this.$emit('refreshDataList')
        })
      }).catch(() => { });
    },
    dataFormSubmit() {
      if (!this.text) {
        this.$message({ message: '批注内容不能为空', type: 'error', duration: 1000 })
        return
      }
      SendPostil(this.id, { text: this.text }).then(res => {
        this.$message({
          message: res.msg,
          type: 'success',
          duration: 1500,
          onClose: () => {
            this.getList()
            this.text = ''
            this.$emit('refreshDataList')
          }
        })
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.timeline {
  padding-top: 30px;
}
>>> .el-timeline-content {
  p {
    padding: 0;
    margin: 0;
  }
  .text {
    line-height: 20px;
    margin-bottom: 10px;
    color: #475059;
    font-size: 14px;
  }
  .time {
    font-size: 12px;
    display: flex;
    justify-content: space-between;
    opacity: 0.6;
    .del {
      display: none;
      color: rgb(255, 91, 91);
      cursor: pointer;
      i {
        margin-right: 5px;
      }
    }
  }
  &:hover {
    .del {
      display: block;
    }
  }
}
</style>