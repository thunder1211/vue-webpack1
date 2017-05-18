import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/index'

Vue.use(Router)
const Home = resolve => require(['@/components/home/Home'], resolve)
const topMenu = resolve => require(['@/components/topmenu/index'], resolve)
const Category = resolve => require(['@/components/category/index'], resolve)
const Detail = resolve => require(['@/components/detail/index'], resolve)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      redirect: '/home'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'Home',
      components: {
        default: Home,
        topmenu: topMenu
      }
    },
    {
      path: '/category/:catid',
      name: 'Category',
      components: {
        default: Category,
        topmenu: topMenu
      }
    },
    {
      path: '/category/:catid/did/:did',
      name: 'Detail',
      components: {
        default: Detail,
        topmenu: topMenu
      }
    }
  ]
})
