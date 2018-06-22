import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'

/** note: submenu only apppear when children.length>=1
*   detail see  https://panjiachen.github.io/vue-element-admin-site/#/router-and-nav?id=sidebar
**/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/authredirect', component: () => import('@/views/login/authredirect'), hidden: true },
  { path: '/404', component: () => import('@/views/errorPage/404'), hidden: true },
  { path: '/401', component: () => import('@/views/errorPage/401'), hidden: true },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      name: 'dashboard',
      meta: { title: 'dashboard', icon: 'dashboard', noCache: true }
    }]
  },
  {
    path: '',
    component: Layout,
    redirect: 'home',
    children: [{
      path: 'home',
      component: () => import('@/views/home/index'),
      name: 'home',
      meta: { title: '首页', icon: 'dashboard', noCache: true }
    }]
  }

  // {
  //   path: '/documentation',
  //   component: Layout,
  //   redirect: '/documentation/index',
  //   children: [{
  //     path: 'index',
  //     component: () => import('@/views/documentation/index'),
  //     name: 'documentation',
  //     meta: { title: 'documentation', icon: 'documentation', noCache: true }
  //   }]
  // },
  // {
  //   path: '/guide',
  //   component: Layout,
  //   redirect: '/guide/index',
  //   children: [{
  //     path: 'index',
  //     component: () => import('@/views/guide/index'),
  //     name: 'guide',
  //     meta: { title: 'guide', icon: 'guide', noCache: true }
  //   }]
  // }
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/checkstand',
    component: Layout,
    redirect: '/checkstand/history',
    alwaysShow: true, // will always show the root menu
    meta: {
      title: '收银台',
      icon: 'lock',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [{
      path: 'history',
      component: () => import('@/views/checkstand/history'),
      name: 'checkstandHistory',
      meta: {
        title: '收银历史'
      }
    }, {
      path: 'statistics',
      component: () => import('@/views/checkstand/statistics'),
      name: 'checkstandStatistics',
      meta: {
        title: '收银统计'
      }
    }]
  },

  {
    path: '/product',
    component: Layout,
    redirect: '/product/list',
    alwaysShow: true, // will always show the root menu
    meta: {
      title: '商品管理',
      icon: 'clipboard',
      roles: ['admin', 'editor'] // you can set roles in root nav
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
      component: () => import('@/views/product/add'),
      name: 'productAdd',
      meta: {
        title: '新增商品'
      }
    }]
  },

  {
    path: '/provider',
    component: Layout,
    redirect: '/provider/my',
    alwaysShow: true, // will always show the root menu
    meta: {
      title: '供应商管理',
      icon: 'edit',
      roles: ['admin', 'editor'] // you can set roles in root nav
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
  },

  {
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
  },

  {
    path: '/inventory',
    component: Layout,
    redirect: '/inventory/check',
    alwaysShow: true, // will always show the root menu
    meta: {
      title: '库存管理',
      icon: 'guide',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [{
      path: 'check',
      component: () => import('@/views/inventory/check'),
      name: 'inventoryCheck',
      meta: {
        title: '盘点管理'
      }
    }, {
      path: 'alarm',
      component: () => import('@/views/inventory/alarm'),
      name: 'inventoryAlarm',
      meta: {
        title: '报溢报损'
      }
    }]
  },

  {
    path: '/settlement',
    component: Layout,
    redirect: '/settlement/receive',
    alwaysShow: true, // will always show the root menu
    meta: {
      title: '结算管理',
      icon: 'shoppingCard',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [{
      path: 'receive',
      component: () => import('@/views/settlement/receive'),
      name: 'settlementReceive',
      meta: {
        title: '收货结算'
      }
    }]
  },

  {
    path: '/history',
    component: Layout,
    redirect: '/history/purchase-price',
    alwaysShow: true, // will always show the root menu
    meta: {
      title: '历史查询',
      icon: 'star',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [{
      path: 'purchase-price',
      component: () => import('@/views/history/purchasePrice'),
      name: 'historyPurchasePrice',
      meta: {
        title: '历史进价'
      }
    }]
  },

  {
    path: '/sales-statistics',
    component: Layout,
    redirect: '/sales-statistics/daily',
    alwaysShow: true, // will always show the root menu
    meta: {
      title: '销售统计',
      icon: 'theme',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [{
      path: 'daily',
      component: () => import('@/views/sales-statistics/daily'),
      name: 'salesStatisticsDaily',
      meta: {
        title: '日销售统计'
      }
    }, {
      path: 'monthly',
      component: () => import('@/views/sales-statistics/monthly'),
      name: 'salesStatisticsMonthly',
      meta: {
        title: '月销售统计'
      }
    }, {
      path: 'volume',
      component: () => import('@/views/sales-statistics/volume'),
      name: 'salesStatisticsVolume',
      meta: {
        title: '销售量排行'
      }
    }, {
      path: 'sale',
      component: () => import('@/views/sales-statistics/sale'),
      name: 'salesStatisticsSale',
      meta: {
        title: '销售额排行'
      }
    }]
  },

  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/index',
    alwaysShow: true, // will always show the root menu
    meta: {
      title: 'permission',
      icon: 'lock',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [{
      path: 'page',
      component: () => import('@/views/permission/page'),
      name: 'pagePermission',
      meta: {
        title: 'pagePermission',
        roles: ['admin'] // or you can only set roles in sub nav
      }
    }, {
      path: 'directive',
      component: () => import('@/views/permission/directive'),
      name: 'directivePermission',
      meta: {
        title: 'directivePermission'
        // if do not set roles, means: this page does not require permission
      }
    }]
  },

  {
    path: '/icon',
    component: Layout,
    children: [{
      path: 'index',
      component: () => import('@/views/svg-icons/index'),
      name: 'icons',
      meta: { title: 'icons', icon: 'icon', noCache: true }
    }]
  },

  {
    path: '/components',
    component: Layout,
    redirect: 'noredirect',
    name: 'component-demo',
    meta: {
      title: 'components',
      icon: 'component'
    },
    children: [
      { path: 'tinymce', component: () => import('@/views/components-demo/tinymce'), name: 'tinymce-demo', meta: { title: 'tinymce' }},
      { path: 'markdown', component: () => import('@/views/components-demo/markdown'), name: 'markdown-demo', meta: { title: 'markdown' }},
      { path: 'json-editor', component: () => import('@/views/components-demo/jsonEditor'), name: 'jsonEditor-demo', meta: { title: 'jsonEditor' }},
      { path: 'splitpane', component: () => import('@/views/components-demo/splitpane'), name: 'splitpane-demo', meta: { title: 'splitPane' }},
      { path: 'avatar-upload', component: () => import('@/views/components-demo/avatarUpload'), name: 'avatarUpload-demo', meta: { title: 'avatarUpload' }},
      { path: 'dropzone', component: () => import('@/views/components-demo/dropzone'), name: 'dropzone-demo', meta: { title: 'dropzone' }},
      { path: 'sticky', component: () => import('@/views/components-demo/sticky'), name: 'sticky-demo', meta: { title: 'sticky' }},
      { path: 'count-to', component: () => import('@/views/components-demo/countTo'), name: 'countTo-demo', meta: { title: 'countTo' }},
      { path: 'mixin', component: () => import('@/views/components-demo/mixin'), name: 'componentMixin-demo', meta: { title: 'componentMixin' }},
      { path: 'back-to-top', component: () => import('@/views/components-demo/backToTop'), name: 'backToTop-demo', meta: { title: 'backToTop' }},
      { path: 'drag-dialog', component: () => import('@/views/components-demo/dragDialog'), name: 'dragDialog-demo', meta: { title: 'dragDialog' }},
      { path: 'dnd-list', component: () => import('@/views/components-demo/dndList'), name: 'dndList-demo', meta: { title: 'dndList' }},
      { path: 'drag-kanban', component: () => import('@/views/components-demo/dragKanban'), name: 'dragKanban-demo', meta: { title: 'dragKanban' }}
    ]
  },

  {
    path: '/charts',
    component: Layout,
    redirect: 'noredirect',
    name: 'charts',
    meta: {
      title: 'charts',
      icon: 'chart'
    },
    children: [
      { path: 'keyboard', component: () => import('@/views/charts/keyboard'), name: 'keyboardChart', meta: { title: 'keyboardChart', noCache: true }},
      { path: 'line', component: () => import('@/views/charts/line'), name: 'lineChart', meta: { title: 'lineChart', noCache: true }},
      { path: 'mixchart', component: () => import('@/views/charts/mixChart'), name: 'mixChart', meta: { title: 'mixChart', noCache: true }}
    ]
  },

  {
    path: '/tab',
    component: Layout,
    children: [{
      path: 'index',
      component: () => import('@/views/tab/index'),
      name: 'tab',
      meta: { title: 'tab', icon: 'tab' }
    }]
  },

  {
    path: '/table',
    component: Layout,
    redirect: '/table/complex-table',
    name: 'table',
    meta: {
      title: 'Table',
      icon: 'table'
    },
    children: [
      { path: 'dynamic-table', component: () => import('@/views/table/dynamicTable/index'), name: 'dynamicTable', meta: { title: 'dynamicTable' }},
      { path: 'drag-table', component: () => import('@/views/table/dragTable'), name: 'dragTable', meta: { title: 'dragTable' }},
      { path: 'inline-edit-table', component: () => import('@/views/table/inlineEditTable'), name: 'inlineEditTable', meta: { title: 'inlineEditTable' }},
      { path: 'tree-table', component: () => import('@/views/table/treeTable/treeTable'), name: 'treeTableDemo', meta: { title: 'treeTable' }},
      { path: 'custom-tree-table', component: () => import('@/views/table/treeTable/customTreeTable'), name: 'customTreeTableDemo', meta: { title: 'customTreeTable' }},
      { path: 'complex-table', component: () => import('@/views/table/complexTable'), name: 'complexTable', meta: { title: 'complexTable' }}
    ]
  },

  {
    path: '/example',
    component: Layout,
    redirect: '/example/list',
    name: 'example',
    meta: {
      title: 'example',
      icon: 'example'
    },
    children: [
      { path: 'create', component: () => import('@/views/example/create'), name: 'createArticle', meta: { title: 'createArticle', icon: 'edit' }},
      { path: 'edit/:id(\\d+)', component: () => import('@/views/example/edit'), name: 'editArticle', meta: { title: 'editArticle', noCache: true }, hidden: true },
      { path: 'list', component: () => import('@/views/example/list'), name: 'articleList', meta: { title: 'articleList', icon: 'list' }}
    ]
  },

  {
    path: '/error',
    component: Layout,
    redirect: 'noredirect',
    name: 'errorPages',
    meta: {
      title: 'errorPages',
      icon: '404'
    },
    children: [
      { path: '401', component: () => import('@/views/errorPage/401'), name: 'page401', meta: { title: 'page401', noCache: true }},
      { path: '404', component: () => import('@/views/errorPage/404'), name: 'page404', meta: { title: 'page404', noCache: true }}
    ]
  },

  {
    path: '/error-log',
    component: Layout,
    redirect: 'noredirect',
    children: [{ path: 'log', component: () => import('@/views/errorLog/index'), name: 'errorLog', meta: { title: 'errorLog', icon: 'bug' }}]
  },

  {
    path: '/excel',
    component: Layout,
    redirect: '/excel/export-excel',
    name: 'excel',
    meta: {
      title: 'excel',
      icon: 'excel'
    },
    children: [
      { path: 'export-excel', component: () => import('@/views/excel/exportExcel'), name: 'exportExcel', meta: { title: 'exportExcel' }},
      { path: 'export-selected-excel', component: () => import('@/views/excel/selectExcel'), name: 'selectExcel', meta: { title: 'selectExcel' }},
      { path: 'upload-excel', component: () => import('@/views/excel/uploadExcel'), name: 'uploadExcel', meta: { title: 'uploadExcel' }}
    ]
  },

  {
    path: '/zip',
    component: Layout,
    redirect: '/zip/download',
    alwaysShow: true,
    meta: { title: 'zip', icon: 'zip' },
    children: [{ path: 'download', component: () => import('@/views/zip/index'), name: 'exportZip', meta: { title: 'exportZip' }}]
  },

  {
    path: '/theme',
    component: Layout,
    redirect: 'noredirect',
    children: [{ path: 'index', component: () => import('@/views/theme/index'), name: 'theme', meta: { title: 'theme', icon: 'theme' }}]
  },

  {
    path: '/clipboard',
    component: Layout,
    redirect: 'noredirect',
    children: [{ path: 'index', component: () => import('@/views/clipboard/index'), name: 'clipboardDemo', meta: { title: 'clipboardDemo', icon: 'clipboard' }}]
  },

  {
    path: '/i18n',
    component: Layout,
    children: [{ path: 'index', component: () => import('@/views/i18n-demo/index'), name: 'i18n', meta: { title: 'i18n', icon: 'international' }}]
  },

  { path: '*', redirect: '/404', hidden: true }
]
