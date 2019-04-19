/* Layout */
import Layout from '@/views/layout/Layout'

export default {
  path: '/sales-statistics',
  component: Layout,
  redirect: '/sales-statistics/daily',
  alwaysShow: true, // will always show the root menu
  meta: {
    title: '销售统计',
    icon: 'theme',
    roles: ['PLATFORM'] // you can set roles in root nav
  },
  children: [{
    path: 'daily',
    component: () => import('@/views/sales-statistics/daily'),
    name: 'salesStatisticsDaily',
    meta: {
      title: '日销售统计'
    }
  }, {
    path: 'monthly',
    component: () => import('@/views/sales-statistics/monthly'),
    name: 'salesStatisticsMonthly',
    meta: {
      title: '月销售统计'
    }
  }, {
    path: 'volume',
    component: () => import('@/views/sales-statistics/volume'),
    name: 'salesStatisticsVolume',
    meta: {
      title: '销售量排行'
    }
  }, {
    path: 'sale',
    component: () => import('@/views/sales-statistics/sale'),
    name: 'salesStatisticsSale',
    meta: {
      title: '销售额排行'
    }
  }]
}
