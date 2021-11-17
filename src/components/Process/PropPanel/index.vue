
<template>
  <el-drawer size="550px" class="drawer JNPF-common-drawer" :visible.sync="visible" @close="cancel"
    v-if="properties" append-to-body :wrapperClosable="false">
    <!-- 标题 -->
    <header slot="title" class="header" v-if="value && value.type=='condition' && properties.title">
      <el-input size="mini" v-model="properties.title" style="z-index:9;max-width: 200px;">
      </el-input>
    </header>
    <header slot="title" class="header" v-else>{{properties.title}}</header>

    <!-- 条件  -->
    <section class="condition-pane pd-10" v-if="value && isConditionNode()">
      <el-row class="condition-list">
        <el-col :span="6" class="label">字段名称</el-col>
        <el-col :span="5">比较</el-col>
        <el-col :span="6">数据值</el-col>
        <el-col :span="5">逻辑</el-col>
        <el-col :span="2"></el-col>
      </el-row>
      <template v-for="(item, index) in pconditions">
        <el-row class="condition-list" :key="index">
          <el-col :span="6" class="label">
            <el-select v-model="item.field" placeholder="请选择"
              @change="fieldNameChange($event,item)">
              <el-option v-for="item in usedFormItems" :key="item.__vModel__"
                :label="item.__config__.label" :value="item.__vModel__">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="5">
            <el-select v-model="item.symbol" placeholder="请选择" @change="symbolChange($event,item)">
              <el-option v-for="item in symbolOptions" :key="item.value" :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="6">
            <el-input v-model="item.filedValue" placeholder="请输入内容"></el-input>
          </el-col>
          <el-col :span="5">
            <el-select v-model="item.logic" placeholder="请选择" @change="logicChange($event,item)">
              <el-option v-for="item in logicOptions" :key="item.value" :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="2"><i class="el-icon-delete" style="cursor: pointer;"
              @click="onDelCondition(index)"></i></el-col>
        </el-row>
      </template>
      <div style="padding-left:4px;margin-top:10px;">
        <el-button type="primary" size="small" icon="el-icon-plus" @click="addCondition()">添加条件
        </el-button>
      </div>
    </section>

    <!-- 定时器  -->
    <section class="condition-pane pd-10" v-if="value && isTimerNode()">
      <el-row style="padding: 10px;">
        <el-col :span="24" style="font-size: 14px;line-height:32px;color: #a5a5a5;">
          添加定时器后，审批节点将根据设置的时间流转</el-col>
        <el-col :span="24">
          <el-form label-position="top">
            <el-form-item label="时间设置">
              <!-- <el-switch v-model="properties.hasInitFunc" /> -->
              <div class="mb-10">
                <el-input-number :min="0" v-model="properties.day" :precision="0" />
                <span>天</span>
              </div>
              <div class="mb-10">
                <el-input-number :min="0" v-model="properties.hour" :precision="0" />
                <span>小时</span>
              </div>
              <div class="mb-10">
                <el-input-number :min="0" v-model="properties.minute" :precision="0" />
                <span>分钟</span>
              </div>
              <div>
                <el-input-number :min="0" v-model="properties.second" :precision="0" />
                <span>秒</span>
              </div>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </section>

    <!-- 发起人 -->
    <section class="approver-pane" style="height:100%;" v-if="value && isStartNode()">
      <el-tabs style="height:100%;">
        <el-tab-pane label="发起人">
          <el-row style="padding: 10px;">
            <el-col :span="4" style="font-size: 14px;line-height:32px">谁可以发起</el-col>
            <el-col :span="20" style="font-size: 14px;line-height:32px;margin-bottom:10px">
              默认所有人,需要设置请选择
            </el-col>
            <div class="option-box">
              <org-select ref="start-position-org" type="position" v-model="initiatePos"
                title="添加岗位" class="mb-10" buttonType="button" />
              <org-select ref="start-user-org" type="user" v-model="initiator" title="添加用户"
                buttonType="button" />
            </div>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="表单权限" name="formAuth">
          <div class="form-auth-table">
            <el-table :data="getFormOperates()" class="JNPF-common-table" size="mini">
              <el-table-column prop="name" label="表单字段" align="left"></el-table-column>
              <el-table-column prop="write" label="操作" align="center" width="200px">
                <template slot-scope="scope">
                  <el-checkbox v-model="scope.row.read">可见</el-checkbox>
                  <el-checkbox v-model="scope.row.write">可写</el-checkbox>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="流程事件">
          <el-form label-position="top" class="pd-10">
            <el-alert type="warning" :closable="false">
              <div slot="title" class="tips">
                <p>请求方式：GET</p>
                <p>请求参数：taskId、taskNodeId</p>
              </div>
            </el-alert>
            <el-form-item label="自定义发起事件">
              <el-switch v-model="properties.hasInitFunc" />
            </el-form-item>
            <template v-if="properties.hasInitFunc">
              <el-form-item label="发起事件请求路径">
                <el-input v-model="properties.initInterfaceUrl" placeholder="请输入接口地址" />
              </el-form-item>
            </template>
            <el-form-item label="自定义结束事件">
              <el-switch v-model="properties.hasEndFunc" />
            </el-form-item>
            <template v-if="properties.hasEndFunc">
              <el-form-item label="结束事件请求路径">
                <el-input v-model="properties.endInterfaceUrl" placeholder="请输入接口地址" />
              </el-form-item>
            </template>
            <el-form-item label="自定义撤回事件">
              <el-switch v-model="properties.hasFlowRecallFunc" />
            </el-form-item>
            <template v-if="properties.hasFlowRecallFunc">
              <el-form-item label="撤回事件请求路径">
                <el-input v-model="properties.flowRecallInterfaceUrl" placeholder="请输入接口地址" />
              </el-form-item>
            </template>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </section>
    <!-- 审批人 -->
    <section class="approver-pane" style="height:100%;" v-if="value && isApproverNode()">
      <el-tabs v-model="activeName" style="height:100%;">
        <el-tab-pane label="审批人" name="config">
          <div>
            <div style="padding: 10px;">
              <el-radio-group v-model="approverForm.assigneeType" style="line-height: 32px;"
                @change="resetOrgColl">
                <el-radio v-for="item in assigneeTypeOptions" :label="item.value" :key="item.value"
                  :disabled="item.disabled" class="radio-item">{{item.label}}</el-radio>
              </el-radio-group>
            </div>
            <div style="border-bottom: 1px solid #dcdfe6;padding-bottom: 1rem;">
              <div v-if="approverForm.assigneeType === 3" class="option-box"
                style="color: #a5a5a5;">发起人自己将作为审批人处理审批单</div>
              <div v-else-if="approverForm.assigneeType === 2" class="option-box"
                style="color: #a5a5a5;">发起人的部门主管将作为审批人处理审批单</div>
              <div v-else-if="approverForm.assigneeType === 1" class="option-box"
                style="color: #a5a5a5;">发起人主管将作为审批人处理审批单</div>
              <div v-else-if="approverForm.assigneeType === 7" class="option-box"
                style="color: #a5a5a5;">将由流程表单中的人员进行审批</div>
              <div v-else class="option-box">
                <org-select ref="approver-position-org" buttonType="button"
                  v-model="approverForm.approverPos" title="添加岗位" type="position"
                  @change="onOrgChange" class="mb-10" />
                <org-select ref="approver-user-org" buttonType="button"
                  v-model="approverForm.approvers" title="添加用户" @change="onOrgChange" />
              </div>
            </div>
            <el-form label-position="top" :model="approverForm" class="pd-10">
              <el-form-item label="节点名称" required>
                <el-input v-model="properties.title"></el-input>
              </el-form-item>
              <el-form-item label="进度选择" required>
                <el-select v-model="approverForm.progress" placeholder="请选择" style="width:100%">
                  <el-option v-for="item in progressOptions" :key="item" :label="item+'%'"
                    :value="item">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="驳回步骤">
                <el-select v-model="approverForm.rejectStep" placeholder="请选择" style="width:100%">
                  <el-option v-for="item in rejectStepOptions" :key="item.nodeId"
                    :label="item.properties.title" :value="item.nodeId">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="说明">
                <el-input v-model="approverForm.description" type="textarea" :rows="3"></el-input>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
        <el-tab-pane label="抄送人" name="copy">
          <div class="pd-10">
            <div class="option-box">
              <org-select ref="approver-copy-position-org" buttonType="button"
                v-model="approverForm.circulatePosition" title="添加抄送岗位" type="position"
                @change="onOrgChange" class="mb-10" />
              <org-select ref="approver-copy-user-org" buttonType="button"
                v-model="approverForm.circulateUser" title="添加抄送用户" @change="onOrgChange" />
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="表单权限" name="formAuth">
          <div class="form-auth-table">
            <el-table :data="getFormOperates()" class="JNPF-common-table" size="mini">
              <el-table-column prop="name" label="表单字段" align="left"></el-table-column>
              <el-table-column prop="write" label="操作" align="center" width="200px">
                <template slot-scope="scope">
                  <el-checkbox v-model="scope.row.read">可见</el-checkbox>
                  <el-checkbox v-model="scope.row.write">可写</el-checkbox>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="节点事件">
          <el-form label-position="top" :model="approverForm" class="pd-10">
            <el-alert type="warning" :closable="false">
              <div slot="title" class="tips">
                <p>请求方式：GET</p>
                <p>请求参数：taskId、taskNodeId、handleStatus(撤回事件无此参数)</p>
                <p>处理状态：0-拒绝、1-同意</p>
              </div>
            </el-alert>
            <el-form-item label="自定义审批事件">
              <el-switch v-model="approverForm.hasApproverFunc" />
            </el-form-item>
            <template v-if="approverForm.hasApproverFunc">
              <el-form-item label="审批事件请求路径">
                <el-input v-model="approverForm.approverInterfaceUrl" placeholder="请输入接口地址" />
              </el-form-item>
            </template>
            <el-form-item label="自定义撤回事件">
              <el-switch v-model="approverForm.hasRecallFunc" />
            </el-form-item>
            <template v-if="approverForm.hasRecallFunc">
              <el-form-item label="撤回事件请求路径">
                <el-input v-model="approverForm.recallInterfaceUrl" placeholder="请输入接口地址" />
              </el-form-item>
            </template>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </section>
    <div class="actions">
      <el-button size="small" @click="cancel">取消</el-button>
      <el-button size="small" type="primary" @click="confirm">确定</el-button>
    </div>
  </el-drawer>
