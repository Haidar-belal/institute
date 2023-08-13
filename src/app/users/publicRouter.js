const handler = require('./handler');
const router = require('express').Router();
/****************************
 * @Router /public/user *
 ****************************/

router.post('/register', handler.register);

router.post('/login', handler.login);

router.put('/sendMail', handler.sendMail);

router.post('/checkCode', handler.checkCode);

router.put('/resetPassword', handler.resetPassword);

module.exports = router;
