/* Layout */
import Layout from '@/views/layout/Layout'

export default {
  path: '/checkstand',
  component: Layout,
  redirect: '/checkstand/history',
  alwaysShow: true,
  meta: {
    title: '收银台',
    icon: 'lock',
    roles: ['STORE']
  },
  children: [{
    path: 'history',
    component: () => import('@/views/checkstand/history'),
    name: 'checkstandHistory',
    meta: {
      title: '收银历史'
    }
  }, {
    path: 'statistics',
    component: () => import('@/views/checkstand/statistics'),
    name: 'checkstandStatistics',
    meta: {
      title: '收银统计'
    }
  }]
}
