import { productService } from '@/utils/request'

export function getAllClassify ({
  cateId,
  keyword
}) {
  return productService({
    url: '/classify/all',
    method: 'get',
    params: {
      cateId,
      keyword
    }
  })
}
