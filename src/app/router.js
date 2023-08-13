const router = require('express').Router();

/****************
 * @Router /api *
 ****************/
router.use('/activities', require('./activities/router'));

router.use('/classes', require('./classes/router'));

router.use('/courses', require('./courses/router'));

router.use('/instructors', require('./instructors/router'));

router.use('/sections', require('./sections/router'));

router.use('/users', require('./users/router'));

router.use('/reports', require('./reports/router'));

router.use('/notifications', require('./notifications/router'));

module.exports = router;
