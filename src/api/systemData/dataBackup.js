import request from '@/utils/request'

// 获取数据备份列表(带分页)
export function getDataBackupList(data) {
  return request({
    url: '/api/system/Base/DataBackup',
    method: 'GET',
    data
  })
}

// 添加数据备份
export function createDataBackup() {
  return request({
    url: '/api/system/Base/DataBackup',
    method: 'POST'
  })
}

// 删除数据备份
export function delDataBackup(id) {
  return request({
    url: `/api/system/Base/DataBackup/${id}`,
    method: 'DELETE'
  })
}