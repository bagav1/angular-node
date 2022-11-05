module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: { type: DataTypes.STRING(30), allowNull: false },
      lastname: { type: DataTypes.STRING(30), allowNull: false },
      age: { type: DataTypes.INTEGER, allowNull: false },
      email: { type: DataTypes.STRING(50), allowNull: false },
      phone: { type: DataTypes.STRING(20), allowNull: false }
    },
    { timestamps: true }
  )
  return user
}