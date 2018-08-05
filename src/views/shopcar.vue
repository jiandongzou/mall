<template>
    <div>
      这是购物车页面
      <span>{{$route.query.id}}</span>
    </div>
</template>

<script>
    export default{
        data(){
            return {
                msg: 'hello vue'
            }
        }
    }
</script>
