import request from '@/utils/request'

// 获取字段列表
export function getList(data) {
  return request({
    url: '/api/system/Base/CommonFields',
    method: 'get',
    data
  })
}
// 获取字段信息
export function getInfo(id) {
  return request({
    url: `/api/system/Base/CommonFields/${id}`,
    method: 'get'
  })
}
// 删除字段
export function Delete(id) {
  return request({
    url: `/api/system/Base/CommonFields/${id}`,
    method: 'DELETE'
  })
}
// 修改字段
export function Update(data) {
  return request({
    url: `/api/system/Base/CommonFields/${data.id}`,
    method: 'PUT',
    data
  })
}
// 新建字段
export function Create(data) {
  return request({
    url: '/api/system/Base/CommonFields',
    method: 'post',
    data
  })
}
