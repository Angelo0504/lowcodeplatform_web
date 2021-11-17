// 基础路由
const baseRouter = [{
    path: '/home',
    component: (resolve) => require(['@/views/dashboard'], resolve),
    name: 'home',
    meta: {
      title: 'home',
      icon: 'icon-ym icon-ym-nav-home',
      affix: true,
      zhTitle: '首页'
    }
  },
  {
    path: '/dashboard',
    component: (resolve) => require(['@/views/basic/dashboard'], resolve),
    name: 'dashboard',
    meta: {
      title: 'dashboard',
      icon: 'icon-ym icon-ym-generator-kanban',
      affix: true,
      zhTitle: '门户展示'
    }
  },
  {
    path: '/messageRecord',
    component: (resolve) => require(['@/views/basic/messageRecord'], resolve),
    name: 'messageRecord',
    meta: {
      title: 'messageRecord',
      affix: false,
      zhTitle: '消息中心',
      icon: 'icon-ym icon-ym-sysNotice',
    }
  },
  {
    path: '/previewModel',
    component: (resolve) => require(['@/views/basic/previewModel'], resolve),
    name: 'previewModel',
    meta: {
      title: 'previewModel',
      affix: false,
      zhTitle: '功能预览',
      icon: 'icon-ym icon-ym-btn-preview',
    }
  },
  {
    path: '/profile',
    component: (resolve) => require(['@/views/basic/profile'], resolve),
    name: 'profile',
    meta: {
      title: 'profile',
      affix: false,
      zhTitle: '个人信息',
      icon: 'icon-ym icon-ym-user',
    }
  }
]
export default baseRouter