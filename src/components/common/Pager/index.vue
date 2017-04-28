<template>
  <div class="Pager">
    <ul class="pagerList">
      <li class="pagerItem"
        v-for="page in pages"
        :class="{current: page === currentPage}"
        @click="change(page)"
      >{{page}}</li>
    </ul>
  </div>
</template>

<script>

export default {
  name: 'readmore',
  props: {
    total: Number,
    current: {
      type: Number,
      default: 1
    },
    per: {
      type: Number,
      default: 5
    }
  },
  data () {
    return {
      currentPage: this.current
    }
  },
  computed: {
    pages () {
      return Math.ceil(this.total / this.per)
    }
  },
  methods: {
    change (page) {
      this.currentPage = page
      this.$emit('change', page)
    }
  }
}
</script>

<style lang="scss">
.Pager{
  margin: 10px 0;
  .pagerList{
    text-align: center;
    .pagerItem{
      $size: 30px;
      display: inline-block;
      width: $size;
      height: $size;
      line-height: $size;
      margin: 0 5px;
      text-align: center;
      border: 1px solid #ddd;
      border-radius: 5px;
      cursor: pointer;
      &:hover{
        border-color: #3498db;
        color: #3498db;
      }
      &.current{
        border-color: transparent;
        background: #3498db;
        color: #fff;
      }
    }
  }
}
</style>
