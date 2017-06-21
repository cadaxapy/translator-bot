var express = require('express');
var sms=require("../models/sms");
var lang=require("../models/languages")
var db=require("../data/db.js")
var deleteSpace=require("../models/deleteSpace");
var newChat=require("../models/newchat");
var date=require("../models/date.js");
var translate=require("../models/translate");
var router = express.Router();
var token = '';
//var TOKEN="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6NjE5NDIzNTMwLCJwaG9uZSI6IjEyMzQ1Njc4OCIsInBhc3N3b3JkIjoiJDJhJDEwJDlzVTZCTUxnWGhzb0VVVVg3UTZxaXVsbUZza3AuTjR6VEUwVFFSYWtFc2huOTE5bTdOMml5IiwiaXNCb3QiOnRydWUsImNvdW50cnkiOnRydWUsImlhdCI6MTQ4OTY2MzQwNH0.npkrRqf316M4Y2AkkwxXxN0VdD8lErCFklM-8rLZ4Bc";
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Translator' });
  
});
router.post('/',function(req,res,next)  {
 var token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6NjE5NDIzNTMwLCJwaG9uZSI6IjEyMzQ1Njc4OCIsInBhc3N3b3JkIjoiJDJhJDEwJDlzVTZCTUxnWGhzb0VVVVg3UTZxaXVsbUZza3AuTjR6VEUwVFFSYWtFc2huOTE5bTdOMml5IiwiaXNCb3QiOnRydWUsImNvdW50cnkiOnRydWUsImlhdCI6MTQ4OTY2MzQwNH0.npkrRqf316M4Y2AkkwxXxN0VdD8lErCFklM-8rLZ4Bc';
 eventControl(req, res, token);
})

router.post('/kz', function(req, res, next) {
  var token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MjY2NTI5OTc2LCJwaG9uZSI6IjYxMDgzIiwicGFzc3dvcmQiOiIkMmEkMTAkUzRiM0JSM3M4OElCdTRiWmh5anMwZU5pSXNYLzhxdEU3Qkx4WFNlZzA4Y0RsZXZMYmlkc2EiLCJpc0JvdCI6dHJ1ZSwiY291bnRyeSI6dHJ1ZSwiaWF0IjoxNDk4MDM5ODY3fQ.wyCG34AVZmyYNNP6k9-HDxZWpDvfvyqfgT3C73T6gHI';
  eventControl(req, res, token);
})

var eventControl = function(req, res, TOKEN) {
    var ip = req.connection.remoteAddress;
db.createDb();
var event=req.body.event;
var chatId=req.body.data.chat_id;
    var content=req.body.data.content;
if(event === "user/follow")
{
  console.log("user follows");
   var userId=req.body.data.id;
   newChat(userId,TOKEN, ip, function(err,res,body){
    message=date()+"Я могу перевести предложения с одного языка на другой. Чтобы поменять язык, пожалуйста, укажите язык, с которого Вы хотели бы осуществить перевод, а затем язык, на который хотите перевести. Например:'en ru'. Со списком языков можно ознакомиться по команде 'list'"+"\n"+" Перевод осуществляется сервисом «Яндекс. Переводчик»";
     console.log(message);
     var chat_id=body.data.membership.chat_id;
     db.createDefDb(chat_id);
    sms(message,chat_id,TOKEN, ip);
   })
}

if(event==="message/new")
{
  
  console.log("new message");
  var stmt=0;
  if(deleteSpace(content).toLowerCase()==="list")
  {
    stmt=1;
    var b="";
    for(var key in lang)
     {
      b=b+key+"="+lang[key]+"\n";
     }
     console.log(b);
     sms(b,chatId,TOKEN,ip);
  }
  if(req.body.data.type != "text/plain")
    {
  sms("Неправильный ввод, или такого слова в интересующем Вас языке не существует. Пожалуйста, введите текст.",chatId,TOKEN,ip);
  stmt=1;
  }
      var text=deleteSpace(content).split(" ");
     
         if(text.length === 2)
         {
          var x=0,y=0,a,b;
           for(var key in lang)
           {
            if(text[0].toLowerCase()===lang[key])
            {
              a=key;
              source=lang[key];
               x++;
            }
            if(text[1].toLowerCase()===lang[key])
            {
              b=key;
              target=lang[key];
              y++;
            }
            
           }
             if(x!=0&&y!=0)
                {
                  console.log("Перевод изменен с "+a+" на "+b);
                  sms("Перевод изменен с "+a+" на "+b,chatId,TOKEN, ip);
                  db.addDb(source,target,chatId);
              stmt=1; 
                }
         }
        if(stmt===0){
          db.getDb(chatId,function(source,target){
            console.log(source,target);
         translate(content,source,target).then(
        
       result=>{
         console.log(result);
          sms(result,chatId,TOKEN, ip)
        })
        }) 
       }
      
}
res.end();
}
module.exports = router;
