import { productService } from '@/utils/request'

export function getAttributeList ({
  cateId,
  keyword
}) {
  return productService({
    url: '/attribute/page',
    method: 'post',
    data: {
      cateId,
      keyword
    }
  })
}

export function getAttributeAndValueList ({
  cateId,
  currentPage,
  pageSize
}) {
  return productService({
    url: '/attribute/attrvalues/page',
    method: 'post',
    data: {
      cateId,
      currentPage,
      pageSize
    }
  })
}
