/* Layout */
import Layout from '@/views/layout/Layout'

export default {
  path: '/inventory',
  component: Layout,
  redirect: '/inventory/check',
  alwaysShow: true, // will always show the root menu
  meta: {
    title: '库存管理',
    icon: 'guide',
    roles: ['admin', 'editor'] // you can set roles in root nav
  },
  children: [{
    path: 'check',
    component: () => import('@/views/inventory/check'),
    name: 'inventoryCheck',
    meta: {
      title: '盘点管理'
    }
  }, {
    path: 'alarm',
    component: () => import('@/views/inventory/alarm'),
    name: 'inventoryAlarm',
    meta: {
      title: '报溢报损'
    }
  }]
}
