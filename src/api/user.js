import request from '@/utils/request'

// 用户登录
export function login(data) {
  return request({
    url: '/api/oauth/Login',
    method: 'post',
    data,
    params: {
      client_id: 'admin',
      client_secret: '123456',
      scope: 'all',
      grant_type: 'password'
    }
  })
}

// 获取当前用户信息
export function getInfo() {
  return request({
    url: '/api/oauth/CurrentUser',
    method: 'get',
  })
}

// 退出登录
export function logout() {
  return request({
    url: '/api/oauth/Logout',
    method: 'get'
  })
}

// 锁屏解锁登录
export function unlock(data) {
  return request({
    url: '/api/oauth/LockScreen',
    method: 'post',
    data
  })
}
