import { productService } from '@/utils/request'

export function loginByUsername (username, password) {
  const data = {
    username,
    password
  }
  return productService({
    url: '/login/login',
    method: 'post',
    data
  })
}

export function logout () {
  return productService({
    url: '/login/logout',
    method: 'post'
  })
}

export function getUserInfo (token) {
  return productService({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}
