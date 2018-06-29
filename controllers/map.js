var express = require('express');
var db = require('../models');
var router = express.Router();
var isLoggedIn = require('../middleware/isLoggedIn');
var async = require('async');

// GET - returns map showing all projects
router.get('/', isLoggedIn, function(req, res) {
  console.log('\x1b[36m%s\x1b[0m', 'main map get route hit');

  db.project.findAll({
    include: [db.tag]
  }).then(function(projects) {
    var mapboxToken = process.env.MAPBOX;
    // default center and zoom over the United States for now
    var mapCenter = [-98, 38];
    var mapZoom = 4;
      res.render('map/index', {projects: projects, mapboxToken: mapboxToken, mapCenter: mapCenter, mapZoom: mapZoom});
    });
});

// POST - read filter form data and return projects with associated tags to map
router.post('/filter', isLoggedIn, function(req, res) {
  // save map center and zoom level to pass back to front
  console.log("\x1b[33m",'MAP CENTER', req.body.mapC);
  console.log("\x1b[33m",'MAP ZOOM', req.body.mapZ);
  console.log("\x1b[33m",'TAG FILTER', req.body.tagFilter);
  console.log("\x1b[33m", 'filter route hit');

  db.tag.find({
    where: {tagName: req.body.tagFilter}
  }).then(function(tag) {
    if(tag) {
      tag.getProjects().then(function(projects) {
        var mapboxToken = process.env.MAPBOX;
        console.log("JUST ABOUT TO RENDER THE MAP...");
        res.json({
          projects: projects,
          mapC: req.body.mapC,
          mapZ: req.body.mapZ
        });
        // res.render('map/index', {projects: projects, mapboxToken: mapboxToken, mapCenter: req.body.mapC, mapZoom: req.body.mapZ});
      }).catch(function(err) {
        console.log("ERROR: ", err)
      });
    } else {
      var mapboxToken = process.env.MAPBOX;
      projects = [];
      console.log("JUST ABOUT TO RENDER THE MAP (no tag)...");
      res.render('map/index', {projects: projects, mapboxToken: mapboxToken, mapCenter: req.body.mapC, mapZoom: req.body.mapZ});
    }
  });
});

module.exports = router;