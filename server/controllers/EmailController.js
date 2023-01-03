const path = require('path');
require("dotenv").config({ path: path.join(__dirname, '../.env') });

const Email = require('../models/Email');

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
    return res.json({status: "error", msg: error})
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
    return res.json({status: "error", msg: error})
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
    return res.json({status: "error", msg: error})
  }
}
