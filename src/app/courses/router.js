const { add, update, deleteCourse, getAll, getClassCourses } = require('./handler');
const router = require('express').Router();

/*************************
 * @Router /api/Course *
 *************************/

router.post('/add', add);

router.put('/update', update);

router.delete('/delete/:id', deleteCourse);

router.get('/', getAll);

router.get('/:id', getClassCourses);

module.exports = router;
