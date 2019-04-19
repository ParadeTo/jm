/* Layout */
import Layout from '@/views/layout/Layout'

export default {
  path: '/manufacturer',
  component: Layout,
  redirect: '/manufacturer',
  alwaysShow: true, // will always show the root menu
  meta: {
    title: '厂家管理',
    icon: 'shoppingCard',
    roles: ['PLATFORM'] // you can set roles in root nav
  },
  children: [{
    path: '',
    component: () => import('@/views/manufacturer'),
    name: 'manufacturerIndex',
    meta: {
      title: '厂家管理'
    }
  }, {
    path: 'audit',
    component: () => import('@/views/manufacturer/audit'),
    name: 'manufacturerAudit',
    // hidden: true,
    meta: {
      title: '厂家审核'
    }
  }, {
    path: 'industry',
    component: () => import('@/views/manufacturer/industry'),
    name: 'manufacturerIndustry',
    meta: {
      title: '行业类别管理'
    }
  }]
}
