import Vue from 'vue'
import App from './index.vue'

const app = new Vue(App)
app.$mount()
export default {
    config: {
        usingComponents: {
            'zan-button': '/zanui/btn/index',
            'zan-row': '/zanui/row/index',
            'zan-col': '/zanui/col/index',
            'zan-tag': '/zanui/tag/index',
            'zan-tab': '/zanui/tab/index',
            'zan-field': '/zanui/field/index',
            "zan-card": "/zanui/card/index"
        },
        navigationBarTitleText: '物品详情页'
    }
}