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

let defaultTemplateStrings = {
  'header':"Defund12.org",
  'subheader':"", 
  'subtitle1':"Send pre-scripted emails and physical letters to government officials and council members.", 
  'subtitle2':"Demand they reallocate egregious police budgets towards education, social services, and dismantling racial inequality."
}

app.get("/api/preview*", async (req, res) => {
  let template = {...defaultTemplateStrings}
  Object.keys(template).forEach((field)=>{
    if(req.query[field]){
      template[field]=req.query[field]
    }
  })

  const image = await getImage({
    // output: "./image.png",

    content: template,
    html : previewTemplate,
  });

  res.writeHead(200, { "Content-Type": "image/png" });
  res.end(image, "binary");
});