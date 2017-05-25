var express = require('express');
var router = express.Router();
var eventController = require('./eventController.js');
const CATEGORIES = require('./categories');
const upload = require('../config/multer');

//GET all events
router.get('/', eventController.list);

//GET single event
router.get('/:id', eventController.show);

//POST create a new event
router.post('/', upload.single('file'), eventController.create);

//PUT update an event
router.put('/:id', eventController.update);

//DELETE remove an event
router.delete('/:id', eventController.remove);

module.exports = router;
