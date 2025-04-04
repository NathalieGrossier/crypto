const express = require("express");
const path = require("path");
const app = express();
require("dotenv").config();
const { fetchData } = require("./public/assets/js/lib/functions.js");
// import { fethData } from "./public/assets/js/lib/functions.js";

app.set("view engine", "ejs");

// const images = fetchData({
//   route:
//     "/games?key=de462d1e145d44e084148f017bf5976d&dates=2019-09-01,2019-09-30&platforms=18,1,7",
// });

const images = fetchData({
  api: "https://graph.instagram.com",
  route:
    "/9373620262735171/media?fields=id,media_type,media_url&access_token=IGAAONIxeRyZBZABZAFBjQTVOWEQyd0ViMWh1d0pocERPeHFnbWo3ZAGgzSEJLZAHI2NEdYYTFCMk1mNDJrUzJSY1dIc2hzOEViWGM5dHdZAZAFJPT25OUE5uTXM3Mk44cTd3cGpJRnBpUzBvZAHVHS2N1djBwUS1WVktQbWJ0cWhUeUdWZAwZDZD",
  options: {
    headers: {},
    // params: { per_page: 50 }, //indiqué dans la doc de Unsplash
  },
}).then((data) => {
  return data.data;
});

app.use(express.static(path.join(__dirname, "public"))); // => /front/public/

//pour donner la route pour ouvrir notre index
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/contact", (req, res) => {
  res.render("pages/contact");
});

app.get("/galerie", async (req, res) => {
  try {
    const imagesData = await images;
    console.log(imagesData);
    res.render("pages/masonry", { images: imagesData });
  } catch (err) {
    console.log(err);
    res.render("pages/masonry", { images: [] });
  }
});

const PORT = process.env.PORT || 3080;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(path, __dirname, path.join(__dirname, "public"));
});
