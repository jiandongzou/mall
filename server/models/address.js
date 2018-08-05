
/**
 * Created by Administrator on 2018/7/12.
 */
var mongoose=require("mongoose");
var addressSchema= new mongoose.Schema({
      address:String,
      userName:String,
      phoneNumber:Number,
      isDefault:Boolean
});
module.exports=mongoose.model("Address",addressSchema);

