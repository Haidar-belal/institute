const router = require('express').Router();

/*******************
 * @Router /public *
 *******************/

router.use('/users', require('./users/publicRouter'));

module.exports = router;
