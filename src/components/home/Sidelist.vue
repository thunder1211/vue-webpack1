<template>
  <div class="sideSec">
    <div class="sideTit">
      <span>{{catName}}</span>
      <router-link class="more" :to="'/category/'+listitem.catID">
        更多 <span class="xaiconfont">&#xe60d;</span>
      </router-link>
    </div>
    <ul class="sideList">
      <li class="daoBlock" v-for="dao in listitem.list">
        <router-link :to="'/category/'+listitem.catID+'?uid='+dao.uID">
          <div class="daoName">{{dao.daoName}}</div>
          <div class="daoJing">{{dao.daoJing}}</div>
          <div class="daoDate">{{dao.daoDate}}</div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  name: 'sidelist',
  props: {
    catName: String,
    listitem: Object
  },
  computed: {
  }
}
</script>

<style lang="scss">
@import "../../assets/css/style";

.sideSec{
  margin-bottom: 20px;
  .sideTit{
    position: relative;
    padding: 10px 0;
    margin-top: 10px;
    font-size: 24px;
    border-bottom: 1px solid #98bfa2;
    .more{
      position: absolute;
      right: 0;
      top: 50%;
      padding-right: 15px;
      margin-top: -6px;
      font-size: 12px;
      .xaiconfont{
        position: absolute;
        right: 0;
        top: 50%;
        margin-top: -7px;
        font-size: 10px;
      }
    }
  }
  .sideList{
    li{
      padding: 10px 0;
      border-bottom: 1px solid #ccc;
      .daoName{
        margin-bottom: 5px;
        font-size: 14px;
        line-height: 1.2em;
      }
      .daoJing,
      .daoDate{
        line-height: 1.2em;
        font-style: italic;
        color: #777;
      }
      a{
        display: block;
        &:hover{
          color: #50b347;
        }
      }
      &:hover{
        // background: #ddd;
      }
    }
  }
}
</style>
