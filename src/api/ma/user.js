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
    hideLoading: true,
    hideSuccess: true
  })
}

export function register (data) {
  return maService({
    url: '/register',
    method: 'post',
    data
  })
}

export function genVercode (identity) {
  return maService({
    url: '/genVercode',
    method: 'get',
    params: { identity }
  })
}

export function getUserInfo () {
  return maService({
    url: '/currentUser',
    method: 'get',
    hideLoading: true,
    hideSuccess: true
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
    },
    hideLoading: true,
    hideSuccess: true
  })
}
