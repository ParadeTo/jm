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
    }
  })
}
