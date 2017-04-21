<template>
  <div id="app">
   <Topmenu :menus="menus"></Topmenu>
    <!-- <keep-alive> -->
      <router-view></router-view>
    <!-- </keep-alive> -->
  </div>
</template>

<script>

import axios from 'axios'
import Topmenu from '@/components/Topmenu'

export default {
  name: 'app',
  created () {
    var _this = this
      axios.get('/api/home')
        .then(function ({data}) {
          console.log(data.menus)
          _this.menus = data.menus
        })
        .catch(function (error) {
          console.log(error)
        })
  },
  data () {
    return {
      menus: []
    }
  },
  components: {
    Topmenu
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  .hello{
    color: red;
  }
}
img{
  width: 100px;
}
</style>
