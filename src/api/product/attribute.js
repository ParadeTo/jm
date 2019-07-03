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
    },
    hideLoading: true,
    hideSuccess: true
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
    },
    hideSuccess: true,
    hideLoading: true
  })
}

export function addAttribute ({
  cateId,
  name,
  attrValueList
}) {
  return productService({
    url: '/attribute',
    method: 'post',
    data: {
      cateId,
      name,
      attrValueList
    }
  })
}

export function editAttribute ({
  id,
  name,
  attrValueList
}) {
  return productService({
    url: '/attribute',
    method: 'put',
    data: {
      id,
      name,
      attrValueList
    }
  })
}

export function getAttribute (id) {
  return productService({
    url: `/attribute/${id}`,
    method: 'get',
    hideSuccess: true
  })
}

export function delAttribute (id) {
  return productService({
    url: `/attribute/${id}`,
    method: 'delete'
  })
}
