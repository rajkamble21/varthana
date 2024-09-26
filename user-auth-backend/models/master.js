'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Master extends Model {
    static associate(models) {
    }
  }
  Master.init({
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {
    sequelize,
    modelName: 'Master',
  });
  return Master;
};