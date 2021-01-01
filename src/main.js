
import 'babel-polyfill' // es高级语法转译 IE的兼容

import Vue from 'vue'
import App from './App'
import router from './router'

import 'common/stylus/index.styl'
import fastclick from 'fastclick'
import VueLazyload from 'vue-lazyload'

import store from '@/store'
// 移动端调试插件
// eslint-disable-next-line no-unused-vars
import vConsole from 'vconsole'

fastclick.attach(document.body) // 点击都有300ms的延迟
Vue.use(VueLazyload, {
  loading: require('common/image/default.png')
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
