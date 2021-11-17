import request from '@/utils/request'

// 获取任务调度列表
export function TimeTaskList(data) {
  return request({
    url: '/api/system/ScheduleTask',
    method: 'get',
    data
  })
}
// 启动任务调度
export function TimeTaskEnable(id) {
  return request({
    url: `/api/system/ScheduleTask/${id}/Actions/Enable`,
    method: 'put',
  })
}
// 停止任务调度
export function TimeTaskStop(id) {
  return request({
    url: `/api/system/ScheduleTask/${id}/Actions/Stop`,
    method: 'put',
  })
}
// 删除任务
export function TimeTaskDelete(id) {
  return request({
    url: `/api/system/ScheduleTask/${id}`,
    method: 'DELETE',
  })
}
//  获取任务调度信息
export function TimeTaskInfo(id) {
  return request({
    url: `/api/system/ScheduleTask/Info/${id}`,
    method: 'get',
  })
}
// 获取任务调度日志列表
export function TimeTaskTaskLogList(id, data) {
  return request({
    url: `/api/system/ScheduleTask/${id}/TaskLog`,
    method: 'get',
    data
  })
}
// 新建任务调度
export function TimeTaskCreate(data) {
  return request({
    url: '/api/system/ScheduleTask',
    method: 'post',
    data
  })
}
// 修改任务调度
export function TimeTaskUpdate(data) {
  return request({
    url: `/api/system/ScheduleTask/${data.id}`,
    method: 'PUT',
    data
  })
}
