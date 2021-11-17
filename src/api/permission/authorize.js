import request from '@/utils/request'

// 获取岗位/角色/用户权限树形结构及数据
export const getAuthorizeValues = (objectId, data) => {
  return request({
    url: `/api/system/Permission/Authority/Data/${objectId}/Values`,
    method: 'POST',
    data
  })
}

// 更新岗位/角色/用户权限
export const updateAuthorizeList = (objectId, data) => {
  return request({
    url: `/api/system/Permission/Authority/Data/${objectId}`,
    method: 'PUT',
    data
  })
}

// 批量设置权限
export const updateBatchAuthorize = (data) => {
  return request({
    url: `/api/system/Permission/Authority/Data/Batch`,
    method: 'POST',
    data
  })
}
// 获取功能权限数据
export const getModelData = (id, ObjectType) => {
  return request({
    url: `/api/system/Permission/Authority/Model/${id}/${ObjectType}`,
    method: 'GET'
  })
}
// 设置/更新功能权限
export const setModelData = (id, data) => {
  return request({
    url: `/api/system/Permission/Authority/Model/${id}`,
    method: 'PUT',
    data
  })
}
