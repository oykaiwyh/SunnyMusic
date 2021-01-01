import jsonp from 'common/js/jsonp'
import axios from 'axios'
import {commonParams, options} from './config'

export function getTopList() {
  // const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg'
  // const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg'

  const data = Object.assign({}, commonParams, {
    uin: 0,
    needNewCode: 1,
    platform: 'h5'
  })

  // return jsonp(url, data, options)
  return axios.get('/api/getTopList', data).then(res => {
    // 通过eval将字符串str当成有效的表达式来求值并返回计算结果 res.data执行的使用MusicJsonCallback
    return Promise.resolve(eval(res.data))
  })
}
// 手动去实现的jsonp方法
function MusicJsonCallback(data) {
  return data
}

// 歌单数据列表
export function getMusicList(topid) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg'

  const data = Object.assign({}, commonParams, {
    topid,
    needNewCode: 1,
    uin: 0,
    tpl: 3,
    page: 'detail',
    type: 'top',
    platform: 'h5'
  })

  return jsonp(url, data, options)
}
