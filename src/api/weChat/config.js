import request from '@/utils/request'

// 获取公众号配置信息
export const getMPConfig = () => {
  return request({
    url: '/api/third/WeChat/MPConfig',
    method: 'GET'
  })
}

// 更新公众号配置信息
export const updateMPConfig = (data) => {
  return request({
    url: '/api/third/WeChat/MPConfig',
    method: 'PUT',
    data
  })
}

// 获取企业号配置信息
export const getQYHConfig = () => {
  return request({
    url: '/api/third/WeChat/QYHConfig',
    method: 'GET'
  })
}

// 更新企业号配置信息
export const updateQYHConfig = (data) =>{
  return request({
    url: '/api/third/WeChat/QYHConfig',
    method: 'PUT',
    data
  })
}
