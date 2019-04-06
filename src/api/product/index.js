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
    url: '/product/page',
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
    url: '/product',
    method: 'post',
    data,
    showLoading: true,
    showError: true,
    showSuccess: true
  })
}

export function editProduct (data) {
  return productService({
    url: '/product',
    method: 'put',
    data,
    showLoading: true,
    showError: true,
    showSuccess: true
  })
}

export function getProductDetail (id) {
  return productService({
    url: `/product/${id}`,
    method: 'get'
  })
}
