<template>
  <transition name="slide">
    <!-- <div class="singer-detail">1414</div> -->
    <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
  import MusicList from 'components/music-list/music-list'
  import {getSingerDetail,} from 'api/singer'
  import {ERR_OK} from 'api/config'
  import {createSong,getSongUrl} from 'common/js/song'
  import {mapGetters} from 'vuex'

  export default {
    computed: {
      ...mapGetters([
        'singer'
      ]),
      title() {
        return this.singer.name
      },
      bgImage() {
        return this.singer.avatar
      }
    },
    data() {
      return {
        songs: []
      }
    },
    created() {
      this._getDetail()
    },
    methods: {
      _getDetail() {
        if (!this.singer.id) {
          this.$router.push('/singer')
          return
        }
        getSingerDetail(this.singer.id).then((res) => {
          if (res.code === ERR_OK) {
            this.songs = this._normalizeSongs(res.data.list)
          }
        })
      },
      _normalizeSongs(list) {
        let ret = []
        list.forEach((item,index) => {
          let {musicData} = item
          if (musicData.songid && musicData.albummid) {
            ret.push(createSong(musicData))
            // 解析正确Vkey拼装url
            this._getSongUrl(musicData.songmid).then(url => {
              // 指向正确的url
              ret[index].url = url
            })
          }
        })
        return ret
      },
      _getSongUrl (mid) {
        return getSongUrl(mid).then(res => {
          return Promise.resolve(res.url)
        })
      }
    },
    components: {
      MusicList
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
