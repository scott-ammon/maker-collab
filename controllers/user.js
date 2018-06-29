var express = require('express');
var db = require('../models');
var router = express.Router();
var isLoggedIn = require('../middleware/isLoggedIn');

// GET - main profile page of user
router.get('/', isLoggedIn, function(req, res) {
  db.user.findById(req.user.id).then(function(user) {
    user.getProjects().then(function(projects) {
      res.render('user/index', {user: user, projects: projects});
    });
  });
});

// GET - get form for editing user bio
router.get('/edit', isLoggedIn, function(req, res) {
	db.user.findById(req.user.id).then(function(user) {
		res.render('user/edit', {user: user});
	});
});

// PUT - put edited user bio into the database
router.put('/', isLoggedIn, function(req, res) {
	db.user.update({
		bio: req.body.bio
	}, {
		where: {id: req.user.id}
	}).then(function(result) {
		res.sendStatus(200);
	});
});

// GET - specific user page
router.get('/:id', isLoggedIn, function(req, res) {
  db.user.findById(req.params.id).then(function(user) {
    user.getProjects().then(function(projects) {
      res.render('user/show', {user: user, projects: projects});
    });
  });
});

module.exports = router;