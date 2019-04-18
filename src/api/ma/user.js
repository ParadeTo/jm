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
    },
    showError: true
  })
}

export function getUserInfo () {
  return maService({
    url: '/currentUser',
    method: 'get'
  })
}

export function getUserByPage ({
  currentPage,
  isCountTotal = true,
  keyword,
  orderBy,
  orderByExp,
  systemId,
  pageSize = 900
}) {
  return maService({
    url: '/user/page',
    method: 'post',
    data: {
      currentPage,
      isCountTotal,
      keyword,
      orderBy,
      orderByExp,
      systemId,
      pageSize
    }
  })
}
