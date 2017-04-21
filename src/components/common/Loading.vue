<template>
  <div class="loading">
    <span class="xaiconfont icon-spin">&#xe6f8;</span>
  </div>
</template>

<script>

export default {
  name: 'loading'
}
</script>

<style lang="scss">
@import "../../assets/css/style";

.loading{
  position: fixed;
  z-index: 9999;
  left: 0;
  top: 50px;
  width: 100%;
  height: 100%;
  background: #fff;
  text-align: center;
  .xaiconfont{
    position: absolute;
    top: 50%;
    margin-top: -40px;
    font-size: 72px;
  }
}
</style>
