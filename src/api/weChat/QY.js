import request from '@/utils/request'

// 获取列表
export function QYDepartmentList(data) {
  return request({
    url: '/api/WeChat/QYDepartment',
    method: 'get',
    data
  })
}
// 同步部门
export function QYDSynchronization() {
  return request({
    url: `/api/WeChat/QYDepartment/Actions/Synchronization`,
    method: 'post'
  })
}
// 获取用户列表(带分页)
export function QYUserList(data) {
  return request({
    url: '/api/WeChat/QYUser',
    method: 'get',
    data
  })
}
// 同步用户
export function QYUserSynchronization() {
  return request({
    url: `/api/WeChat/QYUser/Actions/Synchronization`,
    method: 'post'
  })
}
// 获取消息列表
export function QYMessageList(data) {
  return request({
    url: '/api/WeChat/QYMessage',
    method: 'get',
    data
  })
}
// 获取企业号用户列表
export function getQYUsers() {
  return request({
    url: '/api/WeChat/QYMessage/Users',
    method: 'GET'
  })
}
// 发送消息
export function Sent(data) {
  return request({
    url: '/api/WeChat/QYMessage',
    method: 'post',
    data
  })
}