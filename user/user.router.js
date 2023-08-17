
const router = require('express').Router();
const { register, login, profile, logout, listUsers, getUserById, updateUser, deleteUser } = require('./user.controller');
const { checkToken } = require('../auth/checkToken');

router.post('/register', register);
router.post("/login", login);

router.get('/listUsers', checkToken ,listUsers);
router.get('/getUserById/:id',checkToken, getUserById);
router.put('/updateUser/:id',checkToken, updateUser);
router.delete('/deleteUser/:id',checkToken, deleteUser);


module.exports = router;
