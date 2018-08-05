<template>
    <div>
      <nav-header></nav-header>
      <nav-breadcrumb>
        <span >商品</span>
        <!-- <span slot="test2">测试</span>-->
      </nav-breadcrumb>
      <div class="container">
        <div class="cart">
          <div class="page-title-normal">
            <h2 class="page-title-h2"><span>我的购物车</span></h2>
          </div>
          <div class="item-list-wrap">
            <div class="cart-item">
              <div class="cart-item-head">
                <ul>
                  <li>商品</li>
                  <li>价格</li>
                  <li>数量</li>
                  <li>总价</li>
                  <li>编辑</li>
                </ul>
              </div>
              <div v-if="orderList.length==0?true:false" class="container" style="width:100%!important;line-height:100px;color:red;text-align: center">
                 <h2 class="page-title-h2"style="width:100%;"> <span>没有商品</span></h2>

                </div>
              <ul class="cart-item-list" v-for="item in orderList" v-if="orderList.length>0?true:false">
                <li >
                  <div class="cart-tab-1">
                    <div class="cart-item-check">
                      <a href="javascipt:;" class="checkbox-btn item-check-btn" v-bind:class="{check:item.checked==1}" @click="editshopcar('checked',item)">
                        <!--<svg class="icon " style="font-size: 19px;margin-right:1px;">
                          <use xlink:href="#icon-ok"></use>
                        </svg>-->
                      </a>
                    </div>
                    <div class="cart-item-pic">
                      <img v-bind:src="'/static/img/'+item.productImage">
                    </div>
                    <div class="cart-item-title">
                      <div class="item-name">{{item.productName}}</div>
                    </div>
                  </div>
                  <div class="cart-tab-2">
                    <div class="item-price">{{item.salePrice |currencyunit("￥")}}</div>
                  </div>
                  <div class="cart-tab-3">
                    <div class="item-quantity">
                      <div class="select-self select-self-open">
                        <div class="select-self-area">
                          <a class="input-sub" @click="editshopcar('minus',item)">-</a>
                          <span class="select-ipt" >{{item.productNum}}</span>

                          <a class="input-add" @click="editshopcar('add',item)">+</a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="cart-tab-4">
                    <div class="item-price-total">{{item.productNum*item.salePrice |currencyunit("￥")}}</div>
                  </div>
                  <div class="cart-tab-5">
                    <div class="cart-item-opration">
                      <a href="javascript:;" class="item-edit-btn" @click="removeorder(item.productId,item)">
                        <svg class="icon icon-del">
                          <use xlink:href="#icon-del"></use>
                        </svg>
                      </a>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="cart-foot-wrap">
            <div class="cart-foot-inner">
              <div class="cart-foot-l">
                <div class="item-all-check">
                  <a href="javascipt:;"  @click="checkAll">
                  <span class="checkbox-btn item-check-btn" v-bind:class="{check:isCheckAll}">
                      <svg class="icon icon-ok">
                         <use xlink:href="#icon-ok"/>
                      </svg>
                  </span>
                    <span>全选</span>
                  </a>
                </div>
              </div>
              <div class="cart-foot-r">
                <div class="item-total">
                  Item total: <span class="total-price">{{countPrice |currencyunit("￥")}}</span>
                </div>
                <div class="btn-wrap">
                  <a class="btn btn--red" v-bind:class="{'btn--dis':countPrice==0}" @click="linkaddress">Checkout</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal v-bind:modalShow="removedataModal" v-on:close="closeModal">
        <p slot="message" style="overtical-align: -0.24em;">
          <svg class="icon" aria-hidden="true" >
            <use xlink:href="#icon-ok"></use>
          </svg>
          <span >确定要删除这条数据吗？</span>
        </p>
        <div slot="btngroup">
          <a href="javascript:;" class="btn btn--m" @click="removedataModal=false">取消</a>
          <a href="javascript:;" class="btn btn--m" @click="deldata" >确定</a>
        </div>
      </Modal>
      <nav-footer></nav-footer>
    </div>
