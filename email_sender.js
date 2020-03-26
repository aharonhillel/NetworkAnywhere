"use strict";
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function sendEmail(options) {

    const {
        from,
        to,
        subject
    } = options;

  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  // const testAccount = await nodemailer.createTestAccount();

  console.log(process.env.EMAIL_USERNAME)
  console.log(process.env.CLIENT_EMAIL_ID)
  console.log(process.env.CLIENT_EMAIL_SECRET)
  console.log(process.env.EMAIL_REFRESH)

  const transporter  = nodemailer.createTransport({      
    host: "smtp.gmail.com",
    
    auth: {
      type: "OAuth2",
      user: process.env.EMAIL_USERNAME,
      clientId: process.env.CLIENT_EMAIL_ID,
      clientSecret: process.env.CLIENT_EMAIL_SECRET,
      accessToken: process.env.ACCESS_TOKEN,
      refreshToken: process.env.EMAIL_REFRESH       
                       
    }
  });

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

  
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from, // sender address
    to, // list of receivers
    subject, // subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>" // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

}

module.exports = sendEmail;

