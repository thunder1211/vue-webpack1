<template>
  <div class="hello">
    <h2>{{ msg }}</h2>
    <input type="text" v-model="msg">
    <button @click="fetchData">button</button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'hello',
  data () {
    return {
      msg: 'Hello.vue'
    }
  },
  methods: {
    fetchData () {
      axios.post('/huasheng/order/findAllStore')
        .then(function ({data}) {
          console.log(data)
        })
        .catch(function (error) {
          console.log(error)
        })
      axios.get('/api/configdemo-request/pagination')
        .then(function ({data}) {
          console.log(data)
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
