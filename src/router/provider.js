/* Layout */
import Layout from '@/views/layout/Layout'

export default {
  path: '/provider',
  component: Layout,
  redirect: '/provider/my',
  alwaysShow: true, // will always show the root menu
  meta: {
    title: '供应商管理',
    icon: 'edit',
    roles: ['shopAdmin'] // you can set roles in root nav
  },
  children: [{
    path: 'my',
    component: () => import('@/views/provider/my'),
    name: 'providerMy',
    meta: {
      title: '我的供应商'
    }
  }, {
    path: 'platform',
    component: () => import('@/views/provider/platform'),
    name: 'providerPlatform',
    meta: {
      title: '平台供应商'
    }
  }, {
    path: 'detail/:id',
    component: () => import('@/views/provider/detail'),
    name: 'providerDetail',
    hidden: true,
    meta: {
      title: '供应商详情'
    }
  }]
}
