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
    },
    hideSuccess: true,
    hideLoading: true
  })
}

export function getUnit (id) {
  return productService({
    url: `/unit/${id}`,
    method: 'get',
    hideSuccess: true,
    hideLoading: true
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
    },
    showSuccess: true
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
    },
    showSuccess: true
  })
}
