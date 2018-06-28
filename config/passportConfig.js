var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var db = require('../models');

// Turns user into just an id for serializing
passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

// Takes that id and looks up user in database
passport.deserializeUser(function(id, cb) {
  db.user.findById(id).then(function(user) {
    cb(null, user);
  }).catch(cb);
});

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, function(email, password, cb) {
  db.user.find({
    where: {email: email}
  }).then(function(user) {
    if(!user || !user.validPassword(password)) {
      cb(null, false);
    } else {
      cb(null, user);
    }
  }).catch(cb);
}));

module.exports = passport;