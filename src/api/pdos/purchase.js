/** 销售订单 */
import { pdosService } from '@/utils/request'

// 销售订单列表
/*
  省略号是其他支持参数，
  xxxIn 多个参数 如：[1,2,3]
  xxxLe 大于等于
  xxxGe 小于等于
  xxxLike 模糊查询
  xxxBegin 开始时间(大于等于)
  xxxEnd  结束时间(加一天小于)xxxIn 多个参数 如：[1,2,3]
  xxxLe 大于等于
  xxxGe 小于等于
  xxxLike 模糊查询
  xxxBegin 开始时间(大于等于)
  xxxEnd  结束时间(加一天小于)

  比如 id   你传 id  那就是  id=?
  idGe 那就是  id<= ?
  {
  "currentPage": "1", //当前页
  "pageSize": "20", //每页数量
  "keyword": "",//关键字
  "orderByClause": "",//排序字段
  "orderNo": "",//订单号
  "status": "1",//订单状态（从参数接口获取）
    [
      {"desc": "暂存", "name": "SAVE", "code": 100},
      {"desc": "待审核", "name": "PENDING", "code": 200},
      {"desc": "已审核", "name": "VERIFIED", "code": 300},
      {"desc": "待确认", "name": "CONFIRM", "code": 400},
      {"desc": "已确认", "name": "CONFIRMED", "code": 500},
      {"desc": "取消", "name": "CANCEL", "code": 999}
    ]
  "gmtCreatedBegin": "2019-01-01",
  "gmtCreatedEnd": "2019-01-31"
}
*/
export function getPurchaseOrderByPage ({
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
    url: '/pdos/pdosPurchaseOrder/page',
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
    }
  })
}

export function getPurchaseOrderParams () {
  return pdosService({
    url: '/pdos/pdosPurchaseOrder/api/parameters',
    method: 'get'
  })
}

// 查询最近一次销售给门店的信息
export function getLastOrderItem ({
  purchaserUserId,
  productNos // Array skuId
}) {
  return pdosService({
    url: '/pdos/pdosDeliveryOrderItem/findLast',
    method: 'post',
    data: {
      purchaserUserId,
      productNos
    }
  })
}

// 保存销售订单
export function addPurchaseOrder (data) {
  return pdosService({
    url: '/pdos/pdosPurchaseOrder/save',
    method: 'post',
    data,
    showSuccess: true
  })
}

// 订单详情
export function getPurchaseOrderDetail (id) {
  return pdosService({
    url: `/pdos/pdosPurchaseOrder/${id}`,
    method: 'get',
    showLoading: true
  })
}

// 模板生成订单
export function generatePurchaseOrderByTemplate (id) {
  return pdosService({
    url: '/pdos/pdosPurchaseOrder/generate',
    method: 'post',
    data: { id },
    showLoading: true
  })
}
