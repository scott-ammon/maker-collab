require('dotenv').config();
var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('./config/passportConfig');
var isLoggedIn = require('./middleware/isLoggedIn');
var flash = require('connect-flash');
var db = require('./models');

var app = express();

app.set('view engine', 'ejs');

app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public/'));
app.use(ejsLayouts);

// 1. This needs to come before you app.use passport
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

// 2. Setup flash messages
app.use(flash());

// 3. This must come after the sesson setup
app.use(passport.initialize());
app.use(passport.session());

// 4. Attach current user to res for all routes
// Also attach the flash messages
app.use(function(req, res, next) {
	res.locals.alerts = req.flash();
  res.locals.currentUser = req.user;
  next();
});

app.get('/', function(req, res) {
  res.render('index');
});

app.get('/maker-map', isLoggedIn, function(req, res) {
  db.project.findAll({
    include: [db.tag]
  }).then(function(projects) {
      res.render('maker-map', {projects: projects});
    });
});

app.post('/maker-map/filter', isLoggedIn, function(req, res) {
  console.log("REQ.BODY IS: ", req.body);
  db.tag.find({
    where: {tagName: req.body.tagFilter}
  }).then(function(tag) {
    tag.getProjects().then(function(projects) {
      console.log("RESULTS: ", projects);
      res.render('maker-map', {projects: projects});
    });
  });
});

app.use('/auth', require('./controllers/auth'));
app.use('/projects', require('./controllers/projects'));
app.use('/user', require('./controllers/user'));

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
