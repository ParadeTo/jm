/* Layout */
import Layout from '@/views/layout/Layout'

export default {
  path: '/history',
  component: Layout,
  redirect: '/history/purchase-price',
  alwaysShow: true, // will always show the root menu
  meta: {
    title: '历史查询',
    icon: 'star',
    roles: ['shopAdmin', 'providerAdmin'] // you can set roles in root nav
  },
  children: [{
    path: 'purchase-price',
    component: () => import('@/views/history/purchasePrice'),
    name: 'historyPurchasePrice',
    meta: {
      title: '历史进价'
    }
  }]
}
