<script>
import FlowCard from "./FlowCard/Preview";
import { NodeUtils, getMockData } from "./FlowCard/util.js";

export default {
  name: 'Process',
  props: ['tabName', 'conf'],
  data() {
    let data = {}
    if (typeof this.conf === 'object' && this.conf !== null && JSON.stringify(this.conf) !== '{}') {
      data = Object.assign(NodeUtils.createNode('start'), this.conf)
    } else {
      data = getMockData()
    }
    return {
      data, // 流程图数据
      scaleVal: 100, // 流程图缩放比例 100%
      step: 5, // 缩放步长
      updateId: 0, // key值 用于模拟$forceUpdate
      activeData: null, // 被激活的流程卡片数据，用于属性面板编辑
      isProcessCmp: true,
      verifyMode: false
    };
  },
  methods: {
    // 给父级组件提供的获取流程数据得方法
    getData() {
      this.verifyMode = true
      if (NodeUtils.checkAllNode(this.data)) {
        return Promise.resolve({ formData: this.data })
      } else {
        return Promise.reject({ target: this.tabName })
      }
    },
    /**
     * 接收所有FlowCard事件触发
     * @param { Object } data - 含有event(事件名称)/args(参数)两个属性
     */
    eventReciver({ event, args }) {
      if (event === "edit") {
        this.activeData = args[0]; // 打开属性面板
        return;
      }
      // 本实例只监听了第一层数据（startNode）变动
      // 为了实时更新  采用$forceUpdate刷新 但是由于某些条件下触发失效（未排除清除原因）
      // 使用key + 监听父组件updateId方式强制刷新
      NodeUtils[event](...args);
      this.forceUpdate();
    },

    forceUpdate() {
      this.updateId = this.updateId + 1;
    },
    /**
     * 控制流程图缩放
     * @param { Object } val - 缩放增量 是step的倍数 可正可负
     */
    changeScale(val) {
      if (this.scaleVal > 0 && this.scaleVal < 200) {
        // 缩放介于0%~200%
        this.scaleVal += val;
      }
    },
    /**
     * 属性面板提交事件
     * @param { Object } value - 被编辑的节点的properties属性对象
     */
    onPropEditConfirm(value, content) {
      this.activeData.content = content || '请设置条件'
      let oldProp = this.activeData.properties;
      this.activeData.properties = value;
      // 修改优先级
      if (NodeUtils.isConditionNode(this.activeData)) {
        value.priority !== oldProp.priority
          && NodeUtils.resortPrioByCNode(
            this.activeData,
            oldProp.priority,
            this.data
          );
        NodeUtils.setDefaultCondition(this.activeData, this.data)
      }
      if (NodeUtils.isStartNode(this.activeData)) this.$emit('startNodeChange', this.data)
      this.onClosePanel();
      this.forceUpdate();
    },
    /**
     * 属性面板取消事件
     */
    onClosePanel() {
      this.activeData = null;
    },

    // 传formIds 查询指定组件 未传时  判断所有组件
    isFilledPCon(formIds) {
      let res = false
      const loopChild = (parent, callback) => parent.childNode && loop(parent.childNode, callback)
      const loop = (data, callback) => {
        if (res || !data) return // 查找到就退出
        if (Array.isArray(data.conditionNodes)) {
          const uesd = data.conditionNodes.some(c => {
            const cons = c.properties.conditions || []
            return Array.isArray(formIds)
              ? cons.some(item => formIds.includes(item.formId)) // 查询特定组件
              : cons.length > 0 // 只要有节点设置了条件 说明就有组件作为条件被使用
          })
          uesd ? callback() : data.conditionNodes.forEach(t => loopChild(t, callback))
        }
        loopChild(data, callback)
      }
      loop(this.data, () => res = true)
      return res
    }
  },
  render: function (h) {
    return (
      <div class="flow-container flow-container-preview">
        <div class="scale-slider">
          <i class="btn el-icon-minus"
            onClick={this.changeScale.bind(this, -this.step)}></i>
          <span style="font-size:14px;">{this.scaleVal}%</span>
          <i class="btn el-icon-plus"
            onClick={this.changeScale.bind(this, this.step)}></i>
        </div>
        <div class="tips">
          <div class="tips-item"><span class="icon success">●</span>已完成</div>
          <div class="tips-item"><span class="icon current">●</span>进行中</div>
          <div class="tips-item"><span class="icon">●</span>无/未处理</div>
        </div>
        <FlowCard
          verifyMode={this.verifyMode}
          key={this.updateId}
          data={this.data}
          onEmits={this.eventReciver}
          style={{ transform: `scale(${this.scaleVal / 100})` }}
        />
      </div>
    );
  }
};
</script>

<style scoped lang="scss">
$bg-color: #fff;

.flow-container {
  display: inline-block;
  background: $bg-color;
  width: 100%;
  box-sizing: border-box;
  text-align: center;
  overflow: auto;
  &.flow-container-preview {
    >>> .branch-wrap {
      .branch-box {
        background: $bg-color;

        > .col-box {
          &:first-of-type {
            &::before,
            &::after {
              background: $bg-color !important;
            }
          }
          &:last-of-type {
            &::before,
            &::after {
              background: $bg-color;
            }
          }
        }
      }
    }
    >>> .node-wrap-box.approver::before {
      background: #fff;
    }
    >>> .flow-path-card {
      &:hover {
        .title-text {
          border-bottom: none;
        }
      }
      &.condition:hover,
      &.timer:hover {
        box-shadow: 0 0 0 2px #b6b6b6, 0 0 5px 4px rgb(0 0 0 / 20%);
      }
      &.start-node,
      &.approver {
        &:hover {
          box-shadow: 0 0 0 2px #b6b6b6, 0 0 5px 4px rgb(0 0 0 / 20%);
        }
        .header {
          background-color: #b6b6b6;
        }
      }
      &.state-past {
        .header {
          background-color: #67c23a;
        }
        &:hover {
          box-shadow: 0 0 0 2px #67c23a, 0 0 5px 4px rgb(103 194 58 / 20%);
        }
      }
      &.state-curr {
        .header {
          background-color: #1890ff;
        }
        &:hover {
          box-shadow: 0 0 0 2px #1890ff, 0 0 5px 4px rgb(24 144 255 / 20%);
        }
      }
    }
  }
}

.scale-slider {
  position: fixed;
  right: 10px;
  z-index: 199;

  .btn {
    display: inline-block;
    padding: 4px;
    border: 1px solid #cacaca;
    border-radius: 3px;
    background: #fff;
    margin-left: 10px;
    margin-right: 10px;
    cursor: pointer;
  }
}
.tips {
  position: absolute;
  left: 20px;
  top: 0px;
  z-index: 199;
  text-align: left;
  .tips-item {
    line-height: 20px;
    font-size: 16px;
    display: inline-block;
    margin-right: 15px;
    .icon {
      font-size: 20px;
      margin-right: 5px;
      color: #b6b6b6;
      &.success {
        color: #67c23a;
      }
      &.current {
        color: #1890ff;
      }
    }
  }
}
</style>