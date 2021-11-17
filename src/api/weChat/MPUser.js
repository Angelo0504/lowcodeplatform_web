import request from '@/utils/request'

// 获取用户列表
export function MPUserList(type, data) {
  return request({
    url: `/api/WeChat/MPUser/${type}`,
    method: 'get',
    data
  })
}
// 修改备注
export function UpdateRemark(openId, data) {
  return request({
    url: `/api/WeChat/MPUser/${openId}/Actions/Remark`,
    method: 'PUT',
    data
  })
}
// 加入黑名单
export function AddBatchBlack(openId) {
  return request({
    url: `/api/WeChat/MPUser/${openId}/Actions/BlackList`,
    method: 'post'
  })
}
// 移除黑名单
export function DeleteBatchUnBlack(openId) {
  return request({
    url: `/api/WeChat/MPUser/${openId}/Actions/BlackList`,
    method: 'DELETE'
  })
}