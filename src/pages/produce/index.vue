<template>
    <div class="container">
        <header>
            <div class="Carousel">
                <img :src="item.imgUrl" alt="">
            </div>
            <div class="desc">
                <h1>{{item.title}}</h1>
                <p>商品名:{{item.name}}</p>
                <p>价格: {{item.price}}</p>
            </div>
        </header>
        <main>
            <zan-row>
                <zan-col col="12" col-class="custom-zan-col">
                    <p class="item-tab" @click="showItem(1)" >商品介绍</p>
                </zan-col>
                <zan-col col="12" col-class="custom-zan-col">
                    <p class="item-tab" @click="showItem(2)" >商品评价</p>
                </zan-col>
            </zan-row>
            <!-- <div v-bind:class="{ active: isActive }" ></div> -->
            <div :class="{ active: isActive }">
                <ul>
                    <!--widthFix  宽度不变，高度自动变化，保持原图宽高比不变 -->
                    <image v-for="(descimgurl,index) of item.DescImgUrl" :key="descimgurl" :src="descimgurl" mode="widthFix"> </image>
                </ul>
            </div>
            <div :class="{ active: !isActive }">
                <p>当前没有任何评价</p>
            </div>
        </main>
        <footer>
           <p>联系</p>
           <p>收藏</p>
           <p>立即购买</p>
           <p>加入购物车</p>
            <!-- <zan-row>
                <zan-col col="4" col-class="custom-zan-col">
                    <p class="footer-p">联系</p>
                </zan-col>
                <zan-col col="4" col-class="custom-zan-col">
                    <p class="footer-p">收藏</p>
                </zan-col>
                <zan-col col="8" > 
                    <p class="footer-p">立即购买 </p>
                </zan-col>
                <zan-col col="8" >  
                    <p class="footer-p" @click="AddCard(item)">加入购物车</p>
                </zan-col>
            </zan-row> -->
            <!-- <div class="footer-left">
                
                <img src="../../../static/img/collection_fill.png"  alt="">
                <img src="../../../static/img/collection_fill.png"  alt="">
            </div>
            <div class="footer-right">
               
              
            </div> -->
        </footer>
    </div>
</template>
<script>
import bus from '../../event/event.js'
export default {
    data() {
        return {
            isActive:false,
            isActive1:true,
            item: {
                title: "TheONE立式钢琴 智能钢琴 壹枱原声古典钢琴The ONE钢琴+",
                name: "tap 1",
                imgUrl: "http://www.1tai.com/imgs/tap/shop/tap.jpg",
                price: 29800,
                description: "更多介绍内容",
                DescImgUrl: [
                    "https://img.alicdn.com/imgextra/i2/2090245787/TB2xFWzXTZKL1JjSZFIXXX_DFXa-2090245787.jpg",
                    "https://img.alicdn.com/imgextra/i1/2090245787/TB2Q7OAXUEIL1JjSZFFXXc5kVXa-2090245787.jpg",
                    "https://img.alicdn.com/imgextra/i1/2090245787/TB2thqCXRoHL1JjSZFwXXb6vpXa-2090245787.jpg",
                    "https://img.alicdn.com/imgextra/i1/2090245787/TB2quWEXPoIL1JjSZFyXXbFBpXa-2090245787.jpg",
                    "https://img.alicdn.com/imgextra/i3/2090245787/TB2HCeyXKALL1JjSZFjXXasqXXa-2090245787.jpg",
                    "https://img.alicdn.com/imgextra/i2/2090245787/TB20R5rXS3PL1JjSZFtXXclRVXa-2090245787.jpg",
                    "https://img.alicdn.com/imgextra/i2/2090245787/TB2Y57LXnZRMeJjSspkXXXGpXXa-2090245787.jpg",
                    "https://img.alicdn.com/imgextra/i4/2090245787/TB2sPgLXnZRMeJjSspkXXXGpXXa-2090245787.jpg"
                ],
            }
        }
    },
    created() {
        this.method1()
        console.log(`created method1`)
    },
    methods: {
        AddCard(item) {
            console.log(item)
        },
        // 用js改变css样式 ，控制tab标签页显示
        showItem(key) {
            if (key ===1){
                this.isActive = false
            } else {
                this.isActive =true
            }
        },
        method1() {
            bus.$on("myfun", (data) => {
                this.item.name = data
            })
        }
    },
    computed() {
    }
}
</script>
<style>
header {
  border: 2rpx grey solid;
  margin-bottom: 3%;
}
.desc{
    width: 100%;
    margin: 0 auto;
    text-align: center;
}
main {
  border: 2rpx grey solid;
  margin-bottom: 3%;
}
.active{
    display: none;
}
.item-tab{
    text-align: center;
}
footer{
    
    /* align-content: space-around; */
    position: fixed;
    bottom:0;
    left:0;
    height: 100rpx;
    width: 100%;
    background: #fff;
    display: flex;
    flex-direction:row;
    align-items: center;
    justify-content: space-around;
}
/* footer {
  border: 2rpx grey solid;
  position: fixed;
  bottom: 0rpx;
  width: 100%;
  height: 8%;
  background-color: white;
}
.footer-p{
    text-align: center;
    border: 2rpx black solod;
}
.footer-right p{
    height: 100%;
    width: 60%;
    text-align: center;
    float: right;
}
footer img{
    height: 100%;
    width: 11%;
    background: no-repeat;
} */
</style>
