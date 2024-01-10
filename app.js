const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const mailchimp = require("@mailchimp/mailchimp_marketing");  
const https = require("https");



const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));





app.get("/", function(req,res){
    res.sendFile(__dirname + "/signup.html");
})
app.post("/", function(req,res){
    const totalInfo = req.body;
    const firstName = totalInfo.fName;
    const secondName = totalInfo.lName;;
    const email = totalInfo.email;

    console.log(firstName);
    console.log(secondName);
    console.log(email);

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME : firstName,
                    LNAME: secondName
                }

            }
        ]
    }

    const jsondata = JSON.stringify(data);
    console.log(jsondata);

    const url = "https://us21.api.mailchimp.com/3.0/lists/565ca59cd4";
    const apiKey = "88f3392259338ee23a10ef2159f73efd-us21";
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
    request.write(jsondata);
    request.end();


})
app.listen(4000, function(){
    console.log("server is running on port 4000");
})