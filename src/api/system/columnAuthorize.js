import request from '@/utils/request'

// 获取列表权限列表
export function getColumnAuthorizeList(moduleId, data) {
  return request({
    url: `/api/system/Base/ModuleColumn/${moduleId}/Fields`,
    method: 'GET',
    data
  })
}

// 添加字段
export function createColumn(data) {
  return request({
    url: `/api/system/Base/ModuleColumn`,
    method: 'POST',
    data
  })
}

// 批量添加字段
export function batchCreateColumn(data) {
  return request({
    url: `/api/system/Base/ModuleColumn/Actions/Batch`,
    method: 'POST',
    data
  })
}

// 更新字段
export function updateColumn(data) {
  return request({
    url: `/api/system/Base/ModuleColumn/${data.id}`,
    method: 'PUT',
    data
  })
}

// 获取字段信息
export function getColumnInfo(id) {
  return request({
    url: `/api/system/Base/ModuleColumn/${id}`,
    method: 'GET'
  })
}

// 删除字段
export function delColumn(id) {
  return request({
    url: `/api/system/Base/ModuleColumn/${id}`,
    method: 'DELETE'
  })
}

// 更新字段状态
export function updateColumnState(id) {
  return request({
    url: `/api/system/Base/ModuleColumn/${id}/Actions/State`,
    method: 'PUT'
  })
}


