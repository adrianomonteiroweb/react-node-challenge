'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('patients', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      firstName: { type: Sequelize.STRING, allowNull: false },
      lastName: { type: Sequelize.STRING, allowNull: false },
      email: { type: Sequelize.STRING, allowNull: false, unique: true },
      number: { type: Sequelize.STRING, allowNull: false, unique: true },
      describe: { type: Sequelize.STRING },
    });
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable('patients');
  },
};
