<template>
  <el-col :span="18" style="padding-left:20px; overflow: auto;">
    <el-timeline>
      <template v-for="(item, i) in list">
        <el-timeline-item :timestamp="item.handleTime | toDate()" placement="top" :key="i"
          v-if="item.handleStatus==2">
          <el-link :underline="false" type="primary" icon="icon-ym icon-ym-extend-pencil" slot="dot"
            class="timeline-icon" />
          <el-card>
            <p class="timeline-cell">发起人：{{item.userName}}</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item :timestamp="item.handleTime | toDate()" placement="top" :key="i"
          v-else-if="item.handleStatus==3">
          <el-link :underline="false" type="danger" icon="icon-ym icon-ym-extend-history" slot="dot"
            class="timeline-icon" />
          <el-card>
            <p class="timeline-cell">撤回节点：{{item.nodeName}}</p>
            <p class="timeline-cell">撤回人员：{{item.userName}}</p>
            <p class="timeline-cell">撤回原因：{{item.handleOpinion}}</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item :timestamp="item.handleTime | toDate()" placement="top" :key="i"
          v-else-if="item.handleStatus==4">
          <el-link :underline="false" type="danger" icon="icon-ym icon-ym-extend-minus-circle"
            slot="dot" class="timeline-icon" />
          <el-card>
            <p class="timeline-cell">终止人员：{{item.userName}}</p>
            <p class="timeline-cell">终止原因：{{item.handleOpinion}}</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item :timestamp="item.handleTime | toDate()" placement="top" :key="i" v-else>
          <el-link :underline="false" type="success" icon="icon-ym icon-ym-extend-check-circle-o"
            slot="dot" class="timeline-icon" v-if='item.handleStatus == 1' />
          <el-link :underline="false" type="danger" icon="icon-ym icon-ym-extend-clock" slot="dot"
            class="timeline-icon" v-else />
          <el-card>
            <el-row>
              <el-col :span='18'>
                <p class="timeline-cell">审核节点：{{item.nodeName}}</p>
              </el-col>
              <el-col :span='6'>
                <p class="timeline-cell" style="text-align:right">
                  <el-link :underline="false" type="success" v-if='item.handleStatus == 1'>审核通过
                  </el-link>
                  <el-link :underline="false" type="danger" v-else>审核拒绝</el-link>
                </p>
              </el-col>
            </el-row>
            <p class="timeline-cell">审核人员：{{item.userName}}</p>
            <p class="timeline-cell" v-if="item.handleOpinion">
              审核意见：{{item.handleOpinion}}</p>
          </el-card>
        </el-timeline-item>
      </template>
      <el-timeline-item :timestamp="endTime | toDate()" placement="top" v-if='endTime'>
        <el-link :underline="false" type="danger" icon="icon-ym icon-ym-extend-minus-circle"
          slot="dot" class="timeline-icon" />
        <el-card>
          <p class="timeline-cell">流程结束</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </el-col>
</template>

<script>
export default {
  props: {
    list: { type: Array, default: [] },
    endTime: { type: Number, default: 0 },
  },
  name: 'recordList'
}
</script>