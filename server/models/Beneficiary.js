const { default: mongoose } = require('mongoose');

const beneficiarySchema = new mongoose.Schema(
  {
    name: String,
    address: String,
    image: String,
    description: String,
    currentDonation: {
      type: Number,
      default: 0,
    },
    longDescription: String,
    donationGoal: {
      type: Number,
      default: 100000,
    },
  },
  {
    collection: 'beneficiary',
  },
);

mongoose.set('toJSON', {
  virtuals: true,
});

module.exports = mongoose.model('Beneficiary', beneficiarySchema);
