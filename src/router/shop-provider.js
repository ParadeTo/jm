/* Layout */
import Layout from '@/views/layout/Layout'
// 门店系统的供应商管理，有别于后台管理系统的门店管理
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
    component: () => import('@/views/shop-provider/my'),
    name: 'shopProviderMy',
    meta: {
      title: '我的供应商'
    }
  }, {
    path: 'platform',
    component: () => import('@/views/shop-provider/platform'),
    name: 'shopProviderPlatform',
    meta: {
      title: '平台供应商'
    }
  }, {
    path: 'detail/:id',
    component: () => import('@/views/shop-provider/detail'),
    name: 'shopProviderDetail',
    hidden: true,
    meta: {
      title: '供应商详情'
    }
  }]
}
