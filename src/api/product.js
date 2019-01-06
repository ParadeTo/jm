import { productService } from '@/utils/request'

export function getProductList ({
  currentPage,
  isCountTotal=true,
  keyword,
  orderBy,
  orderByExp,
  pageSize
}) {
  return productService({
    url: '/',
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

