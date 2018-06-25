var express = require('express');
var db = require('../models');
var router = express.Router();
var isLoggedIn = require('../middleware/isLoggedIn');

// GET - main profile page of user
router.get('/', isLoggedIn, function(req, res) {
  db.profile.find({
    where: {userId: req.user.id}
  }).then(function(profile) {
    // find associated projects in db here...
    // db.profile.findProjects();

    res.render('profile/index', {profile: profile});
  });
});

// GET - returns form for creating user profile
router.get('/new', isLoggedIn, function(req, res) {
  res.render('profile/new');
});

// POST - posts new profile for user
router.post('/', isLoggedIn, function(req, res) {
	// create DB entry for project!
  db.profile.create({
  	bio: req.body.bio,
    location: req.body.location,
  	userId: req.user.id
  }).then(function(profile) {
  	res.redirect('/');
  }); // add error handling here
});

// GET - shows a particular user profile
router.get('/profile/:id', isLoggedIn, function(req, res) {
  db.profile.findById(req.params.id).then(function(profile) {
    res.render('profile/show', {profile: profile});
  });
});


module.exports = router;