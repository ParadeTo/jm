/* Layout */
import Layout from '@/views/layout/Layout'

export default {
  path: '/weixin',
  component: Layout,
  redirect: '/weixin/user',
  alwaysShow: true, // will always show the root menu
  meta: {
    title: '微信管理',
    icon: 'clipboard',
    roles: ['PLATFORM'] // you can set roles in root nav
  },
  children: [{
    path: 'user',
    component: () => import('@/views/weixin/user'),
    name: 'weixinUser',
    meta: {
      title: '微信用户管理'
    }
  }, {
    path: 'coupon',
    component: () => import('@/views/weixin/coupon'),
    name: 'weixinCoupon',
    meta: {
      title: '优惠券管理'
    }
  }, {
    path: 'complain',
    component: () => import('@/views/weixin/complain'),
    name: 'weixinComplain',
    meta: {
      title: '投诉管理'
    }
  }]
}
