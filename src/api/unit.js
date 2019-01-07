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
