'use strict';
var geocoder = require('geocoder');

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

      // UPDATE TO USE PROMISES TO HANDLE ASYNC PROBLEM: 
      // beforeCreate: function(profile, options, cb) {
      //   console.log('--before create');
      //   console.log('--Options ', options);
      //   geocoder.geocode(profile.location, function(err, data) {
      //     console.log('--Start Geocoder')
      //     if (err) return err;
      //     console.log('--Geocoder geometry Data: ', data.results[0].geometry)
      //     profile.lat = data.results[0].geometry.location.lat;
      //     profile.lng = data.results[0].geometry.location.lng;
      //     profile.save().then(function(){

      //     console.log('--Item Updated: ', profile)
      //     });
      //   });
      //   console.log('---Outside of Geocoder');
      // }

      beforeCreate: function(profile, options) {
        console.log('--before create');
        console.log('--Options ', options);
        geocoder.geocode(profile.location, function(err, data) {
          console.log('--Start Geocoder')
          if (err) return err;
          console.log('--Geocoder geometry Data: ', data.results[0].geometry)
          profile.lat = data.results[0].geometry.location.lat;
          profile.lng = data.results[0].geometry.location.lng;
          profile.save().then(function(){
            console.log('--Item Updated: ', profile)
          })
        })
        console.log('---Outside of Geocoder')
      }
    }
  });
  project.associate = function(models) {
    // associations can be defined here
    models.project.belongsToMany(models.tag, {through: "projectsTags"});
  };
  return project;
};
