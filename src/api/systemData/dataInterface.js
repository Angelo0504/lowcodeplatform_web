import request from '@/utils/request'

// 获取接口列表(分页)
export function getDataInterfaceList(data) {
  return request({
    url: '/api/system/Base/DataInterface',
    method: 'GET',
    data
  })
}

// 获取接口列表下拉框
export function getDataInterfaceSelector() {
  return request({
    url: '/api/system/Base/DataInterface/Selector',
    method: 'GET'
  })
}

// 添加接口
export function createDataInterface(data) {
  return request({
    url: '/api/system/Base/DataInterface',
    method: 'POST',
    data
  })
}

// 修改接口
export function updateDataInterface(data) {
  return request({
    url: `/api/system/Base/DataInterface/${data.id}`,
    method: 'PUT',
    data
  })
}

// 获取接口数据
export function getDataInterfaceInfo(id) {
  return request({
    url: `/api/system/Base/DataInterface/${id}`,
    method: 'GET'
  })
}

// 删除接口数据
export function delDataInterface(id) {
  return request({
    url: `/api/system/Base/DataInterface/${id}`,
    method: 'DELETE'
  })
}

// 更新接口状态
export function updateDataInterfaceState(id) {
  return request({
    url: `/api/system/Base/DataInterface/${id}/Actions/State`,
    method: 'PUT'
  })
}

// 获取接口分类
export function getDataInterfaceTypeSelector() {
  return request({
    url: '/api/system/Base/DictionaryData/9c43287481364d348c0ea0d0f64b38be/Data/Selector',
    method: 'GET'
  })
}

// 获取接口数据
export function previewDataInterface(id) {
  return request({
    url: `/api/system/Base/DataInterface/${id}/Actions/Response`,
    method: 'GET'
  })
}
