import { maService } from '@/utils/request'

export function getMyMemberByPage ({
  currentPage,
  isCountTotal = true,
  keyword,
  orderBy,
  orderByExp,
  systemId,
  pageSize = 900,
  name
}) {
  return maService({
    url: '/myMember/page',
    method: 'post',
    data: {
      currentPage,
      isCountTotal,
      keyword,
      orderBy,
      orderByExp,
      systemId,
      pageSize,
      name
    }
  })
}

/**
"address": "地址",
  "businessType": 先用类目下拉框,
  "contactNumber": "联系方式",
  "contacts": "联络人 ",
  "memberId": 写死-1,
  "memberType": SUPPLIER("供应商", 2), STORE("门店", 3);
  "name": "名称 文本",
  "online": 写死2,
  "remark": "备注 文本",
  "scopeOfBusiness": "经营范围-文本"
 */
export function saveMyMember (data) {
  return maService({
    url: '/myMember',
    method: 'post',
    data,
    showLoading: true,
    showError: true
  })
}
