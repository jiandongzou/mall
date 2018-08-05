/**
 * Created by Administrator on 2018/7/14.
 */
var mongoose=require("mongoose");
var orderSchema= new mongoose.Schema({
  address:Object,
  goodList:Array,
  orderCount:Number,
  creatTime:{
    type:Date,
    default: new Date()
  },
 orderStatus:Boolean
});
module.exports=mongoose.model("Order", orderSchema);

