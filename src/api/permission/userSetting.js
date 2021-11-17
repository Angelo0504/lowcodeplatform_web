import request from '@/utils/request'

// 更新当前用户头像
export function UpdateAvatar(name) {
  return request({
    url: `/api/system/Permission/Users/Current/Avatar/${name}`,
    method: 'PUT'
  })
}
// 获取当前用户个人资料
export function UserSettingInfo() {
  return request({
    url: '/api/system/Permission/Users/Current/BaseInfo',
    method: 'GET'
  })
}
// 更新当前用户个人资料
export function UpdateUser(data) {
  return request({
    url: '/api/system/Permission/Users/Current/BaseInfo',
    method: 'PUT',
    data
  })
}
// 修改当前用户密码
export function UpdatePassword(data) {
  return request({
    url: '/api/system/Permission/Users/Current/Actions/ModifyPassword',
    method: 'POST',
    data
  })
}
// 更新当前用户系统主题
export function UpdateTheme(data) {
  return request({
    url: '/api/system/Permission/Users/Current/SystemTheme',
    method: 'PUT',
    data
  })
}
// 更新当前用户系统语言配置
export function UpdateLanguage(data) {
  return request({
    url: `/api/system/Permission/Users/Current/SystemLanguage`,
    method: 'PUT',
    data
  })
}
// 获取我的下属
export function getSubordinate() {
  return request({
    url: `/api/system/Permission/Users/Current/Subordinate`,
    method: 'GET'
  })
}
// 获取当前用户系统权限
export function AuthorizeList() {
  return request({
    url: '/api/system/Permission/Users/Current/Authorize',
    method: 'GET'
  })
}
// 获取系统日志
export function LogList(data) {
  return request({
    url: `/api/system/Permission/Users/Current/SystemLog`,
    method: 'GET',
    data
  })
}