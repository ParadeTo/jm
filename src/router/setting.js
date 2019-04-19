/* Layout */
import Layout from '@/views/layout/Layout'

export default {
  path: '/setting',
  component: Layout,
  redirect: '/setting/shop',
  alwaysShow: true, // will always show the root menu
  meta: {
    title: '系统设置',
    icon: 'lock',
    roles: ['STORE', 'SUPPLIER'] // you can set roles in root nav
  },
  children: [{
    path: 'shop',
    component: () => import('@/views/setting/shop'),
    name: 'settingShop',
    meta: {
      title: '门店设置'
    }
  }, {
    path: 'shop/basic',
    component: () => import('@/views/setting/shop/basic'),
    name: 'settingShopBasic',
    hidden: true,
    meta: {
      title: '基本信息'
    }
  }, {
    path: 'shop/withdraw',
    component: () => import('@/views/setting/shop/withdraw'),
    name: 'settingShopWithdraw',
    hidden: true,
    meta: {
      title: '提现信息'
    }
  }, {
    path: 'shop/certification',
    component: () => import('@/views/setting/shop/certification'),
    name: 'settingShopCertification',
    hidden: true,
    meta: {
      title: '实名认证'
    }
  },
  // {
  //   path: 'basic',
  //   component: () => import('@/views/setting/basic'),
  //   name: 'settingBasic',
  //   meta: {
  //     title: '基本设置'
  //   }
  // },
  {
    path: 'staff',
    component: () => import('@/views/setting/staff'),
    name: 'settingStaff',
    meta: {
      title: '员工设置'
    }
  }
  // {
  //   path: 'operation',
  //   component: () => import('@/views/setting/operation'),
  //   name: 'settingOperation',
  //   meta: {
  //     title: '操作记录'
  //   }
  // }, {
  //   path: 'violation',
  //   component: () => import('@/views/setting/violation'),
  //   name: 'settingViolation',
  //   meta: {
  //     title: '违规记录'
  //   }
  // }
  ]
}
