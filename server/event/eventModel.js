var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
const CATEGORIES = require('./categories')

var eventSchema = new Schema({	'userId' : { type: Schema.Types.ObjectId, ref: 'User', required: true },	'title' : { type: String, required: true },	'category': { type: String, enum: CATEGORIES, required: true },	'description' : String,	'location' : { type: { type: String, default: "Point" }, coordinates: [Number] },	'permanent' : Boolean,	'startDate' : Date,	'endDate' : Date,	'picture' : String});

const EventModel = mongoose.model('event', eventSchema);
module.exports = EventModel;
