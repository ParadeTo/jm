/* Layout */
import Layout from '@/views/layout/Layout'
// 门店系统的供应商管理，有别于后台管理系统的门店管理
export default {
  path: '/advertisement',
  component: Layout,
  redirect: '/advertisement',
  alwaysShow: true, // will always show the root menu
  meta: {
    title: '广告管理',
    icon: 'edit',
    roles: ['PLATFORM'] // you can set roles in root nav
  },
  children: [{
    path: '',
    component: () => import('@/views/advertisement'),
    name: 'advertisementIndex',
    meta: {
      title: '首页轮播图管理'
    }
  }]
}
