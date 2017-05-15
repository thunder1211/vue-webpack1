<template>
  <div class="Category">
    <div class="CategorySec">
      <div class="catPic">
        <img class="catImg" :src="category.src">
        <h2 class="catName">{{category.catName}}</h2>
      </div>
      <ul class="catList">
        <li v-for="dao in category.list">
          <router-link class="link" :to="'/category/'+catID+'/did/'+dao.dID">
            <span class="playIco xaiconfont">&#xe633;</span>
            <div class="daoName">{{dao.daoName}}</div>
            <div class="daoinfo daoJing">出处：{{dao.daoJing}}</div>
            <div class="daoinfo daoDate">日期：{{dao.daoDate}}</div>
            <div class="daoinfo daoDur">时长：{{dao.duration}}</div>
            <div class="daoinfo daoSpeak">歌手：{{dao.speaker}}</div>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import Loading from '@/components/common/Loading/index'

  export default {
    name: 'Category',
    created () {
      var _this = this
      Loading.open()
      this.catID = this.$route.params.catid
      axios.get('/api/category/' + this.catID)
        .then(function ({data}) {
          if (data.code !== 0) {
            console.error(data.msg)
            return
          }
          data = data.data
          console.log(data)
          _this.category = data
          Loading.close()
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    data () {
      return {
        catID: '',
        category: {}
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

.Category{
  .CategorySec{
    width: 810px;
    float: left;
    .catPic{
      position: relative;
      height: 120px;
      margin-top: 10px;
      .catImg{
        border-radius: 5px;
      }
      .catName{
        position: absolute;
        left: 50px;
        top: 50%;
        padding: 10px;
        margin-top: -22px;
        font-size: 24px;
        font-weight: normal;
        border-radius: 5px;
        color: #fff;
        background: rgba(0,0,0,.5);
      }
    }
    .catList{
      padding-top: 10px;
      li{
        position: relative;
        margin-bottom: 10px;
        padding: 10px;
        padding-left: 45px;
        // border-bottom: 1px solid #eee;
        border-radius: 5px;
        box-shadow: 0 1px 3px #ccc;
        .link{
          display: block;
          .playIco{
            position: absolute;
            left: 10px;
            font-size: 24px;
            color: #777;
          }
        }
        .daoName{
          padding: 0 0 5px;
          font-size: 16px;
        }
        .daoinfo{
          color: #999;
          font-size: 12px;
        }
        .daoDur,
        .daoSpeak{
          position: absolute;
          right: 10px;
        }
        .daoDur{
          bottom: 10px;
        }
        .daoSpeak{
          bottom: 26px;
        }
        &:hover{
          background: #f6f4e2;
          .daoName{
            color: #4caf50;
          }
          .playIco{
            color: #4caf50;
          }
        }
      }
    }
  }
}
</style>
