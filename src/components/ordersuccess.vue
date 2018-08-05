<template>
  <div>
    <div class="container">
      <div class="page-title-normal">
        <h2 class="page-title-h2"><span>check out</span></h2>
      </div>
      <!-- 进度条 -->
      <div class="check-step">
        <ul>
          <li class="cur"><span>Confirm</span> address</li>
          <li class="cur"><span>View your</span> order</li>
          <li class="cur"><span>Make</span> payment</li>
          <li class="cur"><span>Order</span> confirmation</li>
        </ul>
      </div>

      <div class="order-create">
        <div class="order-create-pic"><img src="../../static/img/ok-2.png" alt=""></div>
        <div class="order-create-main">
          <h3>Congratulations! <br>Your order is under processing!</h3>
          <p>
            <span>Order ID：{{orderId}}</span>
            <span>Order total：{{orderCount}}</span>
          </p>
          <div class="order-create-btn-wrap">
            <div class="btn-l-wrap">
              <a href="/goods/shopcar" class="btn btn--m">Cart List</a>
            </div>
            <div class="btn-r-wrap">
              <a href="/goods" class="btn btn--m">Goods List</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import "@/assets/css/checkout.css"
  import "@/assets/css/base.css"
  import "@/assets/css/product.css"
  import NavHeader from "@/views/navheader"
  import NavBreadcrumb from "@/views/breadcrumb"
  import NavFooter from "@/views/footer"
  import Modal from "@/components/Modal"
  import axios from "axios"
    export default{
        data(){
            return {
                orderId:"",
                orderCount:''
            }
        },
        components: {
          NavHeader,
          NavBreadcrumb,
          NavFooter,
          Modal
        },
      mounted(){
        this.init()
      },
      methods:{
        init(){
             var orderId=this.$route.query.orderid
             axios.post("/goodlist/orderinfo",{
                 orderId:orderId
             }).then((res)=>{
                var resData=res.data;
               if(resData.status==0){
                  this.orderCount=resData.result.orderCount;
                  this.orderId=resData.result.orderId;
               }
             })
        }
      }
    }
</script>
