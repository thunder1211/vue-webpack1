<template>
  <div class="Detail">
    <div class="detailHead">
      <img class="catImg" :src="detail.src">
      <div class="catName">{{detail.catName}}</div>
      <div class="daoName">{{detail.daoName}}</div>
    </div>
    <div class="mainConts">
      <div class="detailSec">
        <jAudio :src="detail.url" :duration="detail.duration"></jAudio>
        <ul class="detailInfo">
          <li>出处：{{detail.daoJing}}</li>
          <li>日期：{{detail.daoDate}}</li>
          <li>演讲者：{{detail.speaker}}</li>
        </ul>
        <div class="detailText">
          <!-- {{detail.daoText}} -->
          <ul>
            <template v-for="text in textList">
              <li>{{text}}。</li>
            </template>
          </ul>
        </div>
      </div>
      <div class="commentsSec">
        <div class="commentTit">
          <div class="tit">评论</div>
        </div>
        <ul class="commentsList">
          <li class="comment" v-for="comment in comments.list">
            <div class="comUname">{{comment.uName}}</div>
            <div class="comCdate">{{comment.cDate}}</div>
            <div class="comConts">
              <!-- {{comment.cTexts}} -->
              <Readmore :maxLength="180" :contents="comment.cTexts"></Readmore>
            </div>
          </li>
        </ul>
        <Pager
          v-if="comments.total > 5"
          :total="comments.total"
          @change="changePage"
        ></Pager>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import Loading from '@/components/common/Loading/index'
  import jAudio from '@/components/common/J-audio/index'
  import Readmore from '@/components/common/Readmore/index'
  import Pager from '@/components/common/Pager/index'

  export default {
    name: 'detail',
    components: {
      jAudio,
      Readmore,
      Pager
    },
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
          if (data.code !== 0) {
            console.error(data.msg)
            return
          }
          console.log(data.data)
          _this.detail = data.data
          Loading.close()
        })
        .catch(function (error) {
          console.log(error)
        })
      axios.get('/api/comments', {
        params: {
          catid: catID,
          did: dID
        }
      })
        .then(function ({data}) {
          if (data.code !== 0) {
            console.error(data.msg)
            return
          }
          console.log(data.data)
          _this.comments = data.data
          Loading.close()
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    data () {
      return {
        detail: {},
        comments: {}
      }
    },
    computed: {
      textList () {
        if (!this.detail.daoText) return
        var result = this.detail.daoText.split('。')
        // debugger
        if (result[result.length - 1] === '') {
          result.pop()
        }
        return result
      }
    },
    methods: {
      changePage (page) {
        alert(page)
      }
    }
  }
</script>

<style lang="scss">
@import "../../assets/css/style";

.Detail{
  margin-top: 10px;
}
.detailHead{
  position: relative;
  height: 120px;
  .catImg{
    border-radius: 5px;
  }
  .catName{
    position: absolute;
    top: 15px;
    left: 15px;
    color: #fff;
  }
  .daoName{
    position: absolute;
    top: 50%;
    left: 15px;
    margin-top: -12px;
    color: #fff;
    font-size: 24px;
  }
}
.mainConts{
  width: 810px;
  float: left;
  margin-top: 10px;
}
.detailSec{
  .detailInfo{
    margin: 10px 0;
    padding: 15px;
    background: #eee;
    border-radius: 5px;
    li{
      margin: 5px 0;
    }
  }
  .detailText{
    margin: 10px 0;
    padding: 15px;
    min-height: 200px;
    font-size: 14px;
    background: #eee;
    border-radius: 5px;
    ul{
      li{
        margin: 10px 0;
      }
    }
  }
}
.commentsSec{
  margin-top: 25px;
  .commentTit{
    .tit{
      font-size: 24px;
    }
  }
  .commentsList{
    margin-top: 15px;
    padding: 10px 15px;
    border-radius: 5px;
    background: #eee;
    .comment{
      padding: 10px;
      margin: 10px 0;
      border: 1px solid #ddd;
      border-radius: 5px;
      .comConts{
        margin-top: 5px;
        line-height: 2em;
        font-size: 12px;
      }
      .comUname,
      .comCdate{
        color: #999;
      }
      .comUname{
        float: left;
      }
      .comCdate{
        text-align: right;
      }
    }
  }
}
</style>
