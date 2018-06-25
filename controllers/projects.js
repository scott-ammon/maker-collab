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
  
}); 



module.exports = router;