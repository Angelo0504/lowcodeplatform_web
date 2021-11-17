import request from '@/utils/request'

// 获取流程引擎列表
export function FlowEngineList(data) {
  return request({
    url: `/api/workflow/Engine/FlowEngine`,
    method: 'get',
    data
  })
}
// 获取流程引擎信息
export function FlowEngineInfo(id) {
  return request({
    url: `/api/workflow/Engine/FlowEngine/${id}`,
    method: 'get'
  })
}
// 删除流程引擎
export function Delete(id) {
  return request({
    url: `/api/workflow/Engine/FlowEngine/${id}`,
    method: 'DELETE'
  })
}
// 新建流程引擎
export function Create(data) {
  return request({
    url: `/api/workflow/Engine/FlowEngine`,
    method: 'post',
    data
  })
}
//  更新流程引擎
export function Update(data) {
  return request({
    url: `/api/workflow/Engine/FlowEngine/${data.id}`,
    method: 'PUT',
    data
  })
}
// 复制流程表单
export function Copy(id) {
  return request({
    url: `/api/workflow/Engine/FlowEngine/${id}/Actions/Copy`,
    method: 'post'
  })
}
// 发布流程引擎
export function Release(id) {
  return request({
    url: `/api/workflow/Engine/FlowEngine/Release/${id}`,
    method: 'post'
  })
}
// 停止流程引擎
export function Stop(id) {
  return request({
    url: `/api/workflow/Engine/FlowEngine/Stop/${id}`,
    method: 'post'
  })
}
// 列表ListAll
export function FlowEngineListAll() {
  return request({
    url: `/api/workflow/Engine/FlowEngine/ListAll`,
    method: 'get'
  })
}
// 流程引擎下拉框
export function FlowEngineSelector(type) {
  return request({
    url: `/api/workflow/Engine/FlowEngine/Selector`,
    method: 'get',
    data: { type }
  })
}
// 流程表单主表属性
export function getFormDataFields(id) {
  return request({
    url: `/api/workflow/Engine/FlowEngine/${id}/FormDataFields`,
    method: 'get'
  })
}
// 流程表单主表属性
export function FieldDataSelect(id) {
  return request({
    url: `/api/workflow/Engine/FlowEngine/${id}/FieldDataSelect`,
    method: 'get'
  })
}
// 获取流程表单详情
export function getFlowTaskData(flowId, id) {
  return request({
    url: `/api/workflow/Engine/FlowTask/${flowId}/${id}`,
    method: 'get'
  })
}
