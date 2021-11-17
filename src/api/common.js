import request from '@/utils/request'

// 获取下载文件链接
export function getDownloadUrl(type, fileName) {
  return request({
    url: `/api/file/Download/${type}/${fileName}`,
    method: 'get'
  })
}