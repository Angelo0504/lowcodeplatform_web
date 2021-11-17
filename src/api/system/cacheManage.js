import request from '@/utils/request'

export function CacheManageClear(name) {
  return request({
    url: `/api/system/Base/CacheManage/${name}`,
    method: 'delete',
  })
}
export function CacheManageClearAll() {
  return request({
    url: '/api/system/Base/CacheManage/Actions/ClearAll',
    method: 'post',
  })
}
export function CacheManageInfo(name) {
  return request({
    url: `/api/system/Base/CacheManage/${name}`,
    method: 'get',
  })
}
export function CacheManageList(data) {
  return request({
    url: '/api/system/Base/CacheManage',
    method: 'get',
    data
  })
}
