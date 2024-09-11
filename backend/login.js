const mysql=require('mysql');
const express=require('express');
const bodyParser=require('body-parser');
const encoder=bodyParser.urlencoded();
const app=express();
app.use(bodyParser.json());
app.use(express.static('public'));
var connection=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root123",
    database:"nodejs"
});
connection.connect(function(error,data){
    if(error){
        console.log(error);
    } 
    else
    {
    console.log("connocted");
    }
});

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});
app.post("/submit",encoder,function(req,res){
    var username=req.body.username;
    var password=req.body.password;
    connection.query("INSERT INTO loginuser(user_name,user_pass) VALUES(?,?)",[username,password],function(error,result){
      if(error){
        console.log(error);
      }
      else{
        console.log("record is inserted:",result);
      }
    })
})


app.listen(5000);