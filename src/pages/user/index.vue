<template class="container">
  <div id="container">
    <div>
      <div class="userinfo">
        <!-- <img :src="userinfo.avatarUrl" class="avatar" alt=""> -->
        <i-avatar :src="userinfo.avatarUrl" size="large" shape="circle" class="avatar">H</i-avatar>
        <p v-if="isLogin" class="username">{{userinfo.nickName}}</p>
        <!-- <zan-button v-if="!isLogin" open-type="getUserInfo" size="small" @getuserinfo="doLogin" >查询</zan-button> -->
        <button v-if="!isLogin" open-type="getUserInfo" lang="zh_CN" @getuserinfo="doLogin">登陆</button>
      </div>
      <div class="tab">
          <i-tabs current="{{}}" bindchange="handleChange">
            <i-tab key="tab1" title="代付款">代付款</i-tab>
            <i-tab key="tab2" title="代发货">代发货</i-tab>
            <i-tab key="tab3" title="待收货">待收货</i-tab>
            <i-tab key="tab4" title="待评价">待评价</i-tab>
          </i-tabs>
      </div>
      <div class="grid">
        <i-grid>
          <i-grid-item @click="show()">
            <i-grid-icon>
              <image src="/static/grid/accessory.png" />
            </i-grid-icon>
            <i-grid-label>我的余额</i-grid-label>
          </i-grid-item>
           <i-grid-item>
            <i-grid-icon>
              <image src="/static/grid/editor.png" />
            </i-grid-icon>
            <i-grid-label>我的砍价</i-grid-label>
          </i-grid-item>
           <i-grid-item>
            <i-grid-icon>
              <image src="/static/grid/coupons_fill.png" />
            </i-grid-icon>
            <i-grid-label>我的卡券</i-grid-label>
          </i-grid-item>
        </i-grid>
        <i-grid>
         <i-grid-item>
            <i-grid-icon>
              <image src="/static/grid/collection.png" />
            </i-grid-icon>
            <i-grid-label>我的收藏</i-grid-label>
          </i-grid-item>
           <i-grid-item>
            <i-grid-icon>
              <image src="/static/grid/coordinates.png" />
            </i-grid-icon>
            <i-grid-label>我的地址</i-grid-label>
          </i-grid-item>
           <i-grid-item>
            <i-grid-icon>
              <image src="/static/grid/customerservice_fill.png" />
            </i-grid-icon>
            <i-grid-label>联系客服</i-grid-label>
          </i-grid-item>
          </i-grid>
      </div>
    </div>
  </div>
</template>
<script>
import card from '@/components/card'
import qcloud from 'wafer2-client-sdk'
import config from '../../config.js'
// import qcloud1 from ''
export default {
  data() {
    return {
      isLogin: false,
      userinfo: {
        nickName: '未登陆',
      }
    }
  },
  components: {
    card
  },
  methods: {
    getUserInfo() {
      wx.login({
        success: () => {
          wx.getUserInfo({
            success: (res) => {
              console.log(res)
              this.userinfo = res.userInfo
            }
          })
        }
      })
    },
    // 使用 button 组件，并将 open-type 指定为 getUserInfo 类型，获取用户基本信息。
    onGotUserInfo(e) {
      qcloud.setLoginUrl(config.loginurl);
      qcloud.login({
        success: function (userInfo) {
          console.log('登录成功', userInfo);
        },
        fail: function (err) {
          console.log('登录失败', err);
        }
      });
    },
    checkLogin() {
      let user = wx.getStorageSync('userinfo')
      if (user) {
        this.isLogin = true
        this.userinfo = user
        wx.showToast({
          title: '登陆成功',
          icon: 'success',
          duration: 2000
        })
      }
    },
    doLogin: function () {
      qcloud.setLoginUrl(config.loginurl)
      qcloud.login({
        success: res => {
          this.userinfo = res
          this.isLogin = true
          wx.setStorageSync('userinfo', res)
          console.log(res)
        },
        fail: err => {
          console.log(err)
        }
      })
    }
  },
  created() {
    this.checkLogin()
  }
}
</script>
<style>

.userinfo {
  margin-top: 100rpx;
  text-align: center;
  /* background-color: #eee; */
  margin: 3%;
}
.avatar {
  width: 128rpx;
  height: 128rpx;
  border-radius: 50%;
}

</style>
