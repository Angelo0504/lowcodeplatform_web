import request from '@/utils/request'

export function FlowMonitorList(data) {
  return request({
    url: `/api/workflow/Engine/FlowMonitor`,
    method: 'get',
    data
  })
}
// 批量删除流程监控
export function DeleteList(data) {
  return request({
    url: `/api/workflow/Engine/FlowMonitor`,
    method: 'DELETE',
    data
  })
}
