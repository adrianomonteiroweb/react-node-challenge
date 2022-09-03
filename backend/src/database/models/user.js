const users = (sequelize, DataTypes) => {
  const user = sequelize.define(
    'users',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      password_hash: DataTypes.STRING,
      number: DataTypes.STRING,
      role: DataTypes.STRING,
    },
    { timestamps: false }
  );

  return user;
};

module.exports = users;
