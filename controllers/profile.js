var express = require('express');
var db = require('../models');
var router = express.Router();
var isLoggedIn = require('../middleware/isLoggedIn');

router.get('/', isLoggedIn, function(req, res) {
  db.profile.find({
    where: {userId: req.user.id}
  }).then(function(profile) {
    res.render('profile', {profile: profile});
  });
});

router.get('/new', isLoggedIn, function(req, res) {
  res.render('profile/new');
});

// POST route for new profile
router.post('/', isLoggedIn, function(req, res) {
	// create DB entry for project!
  db.profile.create({
  	bio: req.body.bio,
    location: req.body.location,
  	userId: req.user.id
  }).then(function(profile) {
  	res.redirect('/');
  }); // add error handling here?

	// don't forget to add tags as well
});

module.exports = router;