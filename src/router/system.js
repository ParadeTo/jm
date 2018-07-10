/* Layout */
import Layout from '@/views/layout/Layout'

export default {
  path: '',
  component: Layout,
  redirect: 'system/role',
  alwaysShow: true, // will always show the root menu
  meta: {
    title: '系统管理',
    icon: 'shoppingCard',
    roles: ['bmsAdmin'] // you can set roles in root nav
  },
  children: [{
    path: 'system/role',
    component: () => import('@/views/system/role'),
    name: 'systemRole',
    meta: {
      title: '角色管理'
    }
  }, {
    path: 'system/user',
    component: () => import('@/views/system/user'),
    name: 'systemUser',
    meta: {
      title: '用户管理'
    }
  }, {
    path: 'system/agreement',
    component: () => import('@/views/system/agreement'),
    name: 'systemAgreement',
    meta: {
      title: '平台用户协议'
    }
  }, {
    path: 'system/about',
    component: () => import('@/views/system/about'),
    name: 'systemAbout',
    meta: {
      title: '关于我们'
    }
  }, {
    path: 'system/dictionary',
    component: () => import('@/views/system/dictionary'),
    name: 'systemDictionary',
    meta: {
      title: '数据字典'
    }
  }, {
    path: 'system/message',
    component: () => import('@/views/system/message'),
    name: 'systemMessage',
    meta: {
      title: '消息管理'
    }
  }, {
    path: 'system/log',
    component: () => import('@/views/system/log'),
    name: 'systemLog',
    meta: {
      title: '系统日志'
    }
  }]
}
