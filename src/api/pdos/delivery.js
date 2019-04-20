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
export function postDeliveryOrder (data) {
  return pdosService({
    url: '/pdos/pdosDeliveryOrder/save',
    method: 'post',
    data
  })
}
