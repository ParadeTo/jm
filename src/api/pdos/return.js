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

// 提交
export function submitReturnOrder (id) {
  return pdosService({
    url: '/pdos/pdosReturnOrder/submit',
    method: 'post',
    data: { id }
  })
}

// 确认
export function confirmReturnOrder (id) {
  return pdosService({
    url: '/pdos/pdosReturnOrder/confirm',
    method: 'post',
    data: { id }
  })
}

// 驳回
export function rejectReturnOrder (id) {
  return pdosService({
    url: '/pdos/pdosReturnOrder/returned',
    method: 'post',
    data: { id }
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

export function getReturnOrderParams () {
  return pdosService({
    url: '/pdos/pdosReturnOrder/api/parameters',
    method: 'get',
    hideSuccess: true,
    hideLoading: true
  })
}
