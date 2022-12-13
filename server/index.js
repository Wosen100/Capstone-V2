const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');

const User = require('./models/User');

const beneficiaryRoute = require('./routes/beneficiary');

const serverApp = express();
serverApp.use(cors());
serverApp.use(bodyParser.urlencoded({ extended: true }));

serverApp.use(express.static('uploads'));
serverApp.use(express.static('public'));

dotenv.config({ path: '.env' });
const connectDB = require('./config/db.js');
const uploadRouter = require('./routes/uploadFile');
const donorRoute = require('./routes/donor');
const donationRoute = require('./routes/donation');
const nodeMailRoute = require('./routes/email');
const contactUsRoute = require('./routes/contactUs');

// load env variables

serverApp.use(express.json());

// connect database
connectDB();

serverApp.use('/beneficiary', beneficiaryRoute);
serverApp.use('/beneficiary', uploadRouter);
serverApp.use('/donor', donorRoute);
serverApp.use('/donation', donationRoute);
serverApp.use('/donate', nodeMailRoute);
serverApp.use('/contactUs', contactUsRoute);
serverApp.get('/', function (request, response) {
  response.send('hi, I am server');
});

serverApp.post('/api/auth/login', async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).json({
      success: false,
      message: 'User not found',
    });
  } else {
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password,
    );
    if (!validPassword) {
      return res.status(400).json({
        success: false,
        message: 'Invalid password',
      });
    } else {
      const token = jwt.sign(
        { id: user.id, email: user.username },
        'secret123',
      );
      return res.status(200).json({
        success: true,
        message: 'Login successful',
        token,
      });
    }
  }
});

// register usser
serverApp.post('/api/auth/register', async (req, res) => {
  // hash password using bcrypt

  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = await User.findOne({ username: req.body.email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: 'User already exists',
      });
    } else {
      const newUser = await User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.email,
        password: hashedPassword,
      });

      if (newUser) {
        return res.status(201).json({
          success: true,
          data: newUser,
        });
      } else {
        return res.status(400).json({
          success: false,
          message: 'User is not created',
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
});

serverApp.listen(5001, function () {
  console.log('server app is running at PORT: 5001');
});
