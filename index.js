var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
var mongourl = "mongodb://capgemini:rupasaisreer17@ds239903.mlab.com:39903/buysmart";
mongoose.connect(mongourl);
mongoose.Promise = global.Promise;


app.get("/rupa",(req,res)=>{
    res.send("testing ")
})

var users = require('./user');

app.post("/signup",(req,res)=>{
    console.log("body"+JSON.stringify(req.body))
    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;
    console.log(" details  ......"+username+email)
    var user = new users();
    user.email=email;
    user.username=username;
    user.password=password;
    
    user.save().then((res)=>{
        res.json({"succcess":true});
    }).catch((error)=>{
        res.json({"error":error});
    });
})

app.post("/login",(req,res)=>{
    var username = req.body.username;
    var password = req.body.password;
    users.find({username:username,password:password},(error,user)=>{
         if(error){
             return res.json({"error":error});
         }
         console.log("in");
         if(user){ 
             console.log("user "+user)
             res.send("{login:true}");
            }
         else{
             console.log("not user"+user)
            res.send("{login:false}"); }
     })
})

app.listen(3001,()=>{
    console.log("listening..!")
})

