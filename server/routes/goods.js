/**
 * Created by Administrator on 2018/7/2.
 */
var express=require("express");
var router=express.Router();
var mongoose=require("mongoose");
var goods=require("./../models/goods");
var users=require("./../models/users");
var Address=require("./../models/address.js");
var Order=require("./../models/order");


mongoose.connect("mongodb://localhost:27018/mall",function(err){
  if(err){
    console.log("数据库连接失败");
  }else{
    console.log("数据库连接成功");
    //监听http请求
  }

});
router.get("/good",function(req,res){
  let page=parseInt(req.query.page);
  console.log(page);
  // console.log(page)
  let params={};
  var priceGt;
  var priceLte;
  let limit=parseInt(req.query.limit);
  let priceRank=req.query.pricerank;
  let skip=(page-1)*limit;
  let sort=parseInt(req.query.sort);
  if(priceRank!=="all"){
    switch(priceRank){
           case "0":
          priceGt=0;
          priceLte=100;
            break;
          case "1":
          priceGt=100;
          priceLte=500;
          break;
            case "2":
          priceGt=500;
          priceLte=1000;
          break;
          case "3":
          priceGt=1000;
          priceLte=2000;
          break;
            case "4":
            priceGt=2000;
            priceLte=3000;
            break;
    }
    params={
        "salePrice":{
          $gt:priceGt,
          $lte:priceLte
        }
    }
  };
  //console.log(params)
  let goodModel=goods.find(params).skip(skip).limit(limit).sort({"salePrice":sort});

  goodModel.exec(function(err,doc){
     if(err){
       res.json({
          status:"1",
          msg:err.message
       })
     }else{
       //console.log(doc);
       res.json({
         status:"0",
         msg:"成功",
         result:{
             count:doc.length,
             list:doc
         }
       })
     }
  })

});
//添加到购物车
router.post("/addshopcar",function(req,res,next){

  var userId=req.cookies.userId;
  var productId=req.body.productId;
  console.log(userId)
  users.findOne({"_id":userId},function(err,userDoc){
      if(err){
        res.json({
           status:1,
           msg:err.message
          })
      }else{
         if(userDoc){
             goods.findOne({"productId":productId},function(err1,doc){
                if(err1){
                   res.json({
                      status:1,
                      msg:err1.message
                   })
                }else{


                  if(doc){
                    var goodsItem;
                    userDoc.shopcarList.forEach(function(item){
                      if(item.productId==productId){
                        goodsItem=item;
                        item.productNum++;
                      }
                    });
                    if(goodsItem){
                      userDoc.save(function(err2,newGoodDoc){
                        if(err2){
                          res.json({
                            status:1,
                            msg:err2.message
                          })
                        }else{
                         // console.log(newGoodDoc)
                          res.json({
                            status:0,
                            msg:"",
                            result:"success"
                          })
                        }
                      });
                    }else{
                      doc.productNum= 1;
                      doc.checked= 1;
                      userDoc.shopcarList.push(doc);
                      userDoc.save(function(err2,newGoodDoc){
                        if(err2){
                          res.json({
                            status:1,
                            msg:err2.message
                          })
                        }else{
                         // console.log(newGoodDoc)
                          res.json({
                            status:0,
                            msg:"",
                            result:"success"
                          })
                        }
                      });
                    }

                  }
                }
             })
         }
      }
    })
  })
