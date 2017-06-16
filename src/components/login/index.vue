<template>
  <div class="Login" style="margin-top: 100px;">
    <form @submit.prevent="submit">
      <input type="text" name="uid" placeholder="账号"
        v-model="uid"
        v-validate="'required|email'"
        :class="{errfield: errors.has('uid')}"
        @keydown="onKeydown"
        @focus="onfocus"
        @blur="onblur($event)">
      <!-- <span v-show="errors.has('uid')">{{errors.first('uid')}}</span> -->
      <input type="password" name="pw" placeholder="密码"
        v-model="pw"
        v-validate="'required|min:6'"
        :class="{errfield: errors.has('pw')}"
        @keydown="onKeydown"
        @focus="onfocus"
        @blur="onblur($event)">
      <!-- <span v-show="errors.has('pw')">{{errors.first('pw')}}</span> -->
      <div>
        <span class="submit" @click="submit">提交</span>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import { jcookie } from '@/utils/assist'

export default {
  name: 'login',
  beforeCreate () {
    // debugger
    this.$validator.updateDictionary({
        zh_CN: {
          messages: {
            email: function (field) {
              return '账号必须是邮箱格式哦~'
            },
            required: function (field) {
              var fieldCname
              if (field === 'uid') fieldCname = '账号'
              if (field === 'pw') fieldCname = '密码'
              return fieldCname + '必须要填写'
            },
            min: function (field, length) {
              return '密码长度必须超过' + length[0] + '个字符哦~'
            }
          }
        }
    });
  },
  data () {
    return {
      uid: '',
      pw: ''
    }
  },
  methods: {
    submit () {
      var _this = this
      this.$validator.validateAll().then(() => {
        const loadingMsg = this.$Message.loading({content: '登陆验证中...', duration: 0})
        // debugger
        console.log(loadingMsg)
        // eslint-disable-next-line
        axios.post('/api/login', {id: this.uid, pw: this.pw})
          .then(function ({data}) {
            _this.$Message.destroy()
            if (data.code === 0) {
              jcookie('isLogined', true) // 前端保存登录状态（根据后端响应）
              _this.$router.push('/home')
            } else {
              _this.$Message.error({content: data.msg, duration: 5})
            }
          })
          .catch(function (error) {
            console.log(error)
          })
      }).catch(() => {
      });
    },
    onKeydown (e) {
      if (e.keyCode === 13) {
        this.submit()
      }
    },
    clearForm () {
      this.uid = ''
      this.pw = ''
    },
    onfocus () {
      this.$Message.destroy()
    },
    onblur (e) {
      this.$Message.destroy()
      var field = e.target.name
      var err = this.errors
      var errMsg
      var _this = this
      setTimeout(function () {
        if (err.has(field) && field === 'uid') {
          errMsg = err.collect('uid')
          show_errMessage(errMsg)
        }
        if (err.has(field) && field === 'pw') {
          errMsg = err.first('pw')
          show_errMessage(errMsg)
        }
      }, 0)
      function show_errMessage (errMsg) {
        _this.$Message.warning({
            content: errMsg,
            duration: 10,
            closable: true
        });
      }
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
    outline: none;
    &.errfield{
      border: 1px solid red;
    }
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
