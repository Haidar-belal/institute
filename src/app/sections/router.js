const { add, update, deleteSection, getAll } = require('./handler');
const router = require('express').Router();

/*************************
 * @Router /api/Section *
 *************************/

router.post('/add', add);

router.put('/update', update);

router.delete('/delete/:id', deleteSection);

router.get('/', getAll);

module.exports = router;
