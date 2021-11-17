<script>
import { NodeUtils } from "./util.js";
const isCondition = data => data.type === "condition" || (data.type === "approver" && data.isInterflow);
const notEmptyArray = arr => Array.isArray(arr) && arr.length > 0;
const hasBranch = data => notEmptyArray(data.conditionNodes);
const stopPro = ev => ev.stopPropagation();

function createNormalCard(ctx, conf, h) {
  const classList = ['flow-path-card']
  const afterTrue = (isTrue, name) => (isTrue && classList.push(name), isTrue)
  const isStartNode = afterTrue(NodeUtils.isStartNode(conf), 'start-node')
  const isApprNode = afterTrue(NodeUtils.isApproverNode(conf), 'approver')
  const isCopyNode = afterTrue(NodeUtils.isCopyNode(conf), 'copy')
  const isTimerNode = afterTrue(NodeUtils.isTimerNode(conf), 'timer')
  return (
    <section class={classList.join(' ')} onClick={this.eventLancher.bind(ctx, "edit", conf)} >
      <header class="header">
        <div class="title-box" style="height: 100%;width:190px;">
          <span class="title-text">{conf.properties.title}</span>
          {(!isStartNode && !isTimerNode) && (
            <input vModel_trim={conf.properties.title} class="title-input" onClick={stopPro} />
          )}
        </div>
        <div class="actions">
          <i class="el-icon-close icon" onClick={this.eventLancher.bind(ctx, "deleteNode", conf, ctx.data)} ></i>
        </div>
      </header>
      <div class="body">
        <span class="text">{conf.content}</span>
        {
          //  <div class="icon-wrapper right">
          //   <i class="el-icon-arrow-right icon right-arrow"></i>
          // </div>
        }
      </div>
    </section>
  );
}
// arg = ctx, data, h
const createFunc = (...arg) => createNormalCard.call(arg[0], ...arg)
let nodes = {
  start: createFunc,
  approver: createFunc,
  copy: createFunc,
  timer: createFunc,
  interflow: createFunc,
  empty: _ => '',
  condition: function (ctx, conf, h) {
    // <i
    //    class="el-icon-document-copy icon"
    //    onClick={this.eventLancher.bind(ctx, "copyNode", conf, ctx.data)}
    //  ></i>
    return (
      <section
        class="flow-path-card condition"
        onClick={this.eventLancher.bind(ctx, "edit", conf)}
      >
        <header class="header">
          <div class="title-box" style="height:20px;width:160px;">
            <span class="title-text">{conf.properties.title}</span>
            <input vModel_trim={conf.properties.title} class="title-input" onClick={stopPro} />
          </div>
          {
            // <span class="priority">优先级{conf.properties.priority + 1}</span> 
          }
          <div class="actions">
            <i class="el-icon-close icon" onClick={this.eventLancher.bind(ctx, "deleteNode", conf, ctx.data)}></i>
          </div>
        </header>
        <div class="body">
          <div class="text">{conf.content}</div>
        </div>
        {
          //  <div
          //   class="icon-wrapper left"
          //   onClick={ctx.eventLancher.bind(
          //     ctx,
          //     "increasePriority",
          //     conf,
          //     ctx.data
          //   )}
          // >
          // <i class="el-icon-arrow-left icon left-arrow"></i>
          // </div>
          //  <div
          //   class="icon-wrapper right"
          //   onClick={ctx.eventLancher.bind(
          //     ctx,
          //     "decreasePriority",
          //     conf,
          //     ctx.data
          //   )}
          // >
          //  <i class="el-icon-arrow-right icon right-arrow"></i>
          // </div>
        }
      </section>
    );
  }
};

function addNodeButton(ctx, data, h, isBranch = false) {
  // 只有非条件节点和条件分支树下面的那个按钮 才能添加新分支树
  let couldAddBranch = !hasBranch(data) || isBranch;
  let canAddAppendBranch = true
  let canAddAppendInterflow = true
  let canAddTimerNode = true
  if (Array.isArray(data.conditionNodes) && data.conditionNodes.length) {
    canAddAppendBranch = false
    canAddAppendInterflow = false
  }
  if (data.type === 'timer' || (data.childNode && data.childNode.type === 'timer')) {
    canAddTimerNode = false
  }
  let isEmpty = data.type === "empty";
  if (isEmpty && !isBranch) {
    return "";
  }
  return (
    <div class="add-node-btn-box flex justify-center">
      <div class="add-node-btn">
        <el-popover placement="right" trigger="click" width="330">
          <div class="condition-box">
            <div>
              <div class="condition-icon" onClick={ctx.eventLancher.bind(ctx, "addApprovalNode", data, isBranch)} >
                <i class="icon-ym icon-ym-flowCirculate"></i>
              </div>
              审批节点
            </div>

            {
              //   <div>
              //   <div class="condition-icon" onClick={ctx.eventLancher.bind(ctx, "addCopyNode", data, isBranch)} >
              //     <i class="iconfont icon-ym-workflow-flowcirculate" style="vertical-align: middle;"></i>
              //   </div>
              //   抄送人
              // </div>
            }

            <div class={{ 'condition-disabled': !canAddAppendBranch }}>
              <div class="condition-icon" onClick={this.eventLancher.bind(ctx, "appendBranch", data, isBranch, !canAddAppendBranch)}>
                <i class="ym-custom ym-custom-sitemap"></i>
              </div>
              条件分支
            </div>
            <div class={{ 'condition-disabled': !canAddAppendInterflow }}>
              <div class="condition-icon" onClick={this.eventLancher.bind(ctx, "appendInterflowBranch", data, isBranch, !canAddAppendInterflow)}>
                <i class="icon-ym icon-ym-node"></i>
              </div>
              分流/合流
            </div>
            <div class={{ 'condition-disabled': !canAddTimerNode }}>
              <div class="condition-icon" onClick={ctx.eventLancher.bind(ctx, "addTimerNode", data, isBranch, !canAddTimerNode)} >
                <i class="el-icon-timer" style="vertical-align: middle;"></i>
              </div>
              定时器
            </div>
          </div>

          <button class="btn" type="button" slot="reference">
            <i class="el-icon-plus icon"></i>
          </button>
        </el-popover>
      </div>
    </div>
  );
}

