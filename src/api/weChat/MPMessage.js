import request from '@/utils/request'

// 获取消息列表
export function MPMessageList(data) {
  return request({
    url: `/api/WeChat/MPMessage`,
    method: 'get',
    data
  })
}
// 获取公众号用户列表
export function TreeViewUsers() {
  return request({
    url: `/api/WeChat/MPMessage/Users`,
    method: 'get'
  })
}
// 预览
export function Preview(openId, data) {
  return request({
    url: `/api/WeChat/MPMessage/${openId}/Actions/Preview`,
    method: 'post',
    data
  })
}
// 消息发送
export function Sent(data) {
  return request({
    url: `/api/WeChat/MPMessage`,
    method: 'post',
    data
  })
}