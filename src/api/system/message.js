import request from '@/utils/request'

// 获取消息中心列表
export function getMessageList(data) {
  return request({
    url: `/api/system/Message`,
    method: 'GET',
    data
  })
}
// 全部已读
export function MessageAllRead() {
  return request({
    url: '/api/system/Message/Actions/ReadAll',
    method: 'POST'
  })
}
// 查看消息内容
export function ReadInfo(id) {
  return request({
    url: `/api/system/Message/ReadInfo/${id}`,
    method: 'get'
  })
}
// 删除消息
export function MessageDeleteRecord(data) {
  return request({
    url: `/api/system/Message/Record`,
    method: 'DELETE',
    data
  })
}
// 获取系统公告列表
export function getNoticeList(data) {
  return request({
    url: '/api/system/Message/Notice',
    method: 'GET',
    data
  })
}
// 添加公告
export function createNotice(data) {
  return request({
    url: '/api/system/Message',
    method: 'POST',
    data
  })
}
// 修改公告
export function updateNotice(data) {
  return request({
    url: `/api/system/Message/${data.id}`,
    method: 'PUT',
    data
  })
}
// 获取/查看系统公告信息
export function getNoticeInfo(id) {
  return request({
    url: `/api/system/Message/${id}`,
    method: 'GET'
  })
}
// 删除公告
export function delNotice(id) {
  return request({
    url: `/api/system/Message/${id}`,
    method: 'DELETE'
  })
}
// 发布公告
export function releaseNotice(id) {
  return request({
    url: `/api/system/Message/${id}/Actions/Release`,
    method: 'PUT'
  })
}
