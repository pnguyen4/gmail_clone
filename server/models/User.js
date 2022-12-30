const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const refType = mongoose.Types.ObjectId;

const UserSchema = new Schema({
  email: { type: String,
           required: true,
           unique: true,
           lowercase: true,
           match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ },
  password: { type: String, required: true },
  customlabels: [{ type: String, default: [] }],
  emails: [{ type: refType, default: [] }]
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
