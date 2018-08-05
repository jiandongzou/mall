/**
 * Created by Administrator on 2018/7/2.
 */
var mongoose=require("mongoose");
var productSchema =new mongoose.Schema({
       "productId":String,
       "productName":String,
       "salePrice":Number,
       "productUrl":String,
        "checked":String,
        "productNum":Number,
        "productImage":String

})
module.exports=mongoose.model("Good",productSchema);

