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


// POST /auth/login - the route that processes the login form

// GET /auth/logout - the route that logs you out


module.exports = router;
