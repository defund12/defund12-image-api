const express = require("express");
const app = express();
const nodeHtmlToImage = require("node-html-to-image");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 5000;

const html = fs.readFileSync(path.resolve(__dirname, "image.html"), "utf8");

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

  // Support linew breaks
  const formattedCity = city.replace(/\\n/g, "<br />");

  const image = await nodeHtmlToImage({
    output: "./image.png",
    quality: 100,
    content: { path, city: formattedCity, color, titleSize, urlSize },
    puppeteerArgs: {
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    },
    html,
    //     html: `<html>
    //   <head>
    //     <link
    //       href="https://fonts.googleapis.com/css?family=Poppins:400,700,900"
    //       rel="stylesheet"
    //     />
    //     <style>
    //       body {
    //         font-family: "Poppins";
    //         font-weight: 700;
    //       }

    //       img {
    //         max-width: 100%;
    //       }
    //     </style>
    //   </head>
    //   <body>
    //     Hello world 🙌!

    //   </body>
    // </html>`,
  });
  res.writeHead(200, { "Content-Type": "image/png" });
  res.end(image, "binary");
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
