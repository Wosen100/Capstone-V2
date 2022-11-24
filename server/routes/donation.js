const express = require("express");

let Donation = require("../models/Donation");

const donationRoute = express.Router();

donationRoute.route("/create").post(function (req, res) {
  let { donor, beneficiary, donationAmount } = req.body;

  let donation = new Donation();
  donation.donor = donor;
  donation.beneficiary = beneficiary;
  donation.donationAmount = donationAmount;

  donation
    .save()
    .then((donationRes) => {
      res.send({
        status: "success",
        message: {
          donation: donationRes,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.send({
        status: "error",
        message: "an error occured",
      });
    });
});

module.exports = donationRoute;
