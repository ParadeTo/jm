import { productService } from '@/utils/request'

export function getUnitList ({
  currentPage,
  isCountTotal = true,
  keyword,
  orderBy,
  orderByExp,
  pageSize = 900
}) {
  return productService({
    url: '/unit',
    method: 'get',
    params: {
      currentPage,
      isCountTotal,
      keyword,
      orderBy,
      orderByExp,
      pageSize
    }
  })
}

export function getUnit (id) {
  return productService({
    url: `/unit/${id}`,
    method: 'get'
  })
}

export function addUnit ({
  name
}) {
  return productService({
    url: '/unit',
    method: 'post',
    data: {
      name
    }
  })
}

export function editUnit ({
  id,
  name
}) {
  return productService({
    url: '/unit',
    method: 'put',
    data: {
      id,
      name
    }
  })
}
