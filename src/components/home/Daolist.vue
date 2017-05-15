<template>
  <ul class="daoList" :class="listType">
    <li class="daoBlock" v-for="dao in listitems">
      <router-link :to="'/category/'+dao.catID+(dao.dID?'/did/'+dao.dID:'')">
        <template v-if="isSpecialList">
          <div class="catName"
            :class="[
              {shuochang: dao.catName === '说唱音乐'},
              {gudian: dao.catName === '古典歌曲'},
              {jueshi: dao.catName === '爵士歌曲'},
              {jingdian: dao.catName === '经典歌曲'},
              {liuxing: dao.catName === '流行歌曲'},
              {xiangcun: dao.catName === '乡村歌曲'},
              {minyao: dao.catName === '民谣歌曲'}
            ]"
          ><span class="xaiconfont">&#xe633;</span> {{dao.catName}}</div>
        </template>
        <template v-else>
          <div class="catName"><span class="xaiconfont">&#xe633;</span> {{dao.catName}}</div>
        </template>
        <div class="daoInfos">
          <div class="daoName">{{dao.daoName}}</div>
          <div class="daoJing">出处：{{dao.daoJing}}</div>
          <div class="daoDate">日期：{{dao.daoDate}}</div>
        </div>
      </router-link>
    </li>
  </ul>
</template>

<script>

export default {
  name: 'daolist',
  props: {
    listitems: Array,
    listType: String
  },
  computed: {
    isSpecialList () {
      return this.listType === 'specialList'
    }
  }
}
</script>

<style lang="scss">
@import "../../assets/css/style";

.daoList{
  @include clearFix;
  .daoBlock{
    float: left;
    width: 250px;
    margin: 0  20px 20px 0;
    border-radius: 5px;
    box-shadow: 0 2px 5px #ccc;
    overflow: hidden;
    >a{
      display: block;
    }
    .catName{
      position: relative;
      height: 40px;
      padding-left: 40px;
      line-height: 40px;
      font-size: 16px;
      background: #777;
      color: #fff;
      .xaiconfont{
        position: absolute;
        left: 10px;
        top: 50%;
        margin-top: -12px;
        font-size: 24px;
        line-height: 1em;
      }
    }
    .daoInfos{
      padding: 10px;
      .daoName{
        height: 60px;
        font-size: 16px;
      }
    }
  }
  &.specialList{
    .daoBlock{
      .shuochang{
        background: #f44336;
      }
      .gudian{
        background: #9c27b0;
      }
      .jueshi{
        background: #3f51b5;
      }
      .jingdian{
        background: #00bcd4;
      }
      .liuxing{
        background: #009688;
      }
      .xiangcun{
        background: #8bc34a;
      }
      .minyao{
        background: #795548;
      }
    }
  }
  &.type1{
    .daoBlock{
      .catName{
        background: #50b347;
      }
    }
  }
  &.type2{
    .daoBlock{
      .catName{
        background: #ff9800;
      }
    }
  }
}
</style>
