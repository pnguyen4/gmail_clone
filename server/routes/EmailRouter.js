const router = require('express').Router();
const controller = require('../controllers/EmailController.js');
const auth = require('../middleware/auth.js');

router.get('/mail/:label', auth, controller.get_emails);
//router.get('/mail/:label/:id', auth, controller.get_email);

module.exports = router;
