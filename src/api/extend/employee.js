import request from '@/utils/request'

// 获取职员列表(分页)
export function EmployeeList(data) {
  return request({
    url: '/api/extend/Employee',
    method: 'get',
    data
  })
}
// 删除职员信息
export function EmployeeDelete(id) {
  return request({
    url: `/api/extend/Employee/${id}`,
    method: 'DELETE'
  })
}
// 导出Excel
export function ExportExcel(data) {
  return request({
    url: 'api/extend/Employee/ExportExcelData',
    method: 'get',
    data
  })
}
// 导入
export function ImportData(data) {
  return request({
    url: '/api/extend/Employee/ImportData',
    method: 'post',
    data
  })
}
// 导入预览
export function ImportPreview(data) {
  return request({
    url: '/api/extend/Employee/ImportPreview',
    method: 'get',
    data
  })
}
// 模板下载
export function TemplateDownload() {
  return request({
    url: '/api/extend/Employee/TemplateDownload',
    method: 'get'
  })
}