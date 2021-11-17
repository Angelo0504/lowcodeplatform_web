import request from '@/utils/request'

// 获取公众号菜单列表
export function MPMenuList(data) {
  return request({
    url: '/api/WeChat/MPMenu',
    method: 'get',
    data
  })
}
// 获取公众号菜单下拉框列表
export function MPMenuListAll() {
  return request({
    url: '/api/WeChat/MPMenu/Selector',
    method: 'get'
  })
}
// 获取菜单信息
export function getMPMenuInfo(id) {
  return request({
    url: `/api/WeChat/MPMenu/${id}`,
    method: 'get'
  })
}
// 删除菜单
export function MPMenuDelete(id) {
  return request({
    url: `/api/WeChat/MPMenu/${id}`,
    method: 'DELETE'
  })
}
// 更新菜单
export function MPMenuUpdate(data) {
  return request({
    url: `/api/WeChat/MPMenu/${data.id}`,
    method: 'put',
    data
  })
}
// 新建菜单
export function MPMenuCreate(data) {
  return request({
    url: '/api/WeChat/MPMenu',
    method: 'post',
    data
  })
}