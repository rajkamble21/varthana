'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Masters', [
      { role: 'admin', createdAt: new Date(), updatedAt: new Date() },
      { role: 'view', createdAt: new Date(), updatedAt: new Date() },
      { role: 'read', createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Masters', null, {});
  }
};
