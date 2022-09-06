import Vue from 'vue'
import VueRouter from 'vue-router'
//  import Login from '@/views/Login'
//  首屏加载速度很慢，可以使用路由懒加载，只有使用到了再去请求
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    //  component: Login，下面路由懒加载
    component: () => import('@/views/Login')
  }
]

const router = new VueRouter({
  routes
})

export default router
