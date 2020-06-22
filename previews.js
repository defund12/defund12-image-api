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

//deprecated - remove after succesful usage of other api route
app.get("/api/preview", async (req, res) => {
  if (!req.query.city) {
    res.status(400).send("You need to specify city");
  }

  if (!req.query.state) {
    res.status(400).send("You need to specify state");
  }

  const { city, state } = req.query;

  const text = `Send pre-scripted emails to ${city} government officials.`

  // Support linew breaks
  const formattedCity = city.replace(/(?:\r\n|\r|\n)/g, "<br>");

  const image = await getImage({
    // output: "./image.png",

    content: {city: formattedCity, state, text},
    html : previewTemplate,
  });


  res.writeHead(200, { "Content-Type": "image/png" });
  res.end(image, "binary");
});

app.get("/api/preview/:type", async (req, res) => {
  if (!req.query.city) {
    res.status(400).send("You need to specify city");
  }

  if (!req.query.state) {
    res.status(400).send("You need to specify state");
  }

  const { city, state } = req.query;

  
  let text;
  switch(req.params.type) {
    case "letter": 
      text = `Order physical letters to be printed and mailed to ${city} government officials.`
      break;
    case "email":
      text = `Send pre-scripted emails to ${city} government officials.`
      break;
    default:
      text = "Send pre-scripted emails to government officials"
  }

  // Support linew breaks
  const formattedCity = city.replace(/(?:\r\n|\r|\n)/g, "<br>");

  const image = await getImage({
    // output: "./image.png",

    content: {city: formattedCity, state, text},
    html : previewTemplate,
  });


  res.writeHead(200, { "Content-Type": "image/png" });
  res.end(image, "binary");
});

