'use strict';
module.exports = (sequelize, DataTypes) => {
  var projectsTags = sequelize.define('projectsTags', {
    projectId: DataTypes.INTEGER,
    tagId: DataTypes.INTEGER
  }, {});
  projectsTags.associate = function(models) {
    // associations can be defined here
  };
  return projectsTags;
};