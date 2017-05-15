<template>
  <div id="app">
    <router-view name="topmenu"></router-view>
    <div class="Wrapper">
        <router-view></router-view>
    </div>
  </div>
</template>

<script>

export default {
  name: 'app'
}
</script>

<style lang="scss">
@import "assets/css/style";

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.Wrapper{
  width: 1070px;
  margin: 0 auto;
}
</style>
