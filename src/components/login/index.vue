<template>
  <div class="Login">
    <form @submit.prevent="submit">
      <input type="text" name="uid" v-model="uid" @keydown="onKeydown">
      <input type="password" name="pw" v-model="pw" @keydown="onKeydown">
      <span class="submit" @click="submit">提交</span>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'login',
  data () {
    return {
      uid: '',
      pw: ''
    }
  },
  methods: {
    submit () {
      var _this = this
      axios.post('/api/login', {id: this.uid, pw: this.pw})
        .then(function ({data}) {
          console.log(data)
          if (data.ok === 1) {
            _this.$router.push('/home')
          } else {
            alert(data.msg)
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    onKeydown (e) {
      if (e.keyCode === 13) {
        this.submit()
      }
    },
    clearForm () {
      this.uid = ''
      this.pw = ''
    }
  }
}
</script>

<style lang="scss">
@import "../../assets/css/style";
.Login{
  width: 360px;
  margin: 0 auto;
  input{
    display: block;
    width: 100%;
  }
  .submit{
    display: inline-block;
    width: 60px;
    height: 36px;
    line-height: 36px;
    border: 1px solid #999;
    border-radius: 5px;
    text-align: center;
  }
}
</style>
