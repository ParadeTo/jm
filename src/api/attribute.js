import { productService } from '@/utils/request'

export function getAttributeList ({
  currentPage = 1,
  isCountTotal = true,
  keyword,
  orderBy,
  orderByExp,
  pageSize = 100
}) {
  return productService({
    url: '/attribute',
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
