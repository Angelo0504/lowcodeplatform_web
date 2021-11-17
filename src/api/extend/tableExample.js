import request from '@/utils/request'

// 获取城市信息列表
export function CityList(id) {
  return request({
    url: `/api/extend/TableExample/CityList/${id}`,
    method: 'get'
  })
}
// 新建项目
export function TableExampleCreate(data) {
  return request({
    url: '/api/extend/TableExample',
    method: 'post',
    data
  })
}
// 删除项目
export function TableExampleDelete(id) {
  return request({
    url: `/api/extend/TableExample/${id}`,
    method: 'DELETE'
  })
}
// 获取延伸扩展列表
export function IndustryList(data) {
  return request({
    url: `/api/extend/TableExample/IndustryList`,
    method: 'get',
    data
  })
}
// 获取普通表格示例信息
export function TableExampleInfo(id) {
  return request({
    url: `/api/extend/TableExample/${id}`,
    method: 'get'
  })
}
// 获取表格数据列表
export function TableExampleList(data) {
  return request({
    url: `/api/extend/TableExample`,
    method: 'get',
    data
  })
}
// 获取表格分组列表
export function TableExampleListAll(data) {
  return request({
    url: `/api/extend/TableExample/All`,
    method: 'get',
    data
  })
}
// 行编辑
export function RowsEdit(data) {
  return request({
    url: `/api/extend/TableExample/${data.id}/Actions/RowsEdit`,
    method: 'PUT',
    data
  })
}
// 获取批注
export function getPostil(id) {
  return request({
    url: `/api/extend/TableExample/${id}/Actions/Postil`,
    method: 'get'
  })
}
// 发送批注
export function SendPostil(id, data) {
  return request({
    url: `/api/extend/TableExample/${id}/Postil`,
    method: 'post',
    data
  })
}
// 删除批注
export function TableExampleDeletePostil(id, index) {
  return request({
    url: `/api/extend/TableExample/${id}/Postil/${index}`,
    method: 'DELETE'
  })
}
// 更新项目
export function TableExampleUpdate(data) {
  return request({
    url: `/api/extend/TableExample/${data.id}`,
    method: 'PUT',
    data
  })
}
// 更新标记
export function UpdateSign(id, data) {
  return request({
    url: `/api/extend/TableExample/UpdateSign/${id}`,
    method: 'PUT',
    data
  })
}
// 列表（树形表格）
export function TableExampleListByType(data, typeId) {
  return request({
    url: `/api/extend/TableExample/ControlSample/${typeId}`,
    method: 'GET',
    data
  })
}
// 待定
export function TreeList() {
  return request({
    url: '/api/extend/TableExample/ControlSample/TreeList',
    method: 'get',
  })
}
