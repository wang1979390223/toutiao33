import Vue from 'vue'
import VueRouter from 'vue-router'
//  import Login from '@/views/Login'
//  首屏加载速度很慢，可以使用路由懒加载，只有使用到了再去请求
Vue.use(VueRouter)
//  懒加载的chunk 默认的名字是模块的路径
//  webpack魔法注释：/* webpackChunkName：'新名字' */
/*  */
const routes = [
  {
    path: '/search',
    component: () => import('@/views/Search')
  },
  {
    path: '/login',
    //  component: Login，下面路由懒加载
    component: () => import('@/views/Login')
  },
  {
    path: '/',
    component: () => import('@/views/Layout'),
    redirect: '/ ',
    children: [
      {
        path: '/ ',
        component: () => import(/* webpackChunkName:'base' */ '@/views/Home')
      },
      {
        path: '/video',
        component: () => import('@/views/Video')
      },
      {
        path: '/qa',
        component: () => import('@/views/QA')
      },
      {
        path: '/profile',
        component: () => import('@/views/My')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
