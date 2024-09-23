'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    static associate(models) {
      Address.belongsTo(models.User, { foreignKey: 'userId', onDelete: 'CASCADE' });
    }
  }
  Address.init({
    address: DataTypes.JSONB
  }, {
    sequelize,
    modelName: 'Address',
  });
  return Address;
};