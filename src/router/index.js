import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Home from '@/components/home/Home'
// import Mypage from '@/components/Mypage'

Vue.use(Router)
const Mypage = resolve => require(['@/components/Mypage'], resolve)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
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
