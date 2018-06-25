'use strict';
module.exports = (sequelize, DataTypes) => {
  var profile = sequelize.define('profile', {
    bio: DataTypes.TEXT,
    lat: DataTypes.FLOAT,
    lng: DataTypes.FLOAT,
    userId: DataTypes.INTEGER
  }, {});
  profile.associate = function(models) {
    // associations can be defined here
    models.profile.belongsTo(models.user);
    models.profile.hasMany(models.project);
  };
  return profile;
};