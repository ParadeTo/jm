/* Layout */
import Layout from '@/views/layout/Layout'

export default {
  path: '/shop',
  component: Layout,
  redirect: '/shop',
  alwaysShow: true, // will always show the root menu
  meta: {
    title: '门店管理',
    icon: 'shoppingCard',
    roles: ['bmsAdmin'] // you can set roles in root nav
  },
  children: [{
    path: '',
    component: () => import('@/views/shop'),
    name: 'shopIndex',
    meta: {
      title: '门店列表'
    }
  }, {
    path: 'audit',
    component: () => import('@/views/shop/audit'),
    name: 'shopAudit',
    hidden: true,
    meta: {
      title: '门店审核'
    }
  }, {
    path: 'industry',
    component: () => import('@/views/shop/industry'),
    name: 'shopIndustry',
    meta: {
      title: '行业类别管理'
    }
  }, {
    path: 'order',
    component: () => import('@/views/shop/order'),
    name: 'shopOrder',
    meta: {
      title: '门店订单查询'
    }
  }]
}
