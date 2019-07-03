import { maService } from '@/utils/request'

export function getRoleByPage ({
  currentPage,
  isCountTotal = true,
  keyword,
  orderBy,
  orderByExp,
  systemId,
  pageSize = 900
}) {
  return maService({
    url: '/role/page',
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
    hideSuccess: true,
  })
}

export function addRole ({
  systemId,
  roleCode,
  name
}) {
  return maService({
    url: '/role',
    method: 'post',
    data: {
      systemId,
      roleCode,
      name
    },
    showSuccess: true
  })
}

export function getAllRoles () {
  return maService({
    url: '/role/all',
    method: 'get',
    hideSuccess: true
  })
}
