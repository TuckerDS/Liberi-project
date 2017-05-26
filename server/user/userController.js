/*jshint esversion: 6*/

var userModel = require('./userModel.js');

//passport
const passport = require('passport');
const passportConfig  = require("../config/passport");
passportConfig();

// multer
const upload = require('../config/multer');

// Bcrypt let us encrypt passwords
const bcrypt         = require("bcryptjs");
const bcryptSalt     = 10;

/**
 * userController.js
 *
 * @description :: Server-side logic for managing users.
 */
module.exports = {

    /**
     * userController.list()
     */
    list: function (req, res) {
        userModel.find(function (err, users) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting user.',
                    error: err
                });
            }
            return res.json(users);
        });
    },

    /**
     * userController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        userModel.findOne({_id: id}, function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting user.',
                    error: err
                });
            }
            if (!user) {
                return res.status(404).json({
                    message: 'No such user'
                });
            }
            return res.json(user);
        });
    },

    /**
     * userController.create()
     */
    create: function (req, res) {
        var user = new userModel({    			username : req.body.username,    			password : req.body.password,    			email : req.body.email,    			role : req.body.role,    			validated : req.body.validated,    			description : req.body.description
        });

        user.save(function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating user',
                    error: err
                });
            }
            return res.status(201).json(user);
        });
    },

    /**
     * userController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        userModel.findOne({_id: id}, function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting user',
                    error: err
                });
            }
            if (!user) {
                return res.status(404).json({
                    message: 'No such user'
                });
            }

            user.username = req.body.username ? req.body.username : user.username;      			user.password = req.body.password ? req.body.password : user.password;      			user.email = req.body.email ? req.body.email : user.email;      			user.role = req.body.role ? req.body.role : user.role;      			user.validated = req.body.validated ? req.body.validated : user.validated;      			user.description = req.body.description ? req.body.description : user.description;

            user.save(function (err, user) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating user.',
                        error: err
                    });
                }

                return res.json(user);
            });
        });
    },

    /**
     * userController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        userModel.findByIdAndRemove(id, function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the user.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    },


//--------AUTH user
// SIGNUP
  signup: function (req, res, next) {
    console.log(req.body);
    var username = req.body.username;
    var password = req.body.password;
    var email = req.body.email;
    var role = req.body.role;
    var description = req.body.description;

    if (!username || !password) {
      res.status(400).json({ message: "Provide username and password" });
      return;
    }

    userModel.findOne({ username }, "username", (err, user) => {

      if (user !== null) {
        res.status(400).json({ message: "The username already exists" });
        return;
      }

      var salt     = bcrypt.genSaltSync(bcryptSalt);
      var hashPass = bcrypt.hashSync(password, salt);

      var newUser = userModel({
        username,
        password: hashPass,
        email: email,
        role: role,
        description: description
      });

      console.log("mi user: " + newUser);

      newUser.save((err) => {
        if (err) {
          res.status(400).json({ message: "Something went wrong" });
        } else {
          req.login(newUser, function(err) {
            if (err) {
              console.log(err);
              return res.status(500).json({
                message: 'something went wrong :('
              });
            }
            res.status(200).json(req.user);
          });
        }
      });
    });
  },

  //LOGIN
  login: function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
      if (err) { return next(err); }

      if (!user) { return res.status(401).json(info); }

      req.login(user, function(err) {
        if (err) {
          return res.status(500).json({
            message: 'something went wrong :('
          });
        }
        res.status(200).json(req.user);
        console.log ("USUARIO LOGEADO: " + req.user);
      });
    })(req, res, next);
  },

  //LOGOUT
  logout: function(req, res) {
    req.logout();
    res.status(200).json({ message: 'Success' });
  },

  //LOGGED IN
  loggedin: function(req, res) {
    console.log("QUE COÑO PASA AKI");
    if(req.isAuthenticated()) {
      return res.status(200).json(req.user);
    }
    return res.status(403).json({ message: 'Unauthorized' });
  },


  //PRIVATE
  private: function(req, res) {
    console.log(req.session);
    if(req.isAuthenticated()) {
      return res.json({ message: 'This is a private message' });
    }
    return res.status(403).json({ message: 'Unauthorized' });
  }
};
