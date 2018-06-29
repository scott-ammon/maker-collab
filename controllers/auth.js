var express = require('express');
var db = require('../models');
var passport = require('../config/passportConfig');
var router = express.Router();

// GET /auth/signup - sends the form for signup
router.get('/signup', (req, res) => {
  res.render('auth/signup');
});

// GET /auth/login - send the form to login
router.get('/login', (req, res) => {
  res.render('auth/login');
});

// POST /auth/signup - the route that processes the signup form
router.post('/signup', function(req, res) {
  // This looks up the user in the database
  db.user.findOrCreate({
    where: {email: req.body.email},
    defaults: {
      name: req.body.name,
      password: req.body.password
    }
  }).spread(function(user, created) {
    if(created) {
      // No record was found, so we created one
      passport.authenticate('local', {
        successRedirect: '/user',
        successFlash: 'Account created and logged in!'
      })(req, res);
    } else {
      // We found a record, so they can't use that email
      req.flash('error', 'An account with this email already exists');
      res.redirect('/auth/signup');
    }
  }).catch(function(error) {
    // Catch any additional errors
    console.log(error.message);
    req.flash('error', error.message)
    res.redirect('/auth/signup');
  });
});

// POST /auth/login - the route that processes the login form
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/auth/login',
  successFlash: 'You have logged in!',
  failureFlash: 'Invalid username and/or password!'
}));

// GET /auth/logout - the route that logs you out
router.get('/logout', function(req, res) {
  // Passport logout() removes req.user and clears the session
  req.logout();
  req.flash('success', 'You have logged out.');
  res.redirect('/');
});

module.exports = router;
