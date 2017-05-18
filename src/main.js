// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import 'vue-ydui/dist/ydui.base.css'
import 'iview/dist/styles/iview.css'
import './assets/css/style.scss'

// import { jcookie } from '@/utils/assist'

Vue.config.productionTip = false

/* 添加响应拦截器 */
axios.interceptors.response.use(function (res) {
  var data = res.data;
  if (data.code && data.code !== 0) {
    router.push({ path: '/login' })
  }
  return res;
}, function (error) {
  /* 请求错误时做些事 */
  return Promise.reject(error)
});

// router.beforeEach((to, from, next) => {
//   console.log(from)
//   if (to.path === '/login') {
//   	if (jcookie('SESSIONID')) router.replace('/home')
//   	next()
//   } else if (jcookie('SESSIONID')) {
//   	next()
//   } else {
//   	router.push('/login')
//   }
//   next()
// })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
