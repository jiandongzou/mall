// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueLazyLoad from 'vue-lazyload'
import InfiniteScroll from 'vue-infinite-scroll'
import {currency} from "../utils/currency"
import Vuex from "vuex"
 Vue.use(VueLazyLoad,{
    error:require('./assets/img/error.png'),
    loading:require('./assets/img/loading.gif')
 });
Vue.use(InfiniteScroll);
Vue.use(Vuex);
Vue.filter("currencyunit",currency)
Vue.config.productionTip = false

/* eslint-disable no-new */
var store=new Vuex.Store({
   state:{
         userName:"",
         cartCount:0
   },
   mutations:{
      updateUsername(state,username){
        state.userName=username;
      },
     updateCartcount(state,cartcount){
       state.cartCount +=cartcount;
     },
     initCartcount(state,cartcount){
       state.cartCount =cartcount;
     }
   }
})

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
