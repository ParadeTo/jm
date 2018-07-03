/* Layout */
import Layout from '@/views/layout/Layout'

export default {
  path: '/system',
  component: Layout,
  redirect: '/system/role',
  alwaysShow: true, // will always show the root menu
  meta: {
    title: '系统管理',
    icon: 'shoppingCard',
    roles: ['admin', 'editor'] // you can set roles in root nav
  },
  children: [{
    path: 'role',
    component: () => import('@/views/system/role'),
    name: 'systemRole',
    meta: {
      title: '角色管理'
    }
  }, {
    path: 'user',
    component: () => import('@/views/system/user'),
    name: 'systemUser',
    meta: {
      title: '用户管理'
    }
  }, {
    path: 'agreement',
    component: () => import('@/views/system/agreement'),
    name: 'systemAgreement',
    meta: {
      title: '平台用户协议'
    }
  }, {
    path: 'about',
    component: () => import('@/views/system/about'),
    name: 'systemAbout',
    meta: {
      title: '关于我们'
    }
  }, {
    path: 'dictionary',
    component: () => import('@/views/system/dictionary'),
    name: 'systemDictionary',
    meta: {
      title: '数据字典'
    }
  }, {
    path: 'message',
    component: () => import('@/views/system/message'),
    name: 'systemMessage',
    meta: {
      title: '消息管理'
    }
  }, {
    path: 'log',
    component: () => import('@/views/system/log'),
    name: 'systemLog',
    meta: {
      title: '系统日志'
    }
  }]
}
