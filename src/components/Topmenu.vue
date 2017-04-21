<template>
  <div class="Header">
    <div class="Logo">
      <router-link to="/">
        <img src="../assets/logo.png" width="200">
      </router-link>
    </div>
    <ul class="Nav">
      <li v-for="menu in menus">
        <router-link :to="'/category/'+menu.catID">{{menu.name}}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  name: 'topmenu',
  props: {
    menus: Array
  },
  data () {
    return {}
  },
  methods: {
  }
}
</script>

<style lang="scss">
.Header{
  background: rgba(0,0,0,.05);
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
    li{
      float: left;
      line-height: 50px;
      margin: 0 10px;
    }
  }
}
</style>
