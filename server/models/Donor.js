const { default: mongoose } = require('mongoose');

const donorSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    postalCode: String,
    country: String,
  },
  {
    collation: 'donor',
  },
);

mongoose.set('toJSON', {
  virtuals: true,
});

module.exports = mongoose.model('Donor', donorSchema);
