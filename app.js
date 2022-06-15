const express = require("express");
const app = express();

const request = require("request");
const https = require("https")

app.use(express.urlencoded({extended: true}));

app.use("/public",express.static("public"));

app.get('/',(req,res)=>{
  res.sendFile(__dirname + "/index.html")
})


app.post('/',(req,res)=>{
  const firstName = req.body.fname;
  const lastName = req.body.lname;
  const Email = req.body.email;
  const data = {
    members :[ { 
     email_address: Email,
     status : "subscribed",
     merge_fields:{
        FNAME:firstName,
        LNAME:lastName
     }
    }
    ]
  };
  const jsonData = JSON.stringify(data);

const url = "https://us10.api.mailchimp.com/3.0/lists/ce831e95ef" ;

const options = {
    method: "POST",
    auth: "Rohit51:d768d607a313a305f38c301075d90699-us 10"
}

const request = https.request(url,options, (response)=>{

if(response.statusCode === 200){
    res.sendFile(__dirname + "/success.html")
}else{
    res.sendFile(__dirname + "/failure.html")
}

response.on("data",(data)=>{
console.log(JSON.parse(data));
})
})
  request.write(jsonData);
  request.end();
})

app.post('/suc', (req,res)=>{
    // res.sendFile(__dirname + "/index.html")
    res.redirect('/');
})

app.post('/failure', (req,res)=>{
    res.redirect('/');
})

app.listen(process.env.PORT || 3000, ()=>{
    console.log("server is running on port 3000");
})



// API key
// 
// Audience list key
// ce831e95ef
