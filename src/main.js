// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import 'vue-ydui/dist/ydui.base.css'
import 'iview/dist/styles/iview.css'
import './assets/css/style.scss'

// import eBus from '@/components/eventbus.js'
import { jcookie } from '@/utils/assist'

Vue.config.productionTip = false

/* 添加响应拦截器 */
axios.interceptors.response.use(function (res) {
  var data = res.data;
  if (data.code && data.code !== 0) {
    jcookie('isLogined', null) // 需要重新登录时，重置cookie中额登陆状态
    router.push({ path: '/login' })
  }
  return res;
}, function (error) {
  /* 请求错误时做些事 */
  return Promise.reject(error)
});

// 拦截前端路由
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
  	if (jcookie('isLogined')) { // 判断前端保存的登录状态
      next('/home')
    } else {
      next()
    }
  } else {
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
