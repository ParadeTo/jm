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
    path: 'template',
    component: () => import('@/views/sales/template'),
    name: 'salesTemplate',
    meta: {
      title: '销售订单模板'
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
    path: 'order',
    component: () => import('@/views/sales/order'),
    name: 'salesOrder',
    meta: {
      title: '销售订单'
    }
  }, {
    path: 'order/add',
    component: () => import('@/views/sales/order/detail'),
    name: 'salesOrderAdd',
    hidden: true,
    meta: {
      title: '新增销售订单'
    }
  }, {
    path: 'order/:id',
    component: () => import('@/views/sales/order/detail'),
    name: 'salesOrderDetail',
    hidden: true,
    meta: {
      title: '查看销售订单'
    }
  }, {
    path: 'order/:id/edit',
    component: () => import('@/views/sales/order/detail'),
    name: 'salesOrderEdit',
    hidden: true,
    meta: {
      title: '编辑销售订单'
    }
  }, {
    path: 'sales-ticket',
    component: () => import('@/views/sales/sales-ticket'),
    name: 'salesTicket',
    meta: {
      title: '销售单'
    }
  }, {
    path: 'sales-ticket/add',
    component: () => import('@/views/sales/sales-ticket/detail'),
    name: 'salesTicketAdd',
    hidden: true,
    meta: {
      title: '新增销售单'
    }
  }, {
    path: 'sales-ticket/:id',
    component: () => import('@/views/sales/sales-ticket/detail'),
    name: 'salesTicketDetail',
    hidden: true,
    meta: {
      title: '查看销售单'
    }
  }, {
    path: 'sales-ticket/:id/edit',
    component: () => import('@/views/sales/sales-ticket/detail'),
    name: 'salesTicketEdit',
    hidden: true,
    meta: {
      title: '编辑销售单'
    }
  }, {
    path: 'return',
    component: () => import('@/views/sales/return'),
    name: 'salesReturn',
    meta: {
      title: '销售退货单'
    }
  }, {
    path: 'return/add',
    component: () => import('@/views/sales/return/detail'),
    name: 'salesReturnAdd',
    hidden: true,
    meta: {
      title: '新增退货单'
    }
  }, {
    path: 'return/:id',
    exact: true,
    component: () => import('@/views/sales/return/detail'),
    name: 'salesReturnDetail',
    hidden: true,
    meta: {
      title: '退货单详情'
    }
  }, {
    path: 'return/:id/edit',
    component: () => import('@/views/sales/return/detail'),
    name: 'salesReturnEdit',
    hidden: true,
    meta: {
      title: '编辑退货单'
    }
  }]
}
