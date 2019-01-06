import { productService } from '@/utils/request'

export function getProductSkuList ({
  currentPage,
  isCountTotal=true,
  keyword,
  orderBy,
  orderByExp,
  pageSize
}) {
  return productService({
    url: '/sku',
    method: 'get',
    params: {
      currentPage,
      isCountTotal,
      keyword,
      orderBy,
      orderByExp,
      pageSize
    },
    maxAge: 5 * 60 // 秒
  })
}

