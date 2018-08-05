<template>
    <div>
       <button @click=" increament">+</button>
      <button v-on:click="decreament">-</button>
      <span>{{num}}</span>
    </div>
</template>
<style>
</style>
<script>
    export default{
      props:["num"],//父组向子组件传递数据；父组件的的count标签必须要有个num=“”的值；
        data(){
            return {
               num:0
            }
        },
        methods: {
           increament(){
            this.$emit("incre")
           },
          decreament(){
            this.$emit("decre")
          }
        }
    }
</script>
