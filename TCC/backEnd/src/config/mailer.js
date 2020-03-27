
import nodemailer from "nodemailer";
const path = require("path");
const hbs = require("nodemailer-express-handlebars");


let transporter = nodemailer.createTransport({
 service:'gmail',
  auth: {
    user: "admorais.mateus@gmail.com",
    pass: "Teste@123"
  }
});



transporter.use(
  "compile",
  hbs({
    viewEngine: "handlebars",
    viewPath: path.resolve("./src/resources/mail/"),
    extName: ".html"
  })
);



export default transporter;
