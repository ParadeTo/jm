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
    }
  })
}
