<template>
  <div class="Detail">
  </div>
</template>

<script>
  import axios from 'axios'
  import Loading from '@/components/common/Loading/index'

  export default {
    name: 'detail',
    created () {
      var _this = this
      Loading.open()
      var catID = this.$route.params.catid
      var dID = this.$route.params.did
      axios.get('/api/detail', {
        params: {
          catid: catID,
          did: dID
        }
      })
        .then(function ({data}) {
          console.log(data.detail)
          _this.detail = data.detail
          Loading.close()
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    data () {
      return {
        detail: {}
      }
    },
    methods: {
    },
    components: {
    }
  }
</script>

<style lang="scss">
@import "../../assets/css/style";


</style>
