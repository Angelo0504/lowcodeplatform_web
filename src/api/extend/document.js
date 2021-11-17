import request from '@/utils/request'

// 获取知识管理列表（全部文档）
export function AllList(data) {
  return request({
    url: '/api/extend/Document',
    method: 'get',
    data
  })
}
// 添加文件夹
export function Create(data) {
  return request({
    url: `/api/extend/Document`,
    method: 'post',
    data
  })
}
//  删除文件/文件夹
export function Delete(id) {
  return request({
    url: `/api/extend/Document/${id}`,
    method: 'DELETE',
  })
}
// 获取知识管理列表（文件夹树）
export function FolderTree() {
  return request({
    url: '/api/extend/Document/FolderTree',
    method: 'get'
  })
}
// 获取文件/文件夹信息
export function DocumentInfo(id) {
  return request({
    url: `/api/extend/Document/${id}`,
    method: 'get',
  })
}
// 修改文件名/文件夹名
export function Update(data) {
  return request({
    url: `/api/extend/Document/${data.id}`,
    method: 'PUT',
    data
  })
}
// 移动文件/文件夹
export function MoveTo(id, toId) {
  return request({
    url: `/api/extend/Document/${id}/Actions/MoveTo/${toId}`,
    method: 'PUT',
  })
}
// 取消分享文件/文件夹
export function ShareCancel(id) {
  return request({
    url: `/api/extend/Document/${id}/Actions/Share`,
    method: 'DELETE',
  })
}
// 分享文件/文件夹
export function ShareCreate(id, userId) {
  return request({
    url: `/api/extend/Document/${id}/Actions/Share`,
    method: 'post',
    data: { userId }
  })
}
// 知识管理（我的共享列表）
export function ShareOutList(data) {
  return request({
    url: '/api/extend/Document/Share',
    method: 'get',
    data
  })
}
// 获取知识管理列表（共享给我）
export function ShareTomeList(data) {
  return request({
    url: '/api/extend/Document/ShareTome',
    method: 'get',
    data
  })
}
// 获取知识管理列表（共享人员）
export function ShareUserList(documentId) {
  return request({
    url: `/api/extend/Document/ShareUser/${documentId}`,
    method: 'get',
  })
}
// 回收站（彻底删除）
export function TrashDelete(id) {
  return request({
    url: `/api/extend/Document/Trash/${id}`,
    method: 'DELETE',
  })
}
// 获取知识管理列表（回收站）
export function TrashList(data) {
  return request({
    url: '/api/extend/Document/Trash',
    method: 'get',
    data
  })
}
// 回收站（还原文件）
export function TrashRecovery(id) {
  return request({
    url: `/api/extend/Document/Trash/${id}/Actions/Recovery`,
    method: 'post'
  })
}
// 下载文件
export function Download(id) {
  return request({
    url: `/api/extend/Document/Download/${id}`,
    method: 'post'
  })
}
