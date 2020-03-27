"use strict";
const nodemailer = require("nodemailer");

const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
  process.env.CLIENT_EMAIL_ID, // ClientID
  process.env.CLIENT_EMAIL_SECRET, // Client Secret
  "https://developers.google.com/oauthplayground" // Redirect URL
);

oauth2Client.setCredentials({
  refresh_token: process.env.EMAIL_REFRESH
});
const accessToken = oauth2Client.getAccessToken()

// async..await is not allowed in global scope, must use a wrapper
async function sendEmail(options) {

  const {
    from,
    to,
    subject,
    html_response
  } = options;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",

    auth: {
      type: "OAuth2",
      user: process.env.EMAIL_USERNAME,
      clientId: process.env.CLIENT_EMAIL_ID,
      clientSecret: process.env.CLIENT_EMAIL_SECRET,
      accessToken: accessToken,
      refreshToken: process.env.EMAIL_REFRESH

    }
  });


  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: 'Social Chats <minutechatgreendot@gmail.com>', // sender address
    to, // list of receivers
    subject, // subject line
    text: html_response, // plain text body
    html: html_response // html body
  });

  console.log("Message sent: %s", info.messageId);


}

module.exports = sendEmail;


