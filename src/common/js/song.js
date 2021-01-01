import jsonp from './jsonp'

import {getLyric} from 'api/song'
import {ERR_OK} from 'api/config'
import {Base64} from 'js-base64'
export default class Song {
    constructor({id, mid, singer, name, album, duration, image, url}) {
        this.id = id
        this.mid = mid
        this.singer = singer
        this.name = name
        this.album = album
        this.duration = duration
        this.image = image
        this.url = url
    }
    getLyric() {
        if (this.lyric) {
          return Promise.resolve(this.lyric)
        }
        return new Promise((resolve, reject) => {
          getLyric(this.mid).then((res) => {
            if (res.retcode === ERR_OK) {
              this.lyric = Base64.decode(res.lyric)
            //   console.log(this.lyric)
              resolve(this.lyric)
            } else {
              reject('no lyric')
            }
          })
        })
      }
}

export function createSong(musicData) {
    return new Song({
      id: musicData.songid,
      mid: musicData.songmid,
      singer: filterSinger(musicData.singer),
      name: musicData.songname,
      album: musicData.albumname,
      duration: musicData.interval,
      image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
    //   url: `http://ws.stream.qqmusic.qq.com/${musicData.songid}.m4a?fromtag=46`
    //   url: `https://isure.stream.qqmusic.qq.com/${musicData.songid}.m4a?fromtag=3`
        url: ''
    })
}
function filterSinger(singer) {
    let ret = []
    if (!singer) {
      return ''
    }
    singer.forEach((s) => {
      ret.push(s.name)
    })
    return ret.join('/')
}

const commonParams = {
    '-': 'getplaysongvkey5843183656767885',
    g_tk: '409610277',
    sign: 'zzav1bowekzcom9f7275a651eab15d16e2cff455f7d09d',
    format: 'json',
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0
}
function getPlaySongKey(mid) {
    const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg'
    const data = Object.assign({}, commonParams, {
        loginUin: 0,
        hostUin: 0,
        platform: 'yqq.json',
        needNewCode: 0,
        data: `{"req_0":{"module":"vkey.GetVkeyServer","method":"CgiGetVkey","param":{"guid":"1933776370","songmid":["${mid}"],"songtype":[0],"uin":"0","loginflag":1,"platform":"20"}},"comm":{"uin":0,"format":"json","ct":24,"cv":0}}`
    })
    return jsonp(url, data, '')
}
  // 这一段代码为的是拼接出正确参数，promise方法。你也可以不用这段代码。看你个人水平了。这是promise应答
  // 如果不用这段代码，你直接使用getPlaySongKey，然后通过then(res => {这里是拼接参数的方法}）也可以。
export function getSongUrl(mid) {
    return getPlaySongKey(mid).then(res => {
        if (res.code === 0) {
            const purl = res.req_0.data.midurlinfo[0].purl || ''
            const host = res.req_0.data.sip[0] || ''
            // return Promise.resolve({code: 0, url: host + purl})
            return Promise.resolve({url: `${host}${purl}`})
        }
    })
}