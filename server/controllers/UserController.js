const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
require("dotenv").config({ path: path.join(__dirname, '../.env') });

const SALT_ROUNDS = 10;
const User = require('../models/User');

exports.get_labels = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    return res.json({status: 'success', labels: user.customlabels});
  } catch (error) {
    return res.json({status: 'error', msg: "cannot find user"});
  }
};

exports.add_label = async (req, res) => {
  try {
    if (!req.body.label) {
      return res.json({status: 'error', msg: 'no label name'});
    }
    await User.updateOne({_id: req.user.id},
                         { "$addToSet":
                           { customlabels: req.body.label }
                         });
    return res.json({status: 'success'})
  } catch (error) {
    return res.json({status: 'error', error});
  }
}

exports.rm_label = async (req, res) => {
  try {
    if (!req.body.label) {
      return res.json({status: 'error', msg: 'no label name'});
    }
    await User.updateOne({_id: req.user.id},
                         { "$pull":
                           { customlabels: req.body.label }
                         });
    // TODO: remove this label from all of user's emails
    return res.json({status: 'success'});
  } catch (error) {
    return res.json({status: 'error', error});
  }
}

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
    console.log(error);
    return res.json({status: 'error', msg: JSON.stringify(error)});
  }
};

// TODO: revise error messages to be more like gmail
exports.signup_user = async (req, res) => {
  try {
    let newuser = { email: req.body.email, password: req.body.password }
    const passwordComplexity =
          new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})')
    if (!passwordComplexity.test(newuser.password)) {
      return res.json({status: 'error', msg: 'Password does not meet complexity requirements'});
    }
    newuser.password = await bcrypt.hash(newuser.password, SALT_ROUNDS);
    await User.create(newuser);
    return res.json({status: 'success'})
  } catch (error) {
    console.log(error);
    return res.json({status: 'error', msg: 'Username taken or invalid'});
  }
};
