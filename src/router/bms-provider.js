/* Layout */
import Layout from '@/views/layout/Layout'
// 门店系统的供应商管理，有别于后台管理系统的门店管理
export default {
  path: '/provider',
  component: Layout,
  redirect: '/provider',
  alwaysShow: true, // will always show the root menu
  meta: {
    title: '供应商管理',
    icon: 'edit',
    roles: ['PLATFORM'] // you can set roles in root nav
  },
  children: [{
    path: '',
    component: () => import('@/views/bms-provider'),
    name: 'bmsProviderIndex',
    meta: {
      title: '供应商列表'
    }
  }, {
    path: 'industry',
    component: () => import('@/views/bms-provider/industry'),
    name: 'bmsProviderPlatform',
    meta: {
      title: '行业类别管理'
    }
  }]
}
