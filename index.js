const express = require('express')
const app = express();
var request = require('request');
var path = require('path');
const api = require('./api.js')

var url =   ""  //get the url here

function post(name,id,link,index){
    var options = {
        'method': 'PUT',
        'url': `https://api.sheety.co/82878d65e704be49f169efbea00733d4/realEstate/sheet1/${index}`,
        'headers': {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "sheet1": {
            "customerName": name, // response.sheet1.name,
            "propertyId": id,      // response.sheet1.propertyId,
            "link": link   //`localhost:3000/site/${id}/client/${name}`
          }
        })
      
      };
      request(options, function (error, response) {
        if (error) throw new Error(error);
        // console.log(response.body);
      });
}


app.get("/", (req,res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
})

app.get("/personalizeAndUpdateSheet", async (req,res) => {
    api.makeCall('https://api.sheety.co/82878d65e704be49f169efbea00733d4/realEstate/sheet1')
    .then(response => {

        var len = Object.keys(response.sheet1).length
        for (let index = 0; index < len; index++) {
            
            if (response.sheet1[index].link == undefined ){
                url = `localhost:3000/site/${response.sheet1[index].propertyId}/client/${response.sheet1[index].customerName}`  
                post(response.sheet1[index].customerName,response.sheet1[index].propertyId,url,index+2)
            }
        }
        res.end()
    })
    .catch(error => {
        console.log("errororrorro");
        res.send(error)
    })

})



app.listen(3000, () =>{
    console.log("Listening at port 3000");
})