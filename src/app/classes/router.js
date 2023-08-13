const { add, update, deleteClass, getAll } = require('./handler');
const router = require('express').Router();

/*************************
 * @Router /api/Class *
 *************************/

router.post('/add', add);

router.put('/update', update);

router.delete('/delete/:id', deleteClass);

router.get('/', getAll);

module.exports = router;
