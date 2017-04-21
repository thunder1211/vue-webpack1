<template>
  <div class="hello">
    <router-link to="/">Go to back</router-link>
    <h2>{{ msg }}</h2>
    <button @click="back">后退</button>
    <br><br>
    <span @click="changeComp('Hello')">hello</span>
    <br><br>
    <span @click="changeComp('Hello2')">hello2</span>
    <br><br>
    <keep-alive>
      <component :is="comp"></component>
      <!-- <Hello></Hello> -->
    </keep-alive>
    <br>---------------------<br>
    <keep-alive>
      <hello></hello>
    </keep-alive>
    <br>---------------------<br>
  </div>
</template>

<script>
import Hello from '@/components/Hello'
import Hello2 from '@/components/Hello2'

export default {
  name: 'Home',
  components: {
    hello: Hello,
    hello2: Hello2
  },
  created () {
    // console.log(this.$router)
  },
  // beforeRouteEnter (to, from, next) {
  //   console.log(to, from, next)
  //   next(vm => {
  //     console.log('next')
  //   })
  // },
  data () {
    return {
      msg: 'this is Mypage.vue',
      comp: Hello
    }
  },
  methods: {
    back () {
      this.$router.go(-1)
    },
    changeComp (compName) {
      if (compName === 'Hello') this.comp = Hello
      if (compName === 'Hello2') this.comp = Hello2
    }
  }
}
</script>

<style>
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
