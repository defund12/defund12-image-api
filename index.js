const express = require("express");
const url = require("url");
const app = express();
// const path = require("path");

const PORT = process.env.PORT || 5000;

app.get("/*", (req, res) => {
  const newUrl = url.format({
    pathname: `https://defund12.vercel.app${req.path}`,
    query: req.query,
  });

  res.redirect(newUrl);
});

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
