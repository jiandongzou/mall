var express = require('express');
var router = express.Router();
var users=require("../models/users.js")
/* GET users listing. */
//登录接口
router.post('/login', function(req, res, next){
   var userName=req.body.userName;
   var userPwd=req.body.userPwd;

  var params={
    userName:userName,
    userPwd:userPwd
  };
  users.findOne(params,function(err,doc) {
    if (err) {
      res.json({
        status: 1,
        msg: err.message
      })
    } else {
      if (userName == "") {
        res.json({
          status: 1,
          msg: "用户名不能为空"
        })
      } else if (userPwd == "") {
        res.json({
          status: 1,
          msg: "密码不能为空"
        })
      } else {
        if(doc){
          res.cookie("userId",doc._id,{
            maxAge:1000*60*60
          });
          res.cookie("userName",doc.userName,{
            maxAge:1000*60*60
          });
          res.json({
            status:0,
            msg:"登录成功",
            result:{
              userId:doc._id,
              userName:doc.userName
            }


          })
        }else{
          res.json({
            status:1,
            msg:"用户名或密码错误"

          })
        }
      }
    }
  })
});

//退出接口
router.post("/logout",function(req,res,next){
  res.cookie("userId","",{
    maxAge:-1
  });
   res.json({
      status:0,
      msg:"退出成功"
   })
});
//检验是否登录
router.post("/checklogin",function(req,res,next){
   if(req.cookies.userId){
      res.json({
        status:0,
        msg:"已登录",
       result:req.cookies.userName||""
      })
   }else{
     res.json({
       status:1,
       msg:"未登录"

     })
   }
});
//注册接口
router.post("/register",function(req,res,next){
  var userName=req.body.userName;
  var userPwd=req.body.userPwd;
  console.log(userName);
  console.log(userPwd);
 users.findOne({userName:userName},function(err,doc){
   if(err){
     res.json({
       status:1,
       msg:err.message,

     })
   }else{
       if(doc){
         res.json({
            status:1,
           msg:"用户名已经被注册过"
         })
       }else{
          if(userName==""){
            res.json({
              status:1,
             msg:"用户名不能为空"
            })
          }else if( userPwd==""){
           res.json({
             status:1,
             msg:"密码不能为空"
           })
         }else{
            var newuser= new users({
              userName:userName,
              userPwd:userPwd,
            });
            newuser.save(function(err1,doc){
              if(err1){
                res.json({
                  status:1,
                  msg:err.message,

                })
              }else{
                res.json({
                  status:0,
                  msg:"注册成功",

                })
              }
            })
          }


     }
   }
 })
})
//获取购物车的数量
router.post("/cartcount",function(req,res,next){
  if(req.cookies&&req.cookies.userId){
    var userId=req.cookies.userId;
    users.findOne({"_id":userId},function(err,doc){
      if(err){
        res.json({
          status:1,
          msg:err.message
        })
      }else{
        var cartcount=0
        var shopcar=doc.shopcarList;
        if( shopcar.length>0){
          shopcar.forEach(function(item){
            if(item.checked==1){
              cartcount +=item.productNum;
            }
          })
          res.json({
            status:0,
            msg:"获取成功",
            result:cartcount
          })
        }else{
          res.json({
            status:0,
            msg:"获取成功",
            result:0
          })
        }

      }
    })
  }
})
module.exports = router;
