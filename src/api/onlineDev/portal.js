import request from '@/utils/request'

// 获取门户列表
export function getPortalList(data) {
  return request({
    url: '/api/visualdev/Portal',
    method: 'get',
    data
  })
}
// 获取门户信息
export function getPortalInfo(id) {
  return request({
    url: `/api/visualdev/Portal/${id}`,
    method: 'get'
  })
}
// 删除门户
export function Delete(id) {
  return request({
    url: `/api/visualdev/Portal/${id}`,
    method: 'DELETE'
  })
}
// 修改门户
export function Update(data) {
  return request({
    url: `/api/visualdev/Portal/${data.id}`,
    method: 'PUT',
    data
  })
}
// 新建门户
export function Create(data) {
  return request({
    url: '/api/visualdev/Portal',
    method: 'post',
    data
  })
}
// 复制门户
export function Copy(id) {
  return request({
    url: `/api/visualdev/Portal/${id}/Actions/Copy`,
    method: 'POST'
  })
}
// 获取门户下拉框列表
export function getPortalSelector(type) {
  return request({
    url: '/api/visualdev/Portal/Selector',
    method: 'GET',
    data: { type }
  })
}
// 切换用户门户默认显示
export function SetDefault(id) {
  return request({
    url: `/api/visualdev/Portal/${id}/Actions/SetDefault`,
    method: 'PUT'
  })
}
// 获取门户展示数据(权限)
export function getAuthPortal(id) {
  return request({
    url: `/api/visualdev/Portal/${id}/auth`,
    method: 'GET'
  })
}
