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
    },
    hideSuccess: true
  })
}

export function editClassify ({
  id,
  name
}) {
  return productService({
    url: '/classify',
    method: 'put',
    data: {
      id,
      name
    }
  })
}

export function addClassify ({
  parentId,
  name,
  orderNo = 1
}) {
  return productService({
    url: '/classify',
    method: 'post',
    data: {
      parentId,
      name,
      orderNo
    }
  })
}

export function delClassify (id) {
  return productService({
    url: `/classify/${id}`,
    method: 'delete'
  })
}
