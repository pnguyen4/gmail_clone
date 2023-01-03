const path = require('path');
require("dotenv").config({ path: path.join(__dirname, '../.env') });

const Email = require('../models/Email');
const User = require('../models/User');

exports.get_emails = async (req, res) => {
  try {
    const filter = {
      owner: req.user.id,
      //labels: req.params.label
    }

    const emails = await Email.find(filter);
    return res.json({status: "success", emails});
  } catch (error) {
    console.log(error);
    return res.json({status: "error", msg: error});
  }
};

exports.add_email_label = async (req, res) => {
  try {
    await Email.updateOne({_id: req.params.id, owner: req.user.id},
                          { "$addToSet":
                            { labels: req.params.label }
                          });
    return res.json({status: 'success'});
  } catch (error) {
    return res.json({status: "error", msg: error});
  }
}

exports.rm_email_label = async (req, res) => {
  try {
    await Email.updateOne({_id: req.params.id, owner: req.user.id},
                          { "$pull":
                            { labels: req.params.label }
                          });
    return res.json({status: 'success'});
  } catch (error) {
    return res.json({status: "error", msg: error});
  }
}

exports.modify_email_labels = async (req, res) => {
  try {
    await Email.updateOne({_id: req.params.id, owner: req.user.id},
                          { "$set":
                            { labels: [] }
                          });
    await Email.updateOne({_id: req.params.id, owner: req.user.id},
                          { "$push":
                            { labels: { "$each" : req.body.labels } }
                          });
    return res.json({status: 'success'});
  } catch (error) {
    return res.json({status: "error", msg: error});
  }
}

exports.send_email = async (req, res) => {
  try {
    let email = {
      subject: req.body.subject,
      body: req.body.body,
      recipients: req.body.recipients,
      sender: req.user.email,
      owner: req.user.id,
      labels: ["sent"],
    }
    // TODO: create email for all recipienst, with 'inbox' label
    for (let recipient of req.body.recipients) {
      let touser = await User.findOne({email: recipient});
      console.log(touser)
      if (touser) {
        console.log("sending email")
        let db_email = await Email.create({...email, owner: touser._id, labels: ["inbox"]});
        await User.updateOne({_id: touser._id}, {$push: { emails: db_email._id }});
      }
    }
    const newemail = await Email.create(email);
    return res.json({status: 'success', email: newemail})
  } catch (error) {
    return res.json({status: "error", msg: error});
  }
}
//router.post('/mail', auth, controller.send_email);
