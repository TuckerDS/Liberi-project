var express = require('express');
var router = express.Router();
var userController = require('./userController.js');
const { ensureLoggedIn } = require('connect-ensure-login');


// router.get('/', userController.list);  //TODO: for Admin panel

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.post('/loggedin', userController.loggedin);

router.delete('/:id', userController.remove);
router.get('/:id', userController.show);
router.put('/:id', userController.update);

module.exports = router;
