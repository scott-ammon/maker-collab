var expect = require('chai').expect;
var request = require('supertest');
var app = require('../index');
var db = require('../models');

before(function(done) {
  db.sequelize.sync({ force: true }).then(function() {
    done();
  });
});

describe('Auth Controller', function() {
  describe('Creating a Project', function() {
    it('should create successfully', function(done) {
      db.project.create({
        title: 'New Project',
        description: "Cool project that makes stuff and things.",
        code: "console.log('hello');",
        location: "1218 3rd Ave, Seattle WA 98101"
      }).then(function() {
        done();
      }).catch(function(error) {
        done(error);
      });
    });
  });
});


