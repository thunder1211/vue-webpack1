<template>
  <div class="Detail">
    <div class="detailHead">
      <img class="catImg" :src="detail.src">
      <div class="catName">{{detail.catName}}</div>
      <div class="daoName">{{detail.daoName}}</div>
    </div>
    <div class="mainConts">
      <div class="detailSec" :class="{isAffix: isAffix}">
        <div class="audioAffixBG"></div>
        <ivuAffix class="audioAffix"
        @on-change="onAffix">
          <div class="affix_daoName" v-show="isAffix">
            题目：{{detail.daoName}}
          </div>
          <jAudio :src="detail.url" :duration="detail.duration"></jAudio>
        </ivuAffix>
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
          <div v-html="detail.daoHtml"></div>
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
        <div class="pagination">
          <ivuPage
            v-if="comments.total > pageSize"
            size="small"
            :simple="false"
            :current="currentPage"
            :page-size="pageSize"
            :total="comments.total"
            @on-change="changePage"
          ></ivuPage>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import Loading from '@/components/common/Loading/index'
  import jAudio from '@/components/common/J-audio/index'
  import Readmore from '@/components/common/Readmore/index'
  import ivuPage from 'iview/src/components/page'
  import ivuAffix from 'iview/src/components/affix'

  export default {
    name: 'detail',
    components: {
      jAudio,
      Readmore,
      ivuPage,
      ivuAffix
    },
    created () {
      var _this = this
      Loading.open()
      this.catID = this.$route.params.catid
      this.dID = this.$route.params.did
      axios.get('/api/detail', {
        params: {
          catid: this.catID,
          did: this.dID
        }
      })
        .then(function ({data}) {
          Loading.close()
          if (data.code !== 0) {
            console.error(data.msg)
            return
          }
          console.log(data.data)
          _this.detail = data.data
        })
        .catch(function (error) {
          console.log(error)
        })
      axios.get('/api/comments', {
        params: {
          catid: this.catID,
          did: this.dID
        }
      })
        .then(function ({data}) {
          Loading.close()
          if (data.code !== 0) {
            console.error(data.msg)
            return
          }
          console.log(data.data)
          _this.comments = data.data
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    data () {
      return {
        catID: '',
        dID: '',
        detail: {},
        comments: {},
        currentPage: 1,
        pageSize: 5,
        isAffix: false
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
        // alert(page)
        var _this = this
        axios.get('/api/comments', {
          params: {
            catid: this.catID,
            did: this.dID,
            page: page
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
      onAffix (isAffix) {
          this.isAffix = isAffix
          console.log(isAffix);
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
    background: #fff;
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
    background: #fff;
    border-radius: 5px;
    ul{
      li{
        margin: 10px 0;
      }
    }
  }
  &.isAffix{
    .affix_daoName{
      padding: 5px 0 0;
      margin-bottom: -5px;
      text-align: center;
      font-size: 14px;
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
    background: #fff;
    .comment{
      padding: 15px 0;
      border-bottom: 1px dashed #ddd;
      &:last-child{
        border-bottom: none;
      }
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
  .pagination{
    text-align: center;
    .ivu-page{
      display: inline-block;
      margin: 15px 0;
      vertical-align: top;
      &.mini{
        .ivu-page-prev,
        .ivu-page-next,
        .ivu-page-item{
          margin: 0 2px;
        }
      }
    }
  }
}
.isAffix{
  .audioAffixBG{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 70px;
    background: #fff;
    @include backgroundGradient(#ffffff, #f9f9f9, vertical);
    box-shadow: 0 0 5px #999;
  }
}
.ivu-affix{
  height: 40px;
  .jAudio{
    .btn_play{
      .xaiconfont{
      }
    }
    .audioTimeShow{
    }
  }
}
</style>
