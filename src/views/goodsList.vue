<template>
    <div>
        <span>这是商品列表</span>
        <div>{{$route.params.goodID}}</div>
       <div>{{$route.params.name}}</div>
      <router-link to="/goods/title">商品标题</router-link>
      <router-link to="/goods/image">商品图片</router-link>
      <div>
        <router-view>

        </router-view>
      </div>
     <!-- <router-link to="/goods/shopcar">这是购物车页面</router-link>  这是一种方式跳转-->
     <!-- <div>
          <button @click="jump">-&#45;&#45;这是跳转购物车的按钮</button>
      </div>-->
    · <router-link v-bind:to="{name:'shopcar'}">这是购物车页面</router-link>
    </div>
</template>
<style>

</style>
<script>

    export default{
        data(){
            return {
                msg: 'hello vue'
            }
        },
        methods:{
          jump(){
            //this.$router.push("/shopcar")
            this.$router.push({path:"/shopcar?id=123"})
          }
        }

    }
</script>
