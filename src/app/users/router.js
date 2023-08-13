const { update, updateActivation, deleteUser, getAll, updatePassword } = require('./handler');
const router = require('express').Router();

/*************************
 * @Router /api/user *
 *************************/

router.put('/update', update);

router.delete('/delete/:id', deleteUser);

router.put('/updateStatus', updateActivation);

router.get('/getUsers', getAll);

router.put('/updatePassword', updatePassword);

module.exports = router;
