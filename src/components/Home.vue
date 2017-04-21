<template>
  <div class="hello">
	  <router-link to="/mypage">Go to mypage</router-link>
    <h2>{{ msg }}</h2>
    <input type="text" v-model="msg">
    <button @click="show1 = true">action</button>
    <yd-actionsheet :items="myItems1" v-model="show1" cancel="取消"></yd-actionsheet>
  </div>
</template>

<script>
import Vue from 'vue'
import {ActionSheet} from 'vue-ydui/dist/lib.px/actionsheet'
import {Toast} from 'vue-ydui/dist/lib.px/dialog'
Vue.component(ActionSheet.name, ActionSheet)
Vue.prototype.$dialog = {
	toast: Toast
}

export default {
  name: 'Home',
  data () {
    return {
      msg: 'this is Home.vue',
      show1: false,
      myItems1: [
	      {
	      	label: '拍照',
	      	other: 'other1',
	      	method: () => {
	      		this.$dialog.toast({mes: 'this is dialog toast!'})
	      		// Toast({mes: 'this is dialog toast!'})
	      	}
		    },
	      {
	      	label: 'cong xiangce',
	      	other: 'other2'
		    }
      ]
    }
  },
  methods: {
  }
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
