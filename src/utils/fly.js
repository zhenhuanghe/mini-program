import Vue from 'vue';
var Fly = require("flyio/dist/npm/wx.js") //wx.js为flyio的微信小程序入口文件
var fly = new Fly(); //创建fly实例

// 添加拦截器
fly.interceptors.request.use((config, promise) => {
    config.headers["X-Tag"] = "flyio";  //给所有请求添加自定义header
    return config;
})
// 配置请求基地址
fly.config.baseURL = "https://www.easy-mock.com/mock/5aded45053796b38dd26e970/"
Vue.prototype.$http = fly  //将fly挂载在vue上供全局使用
export default fly
