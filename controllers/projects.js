var express = require('express');
var db = require('../models');
var router = express.Router();
var isLoggedIn = require('../middleware/isLoggedIn');

// GET - returns form for adding a new project
router.get('/new', isLoggedIn, function(req, res) {
  res.render('projects/new');
});

// POST - posts the new project to the database
router.post('/', isLoggedIn, function(req, res) { 
  db.profile.find({
  	where: {userId: req.user.id}
  }).then(function(profile) {
  	profile.createProject({
  	  title: req.body.title,
      description: req.body.description,
      code: req.body.code,
      lookingFor: req.body.lookingFor
  	}).then(function(data) {
      res.redirect('/profile');
  	});
  });
}); 

// GET - show a specific project
router.get('/:id', isLoggedIn, function(req, res) {
  db.project.findById(req.params.id).then(function(project) {
    res.render('projects/show', {project: project});
  });
});

// PUT - edits a specific project

// DELETE - deletes a specific project


module.exports = router;