</template>
<script>
import { NodeUtils } from "../FlowCard/util.js"
import { getDrawingList } from '@/components/Generator/utils/db'
import OrgSelect from '../OrgSelect'

const defaultInitForm = {
  hasInitFunc: false,
  initInterfaceUrl: '',
  initInterfaceType: 'GET',
  hasEndFunc: false,
  endInterfaceUrl: '',
  endInterfaceType: 'GET',
  hasFlowRecallFunc: false,
  flowRecallInterfaceUrl: ''
}
const defaultApproverForm = {
  approvers: [], // 审批人集合
  approverPos: [], // 审批角色集合
  assigneeType: 6, // 指定审批人
  formOperates: [], // 表单权限集合
  circulatePosition: [],   // 抄送角色集合
  circulateUser: [],  // 抄送人集合
  progress: '50',  // 进度
  rejectStep: '0',  // 驳回步骤
  description: '',  // 节点描述
  hasApproverFunc: false,
  approverInterfaceUrl: '',
  approverInterfaceType: 'GET',
  hasRecallFunc: false,
  recallInterfaceUrl: ''
}
const defaultStep = [{
  nodeId: '1',
  properties: { title: '上一审批人' }
}, {
  nodeId: '0',
  properties: { title: '发起人' }
}]
export default {
  props: [/*当前节点数据*/"value", /*整个节点数据*/"processData"],
  components: { OrgSelect },
  data() {
    return {
      visible: false,  // 控制面板显隐
      globalFormOperate: null,  // 统一设置节点表单权限
      titleInputVisible: false, // 是否显示标题输入框  startNode 不显示
      activeName: "config", // or formAuth  Tab面板key
      showingPCons: [], // 用户选择了得条件  被选中的才会被展示在面板上编辑
      pconditions: [], // 从vuex中获取的可以作为流程图条件的集合
      dialogVisible: false, // 控制流程条件选项Dialog显隐
      // 当前节点数据
      properties: {
        title: ''
      },
      // 发起人  start节点和condition节点需要
      initiator: [],
      initiatePos: [],
      priorityLength: 0, // 当为条件节点时  显示节点优先级选项的数据
      useDirectorProxy: true, // 找不到主管时 上级主管代理审批
      directorLevel: 1,  // 审批主管级别
      startForm: {
        formOperates: []
      },
      approverForm: JSON.parse(JSON.stringify(defaultApproverForm)),
      assigneeTypeOptions: [
        {
          label: '部门主管',
          value: 2
        },
        {
          label: '发起者主管',
          value: 1
        },
        {
          label: '发起者本人',
          value: 3
        },
        {
          label: '加签',
          value: 7
        },
        {
          label: '或签（一名审批人同意或拒绝即可）',
          value: 6
        },
        {
          label: '会签（需所有审批人同意）',
          value: 8
        }],
      rejectStepOptions: [],
      progressOptions: ['10', '20', '30', '40', '50', '60', '70', '80', '90', '100'],
      symbolOptions: [
        {
          label: '大于等于',
          value: ">="
        },
        {
          label: '大于',
          value: ">"
        },
        {
          label: '等于',
          value: "=="
        },
        {
          label: '小于等于',
          value: "<="
        },
        {
          label: '小于',
          value: "<"
        },
        {
          label: '不等于',
          value: "<>"
        }],
      logicOptions: [
        {
          label: '并且',
          value: "&&"
        },
        {
          label: '或者',
          value: "||"
        }],
    };
  },
  computed: {
    // 未使用的条件个数
    notUseConNum() {
      // 发起人是默认就有得  所以需要加 1
      return this.pconditions.length - this.showingPCons.length + 1;
    },
    usedFormItems() {
      let list = []
      const loop = (data, parent) => {
        if (!data) return
        if (data.__config__ && data.__config__.jnpfKey !== 'table' && data.__config__.children && Array.isArray(data.__config__.children)) {
          loop(data.__config__.children, data)
        }
        if (Array.isArray(data)) data.forEach(d => loop(d, parent))
        if (data.__vModel__ && data.__config__.jnpfKey !== 'table') list.push(data)
      }
      loop(getDrawingList())
      const formItems = list
      return formItems
    }
  },
  methods: {
    getFormOperates() {
      let res = []
      this.isApproverNode() && (res = this.approverForm.formOperates)
      this.isStartNode() && (res = this.startForm.formOperates)
      return res
    },
    resetOrgColl() {
      this.approverForm.approvers = []
      this.approverForm.approverPos = []
    },
    onOrgChange(data) {
      // console.log(data)
    },
    timeTangeLabel(item) {
      const index = ['fc-time-duration', 'fc-date-duration'].findIndex(t => t === item.tag)
      if (index > -1) {
        return '时长' + ['(小时)', '(天)'][index]
      } else {
        return item.label
      }
    },
    getAssignTypeLabel() {
      const res = this.assigneeTypeOptions.find(t => t.value === this.approverForm.assigneeType)
      return res ? res.label : ''
    },
    changeAllFormOperate(val) {
      const target = this.isStartNode() ? this.startForm : this.approverForm
      target.formOperates.forEach(t => t.formOperate = val)
    },
    // 是否可以显示当前条件组件
    couldShowIt(item, ...tag) {
      return tag.includes(item.tag) && this.showingPCons.includes(item.formId);
    },

    initFormOperates(target) {
      const formOperates = target.properties && target.properties.formOperates || []
      let res = []
      if (!formOperates.length) {
        let list = []
        const loop = (data, parent) => {
          if (!data) return
          if (data.__config__ && data.__config__.jnpfKey !== 'table' && data.__config__.children && Array.isArray(data.__config__.children)) {
            loop(data.__config__.children, data)
          }
          if (Array.isArray(data)) data.forEach(d => loop(d, parent))
          if (data.__vModel__) list.push(data)
        }
        loop(getDrawingList())
        const formItems = list
        if (this.isStartNode()) {
          res = formItems.map(t => ({
            id: t.__vModel__,
            name: t.__config__.label,
            required: t.__config__.required,
            read: true,
            write: true
          }))
        }
        if (this.isApproverNode()) {
          res = formItems.map(t => ({
            id: t.__vModel__,
            name: t.__config__.label,
            read: true,
            write: false
          }))
        }
      } else {
        res = formOperates
      }
      return res
    },
    initCopyNode() {
      // this.properties = this.value.properties
      this.properties = Object.assign(defaultInitForm, this.value.properties)
    },

    initStartNodeData() {
      this.initInitiator()
    },

    copyNodeConfirm() {
      this.$emit("confirm", this.properties, this.getOrgSelectLabel('copy') || '发起人自选');
      this.visible = false;
    },

    /**
     * 条件节点确认保存得回调
     */
    conditionNodeComfirm() {
      if (!this.exist()) return
      let nodeContent = ''
      this.properties.conditions = this.pconditions
      for (let i = 0; i < this.pconditions.length; i++) {
        const e = this.pconditions[i];
        nodeContent += `[${e.fieldName} ${e.symbol} ${e.filedValue}] ${i + 1 == this.pconditions.length ? '' : e.logicName}` + '\n'
      }
      this.$emit("confirm", this.properties, nodeContent || '请设置条件');
      this.visible = false;
    },

    getOrgSelectLabel(type) {
      return this.$refs[type + '-org']['selectedLabels']
    },
    /**
     * 开始节点确认保存
     */
    startNodeComfirm() {
      this.properties.initiator = this.initiator
      this.properties.initiatePos = this.initiatePos
      let content = '',
        initiatorText = this.getOrgSelectLabel('start-user'),
        initiatorPosText = this.getOrgSelectLabel('start-position')
      if (!initiatorText && !initiatorPosText) {
        content = "所有人"
      } else {
        content = initiatorPosText + (initiatorText && initiatorPosText ? ',' : '') + initiatorText
      }
      Object.assign(this.properties, this.startForm)
      this.$emit("confirm", this.properties, content);
      this.visible = false;
    },
    /**
     * 定时器节点确认保存
     */
    timerNodeComfirm() {
      let content = ''
      let { day, hour, minute, second } = this.properties
      if (!day && !hour && !minute && !second) {
        content = '请设置时间'
      } else {
        content = `将于${day ? day + '天' : ''}${hour ? hour + '小时' : ''}${minute ? minute + '分钟' : ''}${second ? second + '秒' : ''}后流转`
      }
      this.$emit("confirm", this.properties, content);
      this.visible = false;
    },
    /**
     * 审批节点确认保存
     */
    approverNodeComfirm() {
      if (!this.properties.title) {
        this.$message({
          message: '请输入节点名称',
          type: 'error',
        })
        return
      }
      const assigneeType = this.approverForm.assigneeType
      let content = ''
      if ([6, 8].includes(assigneeType)) {
        if (!this.approverForm.approvers.length && !this.approverForm.approverPos.length) {
          this.$message({
            message: '请设置审批人',
            type: 'error',
          })
          return
        }
        // approver
        let approverText = this.getOrgSelectLabel('approver-user'),
          approverPosText = this.getOrgSelectLabel('approver-position')
        content = approverPosText + (approverText && approverPosText ? ',' : '') + approverText
      } else {
        content = this.assigneeTypeOptions.find(t => t.value === assigneeType).label
      }
      // let copyContent = '', copyText = this.getOrgSelectLabel('approver-copy-user'),
      //   copyPosText = this.getOrgSelectLabel('approver-copy-position')
      // if (this.approverForm.circulatePosition.length || this.approverForm.circulateUser.length) {
      //   copyContent = '抄送:' + copyPosText + (copyText && copyPosText ? ',' : '') + copyText
      // }
      // let totalContent = '审批：' + content + copyContent
      let titleObj = {
        title: this.properties.title
      }
      Object.assign(this.properties, this.approverForm, titleObj)
      this.$emit("confirm", this.properties, content || '请设置审批人')
      this.visible = false

    },
    // 确认修改
    confirm() {
      this.isCopyNode() && this.copyNodeConfirm()
      this.isStartNode() && this.startNodeComfirm()
      this.isTimerNode() && this.timerNodeComfirm()
      this.isApproverNode() && this.approverNodeComfirm()
      this.isConditionNode() && this.conditionNodeComfirm()
    },
    // 关闭抽屉
    cancel() {
      setTimeout(() => {
        this.$emit("cancel");
        this.visible = false;
      }, 0)
    },
    /**
     * 删除流程条件
     */
    onDelCondition(index) {
      this.pconditions.splice(index, 1)
    },
    // 配合getPriorityLength 获取前一个节点条件数组长度 用于设置优先级
    getPrevData() {
      return NodeUtils.getPreviousNode(this.value.prevId, this.processData);
    },
    // 用于获取节点优先级范围
    getPriorityLength() {
      this.priorityLength = this.getPrevData().conditionNodes.length;
    },
    // 判断是否是条件节点
    isConditionNode() {
      return this.value ? NodeUtils.isConditionNode(this.value) : false;
    },
    /** 判断是否是审批节点*/
    isApproverNode() {
      return this.value ? NodeUtils.isApproverNode(this.value) : false;
    },

    isStartNode() {
      return this.value ? NodeUtils.isStartNode(this.value) : false;
    },
    isCopyNode() {
      return this.value ? NodeUtils.isCopyNode(this.value) : false
    },
    isTimerNode() {
      return this.value ? NodeUtils.isTimerNode(this.value) : false
    },
    // 初始化发起人节点
    initInitiator() {
      this.initiator = this.value.properties && this.value.properties.initiator
      this.initiatePos = this.value.properties && this.value.properties.initiatePos
      this.startForm.formOperates = this.initFormOperates(this.value)
    },
    /**
    * 初始化审批节点所需数据
    */
    initApproverNodeData() {
      this.assigneeTypeOptions[3].disabled = this.value.isInterflow
      this.activeName = 'config'
      Object.assign(this.approverForm, this.value.properties)
      this.getRejectStepOption()
      this.approverForm.formOperates = this.initFormOperates(this.value)
    },
    // 获取驳回步骤选项
    getRejectStepOption() {
      let list = [], _this = this
      const loop = data => {
        if (Array.isArray(data)) data.forEach(d => loop(d))
        if (data.type === 'approver') list.push(data)
        if (data.conditionNodes && Array.isArray(data.conditionNodes)) loop(data.conditionNodes)
        if (data.childNode) loop(data.childNode)
      }
      loop(this.processData)
      let realList = []
      for (let i = 0; i < list.length; i++) {
        if (list[i].nodeId === _this.value.nodeId) break
        realList.push(list[i])
      }
      this.rejectStepOptions = [...defaultStep, ...realList]
    },
    /**
     * 初始化条件节点数据
     */
    initConditionNodeData() {
      // 初始化条件表单数据
      let nodeConditions = this.value.properties && this.value.properties.conditions
      this.pconditions = nodeConditions
    },
    addCondition() {
      let item = {
        fieldName: '',
        symbolName: '',
        filedValue: '',
        logicName: '并且',
        field: '',
        symbol: '',
        logic: '&&',
      }
      this.pconditions.push(item)
    },
    fieldNameChange(val, item) {
      let obj = this.usedFormItems.filter(o => o.__vModel__ == val)[0]
      item.fieldName = obj.__config__.label
    },
    symbolChange(val, item) {
      let obj = this.symbolOptions.filter(o => o.value == val)[0]
      item.symbolName = obj.label
    },
    logicChange(val, item) {
      let obj = this.logicOptions.filter(o => o.value == val)[0]
      item.logicName = obj.label
    },
    // 条件字段验证
    exist() {
      let isOk = true;
      //  遍历数组，判断非空
      for (let i = 0; i < this.pconditions.length; i++) {
        const e = this.pconditions[i];
        if (!e.field) {
          this.$message({
            showClose: true,
            message: '字段名称不能为空',
            type: 'error',
            duration: 1000
          });
          isOk = false
          break
        }
        if (!e.symbol) {
          this.$message({
            showClose: true,
            message: '比较不能为空',
            type: 'error',
            duration: 1000
          });
          isOk = false
          break
        }
        if (!e.filedValue) {
          this.$message({
            showClose: true,
            message: '数据值不能为空',
            type: 'error',
            duration: 1000
          });
          isOk = false
          break
        }
      }
      return isOk;
    },
  },
  watch: {
    visible(val) {
      if (!val) {
        this.approverForm = JSON.parse(JSON.stringify(defaultApproverForm)) // 重置数据为默认状态
        return
      }
      this.isStartNode() && this.initStartNodeData()
      this.isApproverNode() && this.initApproverNodeData()
      this.isConditionNode() && this.initConditionNodeData()
    },
    value(newVal) {
      if (newVal && newVal.properties) {
        this.visible = true;
        this.properties = JSON.parse(JSON.stringify(newVal.properties));
        if (this.properties) {
          NodeUtils.isConditionNode(newVal) && this.getPriorityLength();
        }
      }
    }
  },
};
</script>
<style lang="scss">
.condition-dialog {
  .el-dialog__header {
    border-bottom: 1px solid #eee;
  }
}
</style>
<style lang="scss" scoped>
.tips p {
  line-height: 24px;
}
.drawer {
  >>> .el-drawer__body {
    padding-bottom: 62px;
    overflow: hidden;
  }

  >>> .el-tabs--top .el-tabs__item.is-top:nth-child(2) {
    padding-left: 20px;
  }

  >>> .el-tabs__item:focus {
    box-shadow: none !important;
  }

  >>> .el-tabs__header {
    margin-bottom: 0;
  }
}

