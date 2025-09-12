import { DataTypes } from 'sequelize';

export default (sequelize) => {
  return sequelize.define('User', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(60), allowNull: false },
    email: { type: DataTypes.STRING(100), allowNull: false, unique: true },
    password: { type: DataTypes.STRING(255), allowNull: false },
    address: { type: DataTypes.STRING(400) },
    role: { type: DataTypes.ENUM('admin','user','store_owner'), defaultValue: 'user' }
  }, { tableName: 'users', timestamps: true });
};