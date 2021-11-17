import request from '@/utils/request'

// 获取流程表单列表
export function FlowEngineFormList(data) {
  return request({
    url: `/api/workflow/Engine/FlowEngineForm`,
    method: 'get',
    data
  })
}
// 列表ListAll
export function FlowEngineFormListAll() {
  return request({
    url: `/api/workflow/Engine/FlowEngineForm/ListAll`,
    method: 'get',
  })
}
// 获取流程表单信息
export function FlowEngineFormInfo(id) {
  return request({
    url: `/api/workflow/Engine/FlowEngineForm/${id}`,
    method: 'get'
  })
}
// 删除流程表单
export function Delete(id) {
  return request({
    url: `/api/workflow/Engine/FlowEngineForm/${id}`,
    method: 'DELETE'
  })
}
// 新建流程表单
export function Create(data) {
  return request({
    url: `/api/workflow/Engine/FlowEngineForm`,
    method: 'post',
    data
  })
}
// 修改流程表单
export function Update(data) {
  return request({
    url: `/api/workflow/Engine/FlowEngineForm/${data.id}`,
    method: 'PUT',
    data,
  })
}