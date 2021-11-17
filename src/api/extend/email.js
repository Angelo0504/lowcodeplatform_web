import request from '@/utils/request'

// 获取邮件列表(收件箱、标星件、草稿箱、已发送)
export function EmailList(data) {
  return request({
    url: '/api/extend/Email',
    method: 'get',
    data
  })
}
// 获取邮箱配置
export function ConfigInfo(data) {
  return request({
    url: '/api/extend/Email/Config',
    method: 'get',
    data
  })
}
// 获取邮件信息
export function EmailInfo(id) {
  return request({
    url: `/api/extend/Email/${id}`,
    method: 'get'
  })
}
// 删除邮件
export function Delete(id) {
  return request({
    url: `/api/extend/Email/${id}`,
    method: 'DELETE'
  })
}
// 设置已读邮件
export function ReceiveRead(id) {
  return request({
    url: `/api/extend/Email/${id}/Actions/Read`,
    method: 'PUT'
  })
}
// 设置未读邮件
export function ReceiveUnread(id) {
  return request({
    url: `/api/extend/Email/${id}/Actions/Unread`,
    method: 'PUT'
  })
}
// 设置标星邮件
export function ReceiveYesStarred(id) {
  return request({
    url: `/api/extend/Email/${id}/Actions/Star`,
    method: 'PUT'
  })
}
// 设置取消标星
export function ReceiveNoStarred(id) {
  return request({
    url: `/api/extend/Email/${id}/Actions/Unstar `,
    method: 'PUT'
  })
}
// 收邮件
export function Receive() {
  return request({
    url: `/api/extend/Email/Receive`,
    method: 'post'
  })
}
// 存草稿
export function SaveDraft(data) {
  return request({
    url: `/api/extend/Email/Actions/SaveDraft`,
    method: 'post',
    data
  })
}
// 发邮件
export function SaveSent(data) {
  return request({
    url: `/api/extend/Email`,
    method: 'post',
    data
  })
}
// 更新邮件配置
export function SaveConfig(data) {
  return request({
    url: `/api/extend/Email/Config`,
    method: 'PUT',
    data
  })
}
// 邮箱配置-测试连接
export function CheckMail(data) {
  return request({
    url: `/api/extend/Email/Config/Actions/CheckMail`,
    method: 'post',
    data
  })
}
