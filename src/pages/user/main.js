import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()

export default {
  config: {
    usingComponents: {
      'zan-button': '/zanui/btn/index',
      'i-card': '/iview/card/index',
      'i-cell': '/iview/cell/index',
      'i-grid': '/iview/grid/index',
      'i-row': '/iview/row/index',
      'i-col': '/iview/col/index',
      'i-tabs': '/iview/tabs/index',
      'i-tab': '/iview/tab/index',
      'i-avatar': '/iview/avatar/index',
      'i-grid-item': '/iview/grid-item/index',
      'i-grid-icon': '/iview/grid-icon/index',
      'i-grid-label': '/iview/grid-label/index'
    },
    navigationBarTitleText: '个人中心'
  }
}
