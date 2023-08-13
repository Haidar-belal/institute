const { getAll, getNew, unreadNotifications, update, createNotesAbsent } = require('./handler');
const router = require('express').Router();

/*************************
 * @Router /api/Notification *
 *************************/

router.get('/all', getAll);

router.get('/new', getNew);

router.get('/unread', unreadNotifications);

router.put('/update', update);

router.post('/create', createNotesAbsent);

module.exports = router;
