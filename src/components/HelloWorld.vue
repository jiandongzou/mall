<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <Count v-bind:num="num" v-on:decre="decreament" v-on:incre="increament"></Count>
    <span>parent:{{num}}</span>
  </div>
</template>

<script>
  import Count from "./count.vue"
export default {

  name: 'HelloWorld',
  data () {
    return {
      num:10,
      msg: 'Welcome to my Vue.js App'
    }
  },
  components:{
      Count
  },
  methods:{
    increament(){
      this.num++;
    },
    decreament(){
      this.num--
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
