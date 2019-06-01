import {maService} from '@/utils/request'

export function login({username, password, sourceType = 'web'}) {
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

export function register({identity, name, password, repassword, smsCode}) {
  return maService({
    url: '/register',
    method: 'post',
    data: {
      sourceType: 'web',
      identity,
      name,
      password,
      repassword,
      smsCode
    }
  })
}

export function logout(token) {
  return maService({
    url: '/logout',
    method: 'post',
    params: {
      token
    }
  })
}

export function genVercode(identity) {
  return maService({
    url: '/genVercode',
    method: 'get',
    params: {identity}
  })
}

export function getUserInfo() {
  return maService({
    url: '/currentUser',
    method: 'get',
    hideLoading: true,
    hideSuccess: true
  })
}

export function getUserByPage({
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

// 员工列表
export function queryUsersByMemberId({
  currentPage,
  pageSize
}) {
  return maService({
    url: '/user/queryUsersByMemberId',
    method: 'post',
    data: {
      currentPage,
      isCountTotal: true,
      pageSize
    },
    hideLoading: true,
    hideSuccess: true
  })
}

// 新增员工
export function addMember ({
  name,
  identity,
  smsCode,
  roleId
}) {
  return maService({
    url: '/user/addUser2Member',
    method: 'post',
    data: {
      name,
      identity,
      smsCode,
      roleId
    }
  })
}