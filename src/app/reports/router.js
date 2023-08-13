const handler = require('./handler');
const router = require('express').Router();

/*************************
 * @Router /api/Report *
 *************************/

router.post('/add', handler.add);

router.put('/update', handler.update);

router.delete('/delete/:id', handler.deleteReport);

router.get('/', handler.getAll);

router.get('/getById', handler.getById);

module.exports = router;
