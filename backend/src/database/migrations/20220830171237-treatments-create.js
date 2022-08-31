'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('treatments', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      patientID: { type: Sequelize.INTEGER, allowNull: false },
      startDate: { type: Sequelize.DATE, allowNull: false },
      endDate: { type: Sequelize.DATE, allowNull: true },
      treatment_value: { type: Sequelize.INTEGER, allowNull: false },
      number_installments: { type: Sequelize.INTEGER, allowNull: false },
    });
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable('treatments');
  },
};
