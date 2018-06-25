'use strict';
module.exports = (sequelize, DataTypes) => {
  var project = sequelize.define('project', {
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    code: DataTypes.TEXT,
    lookingFor: DataTypes.STRING,
    profileId: DataTypes.INTEGER
  }, {});
  project.associate = function(models) {
    // associations can be defined here
    models.project.belongsToMany(models.tag, {through: "projectsTags"});
    models.project.belongsTo(models.profile);
  };
  return project;
};