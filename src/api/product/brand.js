import { productService } from '@/utils/request'

export function getAllBrand ({
  cateId,
  keyword
}) {
  return productService({
    url: '/brand/all',
    method: 'get',
    params: {
      cateId,
      keyword
    },
    hideLoading: true,
    hideSuccess: true
  })
}

export function getBrandListByPage ({
  currentPage,
  isCountTotal = true,
  keyword,
  orderBy,
  orderByExp,
  pageSize = 900
}) {
  return productService({
    url: '/brand',
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

export function getBrand (id) {
  return productService({
    url: `/brand/${id}`,
    method: 'get'
  })
}

export function addBrand ({
  cateId,
  name
}) {
  return productService({
    url: '/brand',
    method: 'post',
    data: {
      cateId,
      name
    },
    showSuccess: true
  })
}

export function editBrand ({
  id,
  name
}) {
  return productService({
    url: '/brand',
    method: 'put',
    data: {
      id,
      name
    },
    showSuccess: true
  })
}
