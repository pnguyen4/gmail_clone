const path = require("path");
const bcrypt = require('bcryptjs');
require('dotenv').config(path.join(__dirname, '../.env')); // .env is in different folder
const mongoose = require('mongoose');
const { MONGO_URI } = process.env;
const salt_rounds = 10;

const User = require('../models/User');
const Email = require('../models/Email');
const { users } = require('./users.json');
const { emails } = require('./emails.json');

async function run() {
  try {
    mongoose.connect(MONGO_URI);
    console.log("Connected to the DB.");

    await User.collection.drop();
    await Email.collection.drop();

    for (let user of users) {
      user.password = await bcrypt.hash(user.password, salt_rounds);
    }
    await User.create(users);

    for (let email of emails) {
      await createEmail(email, email.sender, "sent");
      for (let recipient of email.recipients) {
        await createEmail(email, recipient, "inbox");
      }
    }
  } catch (error) {

  } finally {
    mongoose.connection.close();
  }
}

async function createEmail(email, email_owner, label) {
  try {
    let owner = await User.findOne({email: email_owner});
    email.owner = owner._id;
    email.labels = [label];
    let db_email = await Email.create(email);
    await User.updateOne({email: email_owner}, {$push: { emails: db_email._id }});
  } catch (error) {
    console.log(error);
  }
}

run().catch(console.dir)