</template>
<style>
  .input-sub,.input-add{
    min-width: 40px;
    height: 100%;
    border: 0;
    color: #605F5F;
    text-align: center;
    font-size: 16px;
    overflow: hidden;
    display: inline-block;
    background: #f0f0f0;
  }
  .item-quantity .select-self-area{
    background:none;
    border: 1px solid #f0f0f0;
  }
  .item-quantity .select-self-area .select-ipt{
    display: inline-block;
    padding:0 3px;
    width: 30px;
    min-width: 30px;
    text-align: center;
  }
</style>
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
                 orderList:[],
                 productNum:'',
                 removedataModal:false
                 /*isCheckAll:true*/  //computed中有计算isCheckAll的值此处不需要定义

            }
        },
      components:{
        NavHeader,
        NavBreadcrumb,
        NavFooter,
        Modal
      },
    computed:{
          isCheckAll:function(){
             if(this.orderList.length>0){
               return this.getlistCount==this.orderList.length;
             }else{
                return false;
             }
           },
        getlistCount:function(){
           var i=0;
          this.orderList.forEach(function(item){
            if(item.checked==1)i++;
          })
          return i;
        },
      countPrice:function(){
        var money=0;
        this.orderList.forEach(function(item){
            if(item.checked==1){
              money +=parseFloat(item.salePrice) * parseInt(item.productNum);
            };
           //console.log(money);

          })
        return money;
        }

      },
      mounted:function(){
        this.getOrderList();
      },
      methods:{
        getOrderList(){
          axios.post("/goodlist/orderlist").then((res)=>{
             var resData=res.data;
             if(resData.status==0){
                this.orderList=resData.result;
             }else(
               alert(resData.msg)
             )

          })
        },
        editshopcar(flag,item){
          //console.log(item)
          if(flag=="minus"){
             if(item.productNum<=1){
               return;
              }
            item.productNum--;
            this.$store.commit("updateCartcount",-1)
          };
          if(flag=="add"){
            item.productNum++;
            this.$store.commit("updateCartcount",1)
          };
          if(flag=="checked"){
            item.checked=item.checked==1?0:1
            //console.log(item.checked)
            item.checked==1? this.$store.commit("updateCartcount",item.productNum):this.$store.commit("updateCartcount",-item.productNum)

          }
          //console.log(item.productNum)
          axios.post("/goodlist/editcarList",{
                productId:item.productId,
                checked:item.checked,
                productNum:item.productNum

          }).then((res)=>{
              var resData=res.data;

          })
        },

        removeorder(productId,item){
          this.removedataModal=true;
          this.productId=productId;
          this.productNum=item.productNum;

        },
        closeModal(){
          this.removedataModal=false;

        },
        deldata(){
           axios.post("/goodlist/delcarList",{
             productId:this.productId
           }).then((res)=>{
              var resData=res.data;
             if(resData.status==0){
               this.removedataModal=false;
               this.$store.commit("updateCartcount",-this.productNum)
               this.getOrderList();
             }
           })
        },
        checkAll(){
          var flag=!this.isCheckAll;
            var checkedProductnum=0;
            var uncheckedProductnum=0;
          this.orderList.forEach(function(item){
              item.checked==0?uncheckedProductnum+=item.productNum:checkedProductnum+=item.productNum;
              item.checked=flag? 1 : 0;
          });
          if(flag){
            this.$store.commit("updateCartcount",uncheckedProductnum)
          }else{
            this.$store.commit("updateCartcount",-checkedProductnum)
          }
          axios.post("/goodlist/ischeckall",{
             isallchecked:flag
          }).then((res)=>{
             var resData=res.data;

          })
        },
        linkaddress(){
          if(this.countPrice>0){
            this.$router.push({
              path:"/goods/address"
            })
          }
        }


      }



    }
</script>
