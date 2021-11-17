import request from '@/utils/request'

// 获取大屏列表(分页)
export const getDataVList = data => {
  return request({
    url: '/api/visualdev/DataScreen',
    method: 'GET',
    data
  })
}

// 获取大屏下拉框
export const getDataVSelector = () => {
  return request({
    url: '/api/visualdev/DataScreen/Selector',
    method: 'GET'
  })
}

// 删除大屏
export const delDataV = id => {
  return request({
    url: `/api/visualdev/DataScreen/${id}`,
    method: 'DELETE'
  })
}

// 复制大屏
export const copyDataV = id => {
  return request({
    url: `/api/visualdev/DataScreen/${id}/Actions/Copy`,
    method: 'POST'
  })
}

// 更新大屏状态
export const updateDataVState = id => {
  return request({
    url: `/api/visualdev/DataScreen/${id}/Actions/State`,
    method: 'PUT'
  })
}