//获取订单列表
router.post("/orderlist",function(req,res,next){
  var userId=req.cookies.userId;
  users.findOne({"_id":userId},function(err,doc){
     if(err){
        res.json({
           status:1,
           msg:err.message
        })
     }else{

        if(doc){
         // console.log(doc)
          //console.log(doc.shopcarList)
            res.json({
               status:0,
               msg:"获取订单信息成功",
               result:doc.shopcarList
            })
        }
     }
  })

})
//删除某条商品数据
router.post("/delcarList",function(req,res,next){
   var userId=req.cookies.userId;
  var  productId=req.body.productId;
    users.update({_id:userId},{
        $pull:{
          shopcarList:{
             productId:productId
          }
        }
    },function(err,doc){
      if(err){
        res.json({
          status:1,
          msg:err.message
        })
      }else{
        res.json({
          status:0,
          msg:"删除成功"
        })
      }
    })
})
//修改某条商品数据
router.post("/editcarList",function(req,res,next){
    var userId=req.cookies.userId;
    var productId=req.body.productId;
     var productNum=req.body.productNum;
        var checked=req.body.checked;
      //console.log(productNum)
   users.update({"_id":userId,"shopcarList.productId":productId},{
         "shopcarList.$.productNum":productNum,
         "shopcarList.$.checked":checked

   },function(err,doc){
     if(err){
       res.json({
         status:1,
         msg:err.message
       })
     }else{
       res.json({
         status:0,
         msg:"更新成功"
       })
     }
   });
})
//商品是否全选；
router.post("/ischeckall",function(req,res,next){
    var userId=req.cookies.userId;
    var isallchecked=req.body.isallchecked?1:0;
  users.findOne({"_id":userId},function(err,doc){
     if(err){
       res.json({
          status:1,
          msg:err.message
       })
     }else{
       if(doc){
         doc.shopcarList.forEach(function(item){
             item.checked=isallchecked;
         });
         doc.save(function(err1,doc){
           if(err1){
             res.json({
               status:1,
               msg:err.message
             })
           }else{
             res.json({
               status:0,
               msg:'保存成功'
             })
           }
         })
       }
     }
  })
});
//添加邮寄地址
router.post("/saveaddress",function(req,res,next){
  var userId=req.cookies.userId;
  var username=req.body.username;
  var phonenumber=req.body.phonenumber;
  var address=req.body.address;

  users.findOne({"_id":userId},function(err,userdoc){
    if(err){
      res.json({
        status:1,
        msg:err.message
      })
    }else{
       if(userdoc){
         if(username==""){
           res.json({
             status:1,
             msg:"姓名不能为空"
           })

         }else if(address==""){
           res.json({
             status:1,
             msg:"地址不能为空"
           })

         }else if(phonenumber==''){
           res.json({
             status:1,
             msg:"电话不能为空"
           })
         }else{
             var newaddress=new Address({
                address:address,
                userName:username,
                phoneNumber:phonenumber,
                  isDefault:false
             });
           newaddress.save(function(err1,doc){
              if(err1){
                res.json({
                  status:1,
                  msg:err1.message
                })
              }else{
                userdoc.addressList.push(doc);
                userdoc.save(function(err2,newuserdoc){
                  if(err2){
                    res.json({
                      status:1,
                      msg:err2.message
                    })
                  }else{
                    res.json({
                      status:0,
                      msg:"地址保存成功"
                    })
                  }
                })

              }

           })

         }
       }
    }
  })
})
//获取地址列表
router.post("/addresslist",function(req,res,next){
  var userId=req.cookies.userId;
  users.findOne({"_id":userId},function(err,doc){
    if(err){
      res.json({
        status:1,
        msg:err.message
      })
    }else{
      if(doc){
         res.json({
            status:0,
            msg:"地址列表获取成功",
            result:doc.addressList
         })
      }
    }
  })
})
// 设置默认地址；
router.post("/setdefault",function(req,res,next){
  var userId=req.cookies.userId;
  var addressId=req.body.addressId;
  users.findOne({"_id":userId},function(err,userdoc){
      if(err){
         res.json({
            status:1,
            msg:err.message
         })
      }else{
         if(userdoc){
           userdoc.addressList.forEach(function(item){
                if(item._id==addressId){
                  item.isDefault=true;
                }else{
                   item.isDefault=false;
                }

            });
          // console.log(userdoc.addressList);
              userdoc.save(function(err1){
                  if(err1){
                    res.json({
                      status:1,
                      msg:err.message
                    })
                  }else{
                    res.json({
                      status:0,
                      msg:"默认地址设置成功"
                    })
                  }
              });
         }
      }
  })
});
//删除地址
router.post("/deladdress",function(req,res,next) {
  var userId = req.cookies.userId;
  var addressId = req.body.addressId;
  users.update({_id:userId},{
    $pull:{
      addressList:{
         _id:addressId
      }
    }
  },function(err,doc){
     if(err){
         res.json({
           status:1,
           msg:err.message
           })
      }else{
       res.json({
         status:0,
         msg:"删除成功"
       })
     }
  })

})
//创建订单信息；
router.post("/payment",function(req,res,next){
  var userId = req.cookies.userId;
  var addressid=req.body.addressId;
  var orderCount=parseInt(req.body.orderCount);
  //console.log(typeof orderCount)
  users.findOne({_id:userId},function(err,doc){
     if(err){
       res.json({
         status:1,
         msg:err.message
       })
     }else{
       if(doc){
          var address="";
         doc.addressList.forEach((item)=>{
           if(item._id==addressid){
             address=item
           }
         });
          var goodlist=[];
          doc.shopcarList.forEach((item)=>{
            if(item.checked==1){
              goodlist.push(item);
            }
          });
       //  console.log(orderCount)
         var order= new Order({
              address:address,
              goodList:goodlist,
               orderCount:orderCount,
              orderStatus:true

         });
         order.save(function(err,orderdoc){
            if(err){
              res.json({
                status:1,
                msg:err.message
              })
            }else{
              doc.orderList.push(orderdoc);
              doc.save();
              res.json({
                status:0,
                msg:"创建订单保存成功",
                result:{
                    orderCount:orderdoc.orderCount,
                    orderId:orderdoc._id
                }

              })
            }
         })
       }
     }
  })
})
//订单成功后获取订单相关信息
router.post("/orderinfo",function(req,res,next){
  var userId = req.cookies.userId;
  var orderId=req.body.orderId;
  users.findOne({_id:userId},function(err,doc){
     if(err){
       res.json({
         status:1,
         msg:err.message
       })
     }else{
       //之前选中的商品从购物车移除掉
     /*   doc.shopcarList.forEach((item)=>{*/
         /*  if(item.checked==1){*/
       Order.findOne({_id:orderId},function(err1,orderdoc){
           if(err1){
             res.json({
               status:1,
               msg:err.message
             })
           }else{
              if(orderdoc){
                users.update({_id:userId},{
                  $pull:{
                    shopcarList:{
                      checked:1
                    }
                  }
                },function(err,doc){
                  if(err){
                    res.json({
                      status:1,
                      msg:err.message
                    })
                  }
                })

                 res.json({
                   status:0,
                   msg:"获取订单信息成功",
                   result:{
                       orderId: orderId,
                        orderCount:orderdoc.orderCount
                   }
                 })
              }
           }
       })
     }
  })
})

module.exports = router;
