<template>
  <div class="Readmore">
    <div v-if="isNotOver">
      {{contents}}
    </div>
    <div v-else>
      <div v-if="isLess">
        {{lessContents}}
        <span class="link" @click="toggle"> ...更多</span>
      </div>
      <div v-else>
        {{contents}}
        <span class="link" @click="toggle">收起</span>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'readmore',
  props: {
    maxLength: Number,
    contents: String
  },
  data () {
    return {
      isLess: true
    }
  },
  computed: {
    isNotOver () {
      if (this.contents.length <= this.maxLength) return true
      return false
    },
    lessContents () {
      var result = this.contents.slice(0, this.maxLength)
      return result
    }
  },
  methods: {
    toggle () {
      this.isLess = !this.isLess
    }
  }
}
</script>

<style lang="scss">
</style>
