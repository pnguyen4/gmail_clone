const jwt = require('jsonwebtoken');
const path = require('path');
require("dotenv").config({ path: path.join(__dirname, '../.env') });
//const Blacklist = require("../models/Blacklist");

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.json({status: "error", msg: "User not signed in"});
  }

  //const query = await Blacklist.findOne({token: token}) ?? "";
  //if (query.token == token) {
  //    return res.status(401).send({msg: "Blacklisted Token. User already signed out."});
  //}

  jwt.verify(token, process.env.JWT_KEY, (err, payload) => {
    if (err) {
      return res.json({status: "error", msg: "Invalid JWT token"});
    } else {
        req.user = payload;
        next();
    }
  });
}
