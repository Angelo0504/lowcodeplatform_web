import request from '@/utils/request'

// 获取角色列表
export const getRoleList = (data) => {
  return request({
    url: '/api/system/Permission/Role',
    method: 'GET',
    data
  })
}

// 获取角色下拉框列表
export const getRoleSelector = () => {
  return request({
    url: '/api/system/Permission/Role/Selector',
    method: 'GET'
  })
}

// 新建角色
export const createRole = (data) => {
  return request({
    url: '/api/system/Permission/Role',
    method: 'POST',
    data
  })
}

// 修改角色
export const updateRole = (data) => {
  return request({
    url: `/api/system/Permission/Role/${data.id}`,
    method: 'PUT',
    data
  })
}

// 获取角色信息
export const getRoleInfo = (id) => {
  return request({
    url: `/api/system/Permission/Role/${id}`,
    method: 'GET'
  })
}

// 删除角色
export const delRole = (id) => {
  return request({
    url: `/api/system/Permission/Role/${id}`,
    method: 'DELETE'
  })
}

// 更新角色状态
export const updateRoleState = (id) => {
  return request({
    url: `/api/system/Permission/Role/${id}/Actions/State`,
    method: 'PUT'
  })
}

// 获取角色类型
export const getRoleTypeSelector = () => {
  return request({
    url: '/api/system/Base/DictionaryData/4501f6f26a384757bce12d4c4b03342c/Data/Selector',
    method: 'GET'
  })
}
