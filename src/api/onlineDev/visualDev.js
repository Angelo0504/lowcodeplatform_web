import request from '@/utils/request'

// 获取功能列表
export function getVisualDevList(data) {
  return request({
    url: '/api/visualdev/Base',
    method: 'get',
    data
  })
}
// 获取功能信息
export function getVisualDevInfo(id) {
  return request({
    url: `/api/visualdev/Base/${id}`,
    method: 'get'
  })
}


// 删除功能
export function Delete(id) {
  return request({
    url: `/api/visualdev/Base/${id}`,
    method: 'DELETE'
  })
}
// 修改功能
export function Update(data) {
  return request({
    url: `/api/visualdev/Base/${data.id}`,
    method: 'PUT',
    data
  })
}
// 新建功能
export function Create(data) {
  return request({
    url: '/api/visualdev/Base',
    method: 'post',
    data
  })
}
// 复制功能
export function Copy(id) {
  return request({
    url: `/api/visualdev/Base/${id}/Actions/Copy`,
    method: 'POST'
  })
}
// 获取命名空间
export function getAreasName() {
  return request({
    url: `/api/visualdev/Generater/AreasName`,
    method: 'get'
  })
}
// 代码下载
export function DownloadCode(id, data) {
  return request({
    url: `/api/visualdev/Generater/${id}/Actions/DownloadCode`,
    method: 'POST',
    data
  })
}
// 代码预览
export function CodePreview(id, data) {
  return request({
    url: `/api/visualdev/Generater/${id}/Actions/CodePreview`,
    method: 'POST',
    data
  })
}
// 无表
// 获取列表表单配置JSON
export function getConfigData(modelId) {
  return request({
    url: `/api/visualdev/OnlineDev/${modelId}/Config`,
    method: 'get'
  })
}
// 获取列表配置JSON
export function getColumnData(modelId) {
  return request({
    url: `/api/visualdev/OnlineDev/${modelId}/ColumnData`,
    method: 'get'
  })
}
// 获取表单配置JSON
export function getFormData(modelId) {
  return request({
    url: `/api/visualdev/OnlineDev/${modelId}/FormData`,
    method: 'get'
  })
}
// 获取数据列表
export function getModelList(modelId, data) {
  return request({
    url: `/api/visualdev/OnlineDev/${modelId}/List`,
    method: 'get',
    data
  })
}
// 添加数据
export function createModel(modelId, data) {
  return request({
    url: `/api/visualdev/OnlineDev/${modelId}`,
    method: 'POST',
    data
  })
}
// 修改数据
export function updateModel(modelId, data) {
  return request({
    url: `/api/visualdev/OnlineDev/${modelId}/${data.id}`,
    method: 'PUT',
    data
  })
}
// 获取数据信息
export function getModelInfo(modelId, id) {
  return request({
    url: `/api/visualdev/OnlineDev/${modelId}/${id}`,
    method: 'GET'
  })
}
// 获取数据详情
export function getDataChange(modelId, id) {
  return request({
    url: `/api/visualdev/OnlineDev/${modelId}/${id}/DataChange`,
    method: 'GET'
  })
}
// 获取表单主表属性列表
export function getFormDataFields(modelId) {
  return request({
    url: `/api/visualdev/Base/${modelId}/FormDataFields`,
    method: 'GET'
  })
}
// 获取表单主表属性下拉框
export function getFieldDataSelect(modelId, data) {
  return request({
    url: `/api/visualdev/Base/${modelId}/FieldDataSelect`,
    method: 'GET',
    data
  })
}
// 删除数据
export function deteleModel(modelId, id) {
  return request({
    url: `/api/visualdev/OnlineDev/${modelId}/${id}`,
    method: 'DELETE'
  })
}
// 导出
export function exportModel(modelId, data) {
  return request({
    url: `/api/visualdev/OnlineDev/${modelId}/Actions/Export`,
    method: 'POST',
    data
  })
}
// 下载模板
export function getTemplate(modelId) {
  return request({
    url: `/api/visualdev/OnlineDev/${modelId}/Template`,
    method: 'GET'
  })
}
// 获取功能下拉框列表
export function getFeatureSelector(data) {
  return request({
    url: '/api/visualdev/Base/Selector',
    method: 'GET',
    data
  })
}
// App预览(后台APP表单设计)
export function Preview(data) {
  return request({
    url: `/api/visualdev/OnlineDev/App/Preview`,
    method: 'post',
    data: { data }
  })
}
