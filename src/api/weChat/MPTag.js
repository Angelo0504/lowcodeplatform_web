import request from '@/utils/request'
// 获取标签列表
export function MPTagList() {
  return request({
    url: `/api/WeChat/MPTag`,
    method: 'get'
  })
}
// 获取标签树
export function TagsTree() {
  return request({
    url: `/api/WeChat/MPTag/Tree`,
    method: 'get'
  })
}
// (待定)列表
export function Tags() {
  return request({
    url: `/api/WeChat/MPTag/Tags`,
    method: 'get'
  })
}
// 创建标签
export function CreateTag(fullName) {
  return request({
    url: `/api/WeChat/MPTag`,
    method: 'post',
    data: { fullName }
  })
}
// 更新标签
export function UpdateTag(data) {
  return request({
    url: `/api/WeChat/MPTag/${data.id}`,
    method: 'PUT',
    data
  })
}
// 删除标签
export function DeleteTag(id) {
  return request({
    url: `/api/WeChat/MPTag/${id}`,
    method: 'DELETE'
  })
}
// 设置标签
export function SetTagged(data) {
  return request({
    url: `/api/WeChat/MPTag/Actions/SetTag`,
    method: 'post',
    data
  })
}