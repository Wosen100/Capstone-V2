const express = require('express');
const contactUsRoute = express.Router();
const nodemailer = require('nodemailer');

contactUsRoute.route('/sendEmail').post(function (req, res) {
  let { name, email, message, subject } = req.body;

  const treanspoeter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'wosenn5@gmail.com',
      pass: 'adladeccnavhuhkc',
    },
  });

  if (email) {
    const mailOptions = {
      from: email,
      to: 'wosenn5@gmail.com',
      subject:
        typeof subject !== 'undefined' && subject.length > 0
          ? subject
          : `Contact Us from ${name}`,
      html: `There is a query from <b>${name}</b> whoose email address is <b>${email}</b> and the message is: <br/> ${message}.`,
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
  } else {
    res.send({
      status: 'error',
      payload: 'No Email found',
    });
  }
});

module.exports = contactUsRoute;
