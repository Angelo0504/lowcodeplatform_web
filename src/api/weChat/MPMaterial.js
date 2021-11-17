import request from '@/utils/request'

// 获取列表
export function MPMaterialList(type, data) {
  return request({
    url: `/api/WeChat/MPMaterial/${type}`,
    method: 'get',
    data
  })
}
// 上传素材
export function UploadForeverMedia(data) {
  return request({
    url: `/api/WeChat/MPMaterial`,
    method: 'post',
    data
  })
}
// 删除素材
export function DeleteForeverMedia(mediaId) {
  return request({
    url: `/api/WeChat/MPMaterial/${mediaId}`,
    method: 'DELETE'
  })
}