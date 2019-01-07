import { productService } from '@/utils/request'

export function getProductList ({
  barcode,
  brandId,
  cateId,
  classifyId,
  currentPage,
  keyword,
  orderByClause, // { "orderBy" : "xxx", "orderByExp" : "DESC"}
  pageSize,
  productType
}) {
  return productService({
    url: '/page',
    method: 'post',
    data: {
      barcode,
      brandId,
      cateId,
      classifyId,
      currentPage,
      keyword,
      orderByClause,
      pageSize,
      productType
    }
  })
}

export function saveProduct (data) {
  return productService({
    url: '/',
    method: 'post',
    data,
    showLoading: true
  })
}
