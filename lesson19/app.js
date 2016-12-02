/**
 * Created by Administrator on 2016/12/2.
 */
var app  = require("http");
var url = require("url");
var domain = require("domain");
    app.createServer(function(req,res){
         var path = url.parse(req.url);
        /*------------方式一-------------------------*/
       /*同步代码。no problem
        try{
           console.log(a+b);
        }catch(err){
            console.log(err)

        }*/
        /*异步代码 无法捕获*/
    /* try{
         var t= setTimeout(function(){
              console.log(a+b);
          },1000);
      }catch(err){
             console.error(err);
      }*/
        var t= setTimeout(function(){
            console.log(a+b);
        },1000);
        /*-------------------------方式三domain------------------------------------*/
        var d = domain.create();
        d.on("error",function(err){
            res.end("404");
            d.dispose()
        })
        d.add(t);
    }).listen(8080,function(err){
        console.log(err)
        if(err){
            return function(){
                console.error(err)
            }()
        }
        console.info("8080端口启动成功!")
    });
/*---------------方式二--这样能补货到同步和异步异常-----------------------*/
/*
process.on("uncaughtException",function(err){
   console.log("程序出现异常");
});
*/
