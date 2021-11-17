<template>
  <div class="dashboard-editor-container">
    <div class="sale">
      <div class="sale_title">
        <span> 销售指数</span>
        <span>活动实时交易情况</span>
      </div>
      <ul class="sale_items">
        <li>
          <span>今日交易总额</span>
          <p class="nums">￥
            <count-to :start-val="0" :end-val="124546233" :duration="2600" class="card-panel-num" />
          </p>
          <span>+2.34%</span>
        </li>
        <li>
          <span>销售目标完成率</span>
          <p class="nums">
            <count-to :start-val=" 0 " :end-val="92" :duration="3600" class="card-panel-num" />%
          </p>
          <span>-0.3%</span>
        </li>
        <li>
          <span>活动剩余时间</span>
          <span>23:26:59</span>
          <span>活动时间48小时</span>
        </li>
        <li>
          <span>每秒交易总额</span>
          <p class="nums">￥
            <count-to :start-val="0" :end-val="2663" :duration="2600" class="card-panel-num" />
          </p>
          <span> +9.34%</span>
        </li>
        <li>
          <span> 在售商品总数</span>
          <p class="lastnums">
            <count-to :start-val="0" :end-val="569" :duration="2600" class="card-panel-num" />件
          </p>
        </li>
      </ul>
    </div>
    <panel-group />
    <el-row style="background:#fff;padding:0 16px;margin-bottom:10px;border-radius: 4px;">
      <div class="dateSelect">
        <el-date-picker v-model="value1" type="date" placeholder="选择日期" size="small">
        </el-date-picker>
      </div>
      <line-chart />
    </el-row>
    <el-row :gutter="10" class="notice">
      <el-col :span="12">
        <div class="notice_left">
          <div class="notice_title">
            <div class="title_left">
              <span>公告通知</span>
            </div>
            <div class="title_right">
              查看更多 >
            </div>
          </div>
          <div class="no_left_massage">
            <ul>
              <li v-for="(item,index) in massageList" :key="index">
                <p>{{item.title}}</p>
                <span class="time">{{item.listDate}}</span>
              </li>
            </ul>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="notice_right">
          <div class="notice_title">
            <div class="title_left">
              <span>进行中的项目</span>
            </div>
            <div class="title_right">
              查看更多 >
            </div>
          </div>
          <ul class="no_right_massage">
            <li>
              <div class="right_item lineb">
                <div class="right-top">
                  <img src="@/assets/images/home/Group.png" alt="">
                  <span>销售管理信息项目</span>
                </div>
                <p>销售管理信息项目是为全面提升企业市场占有率和竞争力，越来越多企业已经意识到上销售管理软件...</p>
                <div class="bt">
                  <span>项目组名： 超越超越卓尔不凡</span>
                  <span>5 小时前</span>
                </div>
              </div>
              <div class="right_item linet">
                <div class="right-top">
                  <img src="@/assets/images/home/Group.png" alt="">
                  <span>知识库管理搭建</span>
                </div>
                <p>知识库管理搭建是一个企业内部信息的汇总，建立知识库，对这些知识进行统一管理能够有效帮助企业提高...</p>
                <div class="bt">
                  <span>项目组名：快乐每一天</span>
                  <span>5 小时前</span>
                </div>
              </div>
            </li>
            <li>
              <div class="right_item">
                <div class="right-top">
                  <img src="@/assets/images/home/Group2.png" alt="">
                  <span>报表样式调整</span>
                </div>
                <p>报表引用UReport2是一款基于架构在Spring之上纯Java的高性能报表引擎，通过迭代单元格可以实现任意...</p>
                <div class="bt">
                  <span>项目组名： 超越超越卓尔不凡</span>
                  <span>5 小时前</span>
                </div>
              </div>
              <div class="right_item linet">
                <div class="right-top">
                  <img src="@/assets/images/home/Group3.png" alt="">
                  <span>企业门户平台</span>
                </div>
                <p>企业统一门户为企业提供一个统一入口访问企业各种资源信息，企业的员工、客户、合作伙伴和供应商等都可...</p>
                <div class="bt">
                  <span>项目组名：智慧成功人士</span>
                  <span>5 小时前</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </el-col>
    </el-row>
    <p class="componey">Copyright © 2021 引迈信息技术有限公司出品</p>
  </div>
</template>

