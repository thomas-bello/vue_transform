import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

function load(component: string) {
  return () => import(`../views/${component}.vue`)
}

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: load('Home'),
    meta: {
      name: '首页'
    }
  },
  {
    path: '/about',
    name: 'About',
    component: load('About'),
    meta: {
      name: '关于我们'
    }
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
