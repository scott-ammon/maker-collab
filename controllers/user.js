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

module.exports = router;