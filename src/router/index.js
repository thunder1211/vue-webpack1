import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Home from '@/components/home/Home'
// import Mypage from '@/components/Mypage'

Vue.use(Router)
const Category = resolve => require(['@/components/category/index'], resolve)
const Detail = resolve => require(['@/components/detail/index'], resolve)
const Mypage = resolve => require(['@/components/Mypage'], resolve)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/category/:catid',
      name: 'Category',
      component: Category
    },
    {
      path: '/category/:catid/did/:did',
      name: 'Detail',
      component: Detail
    },
    {
      path: '/mypage',
      name: 'Mypage',
      component: Mypage
    },
    {
      path: '/hello',
      name: 'Hello',
      component: Hello
    }
  ]
})
