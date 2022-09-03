const treatments = (sequelize, DataTypes) => {
  const treatment = sequelize.define(
    'treatments',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      patientID: DataTypes.INTEGER,
      startDate: DataTypes.DATE,
      endDate: DataTypes.DATE,
      treatment_value: DataTypes.INTEGER,
      number_installments: DataTypes.INTEGER,
    },
    { timestamps: false }
  );

  treatment.associate = (models) => {
    treatment.belongsTo(models.users, {
      foreignKey: 'patientID',
      as: 'patient',
    });
  };

  return treatment;
};

module.exports = treatments;
