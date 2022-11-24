const express = require("express");

let Donor = require("../models/Donor");

const donorRoute = express.Router();

donorRoute.route("/add").post(function (req, res) {
  let { fName, lName, email, postalCode, country } = req.body;

  let newDonor = new Donor();
  newDonor.firstName = fName;
  newDonor.lastName = lName;
  newDonor.email = email;
  newDonor.postalCode = postalCode;
  newDonor.country = country;

  newDonor
    .save()
    .then((donorRes) => {
      res.send({
        status: "success",
        message: {
          donor: donorRes,
        },
      });
    })
    .catch((err) => {
      res.send({
        status: "error",
        message: "an error occured",
      });
    });
});

module.exports = donorRoute;
