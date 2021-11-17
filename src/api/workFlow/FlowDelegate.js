import request from '@/utils/request'

// 获取流程委托列表
export function FlowDelegateList(data) {
  return request({
    url: `/api/workflow/Engine/FlowDelegate`,
    method: 'get',
    data
  })
}
// 获取流程委托信息
export function FlowDelegateInfo(id) {
  return request({
    url: `/api/workflow/Engine/FlowDelegate/${id}`,
    method: 'get'
  })
}
// 删除流程委托
export function Delete(id) {
  return request({
    url: `/api/workflow/Engine/FlowDelegate/${id}`,
    method: 'DELETE'
  })
}
// 新建流程委托
export function Create(data) {
  return request({
    url: `/api/workflow/Engine/FlowDelegate`,
    method: 'post',
    data
  })
}
// 更新流程委托
export function Update(data) {
  return request({
    url: `/api/workflow/Engine/FlowDelegate/${data.id}`,
    method: 'PUT',
    data
  })
}
