import { productService } from '@/utils/request'

export function getAllClassify ({
  cateId,
  parentId,
  keyword
} = {}) {
  return productService({
    url: '/classify/all',
    method: 'get',
    params: {
      cateId,
      parentId,
      keyword
    }
  })
}
