import { reportServer } from '@/utils/define'
import axios from 'axios'
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth'

axios.defaults.baseURL = reportServer
axios.defaults.headers['Authorization'] = getToken()

// 请求过滤
const checkStatus = (response) => {
  let responseData = { ...response.data }
  if(response.status === 200) {
    if(responseData.code === 200) {
      return responseData
    } else {
      Message({ message: responseData.msg || '请求出错，请重试', type: 'error', duration: 1500 })
      return Promise.reject(new Error(responseData.msg || 'Error'))
    }
  } else{
    Message({ message: responseData.msg || '请求出错，请重试', type: 'error', duration: 1500 })
    return Promise.reject(new Error(responseData.msg || 'Error'))
  }
}

// 获取报表列表
export const getDataReportList = data => {
  return axios.get(`/api/datareport`, { data }).then(checkStatus)
}

// 获取报表下拉列表
export const getDataReportSelector = () => {
  return axios.get(`/api/datareport/Selector`).then(checkStatus)
}

// 删除报表
export const delDataReport = id => {
  return axios.delete(`/api/datareport/${id}`).then(checkStatus)
}
