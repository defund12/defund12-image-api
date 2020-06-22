const express = require("express");
const app = express();
const fs = require("fs");
const { getImage } = require('./screenshot');
const path = require("path");
const port = 5000;
const instaTemplate = fs.readFileSync(path.resolve(__dirname, "instaImage.html"), "utf8");

// Listen on port 5000
app.listen(port, () => {
  console.log(`Server is booming on port 5000
Visit http://localhost:5000`);
});
const colors = {
  yellow: "#F9DE62",
  magenta: "#C66EDE",
  green: "#7FD958",
  blue: "#34B8FF",
  turquoise: "#5CE1E6",
  orange: "#FB8F4E",
  purple: "#8A54F4",
  pink: "#FF62C8",
  red: "#FF5756",
};
const randomColor = () => {
  const colorArray = Object.values(colors);
  return colorArray[Math.floor(Math.random() * colorArray.length)];
};
app.get(`/api/insta`, async function (req, res) {
  let color = randomColor();
  if (!req.query.path) {
    res.status(400).send("You need to specify website path");
  }
  if (!req.query.city) {
    res.status(400).send("You need to specify city");
  }
  if (req.query.color && colors.hasOwnProperty(req.query.color)) {
    color = colors[req.query.color];
  }
  const { path, city, titleSize = 120, urlSize = 55 } = req.query;
  // Support line breaks
  const formattedCity = city.replace(/(?:\r\n|\r|\n)/g, "<br>");
  const image = await getImage({
    content: { path, city: formattedCity, color, titleSize, urlSize },
    html: instaTemplate,
  });
  res.writeHead(200, { "Content-Type": "image/png" });
  res.end(image, "binary");
});