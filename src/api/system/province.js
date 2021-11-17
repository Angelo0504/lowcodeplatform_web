import request from '@/utils/request'

// 获取行政区划列表
export function getProvinceList(nodeId, data) {
  return request({
    url: `/api/system/Base/Area/${nodeId}`,
    method: 'GET',
    data
  })
}

// 获取行政区划下拉框数据
export function getProvinceSelector(id) {
  return request({
    url: `/api/system/Base/Area/${id}/Selector`,
    method: 'GET'
  })
}


// 添加行政区划
export function createProvince(data) {
  return request({
    url: '/api/system/Base/Area',
    method: 'POST',
    data
  })
}

// 修改行政区划
export function updateProvince(data) {
  return request({
    url: `/api/system/Base/Area/${data.id}`,
    method: 'PUT',
    data
  })
}

// 获取行政区划信息
export function getProvinceInfo(id) {
  return request({
    url: `/api/system/Base/Area/${id}/Info`,
    method: 'GET'
  })
}

// 删除行政区划信息
export function delProvince(id) {
  return request({
    url: `/api/system/Base/Area/${id}`,
    method: 'DELETE'
  })
}

// 更新行政区划状态
export function updateProvinceState(id) {
  return request({
    url: `/api/system/Base/Area/${id}/Actions/State`,
    method: 'PUT'
  })
}
