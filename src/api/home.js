import request from '@/utils/request'

// 获取我的待办
export function getFlowTodoCount() {
  return request({
    url: '/api/visualdev/Dashboard/FlowTodoCount',
    method: 'get'
  })
}
// 获取通知公告
export function getNotice() {
  return request({
    url: '/api/visualdev/Dashboard/Notice',
    method: 'get'
  })
}
// 获取未读邮件
export function getEmail() {
  return request({
    url: '/api/visualdev/Dashboard/Email',
    method: 'get'
  })
}
// 获取待办事项
export function getFlowTodo() {
  return request({
    url: '/api/visualdev/Dashboard/FlowTodo',
    method: 'get'
  })
}
// 获取我的待办事项
export function getMyFlowTodo() {
  return request({
    url: '/api/visualdev/Dashboard/MyFlowTodo',
    method: 'get'
  })
}
