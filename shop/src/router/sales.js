/* Layout */
import Layout from '@/views/layout/Layout'

export default {
  path: '/sales',
  component: Layout,
  redirect: '/sales/order',
  alwaysShow: true, // will always show the root menu
  meta: {
    title: '销售管理',
    icon: 'eye',
    roles: ['admin', 'editor'] // you can set roles in root nav
  },
  children: [{
    path: 'order',
    component: () => import('@/views/sales/order'),
    name: 'salesOrder',
    meta: {
      title: '订单管理'
    }
  }, {
    path: 'order/add',
    component: () => import('@/views/sales/order/add'),
    name: 'salesOrderAdd',
    hidden: true,
    meta: {
      title: '新增订单'
    }
  }, {
    path: 'order/detail/:id',
    component: () => import('@/views/sales/order/detail'),
    name: 'salesOrderDetail',
    hidden: true,
    meta: {
      title: '查看订单'
    }
  }, {
    path: 'order/temp',
    component: () => import('@/views/sales/order/temp'),
    name: 'salesOrderTemp',
    hidden: true,
    meta: {
      title: '订单模板'
    }
  }, {
    path: 'order/temp/add',
    component: () => import('@/views/sales/order/temp/add'),
    name: 'salesOrderTempAdd',
    hidden: true,
    meta: {
      title: '新增模板'
    }
  }, {
    path: 'refund',
    component: () => import('@/views/sales/refund'),
    name: 'salesRefund',
    meta: {
      title: '退货管理'
    }
  }, {
    path: 'refund/detail/:id',
    component: () => import('@/views/sales/refund/detail'),
    name: 'salesRefundDetail',
    hidden: true,
    meta: {
      title: '退货单详情'
    }
  }, {
    path: 'refund/add',
    component: () => import('@/views/sales/refund/detail'),
    name: 'salesRefundAdd',
    hidden: true,
    meta: {
      title: '新增退货单'
    }
  }]
}
