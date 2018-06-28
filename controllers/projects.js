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
  db.project.create({
  	  title: req.body.title,
      description: req.body.description,
      code: req.body.code,
      location: req.body.location,
      userId: req.user.id
  	}).then(function(project) {

      // array of checkbox values for hardware + software
      var checkboxArr = [req.body.arduinoTag,
      								   req.body.rpiTag,
      					    	   req.body.intelTag,
      					    	   req.body.rpiTag,
      					    	   req.body.asusTag,
      					    	   req.body.odroidTag,
      					    	   req.body.jsTag,
      					    	   req.body.pyTag,
      					    	   req.body.javaTag,
      					    	   req.body.cTag,
      					    	   req.body.rubyTag];
      var tagArray = [];

      // only push tags that are checked
      for(let i = 0; i < checkboxArr.length; i++) {
      	if(checkboxArr[i]) {
      		tagArray.push(checkboxArr[i]);
      	}
      }

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
    res.redirect('/user');
  	});
});

// GET - show a specific project
router.get('/:id', isLoggedIn, function(req, res) {
  db.project.find({ 
    where: {id: req.params.id},
    include: [db.tag]
  }).then(function(project) {
  	// find user associated with project, pass into render
  	db.user.find({
  		where: {id: project.userId}
  	}).then(function(user) {
  		res.render('projects/show', {user: user, project: project});
  	});
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

router.get('/collab/:id', function(req, res) {
  
})

module.exports = router;