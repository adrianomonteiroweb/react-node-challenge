'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('payments', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      patientID: { type: Sequelize.INTEGER, allowNull: false },
      treatmentID: { type: Sequelize.INTEGER, allowNull: false },
      paymentDate: { type: Sequelize.DATE, allowNull: false },
      installment: { type: Sequelize.INTEGER, allowNull: false },
    });
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable('payments');
  },
};
