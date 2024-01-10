const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const mailchimp = require("@mailchimp/mailchimp_marketing");  

const listId = "565ca59cd4";
const apiKey = "a16d3b06878ab0524bae9d224f5b6df6-us21";

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

  mailchimp.setConfig({
    apiKey: apiKey,
    server: "us21",
  });

  const run = async () => {
    const response = await mailchimp.lists.addListMember(listId,
        {
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: fName,
                LNAME: lName,
                
            },
        },
        {
            skipMergeValidation: false
        }
        
    );
};

run();

res.send(res.statusCode);




})
app.listen(4000, function(){
    console.log("server is running on port 4000");
})