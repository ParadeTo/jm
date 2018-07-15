/* Layout */
import Layout from '@/views/layout/Layout'

export default {
  path: '/city-agency',
  component: Layout,
  redirect: '/city-agency',
  alwaysShow: true, // will always show the root menu
  meta: {
    title: '城市代理管理',
    icon: 'lock',
    roles: ['bmsAdmin']
  },
  children: [{
    path: '',
    component: () => import('@/views/bms-city-agency'),
    name: 'bmsCityAgency',
    meta: {
      title: '城市代理管理'
    }
  }, {
    path: 'detail/:id',
    component: () => import('@/views/bms-city-agency/detail'),
    name: 'bmsCityAgencyDetail',
    hidden: true,
    meta: {
      title: '城市代理商详情'
    }
  }, {
    path: 'apply',
    component: () => import('@/views/bms-city-agency/apply'),
    name: 'bmsCityAgencyApply',
    meta: {
      title: '城市代理申请'
    }
  }, {
    path: 'audit/:id',
    component: () => import('@/views/bms-city-agency/audit'),
    name: 'bmsCityAgencyAudit',
    hidden: true,
    meta: {
      title: '城市代理商审核设置'
    }
  }]
}
