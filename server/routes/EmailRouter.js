const router = require('express').Router();
const controller = require('../controllers/EmailController.js');
const auth = require('../middleware/auth.js');

router.get('/mail', auth, controller.get_emails);

// We just get all emails and display by label on client
//router.get('/mail/:label', auth, controller.get_emails);

router.put('/mail/:label/:id', auth, controller.add_email_label);
router.delete('/mail/:label/:id', auth, controller.rm_email_label);
router.put('/mail/:id', auth, controller.modify_email_labels);

module.exports = router;
