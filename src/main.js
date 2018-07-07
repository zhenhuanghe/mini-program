import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
App.mpType = 'app'

// Vue.prototype.bus = new Vue()
const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: [
      'pages/mall/main',
      'pages/index/main',
      'pages/user/main',
      'pages/produce/main',
      '^pages/cart/main'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      backgroundColor: '',
      list: [
        {
          pagePath: 'pages/index/main',
          text: '首页',
          iconPath: '/static/img/home-page.png',
          selectedIconPath: '/static/img/home-page-filled.png'
        },
        {
          pagePath: 'pages/mall/main',
          text: '购物',
          iconPath: '/static/img/cart.png',
          selectedIconPath: '/static/img/cart_fill.png'
        },
        {
          pagePath: 'pages/user/main',
          text: '个人',
          iconPath: '/static/img/mine.png',
          selectedIconPath: '/static/img/mine_fill.png'
        }
      ]
    }
  }
}
