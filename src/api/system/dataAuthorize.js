import request from '@/utils/request'

// 获取方案管理列表
export function getDataAuthorizeSchemeList(moduleId) {
  return request({
    url: `/api/system/Base/ModuleDataAuthorizeScheme/${moduleId}/List`,
    method: 'GET'
  })
}

// 新建方案
export function createDataScheme(data) {
  return request({
    url: `/api/system/Base/ModuleDataAuthorizeScheme`,
    method: 'POST',
    data
  })
}

// 更新方案
export function updateDataScheme(data) {
  return request({
    url: `/api/system/Base/ModuleDataAuthorizeScheme/${data.id}`,
    method: 'PUT',
    data
  })
}

// 获取方案
export function getDataSchemeInfo(id) {
  return request({
    url: `/api/system/Base/ModuleDataAuthorizeScheme/${id}`,
    method: 'GET'
  })
}

// 删除方案
export function delDataScheme(id) {
  return request({
    url: `/api/system/Base/ModuleDataAuthorizeScheme/${id}`,
    method: 'DELETE'
  })
}


// 获取字段列表
export function getDataAuthorizeList(moduleId) {
  return request({
    url: `/api/system/Base/ModuleDataAuthorize/${moduleId}/List`,
    method: 'GET'
  })
}

// 新建字段
export function createDataAuthorize(data) {
  return request({
    url: `/api/system/Base/ModuleDataAuthorize`,
    method: 'POST',
    data
  })
}

// 更新字段
export function updateDataAuthorize(data) {
  return request({
    url: `/api/system/Base/ModuleDataAuthorize/${data.id}`,
    method: 'PUT',
    data
  })
}

// 获取字段
export function getDataAuthorizeInfo(id) {
  return request({
    url: `/api/system/Base/ModuleDataAuthorize/${id}`,
    method: 'GET'
  })
}


// 删除字段
export function delDataAuthorize(id) {
  return request({
    url: `/api/system/Base/ModuleDataAuthorize/${id}`,
    method: 'DELETE'
  })
}
