/* Layout */
import Layout from '@/views/layout/Layout'

export default {
  path: '/city-agency',
  component: Layout,
  redirect: '/city-agency/apply',
  alwaysShow: true, // will always show the root menu
  meta: {
    title: '城市代理',
    icon: 'lock',
    roles: ['providerAdmin']
  },
  children: [{
    path: 'apply',
    component: () => import('@/views/city-agency/apply'),
    name: 'cityAgencyApply',
    meta: {
      title: '代理管理'
    }
  }, {
    path: 'statistics',
    component: () => import('@/views/city-agency/statistics'),
    name: 'cityAgencyStatistics',
    meta: {
      title: '代理统计'
    }
  }, {
    path: 'statistics/client',
    component: () => import('@/views/city-agency/statistics/client'),
    name: 'cityAgencyStatisticsClient',
    meta: {
      title: '新增客户'
    }
  }, {
    path: 'salesman',
    component: () => import('@/views/city-agency/salesman'),
    name: 'cityAgencySalesman',
    meta: {
      title: '业务员管理'
    }
  }]
}
