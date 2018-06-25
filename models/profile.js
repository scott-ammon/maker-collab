'use strict';
var geocoder = require('geocoder');

module.exports = (sequelize, DataTypes) => {
  var profile = sequelize.define('profile', {
    bio: DataTypes.TEXT,
    location: DataTypes.STRING,
    lat: DataTypes.FLOAT,
    lng: DataTypes.FLOAT,
    userId: DataTypes.INTEGER
  }, {
    hooks: {
      beforeCreate: function(place, options) {
        console.log('--before create');
        console.log('--Options ', options);
        geocoder.geocode(place.address, function(err, data) {
          console.log('--Start Geocoder')
          if (err) return err;
          console.log('--Geocoder geometry Data: ', data.results[0].geometry)
          place.lat = data.results[0].geometry.location.lat;
          place.lng = data.results[0].geometry.location.lng;
          place.save().then(function(){
            console.log('--Item Updated: ', place)
          })
        })
        console.log('---Outside of Geocoder')
      }
    }
  });
  profile.associate = function(models) {
    // associations can be defined here
    models.profile.hasMany(models.project);
  };
  return profile;
};