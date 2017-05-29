var express = require('express');
var router = express.Router();
var userController = require('./userController.js');
const authChecker = require('../middlewares/authCheckerMiddleware');
const { ensureLoggedIn } = require('connect-ensure-login');

router.get('/', userController.list);

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.post('/loggedin', userController.loggedin);

router.delete('/:id', authChecker, userController.remove);
router.get('/:id',authChecker, userController.show);
router.post('/', userController.create);
router.put('/:id', authChecker, userController.update);
//router.private('/private', userController.private);
//router.login('/loggin', userController.login);

module.exports = router;
