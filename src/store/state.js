import {playMode} from 'common/js/config'
import {loadSearch, loadPlay, loadFavorite} from 'common/js/cache'

const state = {
  singer: {},
  playing: false, // 播放状态
  fullScreen: false, // 全屏
  playlist: [], // 播放列表
  sequenceList: [], // 原始的列表
  mode: playMode.sequence, // 播放模式的配置
  currentIndex: -1, // 当前播放的索引
  disc: {}, // 歌单
  topList: {},
  searchHistory: loadSearch(),
  playHistory: loadPlay(),
  favoriteList: loadFavorite()
}

export default state
