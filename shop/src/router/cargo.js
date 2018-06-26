/* Layout */
import Layout from '@/views/layout/Layout'

export default {
  path: '/cargo',
  component: Layout,
  redirect: '/cargo/order',
  alwaysShow: true, // will always show the root menu
  meta: {
    title: '进退货管理',
    icon: 'eye',
    roles: ['admin', 'editor'] // you can set roles in root nav
  },
  children: [{
    path: 'order',
    component: () => import('@/views/cargo/order'),
    name: 'cargoOrder',
    meta: {
      title: '订单管理'
    }
  }, {
    path: 'order/add',
    component: () => import('@/views/cargo/order/add'),
    name: 'cargoOrderAdd',
    hidden: true,
    meta: {
      title: '新增订单'
    }
  }, {
    path: 'order/detail/:id',
    component: () => import('@/views/cargo/order/detail'),
    name: 'cargoOrderDetail',
    hidden: true,
    meta: {
      title: '查看订单'
    }
  }, {
    path: 'order/temp',
    component: () => import('@/views/cargo/order/temp'),
    name: 'cargoOrderTemp',
    hidden: true,
    meta: {
      title: '订单模板'
    }
  }, {
    path: 'order/temp/add',
    component: () => import('@/views/cargo/order/temp/add'),
    name: 'cargoOrderTempAdd',
    hidden: true,
    meta: {
      title: '新增模板'
    }
  }, {
    path: 'purchase',
    component: () => import('@/views/cargo/purchase'),
    name: 'cargoPurchase',
    meta: {
      title: '进货管理'
    }
  }, {
    path: 'purchase/add',
    component: () => import('@/views/cargo/purchase/add'),
    name: 'cargoPurchaseAdd',
    hidden: true,
    meta: {
      title: '新增进货单'
    }
  }, {
    path: 'refund',
    component: () => import('@/views/cargo/refund'),
    name: 'cargoRefund',
    meta: {
      title: '退货管理'
    }
  }, {
    path: 'refund/detail/:id',
    component: () => import('@/views/cargo/refund/detail'),
    name: 'cargoRefundDetail',
    hidden: true,
    meta: {
      title: '退货单详情'
    }
  }, {
    path: 'refund/add',
    component: () => import('@/views/cargo/refund/detail'),
    name: 'cargoRefundAdd',
    hidden: true,
    meta: {
      title: '新增退货单'
    }
  }]
}
