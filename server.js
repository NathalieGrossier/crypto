const express = require("express");
const helmet = require("helmet");
const nodemailer = require("nodemailer");
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

app.use(express.json());

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: [
          "'self'",
          "'unsafe-inline'",
          "https://www.instagram.com/",
          "https://platform.instagram.com/",
        ],
        styleSrc: [
          "'self'",
          "'unsafe-inline'",
          "https://fonts.googleapis.com/",
          "https://cdnjs.cloudflare.com/",
        ],
        styleSrcElem: [
          "'self'",
          "'unsafe-inline'",
          "https://fonts.googleapis.com/",
          "https://cdnjs.cloudflare.com/",
        ],
        fontSrc: [
          "'self'",
          "https://fonts.gstatic.com/",
          "https://cdnjs.cloudflare.com/",
        ],
        imgSrc: [
          "'self'",
          "data:",
          "https://images.unsplash.com/",
          "https://media.rawg.io/",
          "https://*.cdninstagram.com",
          "https://*.fna.fbcdn.net",
        ],
        connectSrc: [
          "'self'",
          "https://api.unsplash.com/",
          "https://api.rawg.io/",
          "https://api.instagram.com/",
          "https://graph.instagram.com/",
        ],
        frameSrc: ["'self'", "https://www.instagram.com/"],
      },
    },
  })
);

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

//Envoyer des messages :
app.post("/contact", async (req, res) => {
  console.log(req.body);
  const { name, email, subject, message } = req.body;
  const htmlContent = `
  <h1>Nouveau message de contact</h1>
  <p><strong>Nom:</strong>${name}</p> 
  <p><strong>Email:</strong>${email}</p>
  <p><strong>Sujet:</strong>${subject}</p>
  <p><strong>Message:</strong>${message}</p>`;

  try {
    let testAccount = await nodemailer.createTestAccount();
    let transporter = nodemailer.createTransport({
      host: testAccount.smtp.host,
      port: testAccount.smtp.port,
      secure: testAccount.smtp.secure, //port 465 pour nous dans l'exemple
      auth: {
        user: testAccount.user, // contact@monsite.com
        pass: testAccount.pass,
      },
      tls: {
        rejectUnauthorized: false, // autorise tout, à ne surtout pas faire en prod !!!!!!
      },
    });
    let mailOptions = {
      from: `"Contact my crypto" <${email}>`,
      to: process.env.CONTACT_RECEIVER_EMAIL,
      subject: subject,
      html: htmlContent,
    };

    let info = await transporter.sendMail(mailOptions);

    console.log("Message envoyé : %s", info.messageId);
    console.log(
      "URL de prévisualisation : %s",
      nodemailer.getTestMessageUrl(info)
    );

    res.status(200).json({
      message: "Votre message a été envoyé avec succès.",
      previewUrl: nodemailer.getTestMessageUrl(info),
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Erreur lors de l'envoi de votre message.",
    });
  }
});
