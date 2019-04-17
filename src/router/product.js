/* Layout */
import Layout from '@/views/layout/Layout'

export default {
  path: '/product',
  component: Layout,
  redirect: '/product/list',
  alwaysShow: true, // will always show the root menu
  meta: {
    title: '商品管理',
    icon: 'clipboard',
    roles: ['bmsAdmin', 'providerAdmin'] // you can set roles in root nav
  },
  children: [{
    path: 'list',
    component: () => import('@/views/product/list'),
    name: 'productList',
    meta: {
      title: '商品列表'
    }
  }, {
    path: 'add',
    component: () => import('@/views/product/detail'),
    name: 'productAdd',
    meta: {
      title: '新增商品'
    }
  }, {
    path: 'detail/:id',
    component: () => import('@/views/product/detail'),
    name: 'productDetail',
    meta: {
      title: '商品详情'
    }
  }, {
    path: 'detail/:id/edit',
    component: () => import('@/views/product/detail'),
    name: 'productEdit',
    meta: {
      title: '商品编辑'
    }
  }, {
    path: 'setting',
    component: () => import('@/views/product/setting'),
    name: 'productSetting',
    meta: {
      title: '参数设置'
    }
  }]
}
