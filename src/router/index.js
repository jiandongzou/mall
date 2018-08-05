import Vue from 'vue'
import Router from 'vue-router'
/*import GoodsList from '@/views/goodsList'*/
import Mall from '@/views/mall'
import Shopcar from '@/components/shopcar'
import Address from '@/components/address'
import Order from '@/components/orderconfirm'
import Ordersucess from '@/components/ordersuccess'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI);
Vue.use(Router);

export default new Router({
  //mode:"history",//去掉链接的#号
  // mode:"hash",加上链接的#号
  routes: [
    {
      path:'/',
      name:'Home',
      component:Mall
    },
    {
      path: '/goods',//      '/goods/:goodID/user/:name'动态路由
      name: 'mall',
      component:Mall
    
    },
    {
      path: '/goods/shopcar',//会自动在父路由下寻找子路由的路径
      name: 'shopcar',
      component:Shopcar
    },
    {
      path: '/goods/address',//会自动在父路由下寻找子路由的路径
      name: 'address',
      component:Address
    },
    {
      path: '/goods/order',//会自动在父路由下寻找子路由的路径
        name: 'order',
        component:Order
    },
    {
      path: '/goods/ordersucess',//会自动在父路由下寻找子路由的路径
      name: 'ordersucess',
      component:Ordersucess
    }
  ]
})
