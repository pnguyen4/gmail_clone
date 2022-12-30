const router = require("express").Router();
const controller = require("../controllers/UserController.js");
const auth = require('../middleware/auth.js');

router.get('/labels', auth, controller.get_labels);

router.post('/signup', controller.signup_user);
router.post('/signin', controller.signin_user);
//router.post('/user/logout', auth.requires_token, controller.logout_user);

module.exports = router;
