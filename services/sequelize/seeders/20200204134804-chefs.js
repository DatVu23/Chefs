'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('chefs', [{
      name: 'Johnson',
      createdAt: new Date(),
      updatedAt: new Date(),
    }])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('chefs', null, {})
  }
};
