import { maService } from '@/utils/request'

export function login ({
  username,
  password,
  sourceType = 'web'
}) {
  return maService({
    url: '/login',
    method: 'post',
    data: {
      username,
      password,
      sourceType
    }
  })
}

export function getUserInfo () {
  return maService({
    url: '/currentUser',
    method: 'get'
  })
}
