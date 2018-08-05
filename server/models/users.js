/**
 * Created by Administrator on 2018/7/4.
 */
var mongoose=require("mongoose");
var userSchema=new mongoose.Schema({
     userId:String,
     userName:String,
     userPwd:String,
     orderList:[
           {
             address:Object,
             goodList:Array,
             orderCount:Number,
             creatTime:{
               type:Date

             },
             orderStatus:Boolean
           }
       ],
     addressList:[
         {
       address:String,
       userName:String,
       phoneNumber:Number,
       isDefault:Boolean
         }
     ],
     shopcarList:[
       {
         "productId":String,
         "productName":String,
         "productImage":String,
         "salePrice":String,
         "productNum":Number,
         "checked":String
       }
     ]
})
module.exports=mongoose.model("User", userSchema)
