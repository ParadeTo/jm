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
    }
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
    }
  })
}
