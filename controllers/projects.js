var express = require('express');
var db = require('../models');
var router = express.Router();
var isLoggedIn = require('../middleware/isLoggedIn');
var async = require('async');

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
  	}).then(function(project) {
    
    // remove spaces, separate tags into array of strings
    var tagArray = req.body.tagName.replace(/\s/g, '').split(','); 
    
    // define tag function to add to database with each async call
    var addTag = function(oneTag, callback) {
      db.tag.findOrCreate({
        where: {tagName: oneTag}
      }).spread(function(tag, created) {
          project.addTag(tag);
        }).then(function(tag) {
        	// error handling here
        	console.log('Tag created');
        });
    }
    
    // async call to create each tag in the database
    async.concat(tagArray, addTag, function(err, results) {
      console.log('Done with async calls!');
    });

    res.redirect('/profile');
  	});
  });
}); 

// GET - show a specific project
router.get('/:id', isLoggedIn, function(req, res) {
  db.project.find({ 
    where: {id: req.params.id},
    include: [db.tag]
  }).then(function(project) {
    res.render('projects/show', {project: project});
  });
});

// GET - gets the form to edit a specific project
router.get('/:id/edit', isLoggedIn, function(req, res) {
	db.project.findById(req.params.id).then(function(project) {
		res.render('projects/edit', {project: project});
	});
});

// PUT - edits a specific project
router.put('/:id', isLoggedIn, function(req, res) {
	console.log('PROJECT ID TO PUT IS:', req.params.id);
  db.project.update({
    title: req.body.title,
    description: req.body.description,
    code: req.body.code,
    lookingFor: req.body.lookingFor
  }, {
  	where: {id: req.params.id}
  }).then(function(result) {
  	res.sendStatus(200);
  });
});

// DELETE - deletes a specific project
router.delete('/:id', function(req, res) {
	db.project.destroy({
		where: {id: req.params.id}
	}).then(function(data) {
    res.sendStatus(200);
	});
});


module.exports = router;