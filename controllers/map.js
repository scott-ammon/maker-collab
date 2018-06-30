var express = require('express');
var db = require('../models');
var router = express.Router();
var isLoggedIn = require('../middleware/isLoggedIn');
var async = require('async');

// GET - returns map showing all projects
router.get('/', isLoggedIn, function(req, res) {
  db.project.findAll({
    include: [db.tag]
  }).then(function(projects) {
      var mapboxToken = process.env.MAPBOX;
      res.render('map/index', {projects: projects, mapboxToken: mapboxToken});
    }).catch(function(err) {
      console.log("Error: Unable to load projects.");
    });
});

// POST - read filter form data and return projects with associated tags to map
router.post('/filter', isLoggedIn, function(req, res) {
  db.tag.find({
    where: {tagName: req.body.tagFilter}
  }).then(function(tag) {
    if(tag) {
      tag.getProjects().then(function(projects) {
        var mapboxToken = process.env.MAPBOX;
        // send filtered projects to front instead of rendering a new page
        res.json({projects: projects});
      }).catch(function(err) {
        console.log("ERROR: ", err)
      });
    } else {
      var mapboxToken = process.env.MAPBOX;
      // send empty projects array to front so we don't error out on projects undefined
      projects = [];
      res.json({projects: projects});
    }
  });
});

module.exports = router;