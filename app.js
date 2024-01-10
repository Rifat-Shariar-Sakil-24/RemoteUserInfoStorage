const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const mailchimp = require("@mailchimp/mailchimp_marketing");  
const https = require("https");

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
  const email = req.body.email;

  const data = {
    members: [
        {
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME : fName,
                LNAME : lName
            }
        }
    ]
  }
  const jsonData = JSON.stringify(data);
  console.log(jsonData);

  const url = "https://us21.api.mailchimp.com/3.0/lists/565ca59cd4";
    const apiKey = "850da8aac4c5ea34e034c5fef103190b-us21";
    const options = {
        method: "POST",
        headers: {
            Authorization: "Basic " + Buffer.from("shariarsakil:" + apiKey).toString("base64"),
          },
      };

    const request = https.request(url, options, function(response){
      
          var data2 = "";
          response.on("data", function(chunk){
            data2 += chunk;
          })

          
          response.on("end", function(){
            console.log(JSON.parse(data2));
          })

        
    })
    request.write(jsonData);
    request.end();


})
app.listen(4000, function(){
    console.log("server is running on port 4000");
})