.header {
  line-height: 28px;
}

.actions {
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 10px 20px 20px;
  width: 100%;
  box-sizing: border-box;
  text-align: right;
}

.radio-item {
  // width: 110px;
  padding: 5px;
}

.priority-select {
  width: 118px;
  position: absolute;
  right: 26px;
}

.form-auth-table {
  font-size: 14px;
  .auth-table-header {
    background: #fafafa;
    line-height: 40px;
  }
  .row {
    display: flex;
    align-items: center;
    line-height: 32px;
    padding: 8px 12px;
    border-bottom: 1px solid #efefef;
    &:hover {
      background: #f5f7fa;
    }
    .label {
      flex: 1;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;

      .required {
        color: #f2725e;
      }
    }
    .radio-group {
      flex: 2;
      display: flex;
      justify-content: space-between;
    }
  }
}

.approver-pane {
  overflow-y: auto;
  overflow-x: hidden;
  .option-box {
    font-size: 14px;
    padding-left: 1rem;
  }
}

.condition-pane {
  height: 100%;
  overflow: auto;
  overflow-x: hidden;
}
.condition-list {
  font-size: 14px;
  line-height: 36px;
  >>> .el-col {
    text-align: center;
    padding: 0 4px;
    .el-input,
    .el-select {
      width: 100%;
    }
  }
}
</style>