function NodeFactory(ctx, data, h) {
  if (!data) return
  const showErrorTip = ctx.verifyMode && NodeUtils.checkNode(data) === false
  let res = [],
    branchNode = "",
    content = NodeUtils.isConditionNode(data) ? "未设置条件" : "未设置审批人",
    selfNode = (
      <div class="node-wrap">
        <div class={`node-wrap-box ${data.type} ${NodeUtils.isInterflowNode(data) ? 'interflow' : ''} ${showErrorTip ? 'error' : ''}`}>
          <el-tooltip content={content} placement="top" effect="dark">
            <div class="error-tip" onClick={this.eventLancher.bind(ctx, "edit", data)}>!!!</div>
          </el-tooltip>
          {nodes[data.type].call(ctx, ctx, data, h)}
          {addNodeButton.call(ctx, ctx, data, h)}
        </div>
      </div>
    );

  if (hasBranch(data)) {
    // 如果节点是数组 一定为条件分支 添加分支样式包裹
    // {data.childNode && NodeFactory.call(ctx, ctx, data.childNode, h)}
    if (NodeUtils.isConditionNode(data.conditionNodes[0])) {
      branchNode = (
        <div class="branch-wrap">
          <div class="branch-box-wrap">
            <div class="branch-box flex justify-center relative">
              <button onClick={this.eventLancher.bind(ctx, "appendConditionNode", data)}
                class="btn">
                添加条件
              </button>
              {data.conditionNodes.map(d => NodeFactory.call(ctx, ctx, d, h))}
            </div>
          </div>
          {addNodeButton.call(ctx, ctx, data, h, true)}
        </div>
      );
    }
    if (NodeUtils.isInterflowNode(data.conditionNodes[0])) {
      branchNode = (
        <div class="branch-wrap">
          <div class="branch-box-wrap">
            <div class="branch-box flex justify-center relative">
              <button onClick={this.eventLancher.bind(ctx, "appendInterflowNode", data)}
                class="btn">
                添加分流
              </button>
              {data.conditionNodes.map(d => NodeFactory.call(ctx, ctx, d, h))}
            </div>
          </div>
          {addNodeButton.call(ctx, ctx, data, h, true)}
        </div>
      );
    }
  }

  if (isCondition(data)) {
    return (
      <div class="col-box">
        <div class="center-line"></div>
        <div class="top-cover-line"></div>
        <div class="bottom-cover-line"></div>
        {selfNode}
        {branchNode}
        {NodeFactory.call(ctx, ctx, data.childNode, h)}
      </div>
    );
  }
  res.push(selfNode);
  branchNode && res.push(branchNode);
  data.childNode && res.push(NodeFactory.call(ctx, ctx, data.childNode, h));
  return res;
}

function addEndNode(h) {
  return <section class="end-node">流程结束</section>;
}

export default {
  props: {
    data: { type: Object, required: true },
    // 点击发布时需要校验节点数据完整性 此时打开校验模式
    verifyMode: { type: Boolean, default: true },
  },
  watch: {

  },
  methods: {
    /**
     *事件触发器 统筹本组件所有事件并转发到父组件中
     * @param { Object } 包含event（事件名）和args（事件参数）两个参数
     */
    eventLancher(event, ...args) {
      let list = ['appendBranch', 'appendInterflowBranch', 'addTimerNode']
      if (list.includes(event) && args[args.length - 2]) return
      // args.slice(0,-1) vue 会注入MouseEvent到最后一个参数 去除事件对象
      let param = { event, args: args.slice(0, -1) };
      this.$emit("emits", param);
    }
  },
  render(h) {
    return (
      <div style="display: inline-flex; flex-direction: column; align-items: center;">
        {this.data && NodeFactory.call(this, this, this.data, h)}
        {addEndNode(h)}
      </div>
    );
  }
};
</script>

<style lang="scss" scoped>
@import 'index.scss';
</style>