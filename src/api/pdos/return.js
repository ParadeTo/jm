import { pdosService } from '@/utils/request'

export function getReturnOrderByPage ({
  currentPage = 1,
  pageSize = 10,
  keyword,
  orderByClause,
  orderNo,
  status,
  gmtCreatedBegin,
  gmtCreatedEnd,
  ...rest
}) {
  return pdosService({
    url: '/pdos/pdosReturnOrder/page',
    method: 'post',
    data: {
      currentPage,
      pageSize,
      keyword,
      orderByClause,
      orderNo,
      status,
      gmtCreatedBegin,
      gmtCreatedEnd,
      ...rest
    },
    hideLoading: true,
    hideSuccess: true
  })
}

// 保存修改退货单
export function postReturnOrder (data) {
  return pdosService({
    url: '/pdos/pdosReturnOrder/save',
    method: 'post',
    data
  })
}

// 退货单详情
export function getReturnOrderDetail (id) {
  return pdosService({
    url: `/pdos/pdosReturnOrder/${id}`,
    method: 'get',
    hideSuccess: true
  })
}
