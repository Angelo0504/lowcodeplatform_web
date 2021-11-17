import request from '@/utils/request'

// 获取系统配置
export function getSystemConfig() {
  return request({
    url: '/api/system/Base/SysConfig',
    method: 'GET'
  })
}

// 更新系统配置
export function updateSystemConfig(data) {
  return request({
    url: '/api/system/Base/SysConfig',
    method: 'PUT',
    data
  })
}

// 邮箱连接测试
export function testEmail(data) {
  return request({
    url: '/api/system/Base/SysConfig/Email/Test',
    method: 'POST',
    data
  })
}
