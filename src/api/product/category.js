import { productService } from '@/utils/request'

export function getAllCategory ({
  keyword
}) {
  return productService({
    url: '/category/all',
    method: 'get',
    params: {
      keyword
    },
    hideLoading: true,
    hideSuccess: true
  })
}
