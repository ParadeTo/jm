/* Layout */
import Layout from '@/views/layout/Layout'

export default {
  path: '',
  component: Layout,
  redirect: 'home',
  meta: {
    roles: ['STORE', 'SUPPLIER']
  },
  children: [{
    path: 'home',
    component: () => import('@/views/home/index'),
    name: 'home',
    meta: { title: '首页', icon: 'dashboard', noCache: true }
  }]
}
