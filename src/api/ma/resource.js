import { maService } from '@/utils/request'

export function getResourceByPage ({
  currentPage,
  isCountTotal = true,
  keyword,
  orderBy,
  orderByExp,
  systemId,
  pageSize = 900
}) {
  return maService({
    url: '/resources/page',
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
    hideLoading: true
  })
}

export function getResourceTree ({
  parentId = -1,
  systemId
} = {}) {
  return maService({
    url: '/resources/all',
    method: 'get',
    params: {
      parentId,
      systemId
    },
    hideSuccess: true,
    hideLoading: true
  })
}

export function addResource ({
  parentId,
  name,
  code,
  systemId,
  type,
  path,
  icon
}) {
  return maService({
    url: '/resources',
    method: 'post',
    data: {
      parentId,
      name,
      code,
      systemId,
      type,
      path,
      icon
    }
  })
}

export function editResource ({
  id,
  parentId,
  name,
  code,
  systemId,
  type,
  path,
  icon
}) {
  return maService({
    url: '/resources',
    method: 'put',
    data: {
      id,
      parentId,
      name,
      code,
      systemId,
      type,
      path,
      icon
    }
  })
}
