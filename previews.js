const express = require("express");
const app = express();
const fs = require("fs");
const { getImage } = require('./screenshot');
const path = require("path");

const port = 5000;

// Listen on port 5000
app.listen(port, () => {
  console.log(`Server is booming on port 5000
Visit http://localhost:5000`);
});

const previewTemplate = fs.readFileSync(path.resolve(__dirname, "previewImage.html"), "utf8");

app.get("/api/preview/*", async (req, res) => {

  let text, location;
  if(req.query.state && req.query.city){
    const {city, state} = req.query
    location = `in ${city}, ${state}`
    switch(req.params[0]) {
      case "letter": 
        text = `Order physical letters to be printed and mailed to ${city} government officials.`
        break;
      case "email":
        text = `Send pre-scripted emails to ${city} government officials.`
        break;
      default:
        text = "Send pre-scripted emails and physical letters to government officials and council members."
    }
  } else{
    switch(req.params[0]) {
      case "letter": 
        text = `Order physical letters to be printed and mailed to government officials and council members.`
        break;
      case "email":
        text = `Send pre-scripted emails to government officials and council members.`
        break;
      default:
        text = "Send pre-scripted emails and physical letters to government officials and council members."
    }
  }

  const image = await getImage({
    // output: "./image.png",

    content: {location, text},
    html : previewTemplate,
  });


  res.writeHead(200, { "Content-Type": "image/png" });
  res.end(image, "binary");
});

