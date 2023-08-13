const { add, update, deleteInstructor, getAll } = require('./handler');
const router = require('express').Router();

/*************************
 * @Router /api/Instructor *
 *************************/

router.post('/add', add);

router.put('/update', update);

router.delete('/delete/:id', deleteInstructor);

router.get('/', getAll);

module.exports = router;
