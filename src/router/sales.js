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
    roles: ['SUPPLIER'] // you can set roles in root nav
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
    component: () => import('@/views/sales/order/detail'),
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
    path: 'sales-ticket',
    component: () => import('@/views/sales/sales-ticket'),
    name: 'salesTicket',
    meta: {
      title: '销售单管理'
    }
  }, {
    path: 'sales-ticket/add',
    component: () => import('@/views/sales/sales-ticket/add'),
    name: 'salesTicketAdd',
    hidden: true,
    meta: {
      title: '新增销售单'
    }
  }, {
    path: 'sales-ticket/detail/:id',
    component: () => import('@/views/sales/sales-ticket/detail'),
    name: 'salesTicketDetail',
    hidden: true,
    meta: {
      title: '查看销售单'
    }
  }, {
    path: 'template',
    component: () => import('@/views/sales/template'),
    name: 'salesTemplate',
    meta: {
      title: '销售模板'
    }
  }, {
    path: 'template/add',
    component: () => import('@/views/sales/template/detail'),
    name: 'salesTemplateAdd',
    hidden: true,
    meta: {
      title: '新增销售模板'
    }
  }, {
    path: 'template/:id',
    component: () => import('@/views/sales/template/detail'),
    name: 'salesTemplateDetail',
    hidden: true,
    meta: {
      title: '销售模板详情'
    }
  }, {
    path: 'template/:id/edit',
    component: () => import('@/views/sales/template/detail'),
    name: 'salesTemplateEdit',
    hidden: true,
    meta: {
      title: '编辑销售模板'
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
