<template>
  <div>
    <nav-header></nav-header>
    <nav-breadcrumb>
      <span >商品</span>
     <!-- <span slot="test2">测试</span>-->
    </nav-breadcrumb>
    <div class="accessory-result-page accessory-page">
      <div class="container">
        <div class="filter-nav">
          <span class="sortby">筛选:</span>
          <a href="javascript:void(0)" class="default cur">综合</a>
          <a href="javascript:void(0)" class="price" @click="sortPrice">价格<svg class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg></a>
          <a href="javascript:void(0)" class="filterby stopPop" @click="showFliterPop">价格筛选</a>
        </div>
        <div class="accessory-result">
          <!-- filter -->
          <div class="filter stopPop" id="filter"   v-bind:class="{'filterby-show':filterPop}">
            <dl class="filter-price" style="text-align: left;">
              <dt>价格:</dt>
              <dd><a href="javascript:void(0)"  v-bind:class="{'cur':priceCheck=='all'}" @click="closeFilterPop('all')">全部</a></dd>
              <dd v-for="(item,index) in priceFilter" >
                <a href="javascript:void(0)" v-bind:class="{'cur':priceCheck==index}" @click="closeFilterPop(index)">{{item.startPrice}} - {{item.endPrice}}</a>
              </dd>
            </dl>
          </div>

          <!-- search result accessories list -->
          <div class="accessory-list-wrap">
            <div class="accessory-list col-4">
              <ul>
                <li v-for="item in goodList">
                  <div class="pic">
                    <a href="#"><img v-lazy="'/static/img/'+item.productImage" alt=""></a>
                  </div>
                  <div class="main">
                    <div class="name">{{item.productName}}</div>
                    <div class="price">{{item.salePrice}}</div>
                    <div class="btn-area">
                      <a href="javascript:;" class="btn btn--m" @click="addShopCar(item.productId)">加入购物车</a>
                    </div>
                  </div>
                </li>
              </ul>
              <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="20">
                <img src="../assets/img/loading-spin.svg" alt="" v-show="loading">.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="md-overlay " v-show="overLay"></div>
    <Modal v-bind:modalShow="modalShow"  v-on:close="closeModal">
       <p slot="message">请先登录，否则无法加入到购物车中</p>
      <div slot="btngroup">
        <a href="javascript:;" class="btn btn--m" @click="modalShow=false">关闭</a>
      </div>
    </Modal>
    <Modal v-bind:modalShow="modalShowCar"  v-on:close="closeModal">
      <p slot="message" style="overtical-align: -0.24em;">
        <svg class="icon" aria-hidden="true" >
          <use xlink:href="#icon-ok"></use>
        </svg>
          <span >已经成功加入购物车</span>
      </p>
      <div slot="btngroup">
          <a href="javascript:;" class="btn btn--m" @click="modalShowCar=false">继续购物</a>
          <router-link to="/goods/shopcar" class="btn btn--m">跳转到购物车</router-link>
      </div>
    </Modal>
    <nav-footer></nav-footer>
  </div>
  <!--面包屑-->

</template>
<style>
  .md-content{
    margin:0 auto;
    width:72%;
  }
</style>
<script>
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
        goodList:[],
        priceFilter:[
            {
             startPrice:0,
             endPrice:100
            },
          {
            startPrice:100,
            endPrice:500
          },
          {
            startPrice:500,
            endPrice:1000
          },
          {
            startPrice:1000,
            endPrice:2000
          },
          {
            startPrice:2000,
            endPrice:3000
          }
        ],
        priceCheck:"all",
        filterPop:false,
        overLay:false,
        limit:8,
        page:1,
        busy: false,
        sort:true,
        loading:false,
        modalShow:false,
        modalShowCar:false
      }
    },
    components:{
      NavHeader,
      NavBreadcrumb,
      NavFooter,
      Modal
    },
    mounted:function(){
         this.getGoodList();
     },

    methods:{
      getGoodList(flag){
         var params={
            limit:this.limit,
            page:this.page,
            pricerank:this.priceCheck,
            sort:this.sort?1:-1
         };
         this.loading=true;
        axios.get("/goodlist/good",{
          params:params
        }).then((res)=>{
            //console.log(res.data.result)
          //console.log(res.data.result)
          this.loading=false;
          if(flag){
            if(res.data.result.count<this.limit){
              this.busy = true;
            }else{
              this.busy = false;

            }
            this.goodList=this.goodList.concat(res.data.result.list);

          }else{
            this.goodList=res.data.result.list;
      }
         })
      },
      loadMore: function() {
        this.busy = true;

        setTimeout(() => {
          this.page++;
          this.getGoodList(true);
           this.busy = false;

          }, 500);
      },
      showFliterPop(){
        this.filterPop=true;
        this.overLay=true;
      },
      closeFilterPop(id){
        this.priceCheck=id;

        this.filterPop=false;
        this.overLay=false;
        this.page=1;
        this.goodList=[];
        this.getGoodList(true);
      },
      sortPrice(){
        this.sort=!this.sort;
        this.page=1;
        this.goodList=[];
        this.getGoodList(true);
      },
     addShopCar(id){

        axios.post("/goodlist/addshopcar",{
           productId:id
        }).then((res) =>{

           var response=res.data
          //console.log(response)
          if(response.status==0){
         this. modalShowCar=true;
         this.$store.commit("updateCartcount",1)

          }else{
            this.modalShow=true;
          }
        })
      },
      closeModal(){
         this.modalShow=false;
        this. modalShowCar=false;
      }
    }
  }
</script>
