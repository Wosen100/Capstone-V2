const express = require('express');
const nodeMailRoute = express.Router();
const nodemailer = require('nodemailer');

nodeMailRoute.route('/sendEmail').post(function (req, res) {
  let { churchName, email, donateAmount, company, title, message } =
    req.body;

  const treanspoeter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.email,
      pass:process.env.emailPassword,
    },
  });

  const mailOptions = {
    from: 'donation@wosen.com',
    to: email,
    subject:
      typeof title !== 'undefined' && title.length > 0
        ? title
        : `Donation to ${churchName} confirmation`,
    html: `Thank you for your danotion <b>${churchName}</b> has received your donation of <b>$${donateAmount}</b>. <br/> <br/> Thank you`,
  };

  treanspoeter.sendMail(mailOptions, function (error, info) {
    if (error) {
      res.send({
        status: 'error',
        payload: error,
      });
    } else {
      res.send({
        status: 'success',
        payload: info,
      });
    }
  });
});

module.exports = nodeMailRoute;
