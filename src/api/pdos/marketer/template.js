/** 销售订单 */
import { pdosMarketService } from '@/utils/request'

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
  "gmtCreatedBegin": "2019-01-01",
  "gmtCreatedEnd": "2019-01-31"
}
*/
export function getPurchaseOrder ({
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
  return pdosSupplyService({
    url: '/pdosPurchaseOrder/page',
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