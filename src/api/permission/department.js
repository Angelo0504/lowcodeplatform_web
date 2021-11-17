import request from '@/utils/request'

// 获取部门列表
export const getDepartmentList = (companyId, data) => {
  return request({
    url: `/api/system/Permission/Organize/${companyId}/Department`,
    method: 'GET',
    data
  })
}

// 获取部门下拉框列表(公司+部门)
export const getDepartmentSelector = () => {
  return request({
    url: '/api/system/Permission/Organize/Department/Selector',
    method: 'GET'
  })
}

// 新建部门
export const createDepartment = (data) => {
  return request({
    url: '/api/system/Permission/Organize/Department',
    method: 'POST',
    data
  })
}

// 修改部门
export const updateDepartment = (data) => {
  return request({
    url: `/api/system/Permission/Organize/Department/${data.id}`,
    method: 'PUT',
    data
  })
}

// 获取部门信息
export const getDepartmentInfo = (id) => {
  return request({
    url: `/api/system/Permission/Organize/Department/${id}`,
    method: 'GET'
  })
}

// 删除部门
export const delDepartment = (id) => {
  return request({
    url: `/api/system/Permission/Organize/Department/${id}`,
    method: 'DELETE'
  })
}

// 更新部门状态
export const updateDepartmentState = (id) => {
  return request({
    url: `/api/system/Permission/Organize/Department/${id}/Actions/State`,
    method: 'PUT'
  })
}
