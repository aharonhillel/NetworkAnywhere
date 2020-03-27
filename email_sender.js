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

  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  // const testAccount = await nodemailer.createTestAccount();

 

  const transporter  = nodemailer.createTransport({      
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
    from, // sender address
    to, // list of receivers
    subject, // subject line
    text: html_response, // plain text body
    html: html_response // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

}

module.exports = sendEmail;

  // create reusable transporter object using the default SMTP transport
  // const transporter = nodemailer.createTransport({
  //   service: 'gmail',
  //   host: "smtp.gmail.com",
  //   port: 587,
  //   secure: false, // true for 465, false for other ports
  //   auth: {
  //     user: process.env.emailUsername, // generated ethereal user
  //     pass: process.env.emailPassword // generated ethereal password
  //   }
  // });


  // const transporter = nodemailer.createTransport({
  //   service: 'gmail',
  //   host: 'smtp.gmail.com',
  //   auth: {
  //     user: process.env.emailUsername,
  //     pass: process.env.emailPassword
  //   }
  // });
