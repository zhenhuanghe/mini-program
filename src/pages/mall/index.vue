<template>
  <div class="container">
    <!-- 顶部搜索框 -->
    <zan-row row-class="custom-zan-row-search">
      <zan-col col="16" offset="">
        <input type="text" v-model="selectID" placeholder="请输入查询内容">
      </zan-col>
      <zan-col col="6">
        <zan-button size="small">查询</zan-button>
      </zan-col>
    </zan-row>

    <zan-row>
      <!-- 此处用v-for去渲染出list -->
      <!-- 左侧竖直tab标签 -->
      <zan-col col="6" col-class="custom-zan-col-left">
        <zan-button v-for="category in categorys" :key="category" size="small" @click="toggleShow(category.key)">
          {{ category.name }}
        </zan-button>
      </zan-col>
      <!-- 右侧商品展示区 -->
      <zan-col col="16" offset="" col-class="custom-zan-col-right">
        <div calss="item" v-if="category.status" v-for="(category,index1) in categorys" :key="category">
          <zan-card
            :thumb="category.imgUrl"
            :title="item"
            v-for="(item,index2) in category.items" :key="item"
            @click="openDetail(item)"
          >
          </zan-card>
        </div>
      </zan-col>
    </zan-row>
  </div>
  <!-- <p v-on:welcome="sayHi"></p> -->
</template>

<script>
// import fly from '../../utils/fly.js'
import { get, post, request } from '../../utils/util.js'
var Fly = require("flyio/dist/npm/wx.js") //wx.js为flyio的微信小程序入口文件
var fly = new Fly(); //创建fly实例
import config from '../../config.js'

import bus from '../../event/event.js'

