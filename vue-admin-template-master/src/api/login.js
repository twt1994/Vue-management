import request from '@/utils/request'

export function login(username, password) {
  // 登录操作
  return request({
    url: '/userInfo/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function getInfo(token) {
  // 获取用户信息
  return request({
    url: '/userInfo/getUserInfo ',
    method: 'post',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
