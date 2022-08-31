const patients = (sequelize, DataTypes) => {
  const patient = sequelize.define(
    'patients',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      number: DataTypes.STRING,
      describe: DataTypes.STRING,
    },
    { timestamps: false }
  );

  return patient;
};

module.exports = patients;