<script>
import echarts from 'echarts'
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
import CountTo from 'vue-count-to'
export default {
  name: 'DashboardAdmin',
  components: {
    PanelGroup,
    LineChart,
    CountTo
  },
  data() {
    return {
      value1: '',
      charts: '',
      opinionData: ["3", "2", "4", "4", "5"],
      massageList: [
        { title: '【通知】中秋国庆双节放假通知', listDate: '2020-09-19' },
        { title: '【公告】你好朋友，感谢使用 JNPF快速开发平台新版本', listDate: '2020-09-18' },
        { title: '【通知】月饼发放通知，请各部门主管到行政部领取', listDate: '2020-09-17' },
        { title: '【公告】本季度销售之星名单公示', listDate: '2020-09-16' },
        { title: '【通知】公司上班时间调整通知，下月执行', listDate: '2020-09-15' },
        { title: '【公告】公司新上任总裁任命书', listDate: '2020-09-14' },
        { title: '【公告】午餐补贴通知，本月生效', listDate: '2020-09-13' },
        { title: '【通知】公司技术交流培训课通知', listDate: '2020-09-12' },
        { title: '【通知】关于公司组织员工秋季旅游通知', listDate: '2020-09-11' },
      ]
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.sale {
  background: #fff;
  margin-bottom: 10px;
  border-radius: 4px;
  .sale_title {
    padding-top: 16px;
    padding-left: 22px;
    span {
      &:first-child {
        font-size: 16px;
        font-weight: bold;
        color: #333;
      }
      &:nth-child(2) {
        color: #999;
        font-size: 12px;
      }
    }
  }
  .sale_items {
    display: flex;
    justify-content: space-around;
    padding: 34px 0;
    li {
      display: flex;
      flex-direction: column;
      text-align: center;
      .nums {
        font-size: 26px !important;
        padding-top: 13px;
        padding-bottom: 9px;
        color: #1890ff;
        font-weight: 600;
        span {
          font-size: 26px !important;
          padding-top: 13px;
          padding-bottom: 9px;
          color: #1890ff !important;
          font-weight: 600;
        }
      }
      .lastnums {
        font-size: 26px !important;
        padding-top: 13px;
        padding-bottom: 9px;
        font-weight: 600;
        color: #333;
      }
      &:first-child {
        span:last-child {
          color: #08b41f;
        }
      }
      &:nth-child(4) {
        span {
          &:last-child {
            color: #08b41f;
          }
        }
      }
      &:nth-child(2) {
        span {
          &:last-child {
            color: #b40808;
          }
        }
      }
      &:nth-child(3) {
        span {
          &:last-child {
            color: #999;
          }
        }
      }
      &:last-child {
        span {
          &:last-child {
            color: #000;
          }
        }
      }
      span {
        &:nth-child(2) {
          font-size: 26px !important;
          padding-top: 13px;
          padding-bottom: 9px;
          color: #1890ff;
          font-weight: 600;
        }
        &:nth-child(3) {
          font-size: 12px;
        }
      }
    }
  }
}
.notice {
  padding-bottom: 20px;
  .notice_title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    padding: 0 25px;
    .title_left {
      display: flex;
      align-items: center;
      span {
        font-size: 16px;
        font-weight: bold;
        color: #333;
      }
    }
    .title_right {
      font-size: 12px;
      color: #999;
      line-height: 30px;
    }
  }
  .notice_right {
    background: #fff;
    height: 400px;
    border-radius: 4px;
    overflow: hidden;
    .no_right_massage {
      li {
        display: flex;
        background: #fff;
        border: 1;
        height: 170px;
        border-top: 1px solid #f2f2f5;
        .right_item {
          width: 50%;
          padding: 16px 20px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .right-top {
            font-size: 14px;
            display: flex;
            align-items: center;
            img {
              margin-right: 10px;
            }
          }
          p {
            font-size: 14px;
            line-height: 22px;
            padding: 20px 0;
            color: #999;
            display: -webkit-box;
            line-clamp: 3;
            -webkit-line-clamp: 3;
            overflow: hidden;
            text-overflow: ellipsis;
            /*! autoprefixer: off */
            -webkit-box-orient: vertical;
            /* autoprefixer: on */
          }
          .bt {
            display: flex;
            justify-content: space-between;
            font-size: 12px;
            color: #999;
          }
        }
        .linet {
          border-left: 1px solid #f2f2f5;
        }
      }
    }
  }
  .notice_left {
    background: #fff;
    height: 400px;
    border-radius: 4px;
    overflow: hidden;
    .no_left_massage {
      height: 340px;
      padding: 10px 20px;
      border-top: 1px solid #f2f2f5;
      ul {
        li {
          display: flex;
          justify-content: space-between;
          font-size: 14px;
          color: #303133;
          padding: 10px 0;
          cursor: pointer;
          p {
            width: calc(100% - 80px);
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .time {
            width: 80px;
            display: inline-block;
            text-align: right;
            color: #999999;
          }
        }
      }
    }
  }
}

.componey {
  font-size: 14px;
  text-align: center;
  color: #999;
  padding-bottom: 10px;
}

.dashboard-editor-container {
  background-color: #ebeef5;
  position: relative;
  width: 100%;
  overflow: hidden;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 20px;
  }
}
.dateSelect {
  position: absolute;
  right: 67px;
  top: 38px;
  z-index: 100;
  .el-date-editor {
    width: 160px;
  }
}
@media (max-width: 1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>