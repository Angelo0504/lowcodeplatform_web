import request from '@/utils/request'

export function getDataSourceList(data) {
  return request({
    url: '/api/system/Base/DataSource',
    method: 'get',
    data
  })
}
export function DataSourceCreate(data) {
  return request({
    url: '/api/system/Base/DataSource',
    method: 'post',
    data
  })
}
export function DataSourceDelete(id) {
  return request({
    url: `/api/system/Base/DataSource/${id}`,
    method: 'delete',
  })
}
export function DataSourceInfo(id) {
  return request({
    url: `/api/system/Base/DataSource/${id}`,
    method: 'get',
  })
}
export function DataSourceUpdate(data) {
  return request({
    url: `/api/system/Base/DataSource/${data.id}`,
    method: 'put',
    data
  })
}
export function TestDbConnection(data) {
  return request({
    url: `/api/system/Base/DataSource/Actions/Test`,
    method: 'post',
    data
  })
}
export function getDataSourceListAll() {
  return request({
    url: '/api/system/Base/DataSource/Selector',
    method: 'get',
  })
}
export function Execute(data) {
  return request({
    url: `/api/system/Base/DataSync/Actions/Execute`,
    method: 'post',
    data
  })
}