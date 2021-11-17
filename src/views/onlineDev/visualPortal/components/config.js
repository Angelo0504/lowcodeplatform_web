// 基础控件 【左面板】
export const basicComponents = [{
    icon: 'icon-ym icon-ym-generator-todo',
    label: '我的待办',
    jnpfKey: 'todo',
    title: '我的待办',
    w: 6,
    h: 4,
    minW: 6,
    minH: 4,
    maxW: 12,
    maxH: 6
  },
  {
    icon: 'icon-ym icon-ym-generator-function',
    label: '常用功能',
    jnpfKey: 'commonFunc',
    title: '常用功能',
    list: [
      { fullName: "功能设计", id: "85cd7bca426e49ce83a061bf461b1447", urlAddress: "OnlineDev/WebDesign", icon: "icon-ym icon-ym-webDesign", iconBackgroundColor: "#FF3B3B" },
      { fullName: "流程设计", id: "fe0150960dd542ec9328067e4495074b", urlAddress: "WorkFlow/FlowEngine", icon: "icon-ym icon-ym-flowDesign", iconBackgroundColor: "#7B1AE1" },
      { fullName: "权限管理", id: "9057d797550e4457b7ddf2456ce45882", urlAddress: "Permission/Authorize", icon: "icon-ym icon-ym-authorize", iconBackgroundColor: "#1890FF" },
      { fullName: "报表设计", id: "c7159f97177b420d9fc8ec8c74ae541b", urlAddress: "OnlineDev/DataReport", icon: "icon-ym icon-ym-reportDesign", iconBackgroundColor: "#F68900" },
      { fullName: "门户设计", id: "232d7226f00446d882e1e1bd999f7b2d", urlAddress: "OnlineDev/VisualPortal", icon: "icon-ym icon-ym-portalDesign", iconBackgroundColor: "#33B932" }
    ],
    w: 6,
    h: 4,
    minW: 6,
    minH: 4,
    maxW: 12,
    maxH: 6
  },
  {
    icon: 'icon-ym icon-ym-generator-notice',
    label: '公告通知',
    jnpfKey: 'notice',
    title: '公告通知',
    w: 4,
    h: 7,
    minW: 4,
    minH: 7,
    maxW: 12,
    maxH: 7
  },
  {
    icon: 'icon-ym icon-ym-generator-email',
    label: '未读邮件',
    jnpfKey: 'email',
    title: '未读邮件',
    w: 4,
    h: 7,
    minW: 4,
    minH: 7,
    maxW: 12,
    maxH: 7
  },
  {
    icon: 'icon-ym icon-ym-generator-todolist',
    label: '待办事项',
    jnpfKey: 'todoList',
    title: '待办事项',
    w: 4,
    h: 7,
    minW: 4,
    minH: 7,
    maxW: 12,
    maxH: 7
  },
  {
    icon: 'icon-ym icon-ym-generator-Panel',
    label: '数据计算',
    jnpfKey: 'dataBoard',
    list: [
      { fullName: "新增客户（个）", num: 262, icon: "icon-ym icon-ym-wf-contractApproval" },
      { fullName: "新增商机（个）", num: 199, icon: "icon-ym icon-ym-wf-outgoingApply" },
      { fullName: "合同金额（元）", num: 1236263.05, icon: "icon-ym icon-ym-wf-payDistribution" },
      { fullName: "回款金额（元）", num: 6223.23, icon: "icon-ym icon-ym-wf-incomeRecognition" }
    ],
    w: 12,
    h: 3,
    minW: 12,
    minH: 3,
    maxW: 12,
    maxH: 6
  }
]
// 图表控件 【左面板】
export const chartComponents = [{
    icon: 'icon-ym icon-ym-generator-bar',
    label: '柱状图',
    jnpfKey: 'barChart',
    title: '柱状图',
    option: {
      color: ['#1890ff'],
      title: {
        text: '',
        subtext: '',
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [{
        type: 'category',
        data: ['1月', '2月', '3月', '4月', '5月', '6月'],
        axisTick: { alignWithLabel: true }
      }],
      yAxis: [{ type: 'value' }],
      series: [{
        name: '销售量',
        type: 'bar',
        barWidth: '60%',
        data: [1012, 500, 800, 868, 653, 372]
      }]
    },
    w: 6,
    h: 8,
    minW: 4,
    minH: 8,
    maxW: 12,
    maxH: 20
  },
  {
    icon: 'icon-ym icon-ym-generator-pie',
    label: '饼图',
    jnpfKey: 'pieChart',
    title: '饼图',
    option: {
      title: {
        text: '天气情况统计',
        subtext: '虚构数据',
        left: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      legend: {
        // orient: 'vertical',
        // top: 'middle',
        bottom: 10,
        left: 'center',
        data: ['西凉', '益州', '兖州', '荆州', '幽州']
      },
      series: [{
        type: 'pie',
        radius: '65%',
        center: ['50%', '50%'],
        selectedMode: 'single',
        data: [{ value: 1548, name: '幽州', itemStyle: { color: '#1890ff' } },
          { value: 535, name: '荆州', itemStyle: { color: '#ff3b3b' } },
          { value: 510, name: '兖州', itemStyle: { color: '#7b1ae1' } },
          { value: 634, name: '益州', itemStyle: { color: '#f68900' } },
          { value: 735, name: '西凉', itemStyle: { color: '#33b932' } }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }]
    },
    w: 6,
    h: 8,
    minW: 4,
    minH: 8,
    maxW: 12,
    maxH: 20
  },
  {
    icon: 'icon-ym icon-ym-generator-line',
    label: '折线图',
    jnpfKey: 'lineChart',
    title: '折线图',
    option: {
      title: {
        text: ''
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      },
      yAxis: {
        type: 'value'
      },
      series: [{
          name: '邮件营销',
          type: 'line',
          stack: '总量',
          data: [120, 132, 101, 134, 90, 230, 210],
          itemStyle: { color: '#33b932' }
        },
        {
          name: '联盟广告',
          type: 'line',
          stack: '总量',
          data: [220, 182, 191, 234, 290, 330, 310],
          itemStyle: { color: '#ff3b3b' }
        },
        {
          name: '视频广告',
          type: 'line',
          stack: '总量',
          data: [150, 232, 201, 154, 190, 330, 410],
          itemStyle: { color: '#7b1ae1' }
        },
        {
          name: '直接访问',
          type: 'line',
          stack: '总量',
          data: [320, 332, 301, 334, 390, 330, 320],
          itemStyle: { color: '#1890ff' }
        },
        {
          name: '搜索引擎',
          type: 'line',
          stack: '总量',
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          itemStyle: { color: '#f68900' }
        }
      ]
    },
    w: 6,
    h: 8,
    minW: 4,
    minH: 8,
    maxW: 12,
    maxH: 20
  },
  {
    icon: 'icon-ym icon-ym-generator-annular',
    label: '环形图',
    jnpfKey: 'annularChart',
    title: '环形图',
    option: {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        left: 10,
        data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
      },
      series: [{
        name: '访问来源',
        type: 'pie',
        radius: ['50%', '70%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '30',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 335, name: '直接访问', itemStyle: { color: '#33b932' } },
          { value: 310, name: '邮件营销', itemStyle: { color: '#ff3b3b' } },
          { value: 234, name: '联盟广告', itemStyle: { color: '#7b1ae1' } },
          { value: 135, name: '视频广告', itemStyle: { color: '#f68900' } },
          { value: 1548, name: '搜索引擎', itemStyle: { color: '#1890ff' } }
        ]
      }]
    },
    w: 6,
    h: 8,
    minW: 4,
    minH: 8,
    maxW: 12,
    maxH: 20
  },
  {
    icon: 'icon-ym icon-ym-generator-area',
    label: '面积图',
    jnpfKey: 'areaChart',
    title: '面积图',
    option: {
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
        areaStyle: {
          color: '#d0e2f3'
        },
        itemStyle: {
          normal: {
            color: '#1890FF',
            lineStyle: { color: '#1890FF' }
          }
        },
      }]
    },
    w: 6,
    h: 8,
    minW: 4,
    minH: 8,
    maxW: 12,
    maxH: 20
  },
  {
    icon: 'icon-ym icon-ym-generator-radar',
    label: '雷达图',
    jnpfKey: 'radarChart',
    title: '雷达图',
    option: {
      title: {
        text: '雷达图'
      },
      tooltip: {},
      legend: {
        data: ['预算分配（Allocated Budget）', '实际开销（Actual Spending）']
      },
      radar: {
        shape: 'circle',
        name: {
          textStyle: {
            color: '#fff',
            backgroundColor: '#999',
            borderRadius: 3,
            padding: [3, 5]
          }
        },
        indicator: [
          { name: '销售（sales）', max: 6500 },
          { name: '管理（Administration）', max: 16000 },
          { name: '信息技术（Information Techology）', max: 30000 },
          { name: '客服（Customer Support）', max: 38000 },
          { name: '研发（Development）', max: 52000 },
          { name: '市场（Marketing）', max: 25000 }
        ]
      },
      series: [{
        name: '预算 vs 开销（Budget vs spending）',
        type: 'radar',
        // areaStyle: {normal: {}},
        data: [{
            value: [4300, 10000, 28000, 35000, 50000, 19000],
            name: '预算分配（Allocated Budget）',
            itemStyle: { color: '#ff3b3b' }
          },
          {
            value: [5000, 14000, 28000, 31000, 42000, 21000],
            name: '实际开销（Actual Spending）',
            itemStyle: { color: '#1890ff' }
          }
        ]
      }]
    },
    w: 6,
    h: 8,
    minW: 4,
    minH: 8,
    maxW: 12,
    maxH: 20
  }
]