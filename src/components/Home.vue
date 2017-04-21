<template>
  <div class="Home">
    <div class="bannerWrap">
      <Banner :banners="banners"></Banner>
      <ul class="sideNav">
        <li v-for="menu in sideMenus">
          <router-link :to="'/category/'+menu.catID">{{menu.name}}
            <span class="xaiconfont">&#xe60d;</span>
          </router-link>
        </li>
      </ul>
    </div>
    <Loading></Loading>
	  <router-link to="/mypage">Go to mypage</router-link>
    <h2>{{ msg }}</h2>
    <input type="text" v-model="msg">
    <button @click="show1 = true">action</button>
    <yd-actionsheet :items="myItems1" v-model="show1" cancel="取消"></yd-actionsheet>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import {ActionSheet} from 'vue-ydui/dist/lib.px/actionsheet'
import {Toast} from 'vue-ydui/dist/lib.px/dialog'
Vue.component(ActionSheet.name, ActionSheet)
Vue.prototype.$dialog = {
	toast: Toast
}
import Banner from '@/components/Banner'
import Loading from '@/components/common/Loading'

export default {
  name: 'Home',
  created () {
    var _this = this
      axios.get('/api/home')
        .then(function ({data}) {
          console.log(data.banners)
          _this.banners = data.banners
          _this.sideMenus = data.sideMenus
        })
        .catch(function (error) {
          console.log(error)
        })
  },
  data () {
    return {
      banners: [],
      sideMenus: [],
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
  },
  components: {
    Banner,
    Loading
  }
}
</script>

<style lang="scss">
.bannerWrap{
  position: relative;
  .sideNav{
    position: absolute;
    z-index: 10;
    left: 0;
    top: 0;
    height: 100%;
    width: 240px;
    padding-top: 10px;
    background: rgba(0,0,0,.5);
    li{
      padding: 0 20px;
      a{
        position: relative;
        display: block;
        height: 50px;
        padding: 0 20px;
        line-height: 50px;
        color: #fff;
        border-bottom: 1px solid #333;
        .xaiconfont{
          position: absolute;
          right: 10px;
          font-size: 12px;
        }
      }
      &:last-child{
        a{
          border-bottom: none;
        }
      }
      &:hover{
        background: rgba(0,0,0,0.3);
      }
    }
  }
}
</style>
