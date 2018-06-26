/* Layout */
import Layout from '@/views/layout/Layout'

export default {
  path: '/client',
  component: Layout,
  redirect: '/client/my',
  alwaysShow: true, // will always show the root menu
  meta: {
    title: '客户管理',
    icon: 'theme',
    roles: ['admin', 'editor'] // you can set roles in root nav
  },
  children: [{
    path: 'my',
    component: () => import('@/views/client/my'),
    name: 'clientMy',
    meta: {
      title: '我的客户'
    }
  }, {
    path: 'shop',
    component: () => import('@/views/client/shop'),
    name: 'clientShop',
    meta: {
      title: '平台门店'
    }
  }, {
    path: 'provider',
    component: () => import('@/views/client/provider'),
    name: 'clientProvider',
    meta: {
      title: '平台供应商'
    }
  }, {
    path: 'manufacturer',
    component: () => import('@/views/client/manufacturer'),
    name: 'clientManufacturer',
    meta: {
      title: '平台厂商'
    }
  }]
}