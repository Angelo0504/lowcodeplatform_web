import request from '@/utils/request'

// 获取客户列表
export function CustomerList(keyword) {
  return request({
    url: `/api/workflow/Form/CrmOrder/Customer`,
    method: 'get',
    data: { keyword }
  })
}
// 获取商品列表
export function GoodsList(data) {
  return request({
    url: `/api/workflow/Form/CrmOrder/Goods`,
    method: 'get',
    data
  })
}
// 导出订单
export function ExportExcel(id) {
  return request({
    url: `/api/workflow/Form/CrmOrder/${id}/Export`,
    method: 'get'
  })
}
// 删除订单
export function Delete(id) {
  return request({
    url: `/api/workflow/Form/CrmOrder/${id}`,
    method: 'DELETE'
  })
}
// 获取订单列表
export function OrderList(data) {
  return request({
    url: `/api/workflow/Form/CrmOrder`,
    method: 'get',
    data
  })
}
// 获取订单信息(下一个订单)
export function NextInfo(id) {
  return request({
    url: `/api/workflow/Form/CrmOrder/${id}/Actions/Next`,
    method: 'get',
  })
}
// 获取订单信息(上一个订单)
export function PrevInfo(id) {
  return request({
    url: `/api/workflow/Form/CrmOrder/${id}/Actions/Prev`,
    method: 'get',
  })
}
// 获取订单列表-订单商品
export function OrderEntryList(id) {
  return request({
    url: `/api/workflow/Form/CrmOrder/OrderEntry/${id}/Items`,
    method: 'get'
  })
}
// 获取订单列表-收款计划
export function OrderReceivableList(id) {
  return request({
    url: `/api/workflow/Form/CrmOrder/${id}/CollectionPlan`,
    method: 'get'
  })
}