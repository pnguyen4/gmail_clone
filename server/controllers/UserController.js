const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
require("dotenv").config({ path: path.join(__dirname, '../.env') });

const User = require('../models/User');

exports.signin_user = async (req, res) => {
  // TODO: check if user already signed in? maybe redundant if we're doing that on client
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.json({status: 'error', msg: 'Invalid email address'});
    }

    const password = await bcrypt.compare(req.body.password, user.password);
    if (!password) {
      return res.json({status: 'error', msg: 'Incorrect password'});
    }

    const token_payload = {id: user._id, email: user.email};
    const token = jwt.sign(token_payload, process.env.JWT_KEY, { expiresIn: "30d" });
    return res.json({status: 'success', token, user: token_payload})
  } catch (error) {

  }
};
