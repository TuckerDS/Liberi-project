var eventModel = require('./eventModel.js');

/**
 * eventController.js
 *
 * @description :: Server-side logic for managing events.
 */
module.exports = {

  //eventController.list()
  list: (req, res) => {
    eventModel.find((err, events) => {
      if (err) {
        return res.status(500).json({
          message: 'Error when getting event.',
          error: err
        });
      }
      return res.json(events);
    });
  },

  // eventController.show()
  show: (req, res) => {
    var id = req.params.id;
    eventModel.findOne({
      _id: id
    }, (err, event) => {
      if (err) {
        return res.status(500).json({
          message: 'Error when getting event.',
          error: err
        });
      }
      if (!event) {
        return res.status(404).json({
          message: 'No such event'
        });
      }
      return res.json(event);
    });
  },

  //eventController.create()
  create: (req, res) => {
    var event = new eventModel({
      userId: req.body.userId,
      title: req.body.title,
      description: req.body.description,
      localization: req.body.localization,
      permanent: req.body.permanent,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      picture: req.body.picture
    });

    event.save((err, event) => {
      if (err) {
        return res.status(500).json({
          message: 'Error when creating event',
          error: err
        });
      }
      return res.status(201).json(event);
    });
  },

  //eventController.update()
  update: (req, res) => {
    var id = req.params.id;
    eventModel.findOne({
      _id: id
    }, (err, event) => {
      if (err) {
        return res.status(500).json({
          message: 'Error when getting event',
          error: err
        });
      }
      if (!event) {
        return res.status(404).json({
          message: 'No such event'
        });
      }

      event.userId = req.body.userId ? req.body.userId : event.userId;
      event.title = req.body.title ? req.body.title : event.title;
      event.description = req.body.description ? req.body.description : event.description;
      event.localization = req.body.localization ? req.body.localization : event.localization;
      event.permanent = req.body.permanent ? req.body.permanent : event.permanent;
      event.startDate = req.body.startDate ? req.body.startDate : event.startDate;
      event.endDate = req.body.endDate ? req.body.endDate : event.endDate;
      event.picture = req.body.picture ? req.body.picture : event.picture;
      event.save((err, event) => {
        if (err) {
          return res.status(500).json({
            message: 'Error when updating event.',
            error: err
          });
        }

        return res.json(event);
      });
    });
  },

  //eventController.remove()
  remove: (req, res) => {
    var id = req.params.id;
    eventModel.findByIdAndRemove(id, (err, event) => {
      if (err) {
        return res.status(500).json({
          message: 'Error when deleting the event.',
          error: err
        });
      }
      return res.status(204).json();
    });
  }
};
