const { default: mongoose, Schema } = require('mongoose');

const donationSchema = new mongoose.Schema(
  {
    donor: {
      type: Schema.Types.ObjectId,
      ref: 'Donor',
    },
    beneficiary: {
      type: Schema.Types.ObjectId,
      ref: 'beneficiary',
    },
    donationAmount: Number,
  },
  {
    collation: 'donations',
  },
);

mongoose.set('toJSON', {
  virtuals: true,
});

module.exports = mongoose.model('Donation', donationSchema);
