const { default: mongoose } = require('mongoose');

const userSchema = new mongoose.Schema({
  fisrtName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  password: {
    type: String,
  },
  username: {
    type: String,
  },
});

mongoose.set('toJSON', {
  virtuals: true,
});

module.exports = mongoose.model('User', userSchema);
