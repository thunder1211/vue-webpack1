<template>
  <div class="Header">
    <div class="Logo">
      <router-link to="/">
        <img src="../../assets/logo.png" width="200">
      </router-link>
    </div>
    <ul class="Nav">
      <li>
        <router-link class="navItem" to="/" exact>首页</router-link>
      </li>
      <li v-for="menu in menus">
        <template v-if="menu.children">
          <span class="navItem">{{menu.catName}}</span>
          <ul class="subNav" v-if="menu.children && menu.children.length">
            <li v-for="submenu in menu.children">
              <router-link class="navItem" :to="'/category/'+submenu.catID">{{submenu.catName}}</router-link>
            </li>
          </ul>
        </template>
        <template v-else>
          <router-link class="navItem" :to="'/category/'+menu.catID">{{menu.catName}}</router-link>
        </template>
      </li>
    </ul>
    <div class="topR">
      <!-- <router-link class="link" :to="'/login'">登录</router-link> -->
      <a class="link" @click="logout">登出</a>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { jcookie } from '@/utils/assist'

export default {
  name: 'topmenu',
  props: {
    menus: Array
  },
  data () {
    return {}
  },
  methods: {
    logout () {
      var _this = this
      axios.get('/api/logout')
        .then(function ({data}) {
          if (data.code === 0) {
            jcookie('isLogined', null) // 前端保存登录状态（根据后端响应）
            _this.$router.push('/login')
          } else {
            alert(data.msg)
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}
</script>

<style lang="scss">
.Header{
  position: relative;
  z-index: 100;
  background: #eaeaea;
  &:after{
    content: '';
    clear: both;
    display: block;
  }
  .Logo{
    float: left;
    img{
      height: 50px;
      width: auto;
    }
  }
  .Nav{
    float: left;
    margin-left: 50px;
    li{
      position: relative;
      float: left;
      line-height: 50px;
      margin: 0 10px;
      .navItem{
        display: block;
        height: 50px;
        line-height: 50px;
        padding: 0 20px;
        cursor: pointer;
        color: #777;
      }
      .router-link-active{
        background: rgba(0,0,0,.5);
        color: #fff;
      }
    }
    .subNav{
      position: absolute;
      display: none;
      width: 120px;
      background: #eaeaea;
      color: #777;
      li{
        float: none;
        margin: 0;
        a{
          color: #777;
        }
      }
    }
    >li{
      &:hover{
        .navItem{
          background: rgba(0,0,0,.5);
          color: #fff;
        }
        .subNav{
          display: block;
          .navItem{
            background: none;
            height: 36px;
            padding: 0 10px;
            line-height: 36px;
            color: #777;
            &:hover{
              background: rgba(0,0,0,.5);
              color: #fff;
            }
          }
          .router-link-active{
            background: rgba(0,0,0,.5);
            color: #fff;
          }
        }
      }
    }
  }
  .topR{
    position: absolute;
    right: 20px;
    top: 0;
    .link{
      line-height: 50px;
      margin-left: 10px;
    }
  }
}
</style>
