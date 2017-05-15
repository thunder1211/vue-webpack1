<template>
  <div class="Home">
    <div class="bannerWrap">
      <Banner :banners="banners"></Banner>
      <ul class="sideNav">
        <li v-for="menu in sideMenus">
          <router-link :to="'/category/'+menu.catID">{{menu.catName}}
            <span class="xaiconfont">&#xe60d;</span>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="HomeSec">
      <div class="mainConts">
        <div class="secTit">
          <span class="co_green">最新</span>更新
        </div>
        <Daolist :listitems="newest" listType="specialList"></Daolist>
        <div class="secTit">
          <span class="co_green">推荐</span>用户
        </div>
        <Daolist :listitems="recommend" listType="type1"></Daolist>
        <div class="secTit">
          <span class="co_green">热门</span>推荐
        </div>
        <Daolist :listitems="hottest" listType="type2"></Daolist>
      </div>
      <div class="sideConts">
        <router-link class="testimony" :to="'/category/'+testimony.catID">
          <img :src="testimony.src">
        </router-link>
        <Sidelist :listitem="daily" catName="每日更新"></Sidelist>
        <Sidelist :listitem="sunday" catName="每周更新"></Sidelist>
        <div class="wechat">
          <div class="tit">
            <img class="wechatLogo" src="../../assets/images/wechat_logo.png" height="24">
            关注微信公众号
          </div>
          <img class="QRcode" :src="wechat.src">
        </div>
      </div>
    </div>




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
  import Banner from './Banner'
  import Daolist from './Daolist'
  import Sidelist from './Sidelist'
  import Loading from '@/components/common/Loading/index'

  export default {
    name: 'Home',
    created () {
      var _this = this
      Loading.open()
      axios.get('/api/home')
        .then(function ({data}) {
          if (data.code !== 0) {
            console.error(data.msg)
            return
          }
          data = data.data
          Loading.close()
          _this.banners = data.banners
          _this.sideMenus = data.sideMenus
          _this.newest = data.newest
          _this.recommend = data.recommend
          _this.hottest = data.hottest
          _this.testimony = data.testimony
          _this.wechat = data.wechat
          _this.daily = data.daily
          _this.sunday = data.sunday
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    data () {
      return {
        banners: [],
        sideMenus: [],
        newest: [],
        recommend: [],
        hottest: [],
        testimony: {},
        wechat: {},
        daily: {},
        sunday: {},
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
      Daolist,
      Sidelist,
      Loading
    }
  }
</script>

<style lang="scss">
@import "../../assets/css/style";

.bannerWrap{
  position: relative;
  margin-top: 10px;
  .sideNav{
    position: absolute;
    z-index: 10;
    left: 0;
    top: 0;
    height: 100%;
    width: 240px;
    padding-top: 10px;
    border-radius: 5px 0 0 5px;
    overflow: hidden;
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
.HomeSec{
  @include clearFix;
  margin-top: 20px;
  .mainConts{
    width: 810px;
    float: left;
    .secTit{
      margin-bottom: 10px;
      font-size: 24px;
    }
  }
  .sideConts{
    float: right;
    width: 250px;
    padding-top: 45px;
    margin-left: -20px;
    .testimony{
      img{
        border-radius: 5px;
      }
    }
    .wechat{
      .tit{
        position: relative;
        padding: 10px 0;
        padding-left: 30px;
        font-size: 20px;
        line-height: 30px;
        .wechatLogo{
          position: absolute;
          left: 0;
          top: 50%;
          margin-top: -12px;
          display: inline-block;
        }
      }
      .QRcode{
        border-radius: 5px;
      }
    }
  }
}
</style>
