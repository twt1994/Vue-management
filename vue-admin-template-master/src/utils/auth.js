import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const LoginData = 'LoginData'
export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
// 登陆信息
export function getLoginData() {
  return Cookies.get(LoginData)
}
export function setLoginData(token) {
  return Cookies.set(LoginData, token)
}
export function removeLoginData() {
  return Cookies.remove(LoginData)
}
