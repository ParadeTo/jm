/* Layout */
import Layout from '@/views/layout/Layout'

export default {
  path: '/settlement',
  component: Layout,
  redirect: '/settlement/receive',
  alwaysShow: true, // will always show the root menu
  meta: {
    title: '结算管理',
    icon: 'shoppingCard',
    roles: ['shopAdmin', 'providerAdmin'] // you can set roles in root nav
  },
  children: [{
    path: 'receive',
    component: () => import('@/views/settlement/receive'),
    name: 'settlementReceive',
    meta: {
      title: '收货结算'
    }
  }]
}
