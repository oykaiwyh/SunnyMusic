<template>
  <transition name="slide">
    <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
  import MusicList from 'components/music-list/music-list'
  import {getSongList} from 'api/recommend'
  import {ERR_OK} from 'api/config'
  import {mapGetters} from 'vuex'
  import {createSong, getSongUrl} from 'common/js/song'

  export default {
    computed: {
      title() {
        return this.disc.dissname
      },
      bgImage() {
        return this.disc.imgurl
      },
      ...mapGetters([
        'disc'
      ])
    },
    data() {
      return {
        songs: []
      }
    },
    created() {
      this._getSongList()
    },
    methods: {
      _getSongList() {
        if (!this.disc.dissid) {
          this.$router.push('/recommend')
          return
        }
        getSongList(this.disc.dissid).then((res) => {
          if (res.code === ERR_OK) {
            this.songs = this._normalizeSongs(res.cdlist[0].songlist)
            console.log('this.song', this.songs)
          }
        })
      },
      _normalizeSongs(list) {
        let ret = []
        list.forEach((musicData, index) => {
          if (musicData.songid && musicData.albummid) {
            ret.push(createSong(musicData))
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