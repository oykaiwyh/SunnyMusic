<template>
  <div class="search-box">
    <i class="icon-search"></i>
    <input ref="query" v-model="query" class="box" :placeholder="placeholder"/>
    <i @click="clear" v-show="query" class="icon-dismiss"></i>
  </div>
</template>

<script type="text/ecmascript-6">
  import {debounce} from 'common/js/util'

  export default {
    props: {
      placeholder: {
        type: String,
        default: '搜索歌曲、歌手'
      }
    },
    data() {
      return {
        query: ''

      }
    },
    methods: {
      clear() {
        this.query = ''
      },
      setQuery(query) {
        this.query = query
      },
      blur() {
        this.$refs.query.blur()
      },
      test(func, delay) {
        console.log('ccc')
        // let timer
        return (...args) => {
          // if (timer) {
          //   clearTimeout(timer)
          // }
          // timer = setTimeout(() => {
          //   func.apply(this, args)
          // }, delay)
        }
      }
    },
    created() {
      // 可以通过API方式创建一个watch的值
      this.$watch('query', debounce((newQuery) => {
        this.$emit('query', newQuery)
      }, 200))
      // this.$watch('query', this.test((newQuery, oldVal) => {
      //   console.log('QUERY')
      // }, 200))
      // const onResize = (newQuery, oldVal) => { console.log('23144') }
      // let task
      // this.$watch('query', function (onResize) {
      //     console.log('onResize', onResize) // query 的value

      //     console.log('3', arguments)

      //     clearTimeout(task)
      //     console.log('4', arguments)

      //     task = setTimeout(() => {
      //       console.log('5', arguments)
      //       onResize.apply(this, arguments)
      //     }, 1000)
      // })
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .search-box
    display: flex
    align-items: center
    box-sizing: border-box
    width: 100%
    padding: 0 6px
    height: 40px
    background: $color-highlight-background
    border-radius: 6px
    .icon-search
      font-size: 24px
      color: $color-background
    .box
      flex: 1
      margin: 0 5px
      line-height: 18px
      background: $color-highlight-background
      color: $color-text
      font-size: $font-size-medium
      &::placeholder
        color: $color-text-d
    .icon-dismiss
      font-size: 16px
      color: $color-background
</style>