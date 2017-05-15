// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'vue-ydui/dist/ydui.base.css'
import 'iview/dist/styles/iview.css'
import './assets/css/style.scss'

import { jcookie } from '@/utils/assist'

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
  	if (jcookie('SESSIONID')) router.replace('/home')
  	next()
  } else if (jcookie('SESSIONID')) {
  	next()
  } else {
  	router.push('/login')
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
