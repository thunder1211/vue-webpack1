<template>
  <Topmenu :menus="menus"></Topmenu>
</template>

<script>

import axios from 'axios'
import Topmenu from '@/components/block/Topmenu'

export default {
  name: 'topmenu',
  created () {
    var _this = this
      axios.get('/api/home')
        .then(function ({data}) {
          if (data.code !== 0) {
            console.log(data.msg)
            return
          }
          data = data.data
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
