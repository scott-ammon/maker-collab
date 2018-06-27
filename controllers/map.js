var express = require('express');
var db = require('../models');
var router = express.Router();
var isLoggedIn = require('../middleware/isLoggedIn');
var async = require('async');

router.get('/', isLoggedIn, function(req, res) {
  db.project.findAll({
    include: [db.tag]
  }).then(function(projects) {
      res.render('maker-map', {projects: projects});
    });
});

router.post('/filter', isLoggedIn, function(req, res) {
  db.tag.find({
    where: {tagName: req.body.tagFilter}
  }).then(function(tag) {
  	if (tag)
    tag.getProjects().then(function(projects) {
      res.render('maker-map', {projects: projects});
    });
  });
});

module.exports = router;