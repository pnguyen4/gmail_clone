const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const refType = mongoose.Types.ObjectId;

const EmailSchema = new Schema({
  subject: { type: String, default: "no subject" },
  body: { type: String, default: "no body" },
  sender: { type: String, required: true },
  recipients: { type: [String], validate: {
    validator: async (arr) => Array.isArray(arr) && arr.length > 0,
    message: "Email requires at least 1 recipient."
  } },
  owner: { type: refType, required: true },
  labels: { type: [String], default: ["inbox"] }
});

const Email = mongoose.model("Email", EmailSchema);

module.exports = Email;
