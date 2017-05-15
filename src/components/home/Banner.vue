<template>
  <div class="Banner">
    <swiper :options="swiperOption" ref="mySwiper">
      <!-- slides -->
      <swiper-slide v-for="(banner, index) in banners" :key="index">
        <router-link :to="'/category/'+banner.catID+(banner.dID?'/did/'+banner.dID:'')">
          <img :src="banner.src">
        </router-link>
      </swiper-slide>
      <!-- Optional controls -->
      <div class="swiper-pagination"  slot="pagination"></div>
      <!-- <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div> -->
      <div class="swiper-BTN-prev" slot="button-prev"><span class="xaiconfont">&#xe60e;</span></div>
      <div class="swiper-BTN-next" slot="button-next"><span class="xaiconfont">&#xe60d;</span></div>
      <!-- <div class="swiper-scrollbar"   slot="scrollbar"></div> -->
    </swiper>
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
  name: 'banner',
  props: {
    banners: Array
  },
  data () {
    return {
      swiperOption: {
        // NotNextTick is a component's own property, and if notNextTick is set to true, the component will not instantiate the swiper through NextTick, which means you can get the swiper object the first time (if you need to use the get swiper object to do what Things, then this property must be true)
        // notNextTick是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
        notNextTick: true,
        // swiper configs 所有的配置同swiper官方api配置
        // autoplay: 3000,
        grabCursor: true,
        setWrapperSize: true,
        autoHeight: true,
        pagination: '.swiper-pagination',
        paginationClickable: true,
        prevButton: '.swiper-BTN-prev',
        nextButton: '.swiper-BTN-next',
        // scrollbar: '.swiper-scrollbar',
        mousewheelControl: true,
        observeParents: true,
        // if you need use plugins in the swiper, you can config in here like this
        // 如果自行设计了插件，那么插件的一些配置相关参数，也应该出现在这个对象中，如下debugger
        debugger: true,
        // swiper callbacks
        // swiper的各种回调函数也可以出现在这个对象中，和swiper官方一样
        onTransitionStart (swiper) {
          // console.log(swiper)
        }
      }
    }
  },
  computed: {
    swiper () {
      return this.$refs.mySwiper.swiper
    }
  },
  mounted () {
    // you can use current swiper instance object to do something(swiper methods)
    // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
    // console.log('this is current swiper instance object', this.swiper)
    // this.swiper.slideTo(3, 1000, false)
  },
  methods: {
  },
  components: {
    swiper,
    swiperSlide
  }
}
</script>

<style lang="scss">
.Banner{
  border-radius: 5px;
  overflow: hidden;
}
.swiper-BTN-prev,
.swiper-BTN-next{
  position: absolute;
  z-index: 20;
  top: 50%;
  margin-top: -30px;
  padding: 10px 0;
  border-radius: 5px;
  cursor: pointer;
  .xaiconfont{
    font-size: 50px;
    color: #fff;
    opacity: .5
  }
  &:hover{
    background: rgba(0,0,0,.5);
    .xaiconfont{
      opacity: 1;
    }
  }
}
.swiper-BTN-prev{
  left: 255px;
}
.swiper-BTN-next{
  right: 15px;
}
.swiper-BTN-prev.swiper-button-disabled,
.swiper-BTN-next.swiper-button-disabled{
  display: none;
}
.swiper-wrapper{
  .swiper-slide{
    border-radius: 5px;
    overflow: hidden;
  }
}
</style>
