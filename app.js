const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req,res){
    res.sendFile(__dirname + "/signup.html");
})
app.post("/", function(req,res){
  const fName = req.body.fName;
  const lName = req.body.lName;
  const email = req.body.email
  console.log(fName,lName,email);
})
app.listen(4000, function(){
    console.log("server is running on port 4000");
})