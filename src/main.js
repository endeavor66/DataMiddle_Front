// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import App from './App'
import router from './router'


import $ from 'jquery'
import store from './store'
import 'bootstrap/dist/js/bootstrap.min'
import axios from 'axios'


import 'bootstrap/dist/css/bootstrap.min.css'
//import 'bootstrap/dist/js/bootstrap.min'
//import 'bootstrap-vue/dist/bootstrap-vue.css'
//import VueAMap from 'vue-amap'
import wordExport from '@/assets/js/export/jquery.wordexport.js'

//Vue.use(VueAMap)

//Vue.use(BootstrapVue)

import Router from 'vue-router';
//路由导航冗余报错（路由重复）
const originalPush = Router.prototype.push
      Router.prototype.push = function push(location) {
        return originalPush.call(this, location).catch(err => err)
      }

Vue.use(wordExport)
Vue.prototype.$axios = axios
Vue.config.productionTip = false

// VueAMap.initAMapApiLoader({
//   key: 'f356f3e0b4b1db5b8d11d04f3ae1c1de',
//   plugin: [//高德地图扩展插件(按需添加)
//     'AMap.Autocomplete', // 输入提示插件
//     'AMap.PlaceSearch', // POI搜索插件
//     'AMap.Scale', // 右下角缩略图插件 比例尺
//     'AMap.OverView', // 地图鹰眼插件
//     'AMap.ToolBar', // 地图工具条
//     'AMap.MapType', // 类别切换控件，实现默认图层与卫星图、实施交通图层之间切换的控制
//     'AMap.PolyEditor', // 编辑 折线多，边形
//     'AMap.CircleEditor', // 圆形编辑器插件
//     'AMap.Geolocation' // 定位控件，用来获取和展示用户主机所在的经纬度位置
//   ],
//   uiVersion: '1.1', // ui库版本，不配置不加载,
//   v: '2.0'
// })
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
