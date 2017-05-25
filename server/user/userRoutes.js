var express = require('express');
var router = express.Router();
var userController = require('./userController.js');

/*
 * GET
 */
router.get('/', userController.list);

/*
 * GET
 */
router.get('/:id', userController.show);

/*
 * POST
 */
router.post('/', userController.create);
/*
 * PUT
 */
router.put('/:id', userController.update);
/*
 * DELETE
 */
router.delete('/:id', userController.remove);



router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/loggedin', userController.loggedin);
//router.private('/private', userController.private);
//router.login('/loggin', userController.login);

module.exports = router;
