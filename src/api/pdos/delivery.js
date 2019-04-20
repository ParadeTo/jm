/** 销售订单 */
import { pdosService } from '@/utils/request'

// 销售单列表
export function getDeliveryOrderByPage ({
  currentPage = 1,
  pageSize = 10,
  keyword,
  orderByClause,
  orderNo,
  gmtCreatedBegin,
  gmtCreatedEnd
}) {
  return pdosService({
    url: '/pdos/pdosDeliveryOrder/page',
    method: 'post',
    data: {
      currentPage,
      pageSize,
      keyword,
      orderByClause,
      orderNo,
      gmtCreatedBegin,
      gmtCreatedEnd
    },
    hideSuccess: true,
    hideLoading: true
  })
}

// 销售单详情
export function getDeliveryOrderDetail (id) {
  return pdosService({
    url: `/pdos/pdosDeliveryOrder/${id}`,
    method: 'get',
    hideSuccess: true
  })
}

// 保存编辑销售单
export function postDeliveryOrder (id) {
  return pdosService({
    url: '/pdos/pdosDeliveryOrder/save',
    method: 'post',
    data: { id }
  })
}

// 提交
export function submitDeliveryOrder (id) {
  return pdosService({
    url: '/pdos/pdosDeliveryOrder/submit',
    method: 'post',
    data: { id }
  })
}

// 发货
export function sendDeliveryOrder (id) {
  return pdosService({
    url: '/pdos/pdosDeliveryOrder/send',
    method: 'post',
    data: { id }
  })
}

// 收货
export function receiveDeliveryOrder (id) {
  return pdosService({
    url: '/pdos/pdosDeliveryOrder/receive',
    method: 'post',
    data: { id }
  })
}

// 退回
export function returnDeliveryOrder (data) {
  return pdosService({
    url: '/pdos/pdosDeliveryOrder/returned',
    method: 'post',
    data
  })
}

export function getDeliveryOrderParams () {
  return pdosService({
    url: '/pdos/pdosDeliveryOrder/api/parameters',
    method: 'get',
    hideSuccess: true,
    hideLoading: true
  })
}

export function generateDeliveryOrderByTemplate (id) {
  return pdosService({
    url: '/pdos/pdosDeliveryOrder/generate',
    method: 'post',
    data: { id },
    hideLoading: true,
    hideSuccess: true
  })
}
