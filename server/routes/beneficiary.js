const express = require('express');
const beneficiaryRoute = express.Router();

let Beneficiary = require('../models/Beneficiary');

beneficiaryRoute.route('/add').post(function (req, res) {
  let { name, image, address, description, goal, longDescription } = req.body;

  let newBeneficiary = new Beneficiary();
  newBeneficiary.name = name;
  newBeneficiary.image = image;
  newBeneficiary.address = address;
  newBeneficiary.description = description;
  newBeneficiary.donationGoal = Number(goal);
  newBeneficiary.longDescription = longDescription;
  newBeneficiary
    .save()
    .then(beneficiaryRes => {
      res.send({
        status: 'success',
        message: {
          beneficiary: beneficiaryRes,
        },
      });
    })
    .catch(err => {
      console.log(err);
      res.send({
        status: 'error',
        message: 'an error occured',
      });
    });
});

beneficiaryRoute.route('/get').get(function (req, res) {
  Beneficiary.find().then(response => {
    res.send({
      beneficiaries: response,
    });
  });
});

beneficiaryRoute.route('/donate').put(function (req, res) {
  let { id, donation } = req.body;
  Beneficiary.findById(id, function (err, beneficiary) {
    beneficiary.currentDonation = beneficiary.currentDonation + parseFloat(donation);
    beneficiary.save().then(newBene => {
      res.send(newBene);
    });
  });
});

module.exports = beneficiaryRoute;
