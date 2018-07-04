<template>
    <div>
        <p>produce detail</p>
        <p @click="method1()">{{ message }}</p>
    </div>
</template>
<script>
import bus from '../../event/event.js'
export default {
    data:{
        message:'click'
    },
    created() {
      this.method1()
      console.log(`created method1`)
    },
    methods:{
        method1() {
            bus.$on("myfun",(data)=>{
                this.message = data
            })
        }
    },
    computed() {
    }
}
</script>
<style>

</style>
