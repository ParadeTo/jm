import { productService } from '@/utils/request'

export function getCategoryList ({
  currentPage=1,
  isCountTotal=true,
  keyword,
  orderBy,
  orderByExp,
  pageSize=100
}) {
  return productService({
    url: '/category',
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

