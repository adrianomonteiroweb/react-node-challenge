const payments = (sequelize, DataTypes) => {
  const payment = sequelize.define(
    'payments',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      patientID: DataTypes.INTEGER,
      treatmentID: DataTypes.INTEGER,
      paymentDate: DataTypes.DATE,
      installment: DataTypes.INTEGER,
    },
    { timestamps: false }
  );

  payment.associate = (models) => {
    payment.belongsTo(models.patients, {
      foreignKey: 'patientID',
      as: 'patient',
    }),
      payment.belongsTo(models.treatments, {
        foreignKey: 'treatmentID',
        as: 'treatment',
      });
  };

  return payment;
};

module.exports = payments;