export default {
  data() {
    return {
      title: 'hello ',
      result: '',
      isShow: false,
      categorys: [
        {
          name: '钢琴',
          key: 0,
          status: true,
          imgUrl:'http://www.steinwayzmd.com/admin/uploadpic/2012220414962701049.jpg',
          items: [
            "piano1",
            "piano2",
            "piano3",
            "piano4",
            "piano5",
            "piano1",
            "piano2",
            "piano3",
            "piano4",
            "piano5",
          ]
        },
        {
          name: '吉他',
          key: 1,
          status: false,
          imgUrl:'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAH8AfwMBIgACEQEDEQH/xAAbAAACAgMBAAAAAAAAAAAAAAAAAQIFAwYHBP/EAD0QAAEDAgMFBAYJAwUBAAAAAAEAAgMEEQUSIQYxQVFhEyJxgTIzUpHB8AcUFSNCYnKhsaLR8XOCksLhJP/EABgBAQADAQAAAAAAAAAAAAAAAAABAgME/8QAIBEAAwADAAICAwAAAAAAAAAAAAECAxEhEjEiQQQTUf/aAAwDAQACEQMRAD8A6+hCFYAmkhAMJpIQDQhCgAhCEAkJoUgSE0XCASSTZoXyOjZLG57fSaHAkeIUyEBFCE0Ak0IQAmhCgAhCEAISQgBCAqLaPaamwYdhGPrFc8dyFoJDT+Yjd4b/AC1QFjieJUmF0xqK2URt3Nb+J55AcSud49tYcVD2w1s9JE0ZjR5hE94AOa7xqdOAcDpuVHPUYrtRigZldUVEguGO9W1vMOHotHzcrccK2ToKGmyVETa6pcO9LK3MG9GA7h+5VXtl54zRaOIyZpaKR4INs0QDQbAWNzqTci+hvz4rqexf2n9nSfalSZ8r8sVwLgDfrvPmo0eCU0QywUrImX17gAPgr2nibCzK2/ieKTLRN3szoSTVzMEISQDSSJSuoBO6F4H1bpD9wbM9u183h06qNnO1e5x8XFY1nlPRrOGn0sUiWtaXOIa1ouSTYAKnrK6HDKd1RPUGGNvtOuD0sfguf7RbWVOMOFO4up6Iaujj9Jw35ncfcSP2KtORUitQ59l9tPtvZslNgRuAPvKvhbd3DuvqNT5cCtJwzDa3aDEDDR5mka1NRLezCd+ccSeA39VjwXDJ8cxH6tC/s4gL1E9gcreXJxPDdxXWcIw6mw+kjpKGIRQM3AbyeJJ4nqrLvSDDgWB0mD0gpqFh11kldbPKeZ/sNArmOFrBoNVNgDBYKQViNiAWQBIBSUgSLqJKxySsiZme6wQGW6Lrwvq5HerYGD2pN/8AxHxK80hkk9OaU9Guyj+m37rGs8SaThqizlnii9bIxn6ja68c8xqO4zM2H8ROhf0ty/lYIomRkljGtv7LbLM0e5YXndLSNpwpdZ5auujpXZAM8mlxuDeVz8FreKbc0tDE9zaiCSUDuxMBNzyuLj/BXh2tFS7CqgRhznl57QDlmOb/AKc9BuK5fWTZCSSbHnx+fm+8RMr7LN8Nqr8elxqft6iUOduY0Hus/Tr8Qf1aFXuy2ykmIGOtxEOjpAQ+OPc6XjfoOuhOunPVfo9wz67iEtbNBejjAyGQd0yB4JPWzQ6/Ujiu0YXE9tBFnFtCQDvAubftZWyVpfEpMd3RjGHwwEyUUUcT7AFrRlEltBfrwurKlcySFr4/RcOO/wA+qwPc1rXOc4Na0ElxNgBzWPZ+oZW4f9ai9VLLI5nVuYgHztfzU/j1T4yuaV7LIBTCipBdRgMJpKSkg8s0oijdI69hwHE8Aq4yOc/tJDd/T8PQfOqzYk82gYPxS2/pcfgsbYxvK5PyLe/FHVgla8mIZndAtZx7bnC8ExRmHvZLNKHDtywWEQPjvPh/4tqvbcqTafZeg2ipgKlgZUx+qqG+k3oeben8Fc8eO/ka061ws6GvpK+mZUUU7JonjM1zDw8N44+5ekd7fu5LlNV9obJ4gZIg2OEuLhCwZWtF9cvC3v8AzWsAt32b2posaDYWyNbVG94zodN+m/50WlY9dXoor3x+y1qsPjqDnackh3m1w7xCpqjZCkqZ+0mo6CV175nxgm/m0rZgsjdAqqmSysosFhgsZLODd0bW2aOXU+G7osO0W0uHYFF/9UhdO4XZTxi73D+AOpsvbi2Ix4dh1RVyatiZmtzPAeZsPNcNq6ior698kmeeqnfc5G3LjyAH7BXifPpKRc47tVX424xSOEFHf1EZ0d+o/i8N3RdY2UjMOzmHsIIPYhxB66/FaDsrsDPNLHV44OzhaczaUG5d+o8B0H7LqLAGtDQLACwC65nxRz5aTekTUgohTCsYgE0BNAa7jkr2wOdDbtYiJGA8SOHmLjzUqCthxCkZU0zrsfwO9p4g9QjEYySTvK0BmI1OzWNyta3NTyOzGM6B7eBHIj/KxzY/JbXs3xXrh0i9k7k7jYLyYdXU2J0ramkkD4z72nkRwK9VguI6eHnxHDqXEqR9NVwtlidwP8g8D1XLtrNisUwaq+1sNqZ6yJlu/f76AAADdvaAN43cea62XAbk266rSLclLlUU2xtRjNTg7JcdiYyU+rdbK97eb28D82CuySdE7rDVVMNJTS1NQ8MhiaXPceAUV18C4jVNvawu+rYXDq55EsgHHg0e+58grfZzZujwaAFsbXVTh97MR3ieQ5DotX2a7THdqn187TZrjMW+yAMrG+WnuXRWhdmOPGTDJX0TYABoFkCi1TC1MiQUlEKSEDTUQmgK+piD2nTVazjmCQYgxrKgEZXXa9u9q2wi6808IcChKejj/wBdrdncanNLmp3ZvVPOZr2cL8x/HNbxgW2OH4oGxVLhSVZ0ySO7rz+V3wOvis+O4FS4rB2dSyzh6EjdHMPT+y5jj+BVuDvcKhhkpjo2dou0+PIrK8M0bRkO2tYRqeKkuBUePYthoy0GJ1ULPYEhLR4NNwPcvS/bDaKVuV+MVNj7GVh97QCsP0P+mnmdqr8Qo8MhM+IVMcEfDOdXeA3nyXNNqNp5MdmbDAHRUEbszY3aOkI3Od8B8jT+3fLIZaiWSWQ73yPLnHzOq27YzZqXF52VNUxzMPab3OnbHkOnMrSMSTLNrW2bt9H+HGkwg1UrbSVZzi+8MHo/E+YW0hY42hrA1oAaBYAcAsgC6Ecje3sm1TaogKY3IVJBPgkE0AIQhAea6idVIN6qYYOKEnjliDgvDUUgexzHtDmOFi1wuCFdiNvVBibZCDnGJ/R5hla8yU4mpHnUiI3Z7ju8rKvi+isl1zikmX/QF/5XU8gBUrCyFts0jCfo5wihkbJOJKuQbu2d3R/tGnvutxhpmRtDWAAAaABZgFMIQ22QDLKYATQEIGApWSTQAEIQgBNJNAf/2Q==',
          items: [
            "guitar1",
            "guitar2",
            "guitar3",
            "guitar4",
            "guitar5",
            "guitar1",
            "guitar2",
            "guitar3",
            "guitar4",
            "guitar5"
          ]
        },
        {
          name: '小提琴',
          key: 2,
          imgUrl:"data:image/jpeg;base64,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",
          items: [
            "violin1",
            "violin2",
            "violin3"
          ],
          status: false
        }
      ]
    }
  },
  created() {
    // this.getist()
  },
  components: {

  },
  computed: {
    toggleShow(key) {
      for (let category of this.categorys) {
        category.status = false
      }
      this.categorys[key].status = true
    }
  },
  methods: {
    toggleShow(key) {
      for (let category of this.categorys) {
        category.status = false
      }
      this.categorys[key].status = true
    },
    openDetail(item) {
      bus.$emit("myfun",item)
      wx.navigateTo({
        // 路径问题
          url: '/pages/produce/main?key=item',
          success: item=>{
            console.log(item)
          }
        })
    },
    getist() {
      let mallurl = config.mallurl
      let data = 'mall'
      get(mallurl, 'asd').then(res => {
        console.log(res)
        this.result = res
      })
    }
  },

}
</script>

<style>
.container {
  position: relative;
}

.custom-zan-col-left {
  position: relative;
  border: 1rpx #eee solid;
}

.custom-zan-col-right {
  position: relative;
  border: 1rpx #eee solid;
}
.item{
  border: 1rpx black solid;
  border-radius: 2rpx;
}
</style>
