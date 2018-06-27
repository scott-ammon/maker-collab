'use strict';
// var geocoder = require('geocoder');
var NodeGeocoder = require('node-geocoder');
var options = {provider: 'google'};
var geocoder = NodeGeocoder(options);

module.exports = (sequelize, DataTypes) => {
  var project = sequelize.define('project', {
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    code: DataTypes.TEXT,
    location: DataTypes.STRING,
    lat: DataTypes.FLOAT,
    lng: DataTypes.FLOAT,
    userId: DataTypes.INTEGER
  }, {
    hooks: {
      beforeCreate: function(project, options) {
        geocoder.geocode(project.location).then(function(res) {
          project.lat = res[0].latitude;
          project.lng = res[0].longitude;
          project.save();
        }).catch(function(err) {
          console.log(err);
        });
        console.log('---Outside of Geocoder');
      }
    }
  });

  project.associate = function(models) {
    // associations can be defined here
    models.project.belongsToMany(models.tag, {through: "projectsTags"});
  };
  return project;
};
