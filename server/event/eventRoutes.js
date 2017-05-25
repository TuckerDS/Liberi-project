var express = require('express');
var router = express.Router();
var eventController = require('./eventController.js');
const CATEGORIES = require('./categories');

//GET all events
router.get('/', eventController.list);

//GET single event
router.get('/:id', eventController.show);

//POST create a new event
router.post('/', eventController.create);

//PUT update an event
router.put('/:id', eventController.update);

//DELETE remove an event
router.delete('/:id', eventController.remove);

module.exports = router;
